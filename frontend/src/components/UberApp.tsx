
import Header from './Header';
import RideOptions from './RideOptions';
import Map from './Map';
import { useEffect } from 'react';
import axios from 'axios';


const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const UberApp = () => {



    const success=async (pos)=> {
    const crd = pos.coords;
    const nearbyPlaces = await axios.get(`https://api.geoapify.com/v2/places?categories=accommodation.hostel&filter=circle:${crd.longitude},${crd.latitude},1000000&limit=10&apiKey=e00a1974db4145608ffe08644c5ccd42`)
    
    nearbyPlaces.data.features.map((item)=>{
      console.log(item.properties.name); 
    })
    
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(()=>{
   navigator.geolocation.getCurrentPosition(success, error, options);
  },[]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <RideOptions />
          <Map />
      </div>
    </div>
  );
};

export default UberApp;
