import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreateCategory } from '../../network/api';
import Modal from '../../components/Modal';

const AddCategory: React.FC = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [status, setStatus] = useState('active');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', success: true });
  const [isLoading, setIsLoading] = useState(false);  // Loading state

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
      alert('Please select an image');
      return;
    }

    setIsLoading(true);  // Set loading state to true

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
        setModalContent({ title: 'Create Successful', message: 'Your Category Has Been Created Successfully', success: true });
        setModalVisible(true);
      } else {
        setModalContent({ title: 'Failed', message: 'Your Category Has Not Been Created', success: false });
        setModalVisible(true);
      }
    } catch (err) {
      console.error(err);
      setModalContent({ title: 'Error', message: 'Error while adding category', success: false });
      setModalVisible(true);
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const confirmModal = () => {
    setModalVisible(false);
    if (modalContent.success) {
      navigate('/categories');
    }
  };

  return (
    <div className="w-full bg-primary-gray rounded p-4">
      <div className="flex justify-start items-center">
        <button className="flex items-center gap-2 text-red-600 text-xl rounded p-2 font-bold" onClick={handleBackClick}>
          <FaArrowLeft /> Back
        </button>
      </div>

      <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-name" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            Category Name
          </label>
          <input
            type="text"
            id="category-name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-image" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
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
              className="w-full flex justify-between items-center pl-2 min-h-10 bg-gray-700 rounded cursor-pointer"
            >
              <span className="text-gray-400 overflow-hidden break-words">{categoryImage ? categoryImage.name : 'No file chosen'}</span>
              <span className="flex items-center bg-gray-600 min-h-10 hover:bg-gray-700 text-white px-4 rounded">
                Select
              </span>
            </label>
          </div>
        </div>

        {categoryImage && (
          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <label className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"></label>
            <div className="w-full md:w-2/3 flex items-center">
              <div className="flex items-center mt-2">
                <img
                  src={URL.createObjectURL(categoryImage)}
                  alt="Category Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="category-status" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            Status
          </label>
          <select
            id="category-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"></label>
          <button type="submit" className="hover:bg-secondary-gray bg-red-600 text-white font-bold py-2 px-4 rounded" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>

      {modalVisible && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          onClose={closeModal}
          onConfirm={confirmModal}
        />
      )}
    </div>
  );
};

export default AddCategory;
