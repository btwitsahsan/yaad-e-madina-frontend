import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const naatkhawanOptions = [
  { value: "naatkhawan1", label: "NaatKhawan 1" },
  { value: "naatkhawan2", label: "NaatKhawan 2" },
  { value: "naatkhawan3", label: "NaatKhawan 3" },
];

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#374151", // Tailwind class bg-gray-700
    borderColor: "#4A5568", // Tailwind class bg-gray-700
    height: "44px",
    color: "white",
    "&:hover": {
      borderColor: "#2D3748", // Tailwind class hover:bg-gray-800
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#4A5568", // Tailwind class bg-gray-700
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#2D3748"
      : state.isFocused
      ? "#2D3748"
      : "#4A5568", // Tailwind class bg-gray-800 for selected and focused
    color: "white",
    "&:hover": {
      backgroundColor: "#B91C1C", // Tailwind class hover:bg-red-600
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#B91C1C", // Tailwind class bg-red-600
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "white",
    "&:hover": {
      backgroundColor: "#b70b0b", // Tailwind class hover:bg-red-900
      color: "white",
    },
  }),
};

const AddPage: React.FC = () => {
  const navigate = useNavigate();
  const [Description, setDescription] = useState("");

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous route
  };

  const handleDescriptionChange = (content:any) => {
    setDescription(content);
  };

  return (
    <div className="w-full bg-gray-800 rounded p-4">
      <div className="flex justify-start items-center">
        <button
          className="flex items-center gap-2 text-red-600 text-xl rounded p-2 font-bold"
          onClick={handleBackClick}
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <form className="space-y-4 mt-5">
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="category-name"
            className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold"
          >
            Title*
          </label>
          <input
            type="text"
            id="category-name"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          />
        </div>


        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="category-name"
            className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold"
          >
            Description
          </label>
          <div className="w-full md:w-2/3">
          <ReactQuill
            value={Description}
            onChange={handleDescriptionChange}
            className=" bg-white text-black rounded"
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link', 'image'],
                ['clean']
              ],
            }}
            formats={[
              'header', 'font', 'list', 'bullet',
              'bold', 'italic', 'underline', 'strike',
              'color', 'background', 'align',
              'link', 'image'
            ]}
          />
          </div>
        </div>



        
        
        
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="category-name"
            className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold"
          >
            Page Order
          </label>
          <input
            type="number"
            id="category-name"
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          />
        </div>

        
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="category-status"
            className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold"
          >
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
          <label className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold"></label>
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

export default AddPage;
