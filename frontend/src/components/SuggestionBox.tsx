
function SuggestionBox() {
  return (
    <div className="flex flex-col gap-4 m-5 ml-20 mt-28 items-center">
        <p className="font-bold text-3xl font-mono ">Suggestions</p>
        <div className="flex gap-4">
            <div className="bg-[#f2f2f3] pb-3 pl-3 pr-3 pt-2 rounded-lg w-[368.26px] h-[160px]">
                <p>Ride</p>
                <div className="flex items-center">
                    <p className="text-sm">Go anywhere with Uber. Request a ride, hop in, and go.</p>
                    <img src="car.png"/>
                </div>
                <button className="bg-white text-black rounded-full p-1 pl-2 pr-2">Details</button>
            </div>
            <div className="bg-[#f2f2f3] pb-3 pl-3 pr-3 pt-2 rounded-lg w-[368.26px] h-[160px]">
                <p>Ride</p>
                <div className="flex items-center">
                    <p className="text-sm">Go anywhere with Uber. Request a ride, hop in, and go.</p>
                    <img src="car.png"/>
                </div>
                <button className="bg-white text-black rounded-full p-1 pl-2 pr-2">Details</button>
            </div>
            <div className="bg-[#f2f2f3] pb-3 pl-3 pr-3 pt-2 rounded-lg w-[368.26px] h-[160px]">
                <p>Ride</p>
                <div className="flex items-center">
                    <p className="text-sm">Go anywhere with Uber. Request a ride, hop in, and go.</p>
                    <img src="car.png"/>
                </div>
                <button className="bg-white text-black rounded-full p-1 pl-2 pr-2">Details</button>
            </div>
        </div>
    </div>
  )
}

export default SuggestionBox