//Explanation of this code....----->> not fully understood


import { useEffect, useRef, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { MdPinDrop } from "react-icons/md";
import ChooseRide from "./ChooseRide";
import { useDispatch } from "react-redux";
import { endPointSuccess, startPointSuccess } from "../features/counter/mapSlice";
import axios from "axios";
import PickupModal from "./PickupModal";

const RideOptions = () => {
  const [inputValue, setInputValue] = useState(""); // Pickup location
  const [inputValue2, setInputValue2] = useState(""); // DropOff location
  const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
  const [dropOffSuggestions, setDropOffSuggestions] = useState([]);
  const [isRideSelectorOpen, setRideSelectorOpen] = useState(false);
  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDropOff, setLoadingDropOff] = useState(false);
  const [isSelectedPickup, setIsSelectedPickup] = useState(false);  // New flag for pickup
  const [isSelectedDropOff, setIsSelectedDropOff] = useState(false); // New flag for dropoff
  const [isModalOpen, setModalOpen] = useState(false); // Modal open state
  const [pickUpTime, setPickUpTime] = useState();

  const dispatch = useDispatch();
  const MIN_ADDRESS_LENGTH = 3;
  const DEBOUNCE_DELAY = 300;

  const currentTimeoutPickup = useRef(null);
  const currentPromiseRejectPickup = useRef(null);
  const currentTimeoutDropOff = useRef(null);
  const currentPromiseRejectDropOff = useRef(null);

  const apiKey = "d5d444bf7883484ea51a09a789bdb867"; // Replace with your actual Geoapify API key

  // Debounce & Fetch for Pickup Location
  useEffect(() => {
    if (inputValue.length < MIN_ADDRESS_LENGTH || isSelectedPickup) {
      setPickUpSuggestions([]);
      return;
    }

    if (currentTimeoutPickup.current) {
      clearTimeout(currentTimeoutPickup.current);
    }

    if (currentPromiseRejectPickup.current) {
      currentPromiseRejectPickup.current({ canceled: true });
    }

    currentTimeoutPickup.current = setTimeout(() => {
      currentTimeoutPickup.current = null;
      setLoadingPickup(true);

      const promise = new Promise((resolve, reject) => {
        currentPromiseRejectPickup.current = reject;

        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(inputValue)}&format=json&limit=5&apiKey=${apiKey}`;

        fetch(url)
          .then((response) => {
            currentPromiseRejectPickup.current = null;

            if (response.ok) {
              response.json().then((data) => {
                console.log("Pickup location data:", data); // Log the full API response
                resolve(data);
              });
            } else {
              response.json().then((data) => reject(data));
            }
          })
          .catch((err) => reject(err));
      });

      promise
        .then((data) => {
          setLoadingPickup(false);
          setPickUpSuggestions(data.results || []);
        })
        .catch((err) => {
          if (!err.canceled) {
            console.error(err);
            setLoadingPickup(false);
          }
        });
    }, DEBOUNCE_DELAY);
  }, [inputValue, isSelectedPickup]);

  // Debounce & Fetch for DropOff Location
  useEffect(() => {
    if (inputValue2.length < MIN_ADDRESS_LENGTH || isSelectedDropOff) {
      setDropOffSuggestions([]);
      return;
    }

    if (currentTimeoutDropOff.current) {
      clearTimeout(currentTimeoutDropOff.current);
    }

    if (currentPromiseRejectDropOff.current) {
      currentPromiseRejectDropOff.current({ canceled: true });
    }

    currentTimeoutDropOff.current = setTimeout(() => {
      currentTimeoutDropOff.current = null;
      setLoadingDropOff(true);

      const promise = new Promise((resolve, reject) => {
        currentPromiseRejectDropOff.current = reject;

        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(inputValue2)}&format=json&limit=5&apiKey=${apiKey}`;

        fetch(url)
          .then((response) => {
            currentPromiseRejectDropOff.current = null;

            if (response.ok) {
              response.json().then((data) => {
                console.log("Dropoff location data:", data); // Log the full API response
                resolve(data);
              });
            } else {
              response.json().then((data) => reject(data));
            }
          })
          .catch((err) => reject(err));
      });

      promise
        .then((data) => {
          setLoadingDropOff(false);
          setDropOffSuggestions(data.results || []);
        })
        .catch((err) => {
          if (!err.canceled) {
            console.error(err);
            setLoadingDropOff(false);
          }
        });
    }, DEBOUNCE_DELAY);
  }, [inputValue2, isSelectedDropOff]);

  // Open Modal when the Pickup now option is clicked
  const handlePickupNowClick = () => {
    setModalOpen(true);
  };

  // Close Modal
  const handleModalClose = (e) => {
    e.preventDefault();
    setPickUpTime(e.target.value);
    setModalOpen(false);

    console.log(pickUpTime)
  };

  // Handle Pickup Input Change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsSelectedPickup(false);  // Reset flag when typing new input
  };

  // Handle DropOff Input Change
  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
    setIsSelectedDropOff(false);  // Reset flag when typing new input
  };

  // Handle Pickup Suggestion Click
  const handleSuggestionClick = (suggestion) => {
    const formattedAddress =
      suggestion.formatted ||
      `${suggestion.street || ""}, ${suggestion.city || ""}`;
    setInputValue(formattedAddress);
    setPickUpSuggestions([]);
    setIsSelectedPickup(true);  // Set flag to prevent fetching suggestions again
  };

  // Handle DropOff Suggestion Click
  const handleSuggestionClick2 = (suggestion) => {
    const formattedAddress =
      suggestion.formatted ||
      `${suggestion.street || ""}, ${suggestion.city || ""}`;
    setInputValue2(formattedAddress);
    setDropOffSuggestions([]);
    setIsSelectedDropOff(true);  // Set flag to prevent fetching suggestions again
  };

  // Search and set the pickup and drop-off coordinates
  const handleSearchClick = async () => {
    setRideSelectorOpen(true);

    try {
      const pickuplocation = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          inputValue
        )}&format=json&apiKey=${apiKey}`
      );
      const dropofflocation = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          inputValue2
        )}&format=json&apiKey=${apiKey}`
      );

      const longitudeCord = pickuplocation.data.features[0].properties.lon;
      const latitudeCord = pickuplocation.data.features[0].properties.lat;
      const longitudeCord2 = dropofflocation.data.features[0].properties.lon;
      const latitudeCord2 = dropofflocation.data.features[0].properties.lat;

      dispatch(startPointSuccess([longitudeCord, latitudeCord]));
      dispatch(endPointSuccess([longitudeCord2, latitudeCord2]));
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return (
    <div className="h-[357.6px] pt-4 pb-4 w-[346px] bg-white border border-gray-300 rounded-3xl m-auto mr-3 ml-3 shadow-md">
      <div className="font-bold text-xl ml-5 mb-3">Get a ride</div>

      {/* Pickup Input */}
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
          {loadingPickup && <div>Loading...</div>}
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
                  {suggestion.formatted ||
                    `${suggestion.street || ""}, ${
                      suggestion.city || ""
                    }`}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* DropOff Input */}
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
          {loadingDropOff && <div>Loading...</div>}
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
                  {suggestion.formatted ||
                    `${suggestion.street || ""}, ${
                      suggestion.city || ""
                    }`}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mb-4 flex border border-gray-300 bg-[#f8f4f4] rounded-lg w-[300px] ml-5">
        <select
          onClick={handlePickupNowClick} // Open modal on click
          className="w-full bg-[#f8f4f4] rounded-lg p-3 focus:outline-none"
        >
          <option
          value={pickUpTime}
          >Pickup now</option>
        </select>
      </div>

      {/* Button to trigger the ride search */}
      <button
        onClick={handleSearchClick}
        className="w-full bg-black text-white rounded-lg p-2"
      >
        Search
      </button>

      {isRideSelectorOpen && <ChooseRide />}

      {/* Render the modal */}
      <PickupModal isOpen={isModalOpen} onClose={handleModalClose} />

    </div>
  );
};

export default RideOptions;
