import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAlbums, deleteAlbum, updateAlbum } from "../../network/api";
import Loader from '../../Loader';
import Modal from "../../components/Modal";

interface Album {
  id: string;
  name: string;
  image: string;
  status: string;
  checked: boolean;
}

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', success: true });
  const navigate = useNavigate();

  const addAlbumHandler = () => {
    navigate('/albums/add-album');
  };

  const editAlbumHandler = (id: string) => {
    navigate(`/albums/edit-album/${id}`);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const data = await getAlbums();
        // console.log(data);
        const albumsWithChecked = data.map((album: Album) => ({
          ...album,
          checked: album.status === 'active',
        }));
        setAlbums(albumsWithChecked);
      } catch (error) {
        console.error("Failed to fetch albums", error);
        setModalContent({ title: 'Error', message: 'Failed to fetch albums', success: false });
        setModalVisible(true);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);
  
  const toggleSwitch = async (id: string) => {
    try {
      const updatedAlbums = albums.map((album) => {
        if (album.id === id) {
          const newStatus = album.status === 'active' ? 'inactive' : 'active';
          updateAlbum(id, { ...album, status: newStatus });
          return { ...album, checked: !album.checked, status: newStatus };
        }
        return album;
      });
      setAlbums(updatedAlbums); // Update state to reflect new status locally
    } catch (error) {
      console.error("Failed to toggle album status", error);
      setModalContent({ title: 'Error', message: 'Failed to toggle album status', success: false });
      setModalVisible(true);
    }
  };

  const deleteAlbumHandler = (id: string) => {
    setSelectedAlbumId(id);
    setModalContent({
      title: "Are you sure?",
      message: "Once deleted, you will not be able to recover this album!",
      success: false,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const confirmModal = async () => {
    if (selectedAlbumId) {
      try {
        await deleteAlbum(selectedAlbumId);
        setAlbums(prevAlbums => prevAlbums.filter(album => album.id !== selectedAlbumId));
        setModalContent({ title: 'Success', message: 'Album has been deleted!', success: true });
      } catch (error) {
        console.error("Failed to delete album", error);
        setModalContent({ title: 'Error', message: 'Failed to delete album', success: false });
      } finally {
        setSelectedAlbumId(null);
      }
    }
    setModalVisible(false);
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
        <button onClick={addAlbumHandler} className="bg-green-600 text-white rounded p-2 font-semibold">
          + Add Album
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : albums.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-white text-xl">No albums available</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {albums.map((album) => (
            <div
              key={album.id}
              className="flex flex-col w-full bg-secondary-gray rounded-lg overflow-hidden"
            >
              <div className="w-full">
                <img
                  className="w-full h-60"
                  src={album.image}
                  alt={album.name}
                />
              </div>
              <div className="flex flex-col gap-3 w-full p-4">
                <div>
                  <span className="text-white text-xl font-semibold tracking-wider">
                    {album.name}
                  </span>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <button
                      className="rounded-full bg-green-600 text-white p-2"
                      onClick={() => editAlbumHandler(album.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="rounded-full bg-red-600 text-white p-2 ml-1"
                      onClick={() => deleteAlbumHandler(album.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="hidden"
                      id={`toggleSwitch-${album.id}`}
                      checked={album.checked}
                      onChange={() => toggleSwitch(album.id)} // Add onChange handler to toggle the status
                    />
                    <label
                      htmlFor={`toggleSwitch-${album.id}`}
                      className={`w-12 h-6 bg-gray-400 rounded-full cursor-pointer ${
                        album.checked ? "bg-green-500" : ""
                      }`}
                    >
                      <span
                        className={`inline-block w-6 h-6 bg-white rounded-full transform transition-transform ${
                          album.checked ? "translate-x-6" : ""
                        }`}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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

export default Albums;
