import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function HospitalMap() {
  const [position, setPosition] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  // 1. Get user location
 const handleLocateMe = () => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    },
    (err) => console.error("Location error:", err)
  );
};


  // 2. Fetch hospitals after we have location
  useEffect(() => {
    if (!position) return;

    const [lat, lon] = position;

    const query = `
      [out:json];
      node["amenity"="hospital"](around:5000, ${lat}, ${lon});
      out;
    `;

    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data.elements.map((h) => ({
          id: h.id,
          name: h.tags.name || "Unnamed Hospital",
          lat: h.lat,
          lon: h.lon,
        }));
        setHospitals(results);
      });
  }, [position]);

  // 3. Distance function
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) ** 2 +
      Math.cos(lat1 * Math.PI/180) *
      Math.cos(lat2 * Math.PI/180) *
      Math.sin(dLon/2) ** 2;

    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(1);
  }

  if (!position) return <p>Getting your location…</p>;

  return (
    <MapContainer center={position} zoom={14} style={{ height: "100vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* User marker */}
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Hospital markers */}
      {hospitals.map((hospital) => (
        <Marker key={hospital.id} position={[hospital.lat, hospital.lon]}>
          <Popup>
            <strong>{hospital.name}</strong><br />
            Distance: {getDistance(position[0], position[1], hospital.lat, hospital.lon)} km
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
