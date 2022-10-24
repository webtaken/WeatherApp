import { useState } from 'react';
import './App.css';
import LogoApp from './assets/imgs/headerLogo.svg';
// import M from 'materialize-css';
import GeoManager from './components/Geolocalization/GeoManager';
import WeatherManager from './components/Weather/WeatherManager';

function App() {
  const [latLng, setLatLng] = useState({
    lat: -16.39780220442039,
    lng: -71.53694792361391
  });

  const updateLatLngHandler = (_lat, _lng) => {
    setLatLng({ lat: _lat, lng: _lng });
  };

  return (
    <div className='container'>
      <div className='row'>
        <img src={LogoApp} alt="Weathlify"
          style={{
            "display": "block",
            "marginLeft": "auto",
            "marginRight": "auto"
          }} />
      </div>
      <div className='row container'>
        <ul className='collection'>
          <li className='collection-item'>Busca un lugar del mundo 🌎 o selecciona tu ubicación.</li>
          <li className='collection-item'>Dale clic en "VER CLIMA" ⛅</li>
          <li className='collection-item'>Desplázate hacia abajo para ver las recomendaciones 🎫.</li>
        </ul>
      </div>
      <GeoManager
        updateCenter={updateLatLngHandler}
        latLng={latLng} />

      <WeatherManager
        latLng={latLng} />
    </div >
  );
}

export default App;
