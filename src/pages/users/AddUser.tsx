import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const AddUser: React.FC = () => {
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('No file chosen');


    const handleBackClick = () => {
        navigate(-1); // Navigate back to the previous route
      }; 

      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setFileName(file.name);
        } else {
          setFileName('No file chosen');
        }
      };



  return (
    <div className="w-full bg-gray-800 rounded p-4">
      <div className="flex justify-start items-center">
        
        <button className="flex items-center gap-2 text-red-600 text-xl rounded p-2 font-bold"
        onClick={handleBackClick}
        >
        <FaArrowLeft /> Back
        </button>
      </div>

      {/* <div className="flex flex-wrap gap-2 pt-3">
      
      </div> */}

<form className="space-y-4 mt-5">

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-name" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
           Name
          </label>
          <input
            type="text"
            id="category-name"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          />
        </div>
       
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-name" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
           Email
          </label>
          <input
            type="email"
            id="category-name"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          />
        </div>
       
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-name" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
           Password
          </label>
          <input
            type="password"
            id="category-name"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          />
        </div>
        
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-name" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
           Phone
          </label>
          <input
            type="number"
            id="category-name"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          />
        </div>



        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-image" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
          Image
          </label>
          <div className="w-full md:w-2/3 flex items-center">
            <input
              type="file"
              id="category-image"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="category-image"
              className="w-full flex justify-between items-center pl-2 h-11 bg-gray-700 rounded cursor-pointer"
            >
              <span className="text-gray-400">No file chosen</span>
              <span className="flex items-center bg-gray-600 h-11 hover:bg-gray-700 text-white px-4 rounded">
                Select
              </span>
            </label>
          </div>
            {/* <span>Recommended resolution : 300x300,400x400 or Square Image</span> */}
        </div>



        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-name" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
           Expiry Date
          </label>
          <input
            type="date"
            id="category-name"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          />
        </div>



        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-status" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Subscription Plan
          </label>
          <select
            id="category-status"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          >
            <option value="subadmin">Basic Plan</option>
            <option value="masteradmin">Download Plan</option>
            <option value="masteradmin">Premium Plan</option>
            <option value="masteradmin">Platinum Plan</option>
          </select>
        </div>
        
        
        
        
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-status" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Status
          </label>
          <select
            id="category-status"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>


        <div className="flex flex-col gap-1 md:flex-row md:items-center">

          <label className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            
          </label>
          <button
            type="submit"
            className=" hover:bg-red-700 bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>

      </form>

    </div>
  );
};

export default AddUser;
