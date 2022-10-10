import { useState } from "react";
import GeolocalizationForm from "./GeolocalizationForm";
import MapView from "./MapView";


const GeoManager = () => {
  const [latLng, setLatLng] = useState({
    lat: 51.505,
    lng: -0.09
  });

  const getCurrentLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <GeolocalizationForm />
      <div className="row">
        <div className="col s12">
          <MapView LatLng={latLng} />
        </div>
      </div>
      <div className="row">
        <div className="col s4 offset-s4">
          <button
            className="btn waves-effect waves-light"
            onClick={getCurrentLocationHandler}
          >Mi Ubicación
            <i className="material-icons right">my_location</i>
          </button>
        </div>
      </div>
    </>
  );
};

export default GeoManager;