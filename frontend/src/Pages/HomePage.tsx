import { Body } from "../components/Body"
import DriverAd from "../components/Driverad"
import Navbar from "../components/Navbar"
import RentOutCar from "../components/RentCar"
import SuggestionBox from "../components/SuggestionBox"
import UberBusiness from "../components/Uberbussiness"

function HomePage() {
  return (
    <div>
        <div className="bg-black h-screen">
            <Navbar/>
            <Body/>
        </div>
        <SuggestionBox/>
        <DriverAd/>
        <UberBusiness/>
        <RentOutCar/>
    </div>
  )
}

export default HomePage