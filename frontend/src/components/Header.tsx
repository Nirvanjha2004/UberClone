import { FaCar } from "react-icons/fa";
import { MdOutlineRestaurant } from "react-icons/md";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-2 flex border-b-4 justify-between items-center">
      <div className="flex gap-24">
        <div className="text-3xl font-semibold ml-16">Uber</div>
        <nav className="flex gap-7 mt-3">
          <div className="flex gap-1">
            <FaCar className="size-4 mt-1"/>
            <a href="#" className="text-gray-700 text-[16px] hover:text-black font-semibold">Ride</a>
          </div>
          <div className="flex gap-1">
            <MdOutlineRestaurant className="size-4 mt-1"/>
            <a href="#" className="text-gray-700 text-[16px] hover:text-black font-semibold">Eat</a>
          </div>
        </nav>
      </div>
      <div className="space-x-4">
        <a href="#" className="text-gray-700 text-[16px] font-semibold hover:text-black">My trips</a>
        <a href="#" className="text-gray-700 text-[16px] font-semibold hover:text-black">Profile</a>
      </div>
    </header>
  );
};

export default Header;
