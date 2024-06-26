import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAudios, deleteAudio } from "../../network/api";
import Modal from "../../components/Modal";
import Loader from "../../Loader";

const Audios: React.FC = () => {
  const [audios, setAudios] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAudioId, setSelectedAudioId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAudios = async () => {
      setLoading(true);
      try {
        const data = await getAudios(); // Fetch audios from API
        setAudios(data);
      } catch (error) {
        console.error("Failed to fetch audios", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAudios();
  }, []);

  const addAudioHandler = () => {
    navigate('/audios/add-audio');
  };

  const editAudioHandler = (id: string) => {
    navigate(`/audios/edit-audio/${id}`);
  };

  const deleteAudioHandler = (id: string) => {
    setSelectedAudioId(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAudioId(null);
  };

  const confirmModal = async () => {
    if (selectedAudioId) {
      try {
        await deleteAudio(selectedAudioId); // Call the delete API endpoint
        setAudios(prevAudios => prevAudios.filter(audio => audio.id !== selectedAudioId)); // Remove the deleted audio from state
      } catch (error) {
        console.error("Failed to delete audio", error);
      } finally {
        setModalVisible(false);
        setSelectedAudioId(null);
      }
    }
  };

  return (
    <div className="w-full bg-primary-gray rounded p-4">
      <div className="flex justify-between items-center">
        <div className="relative md:w-64">
          <span className="relative md:absolute inset-y-0 right-0 flex items-center pr-2 z-10">
            <button className="p-1 focus:outline-none text-white md:text-white">
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            placeholder="Search By Title..."
            className="w-full h-11 px-4 py-1 pr-12 rounded shadow text-white outline-none hidden md:block backdrop-blur-sm bg-white/10"
          />
        </div>
        <button className="bg-green-600 text-white rounded p-2 font-semibold" onClick={addAudioHandler}>
          + Add Audio
        </button>
      </div>

   
        {loading ? (
          <Loader />
        ) : audios.length === 0 ? (
          <div className="flex justify-center items-center h-64">
          <span className="text-white text-xl">No audios available</span>
        </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {audios.map((audio) => (
            <div
              key={audio.id}
              className="flex flex-col w-full bg-secondary-gray rounded-lg overflow-hidden"
            >
              <div className="w-full">
                <img
                  className="w-full h-60"
                  src={audio.imageFile}
                  alt={audio.title}
                />
              </div>
              <div className="flex flex-col gap-3 w-full p-4">
                <div>
                  <span className="text-white text-xl font-semibold tracking-wider">
                    {audio.title}
                  </span>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <button className="rounded-full bg-green-600 text-white p-2"
                     onClick={() => editAudioHandler(audio.id)}>
                      <FaEdit />
                    </button>
                    <button className="rounded-full bg-red-600 text-white p-2 ml-1" 
                     onClick={() => deleteAudioHandler(audio.id)}>
                      <MdDelete />
                    </button>
                  </div>
                  <div className="flex items-center">
                    {/* Your checkbox code here */}
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
     

      {modalVisible && (
        <Modal
          title="Confirm Delete"
          message="Are you sure you want to delete this audio?"
          onClose={closeModal}
          onConfirm={confirmModal}
        />
      )}
    </div>
  );
};

export default Audios;
