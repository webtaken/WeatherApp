import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MyMap = (props) => {
  const map = useMap();

  map.flyTo({ lat: props.LatLng.lat, lng: props.LatLng.lng });

  return (
    <Marker position={[props.LatLng.lat, props.LatLng.lng]}>
      <Popup>
        Tu ubicación actual.
      </Popup>
    </Marker>
  );
};

const MapView = (props) => {
  return <MapContainer center={[51.505, -0.09]} zoom={15} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MyMap LatLng={props.LatLng} />
  </MapContainer>
};

export default MapView;