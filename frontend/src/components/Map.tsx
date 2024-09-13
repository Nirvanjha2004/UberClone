import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Popup,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapWithRoute = () => {

  // Example coordinates for the route (you can fetch or calculate these)
  const exampleRoute = [
    [48.137154, 11.576124], // Munich start
    [48.135124, 11.581244], // Midpoint
    [48.131654, 11.589874], // Another point
    [48.128154, 11.590124], // Munich end
  ];

  // Simulating an API call to fetch route coordinates
  useEffect(() => {
    setRouteCoordinates(exampleRoute); // Set route once fetched
  }, []);

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // Function to fetch the exact path from OSRM API
  const getRoute = async () => {
    const start = [48.137154, 11.576124]; // Starting point (Munich example)
    const end = [48.128154, 11.590124];   // End point (Munich example)

    const response = await fetch(
      `http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
    );
    const data = await response.json();

    // Extract route geometry and set it to state
    const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]); // Flip lat/lon
    console.log(coordinates)
    setRouteCoordinates(coordinates);
  };

  useEffect(() => {
    getRoute();  // Fetch route on component mount
  })
  return (
    <MapContainer
      center={[48.137154, 11.576124]}
      zoom={13}
      style={{ height: "88.2vh", width: "100%" }}
    >
      {/* OpenStreetMap Layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Polyline to display the route */}
      {routeCoordinates.length > 0 && (
        <Polyline positions={routeCoordinates} color="blue" />
      )}
    </MapContainer>
  );
};

export default MapWithRoute;
