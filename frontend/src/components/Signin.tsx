import AppleSigninbutton from "../utils/AppleSigninbutton";
import GoogleSigninButton from "../utils/GoogleSigninButton";
import LoginQR from "../utils/LoginwithQr";

function Signin() {
  return (
    <div className="flex mt-28 flex-col gap-2 items-center h-[535.2px] ml-[600px] mr-[600px] justify-center">
      <h1 className="text-2xl">Whats your phone number or email?</h1>
      <input
        type="text"
        placeholder="Enter phone number or email"
        className="bg-gray-100 w-full rounded-lg p-2"
      />
      <button className="bg-black rounded-lg text-white w-full p-1 ">Continue</button>
      <p>-------------------------</p>
      <GoogleSigninButton />
      <AppleSigninbutton/>
      <p>-------------------------</p>
      <LoginQR/>
    </div>
  );
}

export default Signin;
