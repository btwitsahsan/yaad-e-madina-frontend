import React from "react";


const OtherSettings: React.FC = () => {
    

  return (
    <div className="w-full bg-primary-gray rounded p-4">
     
<form className="space-y-4 mt-5">

<div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-status" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Download
          </label>
          <select
            id="category-status"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          >
            <option value="1">on</option>
            <option value="0">off</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-name" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Pagination Limit
          </label>
          <input
          placeholder="10"
            type="text"
            id="category-name"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          />
        </div>
       
       
   


        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-status" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            App Update Cancel Option
          </label>
          <select
            id="category-status"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          >
            <option value="1">on</option>
            <option value="0">off</option>
          </select>
        </div>


        <div className="flex flex-col gap-1 md:flex-row md:items-center">

          <label className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            
          </label>
          <button
            type="submit"
            className=" hover:bg-secondary-gray bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Save Settings
          </button>
        </div>

      </form>

    </div>
  );
};

export default OtherSettings;
