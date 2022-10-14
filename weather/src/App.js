import { useState } from 'react';
import './App.css';
// import M from 'materialize-css';
import GeoManager from './components/Geolocalization/GeoManager';
import WeatherManager from './components/Weather/WeatherManager';

function App() {
  const [latLng, setLatLng] = useState({
    lat: -16.39780220442039,
    lng: -71.53694792361391
  });

  const updateLatLngHandler = (lat, lng) => {
    setLatLng({ lat, lng });
  };

  return (
    <div className='container'>
      <GeoManager
        updateCenter={updateLatLngHandler}
        latLng={latLng} />

      <WeatherManager
        latLng={latLng} />
    </div >
  );
}

export default App;
