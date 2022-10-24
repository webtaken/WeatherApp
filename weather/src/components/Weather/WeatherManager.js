import { useState } from "react";
import WeatherHeader from "./WeatherHeader";
import WeatherData from "./WeatherData";
import WeatherRecommendations from "./WeatherRecommendations";
import credentials from "../../Credentials/credentials";
import M from 'materialize-css';

const WeatherManager = (props) => {
  const [weatherMetrics, setWeatherMetrics] = useState(null);

  const getWeatherHandler = async () => {
    let url = `${credentials.BACKEND_ENDPOINT}/weather`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          lat: props.latLng.lat,
          lng: props.latLng.lng
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw Error(response.status);
      }
      if (!data || data.status !== "OK") {
        M.toast({
          html: 'Ocurrió un error inténtelo más tarde',
          displayLength: 3000,
          classes: 'red'
        });
        return;
      }

      let metrics = data.result;
      setWeatherMetrics(prevMetrics => {
        return { ...metrics }
      });


    } catch (error) {
      M.toast({
        html: 'Ocurrió un error',
        displayLength: 3000,
        classes: 'red'
      });
    }

  };

  let weatherComponent = <></>;

  if (weatherMetrics) {
    weatherComponent = (
      <>
        <div className="row">
          <WeatherHeader weatherProps={{
            cityName: weatherMetrics.cityName,
            icon: weatherMetrics.icon,
            temp: weatherMetrics.temp,
            pod: weatherMetrics.pod,
            description: weatherMetrics.description
          }} />
          <WeatherData pod={weatherMetrics.pod} metrics={{
            pres: weatherMetrics.pres,
            windSpd: `${weatherMetrics.windSpd} ${weatherMetrics.windCdirFull}`,
            rh: weatherMetrics.rh,
            dewpt: weatherMetrics.dewpt,
            clouds: weatherMetrics.clouds,
            vis: weatherMetrics.vis,
            precip: weatherMetrics.precip,
            uv: weatherMetrics.uv,
          }} />
        </div>
        <div className="row">
          <div className="col s12">
            <h4 className="center-align">Recomendaciones ¡Presta atención!</h4>
          </div>
          <WeatherRecommendations metrics={{
            temp: weatherMetrics.temp,
            windSpd: weatherMetrics.windSpd,
            rh: weatherMetrics.rh,
            dewpt: weatherMetrics.dewpt,
            clouds: weatherMetrics.clouds,
            vis: weatherMetrics.vis,
            precip: weatherMetrics.precip,
            uv: weatherMetrics.uv,
          }} />
        </div>
      </>);
  }

  return (
    <>
      <div className="row">
        <button
          className="btn waves-effect waves-light cyan lighten-2 col s12 m4 push-m4"
          onClick={getWeatherHandler}
        >Ver Clima
          <i className="material-icons right">cloud</i>
        </button>
      </div>
      {weatherComponent}
    </>
  );
};

export default WeatherManager;