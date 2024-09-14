import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const MapWithRoute = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const pickUpselector = useSelector((state: RootState) => state.map);
  const dropOffSelector = useSelector((state: RootState) => state.map);

  console.log(pickUpselector);
  console.log(dropOffSelector);
  // Function to fetch the exact path from OSRM API
  const getRoute = async () => {
    const start = [25.5941, 85.1376]; // Starting point
    const end = [13.0827, 80.2707];   // End point

    const response = await fetch(
      `http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
    );
    const data = await response.json();

    // Extract route geometry and set it to state
    const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]); // Flip lat/lon
    setRouteCoordinates(coordinates);
  };

  useEffect(() => {
    getRoute();  // Fetch route on component mount
  }, []);

  useEffect(() => {
    if (routeCoordinates.length === 0) return; // Wait until routeCoordinates are available

    const map = L.map("map").setView([25.5941, 85.1376], 13); // Set initial view to the starting point

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a polyline for the route once the coordinates are available
    L.polyline(routeCoordinates, {
      color: "blue",
      smoothFactor: 1, // Optional: adjusts the smoothness of the line
    }).addTo(map);

    L.marker([25.5941, 85.1376]).addTo(map);

    L.marker([13.0827, 80.2707]).addTo(map);

    // Clean up map on unmount
    return () => {
      map.remove();
    };
  }, [routeCoordinates]); // Re-run when routeCoordinates change

  return (
    <div
      id="map"
      style={{ height: "88.2vh", width: "100%" }} // Ensure the map is visible
    ></div>
  );
};

export default MapWithRoute;
