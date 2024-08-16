import { FaDotCircle } from "react-icons/fa";
const RideOptions = () => {
  return (
    <div className="h-[357.6px] pt-4 pb-4 w-[346px] bg-white border border-gray-300 rounded-3xl m-auto mr-3 ml-3 shadow-md">
      <div className="font-bold text-xl ml-5 mb-3">Get a ride</div>
      <div className="mb-4 flex bg-[#f8f4f4] rounded-lg w-[300px] ml-5">
        <FaDotCircle className="size-4 mt-4 ml-2 "/>
        <input type="text" className="w-full border-gray-300 bg-[#f8f4f4] rounded-lg pt-3 pb-3 pl-[12px] pr-[16px]" placeholder="Pickup location" />
      </div>
      <div className="mb-4 flex bg-[#f8f4f4] rounded-lg w-[300px] ml-5">
        <input type="text" className="w-full border-gray-300 bg-[#f8f4f4] rounded-lg p-3" placeholder="Dropoff location" />
      </div>
      <div className="mb-4 flex bg-[#f8f4f4] rounded-lg w-[300px] ml-5">
        <select className="w-full border-gray-300 bg-[#f8f4f4] rounded-lg p-3">
          <option>Pickup now</option>
          {/* Add more options here */}
        </select>
      </div>
      <div className="mb-4 flex bg-[#f8f4f4] rounded-full w-[100px] ml-5">
        <select className="w-[100px] border-gray-300 bg-[#f8f4f4] rounded-full p-2">
          <option>For me</option>
          {/* Add more options here */}
        </select>
      </div>
      <button className="w-full bg-black text-white rounded-lg p-2 ">Search</button>
    </div>
  );
};

export default RideOptions;
