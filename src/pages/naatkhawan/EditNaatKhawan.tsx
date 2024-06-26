import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { updateNaatKhawan, getNaatKhawanById } from "../../network/api"; 
import Modal from "../../components/Modal";

const EditNaatKhawan: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [naatKhawanName, setNaatKhawanName] = useState("");
  const [naatKhawanImage, setNaatKhawanImage] = useState<File | null>(null);
  const [naatKhawanImageUrl, setNaatKhawanImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loader state
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string }>({
    title: "",
    message: ""
  });

  useEffect(() => {
    const fetchNaatKhawan = async () => {
      try {
        const data = await getNaatKhawanById(id!);
        setNaatKhawanName(data.name);
        setNaatKhawanImageUrl(data.image);
      } catch (error) {
        console.error("Failed to fetch NaatKhawan", error);
        setModalContent({ title: "Error", message: "Failed to fetch NaatKhawan" });
        setModalVisible(true);
      }
    };
    fetchNaatKhawan();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous route
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNaatKhawanImage(e.target.files[0]);
      setNaatKhawanImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = naatKhawanImageUrl;

    if (naatKhawanImage) {
      const formData = new FormData();
      formData.append("file", naatKhawanImage);
      formData.append("upload_preset", "ubfgufcm"); // Replace with your Cloudinary upload preset

      try {
        setLoading(true); // Show loader

        // Upload image to Cloudinary
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dvew55mcu/image/upload", // Replace with your Cloudinary cloud name
          formData
        );
        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error(error);
        setModalContent({ title: "Error", message: "Error while uploading image" });
        setModalVisible(true);
        setLoading(false); // Hide loader
        return;
      }
    }

    // Send form data to backend
    const naatKhawanData = {
      name: naatKhawanName,
      image: imageUrl
    };

    try {
      const response = await updateNaatKhawan(id!, naatKhawanData);
      if (response.success) {
        setModalContent({
          title: "Update Successful",
          message: "Your NaatKhawan Has Been Updated Successfully"
        });
        setModalVisible(true);
        navigate("/naat-khawan");
      } else {
        setModalContent({
          title: "Failed",
          message: "Your NaatKhawan Has Not Been Updated"
        });
        setModalVisible(true);
      }
    } catch (error) {
      console.error(error);
      setModalContent({ title: "Error", message: "Error while updating NaatKhawan" });
      setModalVisible(true);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalContent.title === "Update Successful") {
      navigate("/naatkhawan");
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
          <label
            htmlFor="naatkhawan-name"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Naat Khawan Name
          </label>
          <input
            type="text"
            id="naatkhawan-name"
            value={naatKhawanName}
            onChange={(e) => setNaatKhawanName(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="naatkhawan-image"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
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
              <span className="text-gray-400 overflow-hidden break-words">
                {naatKhawanImage ? naatKhawanImage.name : naatKhawanImageUrl ? "No file chosen" : "Loading..."}
              </span>
              <span className="flex items-center bg-gray-600 min-h-10 hover:bg-gray-700 text-white px-4 rounded">
                Select
              </span>
            </label>
          </div>
        </div>
        {naatKhawanImageUrl && (
          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <label className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"></label>
            <div className="w-full md:w-2/3 flex items-center">
              <div className="flex items-center mt-2">
                <img
                  src={naatKhawanImageUrl}
                  alt="Naat Khawan Preview"
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
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
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

export default EditNaatKhawan;
