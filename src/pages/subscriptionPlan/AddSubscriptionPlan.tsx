import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const AddSubscriptionPlan: React.FC = () => {
    const navigate = useNavigate();


    const handleBackClick = () => {
        navigate(-1); // Navigate back to the previous route
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
           Plan Name*
          </label>
          <input
            type="text"
            id="category-name"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          />
        </div>
       
        
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-name" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
           Duration*
          </label>
          <div className="w-full md:w-2/3 flex gap-3">
          <input
          placeholder="7"
            type="number"
            id="category-name"
            className="w-full p-2 rounded bg-gray-700 text-white h-11"
          />
          <select
            id="category-status"
            className="w-full p-2 rounded bg-gray-700 text-white h-11"
          >
            <option value="days">Day's</option>
            <option value="months">Month's</option>
            <option value="years">Year's</option>
          </select>
          </div>
        </div>



       
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-name" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
           Price*
          </label>
          <div className="w-full md:w-2/3 flex flex-col text-sm">
          <input
            placeholder="9.99"
            type="text"
            id="category-name"
            className=" p-2 rounded bg-gray-700 text-white h-11"
          />
          <span className="text-gray-500">The minimum amount for processing a transaction through Stripe in USD is $0.50. For more info <a className="text-blue-500 hover:text-blue-600" href="https://support.chargebee.com/support/solutions/articles/228511-transaction-amount-limit-in-stripe" target="_blank">click here</a></span>
          </div>
        </div>
        
        
        
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-name" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
           Device Limit*
          </label>
          <input
            placeholder="1"
            type="number"
            id="category-name"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          />
        </div>



        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-status" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
             Ads
          </label>
          <select
            id="category-status"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          >
            <option value="1">ON</option>
            <option value="0">OFF</option>
          </select>
        </div>
        
        
        
        
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-status" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
             Download
          </label>
          <select
            id="category-status"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          >
            <option value="1">ON</option>
            <option value="0">OFF</option>
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

export default AddSubscriptionPlan;
