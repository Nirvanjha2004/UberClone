import React, { useState, useEffect, useRef } from "react";

const AddressAutocomplete = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const MIN_ADDRESS_LENGTH = 3;
  const DEBOUNCE_DELAY = 300;

  const currentTimeout = useRef(null);
  const currentPromiseReject = useRef(null);

  useEffect(() => {
    if (inputValue.length < MIN_ADDRESS_LENGTH) {
      setSuggestions([]);
      return;
    }

    // Clear the timeout for the previous API request
    if (currentTimeout.current) {
      clearTimeout(currentTimeout.current);
    }

    // Cancel the previous promise
    if (currentPromiseReject.current) {
      currentPromiseReject.current({ canceled: true });
    }

    // Set a new timeout for the API call
    currentTimeout.current = setTimeout(() => {
      currentTimeout.current = null;
      setLoading(true);

      // Create a new promise to fetch suggestions
      const promise = new Promise((resolve, reject) => {
        currentPromiseReject.current = reject;

        const apiKey = "d5d444bf7883484ea51a09a789bdb867";
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(inputValue)}&format=json&limit=5&apiKey=${apiKey}`;

        fetch(url)
          .then((response) => {
            currentPromiseReject.current = null;

            if (response.ok) {
              response.json().then((data) => resolve(data));
            } else {
              response.json().then((data) => reject(data));
            }
          })
          .catch((err) => reject(err));
      });

      promise
        .then((data) => {
          setLoading(false);
          setSuggestions(data.results || []);
        })
        .catch((err) => {
          if (!err.canceled) {
            console.error(err);
            setLoading(false);
          }
        });
    }, DEBOUNCE_DELAY);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectSuggestion = (suggestion) => {
    setInputValue(suggestion.formatted);
    setSuggestions([]);
    if (onSelect) {
      onSelect(suggestion);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter address"
      />
      {loading && <div>Loading...</div>}
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
            {suggestion.formatted}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressAutocomplete;
