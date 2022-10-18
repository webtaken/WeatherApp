const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
const cors = require('cors');

// modulos de comandos
require("dotenv").config();

// creando el servidor express
const app = express();
const app_port = process.env.PORT || 8000;

// Middlewares
app.use(body_parser.json());


// to verify the callback url from dashboard side - cloud api side
app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];
  if (mode && token) {
    if (mode === "subscribe" && token === process.env.WEBHOOK_TOKEN) {
      console.log("WHATSAPP WEBHOOK SUCCESSFULLY SETUP ✅");
      res.status(200).send(challenge);
    } else {
      console.log("WHATSAPP WEBHOOK FAILURE SETUP ✅");
      res.status(403);
    }
  }
});

// !IMPORTANTE!: esta librería con su método parseMessage sobreescribe
// el req.body que recibimos, tener cuidado con esto
// !IMPORTANTE!: para que los mensajes lleguen en orden debes hacer una cadena de
// funciones asíncronas, async await
app.post("/webhook", async (req, res) => {
  // verificamos que hay datos disponibles
  res.sendStatus(200).send({
    status: "OK"
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK"
  });
});

// options for good configuration
app.options("/geolocation", cors());
app.post("/geolocation", cors(), async (req, res) => {
  console.log(req.body);
  let address = encodeURIComponent(req.body.address.trim());
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GEOCODING_API_KEY}`

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      res.status(400).json({
        status: "ERROR"
      });
      return;
    }

    let data = response.data;

    if (data.status !== "OK") {
      if (data.status === "ZERO_RESULTS") {
        res.status(404).json({
          status: "NO FOUND RESULTS"
        });
      } else {
        res.status(400).json({
          status: "ERROR"
        });
      }
      return;
    }

    // ahora manejamos la respuesta, devolvemos el primer resultado
    res.status(200).json({
      status: "OK",
      result: {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
        bounds: data.results[0].geometry.viewport
      }
    });

  } catch (error) {
    res.status(400).json({
      status: "ERROR"
    });
  }
});


// options for good configuration
app.options("/weather", cors());
app.post("/weather", cors(), async (req, res) => {
  let lat = req.body.lat;
  let lng = req.body.lng;

  let url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}&lang=es`

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      res.status(400).json({
        status: "ERROR"
      });
      return;
    }

    let data = response.data;

    // si no se devolvió ninguna llamada
    if (!data || !data.count) {
      res.status(400).json({
        status: "ERROR"
      });
      return;
    }

    let metrics = data.data[0];
    console.log(metrics);
    // ahora manejamos la respuesta, devolvemos el primer resultado
    res.status(200).json({
      status: "OK",
      result: {
        cityName: metrics.city_name,
        icon: metrics.weather.icon,
        temp: metrics.temp,
        pod: metrics.pod,
        description: metrics.weather.description,
        pres: metrics.pres,
        windSpd: metrics.wind_spd,
        rh: metrics.rh,
        dewpt: metrics.dewpt,
        clouds: metrics.clouds,
        vis: metrics.vis,
        precip: metrics.precip,
        uv: metrics.uv
      }
    });

  } catch (error) {
    res.status(400).json({
      status: "ERROR"
    });
  }
});


app.listen(app_port, () => {
  console.log(`Listening on port ${app_port}`);
});
