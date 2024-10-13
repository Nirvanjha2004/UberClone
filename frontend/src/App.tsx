import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SigninPage from "./Pages/SigninPage";
import UberAppPage from "./Pages/UberAppPage";
import { Provider } from "react-redux";
import store from "./app/store";
import AddressAutocomplete from "./components/SuggestionsForAddress";
function App() {
  const handleAddressSelect = (address) => {
    console.log("Selected address:", address);
  };
  return (
    <Provider store={store}> 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signin" element={<SigninPage/>}/>
        <Route path="/uber" element={<UberAppPage/>}/>
        <Route path="/test" element={<AddressAutocomplete onSelect={handleAddressSelect}/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
