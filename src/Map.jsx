import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

navigator.geolocation.getCurrentPosition(
  (position)=> {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);
  },
  (error) => {
    console.error("Location error", error);
  }
  );

<MapContainer center={[lat, lon]} zoom={14} style={{ height: "100vh" }}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[lat, lon]} />
</MapContainer>

const query = `
[out:json];
node
  ["amenity"="hospital"]
  (around:5000, ${lat}, ${lon});
out;
`;

fetch("https://overpass-api.de/api/interpreter", {
  method: "POST",
  body: query
})
.then(res => res.json())
.then(data => console.log(data.elements));

<Marker position={[hospital.lat, hospital.lon]} />

<MapContainer center={[lat, lon]} zoom={14} style={{ height: "400px" }}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
</MapContainer>

<Marker position={[hospital.lat, hospital.lng]}>
  <Popup>{hospital.name}</Popup>
</Marker

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) *
    Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(1);
}

const distance = getDistance(lat, lon, hospital.lat, hospital.lng);
