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
  return <MapContainer center={[props.LatLng.lat, props.LatLng.lng]} zoom={15} scrollWheelZoom={false}>
    <TileLayer
      attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      maxZoom={20}
    />
    <MyMap LatLng={props.LatLng} />
  </MapContainer>
};

export default MapView;