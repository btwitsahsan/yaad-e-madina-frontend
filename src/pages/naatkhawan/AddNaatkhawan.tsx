import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader"; // Import Loader
import { CreateNaatKhawan } from "../../network/api"; // Import the API function
import Modal from "../../components/Modal";

const AddNaatKhawan: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // Loader state
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string }>({
    title: "",
    message: ""
  });

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous route
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setModalContent({ title: 'Error', message: 'Please select an image' });
      setModalVisible(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ubfgufcm'); // Replace with your Cloudinary upload preset

    setLoading(true); // Show loader

    try {
      // Upload image to Cloudinary
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dvew55mcu/image/upload', // Replace with your Cloudinary cloud name
        formData
      );
      const imageUrl = res.data.secure_url;

      // Send form data to backend
      const naatKhawanData = {
        name: name,
        image: imageUrl,
      };

      const resp = await CreateNaatKhawan(naatKhawanData);

      if (resp.success) {
        setModalContent({
          title: "Create Successful",
          message: "Your Naat Khawan Has Been Created Successfully",
        });
        setModalVisible(true);
      } else {
        setModalContent({
          title: "Failed",
          message: "Your Naat Khawan Has Not Been Created",
        });
        setModalVisible(true);
      }
    } catch (err) {
      console.error(err);
      setModalContent({ title: 'Error', message: 'Error while adding Naat Khawan' });
      setModalVisible(true);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalContent.title === "Create Successful") {
      navigate("/naat-khawan"); // Adjust the route as necessary
    }
  };

  return (
    <div className="w-full bg-primary-gray rounded p-4">
      <div className="flex justify-start items-center">
        <button
          className="flex items-center gap-2 text-red-600 text-xl rounded p-2 font-bold"
          onClick={handleBackClick}
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="naatkhawan-name" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            Naat Khawan Name
          </label>
          <input
            type="text"
            id="naatkhawan-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="naatkhawan-image" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            Naat Khawan Image
          </label>
          <div className="w-full md:w-2/3 flex items-center">
            <input
              type="file"
              id="naatkhawan-image"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="naatkhawan-image"
              className="w-full flex justify-between items-center pl-2 min-h-10 bg-gray-700 rounded cursor-pointer"
            >
              <span className="text-gray-400 overflow-hidden break-words">{image ? image.name : "No file chosen"}</span>
              <span className="flex items-center bg-gray-600 min-h-10 hover:bg-gray-700 text-white px-4 rounded">
                Select
              </span>
            </label>
          </div>
        </div>


        {image && (
          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <label className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"></label>
            <div className="w-full md:w-2/3 flex items-center">
              <div className="flex items-center mt-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Category Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"></label>
          <button
            type="submit"
            className="hover:bg-secondary-gray bg-red-600 text-white font-bold py-2 px-4 rounded"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>

      {loading && <Loader />} {/* Show loader */}

      {modalVisible && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          onClose={closeModal}
          onConfirm={closeModal}
        />
      )}
    </div>
  );
};

export default AddNaatKhawan;
