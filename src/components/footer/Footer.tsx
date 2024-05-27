import React from 'react'
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom';
 
// Define type for Dashboard props
 type FooterProps = {
    sidebarToggle: boolean;
    setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
  }


  const Footer: React.FC<FooterProps> = ({ sidebarToggle, setSidebarToggle}) => {
  return (
    <div className={`${sidebarToggle ? '' : 'md:ml-64'} transition-all duration-500 ease-in-out mt-10`}>
    <div className={` px-4 py-5 mt-8 flex justify-between border-t-2 border-gray-600 text-sm`}>
       <div className='w-40 hidden md:block'>
      
       </div>
       <p className='text-[#98a6ad]'>
       Copyright © 2024 <a className='text-blue-500 hover:text-blue-600' href='#'>Viaviweb.com</a>. All Rights Reserved.
       </p>
       <p className='text-[#98a6ad] md:mr-10'>
       Powered By <a className='text-blue-500 hover:text-blue-600' href='https://zaynosoft.com/' target='_blank'>ZaynoSoft</a>
       </p>
       
    </div>
    </div>
  )
}

export default Footer