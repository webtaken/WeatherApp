import { useState } from "react";
import credentials from "../../Credentials/credentials";
import GeolocalizationForm from "./GeolocalizationForm";
import MapView from "./MapView";
import M from 'materialize-css';

const GeoManager = (props) => {
  const [placeName, setPlaceName] = useState();

  const validPlaceName = placeName && placeName.trim() !== "";

  const getCurrentLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        props.updateCenter(
          position.coords.latitude,
          position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // Esta función se envía cuando se busca un lugar
  const searchPlaceHandler = async (event) => {
    event.preventDefault();

    let address = encodeURIComponent(placeName.trim());
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${credentials.GEOCODE_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw Error(response.status);
      }
      // igualmente parsearemos el status de nuestros datos, devueltos por google
      if (data.status !== "OK") {
        M.toast({
          html: 'Ocurrió un error',
          displayLength: 3000,
          classes: 'red'
        });
        return;
      }

      // ahora manejamos la respuesta
      let _lat = data.results[0].geometry.location.lat;
      let _lng = data.results[0].geometry.location.lng;

      M.toast({
        html: 'Volando a tu destino',
        displayLength: 3000,
        classes: 'green'
      });

      // ejecutamos esta funcionalidad
      props.updateCenter(_lat, _lng);
    } catch (error) {
      M.toast({
        html: 'Ocurrió un error',
        displayLength: 3000,
        classes: 'red'
      });
    }
  }

  const changePlaceNameHandler = (event) => {
    event.preventDefault();
    setPlaceName(event.target.value);
  };

  return (
    <>
      <GeolocalizationForm
        onChangePlaceName={changePlaceNameHandler}
        onSearch={searchPlaceHandler}
        validPlace={validPlaceName} />
      <div className="row">
        <div className="col s12">
          <MapView LatLng={props.latLng} />
        </div>
      </div>
      <div className="row">
        <button
          className="btn waves-effect purple lighten-1 waves-light col s12 m4 push-m4"
          onClick={getCurrentLocationHandler}
        >Ubicación
          <i className="material-icons right">my_location</i>
        </button>

      </div>
    </>
  );
};

export default GeoManager;