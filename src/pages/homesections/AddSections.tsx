import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';



const naatsOptions = [
  { value: 'naat1', label: 'Naat 1' },
  { value: 'naat2', label: 'Naat 2' },
  { value: 'naat3', label: 'Naat 3' },

];


const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#374151', // Tailwind class bg-gray-700
    borderColor: '#4A5568', // Tailwind class bg-gray-700
    height: '44px',
    color: 'white',
    '&:hover': {
      borderColor: '#2D3748', // Tailwind class hover:bg-primary-gray
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#4A5568', // Tailwind class bg-gray-700
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2D3748' : state.isFocused ? '#2D3748' : '#4A5568', // Tailwind class bg-primary-gray for selected and focused
    color: 'white',
    '&:hover': {
      backgroundColor: '#B91C1C', // Tailwind class hover:bg-red-600
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#B91C1C', // Tailwind class bg-red-600
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: 'white',
    '&:hover': {
      backgroundColor: '#b70b0b', // Tailwind class hover:bg-red-900
      color: 'white',
    },
  }),
};


const AddSections: React.FC = () => {
    const navigate = useNavigate();
    const [selectedNaat, setSelectedNaat] = useState([]);

    const handleBackClick = () => {
        navigate(-1); // Navigate back to the previous route
      }; 

      const handleNaatsChange = (selectedOptions: any) => {
        setSelectedNaat(selectedOptions);
      };

  return (
    <div className="w-full bg-primary-gray rounded p-4">
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
          <label htmlFor="category-name" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
          Section Title
          </label>
          <input
            type="text"
            id="category-name"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          />
        </div>


        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-status" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            Type
          </label>
          <select
            id="category-status"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          >
            <option value="categories">Categories</option>
            <option value="artists">Artists</option>
            <option value="album">Album</option>
            <option value="naats">Naats</option>
            <option value="playlist">Playlist</option>
          </select>
        </div>



        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-naats" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            Select Naats
          </label>
          <div className="w-full md:w-2/3">
            <Select
              id="category-naats"
              options={naatsOptions}
              isMulti
              onChange={handleNaatsChange}
              styles={customStyles}
              classNamePrefix="react-select"
            />
          </div>
        </div>




        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-status" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            Select Status:
          </label>
          <select
            id="category-status"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>


        <div className="flex flex-col gap-1 md:flex-row md:items-center">

          <label className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            
          </label>
          <button
            type="submit"
            className=" hover:bg-secondary-gray bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>

      </form>

    </div>
  );
};

export default AddSections;
