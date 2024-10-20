import React, { useEffect, useState } from "react";
import logoimg from './logo.png';
import { MdLibraryMusic, MdOutlineCategory } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { BiPhotoAlbum } from "react-icons/bi";
import { AiFillDashboard } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { IoIosArrowDown, IoIosChatboxes, IoIosSend } from "react-icons/io";
import { RiPagesFill, RiSignalTowerFill } from "react-icons/ri";
import { BsFillSignIntersectionSideFill } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { IoSettings } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { Scrollbar } from 'react-scrollbars-custom';
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
        sidebarToggle ? "-translate-x-64" : ""} w-64 h-screen fixed bg-primary-gray py-2 transition-all duration-500 ease-in-out`}
    >
      <div className="my-1 mb-4 flex justify-center items-center gap-3">
      <img src={logoimg} alt="logo png" width="40px"/>
        <h1 className="text-2xl text-white font-bold">Dashboard</h1>
      </div>
      <hr />
      <div className="bg-black pt-3 h-full pb-14" >
      <Scrollbar autoHide >
        <ul className=" text-white font-semibold text-sm flex flex-col">
          <Link to="/" className="mb-1 p-0">
            <li
              className={` rounded hover:shadow bg-primary-gray hover:text-red-600 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "dashboard" ? "bg-primary-red hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("dashboard")}
            >
              <AiFillDashboard className="inline-block w-5 h-5 mr-2 -mt-1 "></AiFillDashboard>
              Dashboard
            </li>
          </Link>
          <Link to="/categories" className="mb-1 p-0">
            <li
              className={` rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "categories" ? "bg-primary-red hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("categories")}
            >
              <MdOutlineCategory className="inline-block w-5 h-5 mr-2 -mt-1"></MdOutlineCategory>
              Categories
            </li>
          </Link>
          <Link to="/naat-khawan" className="mb-1 p-0">
            <li
              className={` rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "naatkhawan" ? "bg-primary-red hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("naatkhawan")}
            >
              <PiUsersThreeFill className="inline-block w-5 h-5 mr-2 -mt-1"></PiUsersThreeFill>
              Naat Khawan
            </li>
          </Link>
          <Link to="/album" className="mb-1 p-0">
            <li
              className={`rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "album" ? "bg-primary-red hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("album")}
            >
              <BiPhotoAlbum className="inline-block w-5 h-5 mr-2 -mt-1"></BiPhotoAlbum>
              Album
            </li>
          </Link>





          <Link to="/audios" className="mb-1 p-0">
            <li
              className={`rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "audios" ? "bg-primary-red hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("audios")}
            >
              <MdLibraryMusic className="inline-block w-5 h-5 mr-2 -mt-1"></MdLibraryMusic>
              Audios
            </li>
          </Link>
        
        
        
        
          <Link to="/playlist" className="mb-1 p-0">
            <li
              className={`rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "playlist" ? "bg-primary-red hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("playlist")}
            >
              <FaListUl className="inline-block w-5 h-5 mr-2 -mt-1"></FaListUl>
              Playlist
            </li>
          </Link>




          <li
            className={`mb-1 rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
              activeItem === "home" ? "bg-primary-red hover:text-white" : ""
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
              <Link to="/slider" className="mb-1 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "slider" ? "bg-primary-red hover:text-white" : ""
                  }`}
                  onClick={() => handleItemClick("slider")}
                >
                  <FaSlidersH className="inline-block w-5 h-5 mr-2 -mt-1"></FaSlidersH>
                  Slider
                </li>
              </Link>
              <Link to="/homesections" className="mb-1 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "homesections"
                      ? "bg-primary-red hover:text-white"
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
            className={`mb-1 rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
              activeItem === "users" ? "bg-primary-red hover:text-white" : ""
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
              <Link to="/users" className="mb-1 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "user" ? "bg-primary-red hover:text-white" : ""
                  }`}
                  onClick={() => handleItemClick("user")}
                >
                  <FaUsers className="inline-block w-5 h-5 mr-2 -mt-1"></FaUsers>
                  Users
                </li>
              </Link>
              <Link to="/subadmin" className="mb-1 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "subadmin"
                      ? "bg-primary-red hover:text-white"
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



          
          <Link to="/subscription-plans" className="mb-1 p-0">
            <li
              className={`rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "subscriptionplan"
                  ? "bg-primary-red hover:text-white"
                  : ""
              }`}
              onClick={() => handleItemClick("subscriptionplan")}
            >
              <FaDollarSign className="inline-block w-5 h-5 mr-2 -mt-1"></FaDollarSign>
              Subcription Plan
            </li>
          </Link>
          <Link to="/transactions" className="mb-1 p-0">
            <li
              className={`rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "transactions"
                  ? "bg-primary-red hover:text-white"
                  : ""
              }`}
              onClick={() => handleItemClick("transactions")}
            >
              <GrTransaction className="inline-block w-5 h-5 mr-2 -mt-1"></GrTransaction>
              Transactions
            </li>
          </Link>
          <Link to="/suggestions" className="mb-1 p-0">
            <li
              className={`rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "suggestions"
                  ? "bg-primary-red hover:text-white"
                  : ""
              }`}
              onClick={() => handleItemClick("suggestions")}
            >
              <IoIosChatboxes className="inline-block w-5 h-5 mr-2 -mt-1"></IoIosChatboxes>
              Suggestions
            </li>
          </Link>
          {/* <Link to="/Reports" className="mb-1 p-0">
            <li
              className={`rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "reports" ? "bg-primary-red hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("reports")}
            >
              <MdBugReport className="inline-block w-5 h-5 mr-2 -mt-1"></MdBugReport>
              Reports
            </li>
          </Link> */}
          <Link to="/pages" className="mb-1 p-0">
            <li
              className={`rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "pages" ? "bg-primary-red hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("pages")}
            >
              <RiPagesFill className="inline-block w-5 h-5 mr-2 -mt-1"></RiPagesFill>
              Pages
            </li>
          </Link>
          
          
          
          <Link to="/notifications" className="mb-1 p-0">
            <li
              className={`rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "notifications" ? "bg-primary-red hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("notifications")}
            >
              <IoIosSend className="inline-block w-5 h-5 mr-2 -mt-1"></IoIosSend>
              Notifications Send
            </li>
          </Link>





          <li
            className={`mb-1 rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
              activeItem === "settings" ? "bg-primary-red hover:text-white" : ""
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
              {/* <Link to="/general" className="mb-1 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "general" ? "bg-primary-red hover:text-white" : ""
                  }`}
                  onClick={() => handleItemClick("general")}
                >
                  <MdOutlineSettingsApplications className="inline-block w-5 h-5 mr-2 -mt-1"></MdOutlineSettingsApplications>
                  General
                </li>
              </Link>
              <Link to="/smtpemail" className="mb-1 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "smtpemail"
                      ? "bg-primary-red hover:text-white"
                      : ""
                  }`}
                  onClick={() => handleItemClick("smtpemail")}
                >
                  <MdEmail className="inline-block w-5 h-5 mr-2 -mt-1"></MdEmail>
                  SMTP Email
                </li>
              </Link> */}
              <Link to="/onesignalnotification" className="mb-1 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "onesignalnotification"
                      ? "bg-primary-red hover:text-white"
                      : ""
                  }`}
                  onClick={() => handleItemClick("onesignalnotification")}
                >
                  <RiSignalTowerFill className="inline-block w-5 h-5 mr-2 -mt-1"></RiSignalTowerFill>
                  OneSignal Notification
                </li>
              </Link>
              <Link to="/appupdatepopup" className="mb-1 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "appupdatepopup"
                      ? "bg-primary-red hover:text-white"
                      : ""
                  }`}
                  onClick={() => handleItemClick("appupdatepopup")}
                >
                  <FaEdit className="inline-block w-5 h-5 mr-2 -mt-1"></FaEdit>
                  App Update Popup
                </li>
              </Link>
              <Link to="/othersettings" className="mb-1 p-0">
                <li
                  className={`rounded hover:shadow hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                    activeItem === "othersettings"
                      ? "bg-primary-red hover:text-white"
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




{/* <Link to="/appverify" className="mb-1 p-0">
            <li
              className={`rounded hover:shadow bg-primary-gray hover:text-red-700 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
                activeItem === "appverify" ? "bg-primary-red hover:text-white" : ""
              }`}
              onClick={() => handleItemClick("appverify")}
            >
              <BiPhotoAlbum className="inline-block w-5 h-5 mr-2 -mt-1"></BiPhotoAlbum>
              App Verify
            </li>
          </Link> */}
        </ul>
        </Scrollbar>
      </div>
    </div>
  );
};

export default Sidebar;
