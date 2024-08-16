
const DriverAd = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full md:w-1/2 p-4">
        <img
          src="DriverAd.png" 
          alt="Driver in car"
          className="w-[530.8px] h-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-4xl font-bold mb-4">Drive when you want, make what you need</h1>
        <p className="text-gray-700 mb-6">
          Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental
          through Uber.
        </p>
        <div className="flex space-x-4">
          <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">Get started</button>
          <button className="text-gray-700 underline hover:text-gray-900">Already have an account? Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default DriverAd;
