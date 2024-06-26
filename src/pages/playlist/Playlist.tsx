import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getPlaylists, deletePlaylist } from "../../network/api";
import Modal from "../../components/Modal";
import Loader from "../../Loader";

const Playlists: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const data = await getPlaylists(); // Fetch playlists from API
        setPlaylists(data);
      } catch (error) {
        console.error("Failed to fetch playlists", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  const addPlaylistHandler = () => {
    navigate('/playlist/add-playlist');
  };

  const editPlaylistHandler = (id: string) => {
    navigate(`/playlist/edit-playlist/${id}`);
  };

  const deletePlaylistHandler = (id: string) => {
    setSelectedPlaylistId(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPlaylistId(null);
  };

  const confirmModal = async () => {
    if (selectedPlaylistId) {
      try {
        await deletePlaylist(selectedPlaylistId); // Call the delete API endpoint
        setPlaylists(prevPlaylists => prevPlaylists.filter(playlist => playlist.id !== selectedPlaylistId)); // Remove the deleted playlist from state
      } catch (error) {
        console.error("Failed to delete playlist", error);
      } finally {
        setModalVisible(false);
        setSelectedPlaylistId(null);
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
        <button className="bg-green-600 text-white rounded p-2 font-semibold" onClick={addPlaylistHandler}>
          + Add Playlist
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : playlists.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-white text-xl">No playlists available</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="flex flex-col w-full bg-secondary-gray rounded-lg overflow-hidden"
            >
              <div className="w-full">
                <img
                  className="w-full h-60"
                  src={playlist.image}
                  alt={playlist.title}
                />
              </div>
              <div className="flex flex-col gap-3 w-full p-4">
                <div>
                  <span className="text-white text-xl font-semibold tracking-wider">
                    {playlist.title}
                  </span>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <button className="rounded-full bg-green-600 text-white p-2"
                     onClick={() => editPlaylistHandler(playlist.id)}>
                      <FaEdit />
                    </button>
                    <button className="rounded-full bg-red-600 text-white p-2 ml-1" 
                     onClick={() => deletePlaylistHandler(playlist.id)}>
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
          message="Are you sure you want to delete this playlist?"
          onClose={closeModal}
          onConfirm={confirmModal}
        />
      )}
    </div>
  );
};

export default Playlists;
