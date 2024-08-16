
const UberBusiness = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-white">
      <div className="md:w-1/2 ml-20 mb-8 md:mb-0">
        <h1 className="text-4xl font-bold mb-4">The Uber you know, reimagined for business</h1>
        <p className="text-lg mb-6">Uber for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.</p>
        <div className="flex space-x-4">
          <button className="bg-black text-white py-2 px-4 rounded">Get started</button>
          <a href="#" className="text-blue-600">Check out our solutions</a>
        </div>
      </div>
      <div className="md:w-1/2">
        <img src="uberBus.png" alt="Uber for Business" className="w-[530.8px] h-auto" />
      </div>
    </div>
  );
}

export default UberBusiness;
