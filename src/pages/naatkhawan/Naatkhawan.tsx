import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getNaatKhawans, deleteNaatKhawan } from "../../network/api"; // Import getNaatKhawans and deleteNaatKhawan
import Loader from "../../Loader"; // Import Loader
import Modal from "../../components/Modal";

// Interface for NaatKhawan
interface NaatKhawan {
  id: string;
  name: string;
  image: string;
}

const NaatKhawans: React.FC = () => {
  const [naatKhawans, setNaatKhawans] = useState<NaatKhawan[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loader state
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedNaatKhawanId, setSelectedNaatKhawanId] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<{ title: string; message: string }>({
    title: "",
    message: ""
  });
  const navigate = useNavigate();

  const addNaatKhawanHandler = () => {
    navigate("/naat-khawan/add-naat-khawan");
  };

  const editNaatKhawanHandler = (id: string) => {
    navigate(`/naat-khawan/edit-naat-khawan/${id}`);
  };

  useEffect(() => {
    const fetchNaatKhawansData = async () => {
      setLoading(true); // Show loader
      try {
        const data = await getNaatKhawans();
        setNaatKhawans(data);
      } catch (error) {
        console.error("Failed to fetch Naat Khawans", error);
        setModalContent({ title: 'Error', message: 'Failed to fetch Naat Khawans' });
        setModalVisible(true);
      } finally {
        setLoading(false); // Hide loader
      }
    };

    fetchNaatKhawansData();
  }, []);

  const deleteNaatKhawanHandler = (id: string) => {
    setSelectedNaatKhawanId(id);
    setModalContent({
      title: "Are you sure?",
      message: "Once deleted, you will not be able to recover this Naat Khawan!",
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const confirmModal = async () => {
    if (selectedNaatKhawanId) {
      try {
        await deleteNaatKhawan(selectedNaatKhawanId);
        setNaatKhawans((prevNaatKhawans) =>
          prevNaatKhawans.filter((nk) => nk.id !== selectedNaatKhawanId)
        );
        setModalContent({ title: 'Success', message: 'Naat Khawan has been deleted!' });
      } catch (error) {
        console.error("Failed to delete Naat Khawan", error);
        setModalContent({ title: 'Error', message: 'Failed to delete Naat Khawan' });
      } finally {
        setSelectedNaatKhawanId(null);
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
        <button
          onClick={addNaatKhawanHandler}
          className="bg-green-600 text-white rounded p-2 font-semibold"
        >
          + Add Naat Khawan
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : naatKhawans.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-white text-xl">No Naat Khawans available</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {naatKhawans.map((naatKhawan) => (
            <div
              key={naatKhawan.id}
              className="flex flex-col w-full bg-secondary-gray rounded-lg overflow-hidden"
            >
              <div className="w-full">
                <img
                  className="w-full h-60"
                  src={naatKhawan.image}
                  alt={naatKhawan.name}
                />
              </div>
              <div className="flex flex-col gap-3 w-full p-4">
                <div>
                  <span className="text-white text-xl font-semibold tracking-wider">
                    {naatKhawan.name}
                  </span>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <button className="rounded-full bg-green-600 text-white p-2"
                    onClick={() => editNaatKhawanHandler(naatKhawan.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="rounded-full bg-red-600 text-white p-2 ml-1"
                      onClick={() => deleteNaatKhawanHandler(naatKhawan.id)}
                    >
                      <MdDelete />
                    </button>
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


export default NaatKhawans;
