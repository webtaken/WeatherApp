import { useState } from "react";
import WeatherHeader from "./WeatherHeader";
import WeatherData from "./WeatherData";
import credentials from "../../Credentials/credentials";
import M from 'materialize-css';

const WeatherManager = (props) => {
  const [weatherHeaderMetrics, setWeatherHeaderMetrics] = useState(null);

  const getWeatherHandler = async () => {
    let lat = props.latLng.lat;
    let lng = props.latLng.lng;
    let url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${credentials.WEATHERBIT_API_KEY}&lang=es`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw Error(response.status);
      }
      console.log(data);
      if (!data || !data.count) {
        M.toast({
          html: 'Ocurrió un error inténtelo más tarde',
          displayLength: 3000,
          classes: 'red'
        });
        return;
      }

      let metrics = data.data[0];
      setWeatherHeaderMetrics(prevMetrics => {
        return {
          cityName: metrics.city_name,
          icon: metrics.weather.icon,
          temp: metrics.temp,
          description: metrics.weather.description
        };
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

  if (weatherHeaderMetrics) {
    weatherComponent = (
      <div className="row">
        <WeatherHeader weatherProps={weatherHeaderMetrics} />
        {/* <WeatherData /> */}
      </div>);
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