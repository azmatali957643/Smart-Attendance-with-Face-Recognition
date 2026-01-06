import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    

   
    <nav className="  bg-gray-900 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold tracking-wide">
          <Link to="/"> Smart Attendance </Link>
          
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-base font-medium">
          <li className="hover:text-gray-200 cursor-pointer">
             <Link to="/"> Home</Link> </li>
          <li className="hover:text-gray-200 cursor-pointer">
            <Link to="/admin"> Admin</Link>
            </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden  bg-gray-900 shadow-xl">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li className="hover:text-gray-200 cursor-pointer">Home</li>
            <li className="hover:text-gray-200 cursor-pointer">Admin</li>
          
          </ul>
        </div>
      )}
    </nav>
 
  );
}

export default Nav;

