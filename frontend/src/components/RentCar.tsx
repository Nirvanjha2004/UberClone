

const RentOutCar = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-white">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <img src="RentCar.png" alt="Make money by renting out your car" className="w-[530.8px] ml-20 h-auto" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">Make money by renting out your car</h1>
        <p className="text-lg mb-6">Connect with thousands of drivers and earn more per week with Uber’s free fleet management tools.</p>
        <button className="bg-black text-white py-2 px-4 rounded">Get started</button>
      </div>
    </div>
  );
}

export default RentOutCar;

