import React, { useEffect, useState } from "react";
import { MdBugReport, MdEmail, MdLibraryMusic, MdOutlineCategory, MdOutlineSettingsApplications } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { BiPhotoAlbum } from "react-icons/bi";
import { AiFillDashboard } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { IoIosArrowDown, IoIosChatboxes } from "react-icons/io";
import { RiPagesFill, RiSignalTowerFill } from "react-icons/ri";
import { BsFillSignIntersectionSideFill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { IoSettings } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import { FaDollarSign, FaEdit, FaHome, FaListUl, FaSlidersH, FaUsers } from "react-icons/fa";

type SidebarProps = {
  sidebarToggle: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarToggle }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>("dashboard");

  useEffect(() => {
    const pathname = location.pathname;
    // Extract the active item from the pathname
    const activeItemFromPath = pathname.split("/")[1];
    setActiveItem(activeItemFromPath || "dashboard");
  }, [location.pathname]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  const toggleDropdown = (dropdownNumber: number) => {
    setShowDropdown(dropdownNumber === 1 ? !showDropdown : false);
    setShowDropdown2(dropdownNumber === 2 ? !showDropdown2 : false);
    setShowDropdown3(dropdownNumber === 3 ? !showDropdown3 : false);
  };

  return (
    <div
      className={`${
        sidebarToggle ? "-translate-x-64" : ""} w-64 h-full fixed bg-gray-800 py-2 transition-all duration-500 ease-in-out`}
    >
      <div className="my-2 mb-4">
        <h1 className="text-2x text-white font-bold">Admin Dashboard</h1>
      </div>
      <hr />
      <div className="bg-black py-[0.4rem] h-[580px]" >
      <Scrollbars autoHide >
        <ul className="mt-3 text-white font-semibold flex flex-col gap-1">
          <Link to="/" className="m-0 p-0">
            <li
              className={` rounded hover:shadow bg-gray-800 hover:text-red-600 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "dashboard" ? "bg-red-600 hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("dashboard")}
            >
              <AiFillDashboard className="inline-block w-5 h-5 mr-2 -mt-1 "></AiFillDashboard>
              Dashboard
            </li>
          </Link>
          <Link to="/categories" className="m-0 p-0">
            <li
              className={` rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "categories" ? "bg-red-600 hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("categories")}
            >
              <MdOutlineCategory className="inline-block w-5 h-5 mr-2 -mt-1"></MdOutlineCategory>
              Categories
            </li>
          </Link>
          <Link to="/naatkhawan" className="m-0 p-0">
            <li
              className={` rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "naatkhawan" ? "bg-red-600 hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("naatkhawan")}
            >
              <PiUsersThreeFill className="inline-block w-5 h-5 mr-2 -mt-1"></PiUsersThreeFill>
              Naat Khawan
            </li>
          </Link>
          <Link to="/album" className="m-0 p-0">
            <li
              className={`rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "album" ? "bg-red-600 hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("album")}
            >
              <BiPhotoAlbum className="inline-block w-5 h-5 mr-2 -mt-1"></BiPhotoAlbum>
              Album
            </li>
          </Link>





          <Link to="/audios" className="m-0 p-0">
            <li
              className={`rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "audios" ? "bg-red-600 hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("audios")}
            >
              <MdLibraryMusic className="inline-block w-5 h-5 mr-2 -mt-1"></MdLibraryMusic>
              Audios
            </li>
          </Link>
        
        
        
        
          <Link to="/playlist" className="m-0 p-0">
            <li
              className={`rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "playlist" ? "bg-red-600 hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("playlist")}
            >
              <FaListUl className="inline-block w-5 h-5 mr-2 -mt-1"></FaListUl>
              Playlist
            </li>
          </Link>




          <li
            className={` rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
              activeItem === "home" ? "bg-red-600 hover:text-white" : ""
            }`}
            onClick={() => {
              handleItemClick("home");
              toggleDropdown(1);
            }}
          >
            <div className="flex items-center">
              <FaHome className="inline-block w-5 h-5 mr-2 -mt-1"></FaHome>
              <span>Home</span>
              <button
                className="ml-auto text-white focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(1);
                }}
              >
                <IoIosArrowDown />
              </button>
            </div>
          </li>
          {showDropdown && (
            <ul className="pl-4 mt-2 ">
              <Link to="/slider" className="m-0 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "slider" ? "bg-red-600 hover:text-white" : ""
                  }`}
                  onClick={() => handleItemClick("slider")}
                >
                  <FaSlidersH className="inline-block w-5 h-5 mr-2 -mt-1"></FaSlidersH>
                  Slider
                </li>
              </Link>
              <Link to="/homesections" className="m-0 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "homesections"
                      ? "bg-red-600 hover:text-white"
                      : ""
                  }`}
                  onClick={() => handleItemClick("homesections")}
                >
                  <BsFillSignIntersectionSideFill className="inline-block w-5 h-5 mr-2 -mt-1"></BsFillSignIntersectionSideFill>
                  Home Sections
                </li>
              </Link>
            </ul>
          )}





          <li
            className={` rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
              activeItem === "users" ? "bg-red-600 hover:text-white" : ""
            }`}
            onClick={() => {
              handleItemClick("users");
              toggleDropdown(2);
            }}
          >
            <div className="flex items-center">
              <FaUsers className="inline-block w-5 h-5 mr-2 -mt-1"></FaUsers>
              <span>Users</span>
              <button
                className="ml-auto text-white focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(2);
                }}
              >
                <IoIosArrowDown />
              </button>
            </div>
          </li>
          {showDropdown2 && (
            <ul className="pl-4 mt-2 ">
              <Link to="/users" className="m-0 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "user" ? "bg-red-600 hover:text-white" : ""
                  }`}
                  onClick={() => handleItemClick("user")}
                >
                  <FaUsers className="inline-block w-5 h-5 mr-2 -mt-1"></FaUsers>
                  Users
                </li>
              </Link>
              <Link to="/subadmin" className="m-0 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "subadmin"
                      ? "bg-red-600 hover:text-white"
                      : ""
                  }`}
                  onClick={() => handleItemClick("subadmin")}
                >
                  <FaUsers className="inline-block w-5 h-5 mr-2 -mt-1"></FaUsers>
                  Sub Admin
                </li>
              </Link>
            </ul>
          )}



          
          <Link to="/subscriptionplan" className="m-0 p-0">
            <li
              className={`rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "subscriptionplan"
                  ? "bg-red-600 hover:text-white"
                  : ""
              }`}
              onClick={() => handleItemClick("subscriptionplan")}
            >
              <FaDollarSign className="inline-block w-5 h-5 mr-2 -mt-1"></FaDollarSign>
              Subcription Plan
            </li>
          </Link>
          <Link to="/transactions" className="m-0 p-0">
            <li
              className={`rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "transactions"
                  ? "bg-red-600 hover:text-white"
                  : ""
              }`}
              onClick={() => handleItemClick("transactions")}
            >
              <GrTransaction className="inline-block w-5 h-5 mr-2 -mt-1"></GrTransaction>
              Transactions
            </li>
          </Link>
          <Link to="/suggestions" className="m-0 p-0">
            <li
              className={`rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "suggestions"
                  ? "bg-red-600 hover:text-white"
                  : ""
              }`}
              onClick={() => handleItemClick("suggestions")}
            >
              <IoIosChatboxes className="inline-block w-5 h-5 mr-2 -mt-1"></IoIosChatboxes>
              Suggestions
            </li>
          </Link>
          {/* <Link to="/Reports" className="m-0 p-0">
            <li
              className={`rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "reports" ? "bg-red-600 hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("reports")}
            >
              <MdBugReport className="inline-block w-5 h-5 mr-2 -mt-1"></MdBugReport>
              Reports
            </li>
          </Link> */}
          <Link to="/pages" className="m-0 p-0">
            <li
              className={`rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "pages" ? "bg-red-600 hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("pages")}
            >
              <RiPagesFill className="inline-block w-5 h-5 mr-2 -mt-1"></RiPagesFill>
              Pages
            </li>
          </Link>





          <li
            className={` rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
              activeItem === "settings" ? "bg-red-600 hover:text-white" : ""
            }`}
            onClick={() => {
              handleItemClick("settings");
              toggleDropdown(3);
            }}
          >
            <div className="flex items-center">
              <IoSettings className="inline-block w-5 h-5 mr-2 -mt-1"></IoSettings>
              <span>Settings</span>
              <button
                className="ml-auto text-white focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(3);
                }}
              >
                <IoIosArrowDown />
              </button>
            </div>
          </li>
          {showDropdown3 && (
            <ul className="pl-4 mt-2 mb-2 ">
              {/* <Link to="/general" className="m-0 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "general" ? "bg-red-600 hover:text-white" : ""
                  }`}
                  onClick={() => handleItemClick("general")}
                >
                  <MdOutlineSettingsApplications className="inline-block w-5 h-5 mr-2 -mt-1"></MdOutlineSettingsApplications>
                  General
                </li>
              </Link>
              <Link to="/smtpemail" className="m-0 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "smtpemail"
                      ? "bg-red-600 hover:text-white"
                      : ""
                  }`}
                  onClick={() => handleItemClick("smtpemail")}
                >
                  <MdEmail className="inline-block w-5 h-5 mr-2 -mt-1"></MdEmail>
                  SMTP Email
                </li>
              </Link> */}
              <Link to="/onesignalnotification" className="m-0 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "onesignalnotification"
                      ? "bg-red-600 hover:text-white"
                      : ""
                  }`}
                  onClick={() => handleItemClick("onesignalnotification")}
                >
                  <RiSignalTowerFill className="inline-block w-5 h-5 mr-2 -mt-1"></RiSignalTowerFill>
                  OneSignal Notification
                </li>
              </Link>
              <Link to="/appupdatepopup" className="m-0 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "appupdatepopup"
                      ? "bg-red-600 hover:text-white"
                      : ""
                  }`}
                  onClick={() => handleItemClick("appupdatepopup")}
                >
                  <FaEdit className="inline-block w-5 h-5 mr-2 -mt-1"></FaEdit>
                  App Update Popup
                </li>
              </Link>
              <Link to="/othersettings" className="m-0 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "othersettings"
                      ? "bg-red-600 hover:text-white"
                      : ""
                  }`}
                  onClick={() => handleItemClick("othersettings")}
                >
                  <CiSettings className="inline-block w-5 h-5 mr-2 -mt-1"></CiSettings>
                  Other Settings
                </li>
              </Link>
            </ul>
          )}




{/* <Link to="/appverify" className="m-0 p-0">
            <li
              className={`rounded hover:shadow bg-gray-800 hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "appverify" ? "bg-red-600 hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("appverify")}
            >
              <BiPhotoAlbum className="inline-block w-5 h-5 mr-2 -mt-1"></BiPhotoAlbum>
              App Verify
            </li>
          </Link> */}
        </ul>
        </Scrollbars>
      </div>
    </div>
  );
};

export default Sidebar;
