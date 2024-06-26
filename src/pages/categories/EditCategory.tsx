import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getAlbumById, updateAlbum } from "../../network/api";
import Modal from "../../components/Modal";

const EditAlbum: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [albumName, setAlbumName] = useState("");
  const [albumImage, setAlbumImage] = useState<File | null>(null);
  const [albumImageUrl, setAlbumImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState("active");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string }>({
    title: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const data = await getAlbumById(id!);
        setAlbumName(data.name);
        setAlbumImageUrl(data.image);
        setStatus(data.status);
      } catch (error) {
        console.error("Failed to fetch album", error);
        setModalContent({ title: 'Error', message: 'Failed to fetch album' });
        setModalVisible(true);
      }
    };
    fetchAlbum();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous route
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAlbumImage(e.target.files[0]);
      setAlbumImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = albumImageUrl;

    if (albumImage) {
      const formData = new FormData();
      formData.append("file", albumImage);
      formData.append("upload_preset", "ubfgufcm"); // Replace with your Cloudinary upload preset

      setIsLoading(true); // Set loading state to true

      try {
        // Upload image to Cloudinary
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dvew55mcu/image/upload", // Replace with your Cloudinary cloud name
          formData
        );
        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error(error);
        setModalContent({ title: 'Error', message: 'Error while uploading image' });
        setModalVisible(true);
        setIsLoading(false); // Reset loading state
        return;
      }
    }

    // Send form data to backend
    const albumData = {
      name: albumName,
      image: imageUrl,
      status: status,
    };

    try {
      const response = await updateAlbum(id!, albumData);
      if (response.success) {
        setModalContent({
          title: "Update Successful",
          message: "Your Album Has Been Updated Successfully",
        });
        setModalVisible(true);
      } else {
        setModalContent({
          title: "Failed",
          message: "Your Album Has Not Been Updated",
        });
        setModalVisible(true);
      }
    } catch (error) {
      console.error(error);
      setModalContent({ title: 'Error', message: 'Error while updating album' });
      setModalVisible(true);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigate("/albums");
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
            htmlFor="album-name"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Album Name
          </label>
          <input
            type="text"
            id="album-name"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="album-image"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Album Image
          </label>
          <div className="w-full md:w-2/3 flex items-center">
            <input
              type="file"
              id="album-image"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="album-image"
              className="w-full flex justify-between items-center pl-2 min-h-10 bg-gray-700 rounded cursor-pointer"
            >
              <span className="text-gray-400 overflow-hidden break-words">
                {albumImage ? albumImage.name : albumImageUrl ? "No file chosen" : "Loading..."}
              </span>
              <span className="flex items-center bg-gray-600 min-h-10 hover:bg-gray-700 text-white px-4 rounded">
                Select
              </span>
            </label>
          </div>
        </div>
        {albumImageUrl && (
          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <label className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"></label>
            <div className="w-full md:w-2/3 flex items-center">
              <div className="flex items-center mt-2">
                <img
                  src={albumImageUrl}
                  alt="Album Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="album-status"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Status
          </label>
          <select
            id="album-status"
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
          <button
            type="submit"
            className="hover:bg-secondary-gray bg-red-600 text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update'}
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

export default EditAlbum;
