import React, { useState } from 'react';
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { clearAllCookies } from '../../utils/cookie';

// Define type for Navbar props
type NavbarProps = {
  sidebarToggle: boolean;
  onLogout: () => void; // Moved inside the NavbarProps interface
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarToggle, onLogout, setSidebarToggle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // Call your logout function (replace logout with your actual logout function)
    clearAllCookies();
    onLogout();
    navigate('/login');
  };

  return (
    <div className={`${sidebarToggle ? '' : 'ml-64'} w-full transition-all duration-500 ease-in-out`}>
      <nav className={`bg-gray-800 px-4 py-3 flex justify-between`}>
        <div className='flex items-center text-xl'>
          <FaBars className='text-white me-4 cursor-pointer' onClick={() => setSidebarToggle(!sidebarToggle)} />
          <span className={`${sidebarToggle ? '' : 'hidden md:block'} text-white font-semibold`}>Yaad-E-Madina</span>
        </div>
        <div className='flex items-center gap-x-5'>
          <div className={`${sidebarToggle ? '' : 'hidden md:block'} relative md:w-64 `}>
            <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
              <button className='p-1 focus:outline-none text-white md:text-black'><FaSearch /></button>
            </span>
            <input type="text" className='w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block' />
          </div>

          <div className='text-white'><FaBell className='w-6' h-6 /></div>

          <div className='relative'>
            {/* Button to trigger dropdown */}
            <button className='text-white group' onClick={() => setDropdownOpen(!dropdownOpen)}>
              Log Out
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg'>
                <ul className='py-1'>
                  {/* Add your logout link or button here */}
                  <li><button onClick={handleLogout} className='block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full'>Log Out</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
