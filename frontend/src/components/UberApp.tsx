import Header from "./Header";
import RideOptions from "./RideOptions";
import Map from "./Map";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ListofplacesExtracted } from "../features/counter/placeSlice";
import Map2 from "./Map2";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const UberApp = () => {
  const dispatch = useDispatch();
  const success = async (pos) => {
    const crd = pos.coords;
    const nearbyPlaces = await axios.get(
      `https://api.geoapify.com/v2/places?categories=accommodation.hostel&filter=circle:${crd.longitude},${crd.latitude},1000000&limit=10&apiKey=d5d444bf7883484ea51a09a789bdb867`
    );

    const nearbyPlacesInMap: any[] = [];
    nearbyPlaces.data.features.map((item) => {
      nearbyPlacesInMap.push(item.properties.name);
      console.log(item.properties.name);
    });

    dispatch(ListofplacesExtracted(nearbyPlacesInMap));

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <RideOptions />
        <Map2 />
      </div>
    </div>
  );
};

export default UberApp;
