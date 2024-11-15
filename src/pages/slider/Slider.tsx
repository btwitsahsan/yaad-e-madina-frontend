import React, { useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Slider: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  
  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const addSliderHandler=()=>{
    navigate('/addslider');
  }

  const items = Array.from(Array(10).keys());

  return (
    <div className="w-full bg-primary-gray rounded p-4">
      <div className="flex justify-start items-center">
        <button className="bg-green-600 text-white rounded p-2 font-semibold"
        onClick={()=> addSliderHandler()}>
          + Add Slider
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 pt-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col w-full md:w-[50%] lg:w-[40%] bg-secondary-gray rounded-lg overflow-hidden"
          >
            <div className="w-full">
              <img
                className="w-full h-64"
                src="https://c.saavncdn.com/029/Balaghal-Ula-Bi-Kamaalihi-Urdu-2021-20220220044441-500x500.jpg"
                alt="demo"
              />
            </div>
            <div className="flex flex-col gap-3 w-full p-4">
              <div>
                <span className="text-white text-xl font-semibold tracking-wider">
                  Title
                </span>
              </div>
              <div className="flex justify-between ">
                <div>
                  <button className="rounded-full bg-green-600 text-white p-2">
                    <FaEdit />
                  </button>
                  <button className="rounded-full bg-red-600 text-white p-2 ml-1">
                    <MdDelete />
                  </button>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="hidden"
                    id="toggleSwitch"
                    checked={checked}
                    onChange={toggleSwitch}
                  />
                  <label
                    htmlFor="toggleSwitch"
                    className={`w-12 h-6 bg-gray-400 rounded-full cursor-pointer ${
                      checked ? "bg-green-500" : ""
                    }`}
                  >
                    <span
                      className={`inline-block w-6 h-6 bg-white rounded-full transform transition-transform ${
                        checked ? "translate-x-6" : ""
                      }`}
                    />
                  </label>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
