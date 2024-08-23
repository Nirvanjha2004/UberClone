
const PaymentOptions = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-96 p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Payment options</h2>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4 cursor-pointer">
            <div className="flex items-center">
              <img src="/path/to/cash-icon.png" alt="Cash" className="w-6 h-6 mr-2" />
              <span>Cash</span>
            </div>
            <input type="radio" name="payment-method" className="form-radio" checked />
          </div>
          
          <div className="flex items-center justify-between mb-4 cursor-pointer">
            <div className="flex items-center">
              <img src="/path/to/upi-icon.png" alt="UPI" className="w-6 h-6 mr-2" />
              <span>UPI</span>
            </div>
            <input type="radio" name="payment-method" className="form-radio" disabled />
          </div>

          <div className="flex items-center cursor-pointer text-blue-500">
            <span className="text-lg">+</span>
            <span className="ml-2">Add Payment Method</span>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-black text-white rounded-lg py-2"
        >
          Save
        </button>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
