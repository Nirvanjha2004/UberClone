import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SigninPage from "./Pages/SigninPage";
import UberAppPage from "./Pages/UberAppPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signin" element={<SigninPage/>}/>
        <Route path="/uber" element={<UberAppPage/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
