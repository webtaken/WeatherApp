import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Rectangle
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

  map.flyTo({ lat: props.latLng.lat, lng: props.latLng.lng });

  return (
    <Marker position={[props.latLng.lat, props.latLng.lng]}>
      <Popup>
        Tu ubicación actual.
      </Popup>
      {props.bounds && <Rectangle
        bounds={props.bounds}
        pathOptions={{ color: "#84e89f", weight: 1 }}
      />}
    </Marker>
  );
};

const MapView = (props) => {
  let leafletBounds = null;
  if (props.bounds) {
    leafletBounds = [
      [props.bounds.southwest.lat, props.bounds.northeast.lng],
      [props.bounds.northeast.lat, props.bounds.southwest.lng]];
  }

  return <MapContainer center={[props.latLng.lat, props.latLng.lng]} zoom={15} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      maxZoom={20}
    />
    {leafletBounds ? <MyMap latLng={props.latLng} bounds={leafletBounds} /> :
      <MyMap latLng={props.latLng} />}
  </MapContainer>
};

export default MapView;