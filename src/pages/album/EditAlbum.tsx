import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { getAlbumById, getNaatKhawans, updateAlbum } from "../../network/api";
import { customStyles2 } from "../../components/MultiSelectStyle";
import Modal from "../../components/Modal";

const EditAlbum: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [albumName, setAlbumName] = useState("");
  const [albumImage, setAlbumImage] = useState<File | null>(null); // Change type to string | null
  const [status, setStatus] = useState("active");
  const [naatKhawans, setNaatKhawans] = useState([]);
  const [selectedNaatKhawan, setSelectedNaatKhawan] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', success: true });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const albumData = await getAlbumById(id);
        setAlbumName(albumData.name);
        setStatus(albumData.status);
        // Set the album image URL from the database
        setAlbumImage(albumData.image); // Assuming albumData.image is the URL from database
        // Pre-select the Naat Khawan
        const selectedNK = {
          value: albumData.naatKhawan.value,
          label: albumData.naatKhawan.name,
        };
        setSelectedNaatKhawan(selectedNK);
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };
    fetchAlbumData();
  }, [id]);

  useEffect(() => {
    const fetchNaatKhawans = async () => {
      try {
        // Fetch Naat Khawans from your API
        const fetchedNaatKhawans = await getNaatKhawans();
        // Map the fetched Naat Khawans to the format expected by react-select
        const mappedNaatKhawans = fetchedNaatKhawans.map((naatKhawan: any) => ({
          value: naatKhawan.id,
          label: naatKhawan.name,
        }));
        // Set the mapped Naat Khawans to the state
        setNaatKhawans(mappedNaatKhawans);
      } catch (error) {
        console.error("Error fetching Naat Khawans:", error);
      }
    };
    fetchNaatKhawans();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAlbumImage(e.target.files[0]); // Update albumImage with local file URL
    }
  };

  const handleNaatKhawanChange = (selectedOption: any) => {
    setSelectedNaatKhawan(selectedOption);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedNaatKhawan) {
      alert("Please select a Naat Khawan");
      return;
    }

    let imageUrl = albumImage; // Default to current albumImage URL

    if (albumImage) {
      const formData = new FormData();
      formData.append("file", albumImage);
      formData.append("upload_preset", "ubfgufcm");

      try {
        setLoading(true);
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dvew55mcu/image/upload",
          formData
        );
        imageUrl = res.data.secure_url;
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Error uploading image");
        setLoading(false);
        return;
      }
    }

    try {
      const albumData = {
        name: albumName,
        naatKhawan: { value: selectedNaatKhawan.value, label: selectedNaatKhawan.label },
        image: imageUrl,
        status: status,
      };

      await updateAlbum(id, albumData);
      setModalContent({ title: 'Update Successful', message: 'Your Album Has Been Updated Successfully', success: true });
    } catch (err) {
      console.error("Error while updating album:", err);
      alert("Error while updating album");
      setModalContent({ title: 'Failed', message: 'Your Album Has Not Been Updated', success: false });
    } finally {
      setLoading(false);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const confirmModal = () => {
    setModalVisible(false);
    if (modalContent.success) {
      navigate('/album');
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
            htmlFor="category-NaatKhawan"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Select Naat Khawan
          </label>
          <div className="w-full md:w-2/3">
            <Select
              id="category-NaatKhawan"
              options={naatKhawans}
              isMulti={false}
              onChange={handleNaatKhawanChange}
              value={selectedNaatKhawan}
              styles={customStyles2}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
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
                {albumImage ? albumImage.name : "No file chosen"}
              </span>
              <span className="flex items-center bg-gray-600 min-h-10 hover:bg-gray-700 text-white px-4 rounded">
                Select
              </span>
            </label>
          </div>
        </div>

        {albumImage && typeof albumImage === 'string' && ( // Check if albumImage is a string (URL)
          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <label className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"></label>
            <div className="w-full md:w-2/3 flex items-center">
              <div className="flex items-center mt-2">
                <img
                  src={albumImage}
                  alt="Album Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="category-status"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Select Status
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
          <button
            type="submit"
            className="hover:bg-secondary-gray bg-red-600 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
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
          onConfirm={confirmModal}
        />
      )}
    </div>
  );
};

export default EditAlbum;
