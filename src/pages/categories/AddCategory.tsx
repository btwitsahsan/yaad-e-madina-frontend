import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreateCategory } from '../../network/api';
import swal from 'sweetalert';

const AddCategory: React.FC = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [status, setStatus] = useState('active');

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous route
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCategoryImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryImage) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append('file', categoryImage);
    formData.append('upload_preset', 'ubfgufcm'); // Replace with your Cloudinary upload preset

    try {
      // Upload image to Cloudinary
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dvew55mcu/image/upload', // Replace with your Cloudinary cloud name
        formData
      );
      const imageUrl = res.data.secure_url;

      // Send form data to backend
      const categoryData = {
        name: categoryName,
        image: imageUrl,
        status: status
      };

        const resp = await CreateCategory(categoryData);
  
        if (resp.success) {
          swal({
            title: "Create Successful",
            text: "You Category Has Been Created Successfully",
            icon: "success",
          });
          navigate("/categories");
        } else {
          swal({
            title: "Failed",
            text: "You Category Has Not Been Created",
            icon: "error",
          });
        }    
  }
     catch (err) {
      console.error(err);
      alert("Error while adding category");
    }
  };

  return (
    <div className="w-full bg-gray-800 rounded p-4">
      <div className="flex justify-start items-center">
        <button className="flex items-center gap-2 text-red-600 text-xl rounded p-2 font-bold" onClick={handleBackClick}>
          <FaArrowLeft /> Back
        </button>
      </div>

      <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-name" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Category Name
          </label>
          <input
            type="text"
            id="category-name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-image" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Category Image
          </label>
          <div className="w-full md:w-2/3 flex items-center">
            <input
              type="file"
              id="category-image"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="category-image"
              className="w-full flex justify-between items-center pl-2 h-11 bg-gray-700 rounded cursor-pointer"
            >
              <span className="text-gray-400">{categoryImage ? categoryImage.name : "No file chosen"}</span>
              <span className="flex items-center bg-gray-600 h-11 hover:bg-gray-700 text-white px-4 rounded">
                Select
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-status" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Status
          </label>
          <select
            id="category-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white h-11"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold"></label>
          <button type="submit" className="hover:bg-red-700 bg-red-600 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
