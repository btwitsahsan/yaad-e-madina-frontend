import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';
import { customStyles } from "../../components/MultiSelectStyle";
import { getAudios, updatePlaylist, getPlaylistById } from "../../network/api";
import Modal from "../../components/Modal";

const EditPlaylist: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('No file chosen');
    const [selectedAudio, setSelectedAudio] = useState([]);
    const [audioData, setAudioData] = useState([]);
    const [playlistTitle, setPlaylistTitle] = useState('');
    const [playlistImage, setPlaylistImage] = useState<File | null>(null);
    const [playlistStatus, setPlaylistStatus] = useState('active');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', success: true });

    useEffect(() => {
        fetchAudio();
        fetchPlaylistDetails(); // Fetch playlist details when component mounts
    }, []);

    const fetchAudio = async () => {
        try {
            const AudioData = await getAudios();
            setAudioData(AudioData.map((audio: any) => ({ value: audio.id, label: audio.title })));
        } catch (error) {
            console.error("Error fetching audio:", error);
        }
    };

    const fetchPlaylistDetails = async () => {
        try {
            const playlist = await getPlaylistById(id); // Assuming getPlaylists can fetch a single playlist by ID
            setPlaylistTitle(playlist.title);
            setSelectedAudio(playlist.audios.map((audio: any) => ({ value: audio.id, label: audio.title })));
            setPlaylistStatus(playlist.status);
            setFileName(playlist.image);
        } catch (error) {
            console.error("Error fetching playlist details:", error);
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setPlaylistImage(file);
        } else {
            setFileName('No file chosen');
            setPlaylistImage(null);
        }
    };

    const handleAudioChange = (selectedOptions: any) => {
        setSelectedAudio(selectedOptions);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!playlistTitle || selectedAudio.length === 0) {
            alert("Please fill in all the fields");
            return;
        }

        try {
            let imageUrl = fileName;
            if (playlistImage) {
                const formData = new FormData();
                formData.append("file", playlistImage);
                formData.append("upload_preset", "ubfgufcm");

                const imageRes = await axios.post("https://api.cloudinary.com/v1_1/dvew55mcu/image/upload", formData);
                imageUrl = imageRes.data.secure_url;
            }

            const playlistData = {
                title: playlistTitle,
                audios: selectedAudio,
                image: imageUrl,
                status: playlistStatus
            };

            const resp = await updatePlaylist(id, playlistData);
            if (resp && resp.success) {
                setModalContent({ title: 'Update Successful', message: 'Your Playlist Has Been Updated Successfully', success: true });
            } else {
                setModalContent({ title: 'Failed', message: 'Your Playlist Has Not Been Updated', success: false });
            }
        } catch (err) {
            console.error("Error while updating playlist:", err);
            alert("Error while updating playlist");
        } finally {
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const confirmModal = () => {
        setModalVisible(false);
        if (modalContent.success) {
            navigate('/playlist');
        }
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

            <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1 md:flex-row md:items-center">
                    <label htmlFor="playlist-title" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
                        Playlist Title
                    </label>
                    <input
                        type="text"
                        id="playlist-title"
                        value={playlistTitle}
                        onChange={(e) => setPlaylistTitle(e.target.value)}
                        className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
                    />
                </div>

                <div className="flex flex-col gap-1 md:flex-row md:items-center">
                    <label htmlFor="playlist-audio" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
                        Select Audio
                    </label>
                    <div className="w-full md:w-2/3">
                        <Select
                            id="playlist-audio"
                            options={audioData}
                            isMulti
                            value={selectedAudio}
                            onChange={handleAudioChange}
                            styles={customStyles}
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1 md:flex-row md:items-center">
                    <label htmlFor="playlist-image" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
                        Playlist Image
                    </label>
                    <div className="w-full md:w-2/3 flex items-center">
                        <input
                            type="file"
                            id="playlist-image"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="playlist-image"
                            className="w-full flex justify-between items-center pl-2 min-h-10 bg-gray-700 rounded cursor-pointer"
                        >
                            <span className="text-gray-400 overflow-hidden break-words">{fileName}</span>
                            <span className="flex items-center bg-gray-600 min-h-10 hover:bg-gray-700 text-white px-4 rounded">
                                Select
                            </span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-1 md:flex-row md:items-center">
                    <label htmlFor="playlist-status" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
                        Status
                    </label>
                    <select
                        id="playlist-status"
                        value={playlistStatus}
                        onChange={(e) => setPlaylistStatus(e.target.value)}
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
                    >
                        Save
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

export default EditPlaylist;
