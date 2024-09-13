import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SigninPage from "./Pages/SigninPage";
import UberAppPage from "./Pages/UberAppPage";
import { Provider } from "react-redux";
import store from "./app/store";
function App() {
  return (
    <Provider store={store}> 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signin" element={<SigninPage/>}/>
        <Route path="/uber" element={<UberAppPage/>}/>

      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
