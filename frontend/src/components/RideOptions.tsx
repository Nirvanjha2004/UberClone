import { useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { MdPinDrop } from "react-icons/md";
import ChooseRide from "./ChooseRide";
import { useDispatch, useSelector } from "react-redux";
import { endPointSuccess, startPointSuccess } from "../features/counter/mapSlice";
import axios from "axios";
const RideOptions = () => {
  const [isRideSelectorOpen, setRideSelectorOpen] = useState(false);
  const places = useSelector((state: any) => state.place);
  if (places.len != 0) {
    console.log(places);
  }


  const dispatch = useDispatch();


  //inputValue --> pickup Location
  //inputValue2 --> dropOff Location
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
  const [dropOffSuggestions, setDropOffSuggestions] = useState([]);

  // const [pickup, setPickup] = useState([]);
  // const [dropOff, setDropOff] = useState([]);

  const encodedFromAddress = encodeURIComponent(inputValue); //ye to ek pickup location ho gya jiska ek lat aur ek long niklega
  const encodedToAddress = encodeURIComponent(inputValue2); // aur iske do alag ek lat aur long niklega

  const handleSearchClick =async () => {
    setRideSelectorOpen(true);
    const pickuplocation= await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodedFromAddress}&format=json&apiKey=d5d444bf7883484ea51a09a789bdb867`);
    const dropofflocation = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodedToAddress}&format=json&apiKey=d5d444bf7883484ea51a09a789bdb867`);
    
    const longitudeCord = pickuplocation.data.features[0].properties.lon;
    const latitudeCord = pickuplocation.data.features[0].properties.lat;

    const longitudeCord2 = dropofflocation.data.features[0].properties.lon;
    const latitudeCord2 = dropofflocation.data.features[0].properties.lat;

    // setPickup([longitudeCord,latitudeCord]);
    // setDropOff([longitudeCord2,latitudeCord2]);
    console.log(longitudeCord,latitudeCord);

    dispatch(startPointSuccess([longitudeCord,latitudeCord]));
    dispatch(endPointSuccess([longitudeCord2,latitudeCord2]));
    
    
  };
  
  console.log(inputValue, inputValue2);
  // Filter suggestions based on input value
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch(startPointSuccess(value));

    if (value.length > 0) {
      const filteredSuggestions = places.currentPlace.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      );
      setPickUpSuggestions(filteredSuggestions);
    } else {
      setPickUpSuggestions([]);
    }
  };

  const handleInputChange2 = (e) => {
    const value = e.target.value;
    setInputValue2(value);
    dispatch(endPointSuccess(value));
    if (value.length > 0) {
      const filteredSuggestions = places.currentPlace.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      );
      setDropOffSuggestions(filteredSuggestions);
    } else {
      setDropOffSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion); // Set the clicked suggestion as the input value
    setPickUpSuggestions([]); // Clear the suggestions
  };
  const handleSuggestionClick2 = (suggestion) => {
    setInputValue2(suggestion); // Set the clicked suggestion as the input value
    setDropOffSuggestions([]); // Clear the suggestions
  };
  return (
    <div className="h-[357.6px] pt-4 pb-4 w-[346px] bg-white border border-gray-300 rounded-3xl m-auto mr-3 ml-3 shadow-md">
      <div className="font-bold text-xl ml-5 mb-3">Get a ride</div>
      <div className="mb-4 flex border border-gray-300 bg-[#f8f4f4] rounded-lg w-[300px] ml-5">
        <FaDotCircle className="size-4 mt-4 ml-2" />
        <div style={{ position: "relative", width: "200px" }}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px" }}
            className="w-full bg-[#f8f4f4] rounded-lg pt-3 pb-3 pl-[12px] pr-[16px] focus:outline-none"
            placeholder="Pickup location"
          />
          {pickUpSuggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "40px",
                left: "0",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                listStyleType: "none",
                padding: "0",
                margin: "0",
                zIndex: "1000",
              }}
            >
              {pickUpSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mb-4 flex border border-gray-300 bg-[#f8f4f4] rounded-lg w-[300px] ml-5">
        <MdPinDrop className="size-4 mt-4 ml-2" />
        <div style={{ position: "relative", width: "200px" }}>
          <input
            type="text"
            value={inputValue2}
            onChange={handleInputChange2}
            style={{ width: "100%", padding: "8px" }}
            className="w-full bg-[#f8f4f4] rounded-lg pt-3 pb-3 pl-[12px] pr-[16px] focus:outline-none"
            placeholder="DropOff location"
          />
          {dropOffSuggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "40px",
                left: "0",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                listStyleType: "none",
                padding: "0",
                margin: "0",
                zIndex: "1000",
              }}
            >
              {dropOffSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick2(suggestion)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mb-4 flex border border-gray-300 bg-[#f8f4f4] rounded-lg w-[300px] ml-5">
        <select className="w-full bg-[#f8f4f4] rounded-lg p-3 focus:outline-none">
          <option>Pickup now</option>
          {/* Add more options here */}
        </select>
      </div>

      <div className="mb-4 flex border border-gray-300 bg-[#f8f4f4] rounded-full w-[100px] ml-5">
        <select className="w-full bg-[#f8f4f4] rounded-full p-1 focus:outline-none">
          <option>For me</option>
          {/* Add more options here */}
        </select>
      </div>

      <button
        onClick={handleSearchClick}
        className="w-full bg-black text-white rounded-lg p-2 "
      >
        Search
      </button>

      {isRideSelectorOpen && <ChooseRide />}
    </div>
  );
};

export default RideOptions;
