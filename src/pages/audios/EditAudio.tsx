import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { getAudioById, updateAudio, getNaatKhawans, getCategories, getAlbums } from "../../network/api";
import { customStyles2 } from "../../components/MultiSelectStyle";
import Modal from "../../components/Modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditAudio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("active");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [lyrics, setLyrics] = useState("");
  const [audioDetails, setAudioDetails] = useState("");
  const [naatKhawans, setNaatKhawans] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [albumOptions, setAlbumOptions] = useState([]);
  const [selectedNaatKhawan, setSelectedNaatKhawan] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string; success: boolean }>({
    title: "",
    message: "",
    success: false
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [previousImage, setPreviousImage] = useState<string>("");
  const [previousAudio, setPreviousAudio] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const audioData = await getAudioById(id);
        setTitle(audioData.title);
        setStatus(audioData.status);
        setLyrics(audioData.lyrics);
        setAudioDetails(audioData.audioDetails);
        setSelectedNaatKhawan({ value: audioData.naatKhawan.id, label: audioData.naatKhawan.name });
        setSelectedCategory({ value: audioData.category.id, label: audioData.category.name });
        setSelectedAlbum({ value: audioData.album.id, label: audioData.album.name });
        setPreviousImage(audioData.imageFile);
        setPreviousAudio(audioData.audioFile);

        const naatkhawanData = await getNaatKhawans();
        setNaatKhawans(naatkhawanData.map((naatKhawan: any) => ({ value: naatKhawan.id, label: naatKhawan.name })));
        
        const categoryData = await getCategories();
        setCategoryOptions(categoryData.map((category: any) => ({ value: category.id, label: category.name })));

        const albumData = await getAlbums();
        setAlbumOptions(albumData.map((album: any) => ({ value: album.id, label: album.name })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreviousImage(URL.createObjectURL(e.target.files[0]));
      }
      };
      
      const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          setAudioFile(e.target.files[0]);
          setPreviousAudio(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleNaatKhawanChange = (selectedOption: any) => {
    setSelectedNaatKhawan(selectedOption);
  };

  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption);
  };

  const handleAlbumChange = (selectedOption: any) => {
    setSelectedAlbum(selectedOption);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = previousImage; // Initialize with previous image URL
    let audioUrl = previousAudio; // Initialize with previous audio URL
  
    const audioData = {
      title,
      category: { value: selectedCategory.value, label: selectedCategory.label },
      album: { value: selectedAlbum.value, label: selectedAlbum.label },
      status,
      naatKhawan: { value: selectedNaatKhawan.value, label: selectedNaatKhawan.label },
      audioFile: audioUrl,
      imageFile: imageUrl,
      lyrics,
      audioDetails,
    };
  
    if (audioFile) {
      const formData = new FormData();
      formData.append("file", audioFile);
      formData.append("upload_preset", "ubfgufcm");
      const audioRes = await axios.post("https://api.cloudinary.com/v1_1/dvew55mcu/video/upload", formData);
      audioUrl = audioRes.data.secure_url;
      audioData.audioFile = audioUrl;
    }
  
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "ubfgufcm");
      const imageRes = await axios.post("https://api.cloudinary.com/v1_1/dvew55mcu/image/upload", formData);
      imageUrl = imageRes.data.secure_url;
      audioData.imageFile = imageUrl;
    }
  
    try {
      const resp = await updateAudio(id, audioData);
  
      if (resp && resp.success) {
        setModalContent({ title: 'Update Successful', message: 'Your Audio Has Been Updated Successfully', success: true });
      } else {
        setModalContent({ title: 'Failed', message: 'Your Audio Has Not Been Updated', success: false });
      }
    } catch (err) {
      console.error("Error while updating audio:", err);
      setModalContent({ title: 'Error', message: 'An error occurred while updating the audio.', success: false });
    } finally {
      setModalVisible(true);
      setLoading(false);
    }
  };
  

  const closeModal = () => {
    setModalVisible(false);
    if (modalContent.success) {
      navigate('/audios');
    }
  };

  const confirmModal = () => {
    setModalVisible(false);
    if (modalContent.success) {
      navigate('/audios');
    }
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

      <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="title"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="category"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Select Category
          </label>
          <div className="w-full md:w-2/3">
            <Select
              id="category"
              options={categoryOptions}
              isMulti={false}
              onChange={handleCategoryChange}
              styles={customStyles2}
              className="basic-multi-select"
              classNamePrefix="select"
              value={selectedCategory}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="naatkhawan"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Select Naat Khawan
          </label>
          <div className="w-full md:w-2/3">
            <Select
              id="naatkhawan"
              options={naatKhawans}
              isMulti={false}
              onChange={handleNaatKhawanChange}
              styles={customStyles2}
              className="basic-multi-select"
              classNamePrefix="select"
              value={selectedNaatKhawan}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="album"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Select Album
          </label>
          <div className="w-full md:w-2/3">
            <Select
              id="album"
              options={albumOptions}
              isMulti={false}
              onChange={handleAlbumChange}
              styles={customStyles2}
              className="basic-multi-select"
              classNamePrefix="select"
              value={selectedAlbum}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="audio-file"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Audio File
          </label>
          <div className="w-full md:w-2/3 flex items-center">
            <input
              type="file"
              id="audio-file"
              className="hidden"
              onChange={handleAudioChange}
            />
            <label
              htmlFor="audio-file"
              className="w-full flex justify-between items-center pl-2 min-h-10 bg-gray-700 rounded cursor-pointer"
            >
              <span className="text-gray-400 overflow-hidden break-words">
              {audioFile ? audioFile.name : previousAudio ? previousAudio : "Loading..."}
              </span>
              <span className="flex items-center bg-gray-600 min-h-10 hover:bg-gray-700 text-white px-4 rounded">
                Select
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="image-file"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Image File
          </label>
          <div className="w-full md:w-2/3 flex items-center">
            <input
              type="file"
              id="image-file"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image-file"
              className="w-full flex justify-between items-center pl-2 min-h-10 bg-gray-700 rounded cursor-pointer"
            >
              <span className="text-gray-400 overflow-hidden break-words">
              {imageFile ? imageFile.name : previousImage ? previousImage : "Loading..."}
              </span>
              <span className="flex items-center bg-gray-600 min-h-10 hover:bg-gray-700 text-white px-4 rounded">
                Select
              </span>
            </label>
          </div>
        </div>

        {previousImage && (
          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <label className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"></label>
            <div className="w-full md:w-2/3 flex items-center">
              <div className="flex items-center mt-2">
                <img
                  src={previousImage}
                  alt="Image Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="audioDetails"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Audio Details
          </label>
          <div className="w-full md:w-2/3">
            <ReactQuill
              value={audioDetails}
              onChange={setAudioDetails}
              className="bg-white text-black rounded"
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
            htmlFor="lyrics"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Audio Lyrics
          </label>
          <div className="w-full md:w-2/3">
            <ReactQuill
              value={lyrics}
              onChange={setLyrics}
              className="bg-white text-black rounded"
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline", "strike"],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "font",
                "list",
                "bullet",
                "bold",
                "italic",
                "underline",
                "strike",
                "color",
                "background",
                "align",
                "link",
                "image",
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label
            htmlFor="status"
            className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"
          >
            Status
          </label>
          <select
            id="status"
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
            {loading ? "Updating..." : "Update"}
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



export default EditAudio;
