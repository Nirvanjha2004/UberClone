import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { useEffect, useRef } from 'react';



const MapFunction = () => {
  const ref = useRef(false);
  useEffect(()=>{
    if(ref.current == false){
      const newmap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 2
        })
      });
      ref.current = true;

    }
  })
  return (
    <div className="flex-grow p-4 ">
      <div className="w-full h-full ">
        <div id='map' className="text-center text-gray-700"  style={{ width: '100%', height: '88.2vh', border: '4px', borderRadius: '100px'}}></div>
      </div>
    </div>
  );
};

export default MapFunction;

//The map isn't getting displayed without the style attribute because OpenLayers requires the map container (div with id map) to have explicit dimensions to render correctly. If the dimensions are not defined, the container might have a height of 0, making the map invisible.