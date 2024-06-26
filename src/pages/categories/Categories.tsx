import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getCategories, deleteCategory, updateCategory } from "../../network/api";
import Loader from '../../Loader';
import Modal from "../../components/Modal";

interface Category {
  id: string;
  name: string;
  image: string;
  status: string;
  checked: boolean;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', success: true });
  const navigate = useNavigate();

  const addCategoryHandler = () => {
    navigate('/categories/add-category');
  };

  const editCategoryHandler = (id: string) => {
    navigate(`/categories/edit-category/${id}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getCategories();
        const categoriesWithChecked = data.map((category: Category) => ({
          ...category,
          checked: category.status === 'active',
        }));
        setCategories(categoriesWithChecked);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setModalContent({ title: 'Error', message: 'Failed to fetch categories', success: false });
        setModalVisible(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const toggleSwitch = async (id: string) => {
    try {
      const updatedCategories = categories.map((category) => {
        if (category.id === id) {
          const newStatus = category.status === 'active' ? 'inactive' : 'active';
          updateCategory(id, { ...category, status: newStatus });
          return { ...category, checked: !category.checked, status: newStatus };
        }
        return category;
      });
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Failed to toggle category status", error);
      setModalContent({ title: 'Error', message: 'Failed to toggle category status', success: false });
      setModalVisible(true);
    }
  };

  const deleteCategoryHandler = (id: string) => {
    setSelectedCategoryId(id);
    setModalContent({
      title: "Are you sure?",
      message: "Once deleted, you will not be able to recover this category!",
      success: false,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const confirmModal = async () => {
    if (selectedCategoryId) {
      try {
        await deleteCategory(selectedCategoryId);
        setCategories(prevCategories => prevCategories.filter(category => category.id !== selectedCategoryId));
        setModalContent({ title: 'Success', message: 'Category has been deleted!', success: true });
      } catch (error) {
        console.error("Failed to delete category", error);
        setModalContent({ title: 'Error', message: 'Failed to delete category', success: false });
      } finally {
        setSelectedCategoryId(null);
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
        <button onClick={addCategoryHandler} className="bg-green-600 text-white rounded p-2 font-semibold">
          + Add Category
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : categories.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-white text-xl">No categories available</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col w-full bg-secondary-gray rounded-lg overflow-hidden"
            >
              <div className="w-full">
                <img
                  className="w-full h-60"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <div className="flex flex-col gap-3 w-full p-4">
                <div>
                  <span className="text-white text-xl font-semibold tracking-wider">
                    {category.name}
                  </span>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <button
                      className="rounded-full bg-green-600 text-white p-2"
                      onClick={() => editCategoryHandler(category.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="rounded-full bg-red-600 text-white p-2 ml-1"
                      onClick={() => deleteCategoryHandler(category.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="hidden"
                      id={`toggleSwitch-${category.id}`}
                      checked={category.checked}
                      onChange={() => toggleSwitch(category.id)}
                    />
                    <label
                      htmlFor={`toggleSwitch-${category.id}`}
                      className={`w-12 h-6 bg-gray-400 rounded-full cursor-pointer ${
                        category.checked ? "bg-green-500" : ""
                      }`}
                    >
                      <span
                        className={`inline-block w-6 h-6 bg-white rounded-full transform transition-transform ${
                          category.checked ? "translate-x-6" : ""
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

export default Categories;
