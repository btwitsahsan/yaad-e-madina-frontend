import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getSubscriptionPlans, deleteSubscriptionPlan, updateSubscriptionPlan } from "../../network/api";
import Loader from '../../Loader';
import Modal from "../../components/Modal";

interface SubscriptionPlan {
  id: string;
  name: string;
  duration: string;
  price: string;
  deviceLimit: number;
  ads: boolean;
  download: boolean;
  status: string;
}

const SubscriptionPlans: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', success: true });
  const navigate = useNavigate();

  const addPlanHandler = () => {
    navigate('/subscription-plans/add-subscription-plan');
  };

  const editPlanHandler = (id: string) => {
    navigate(`/subscription-plans/edit-subscription-plan/${id}`);
  };

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const data = await getSubscriptionPlans();
        console.log(data);
        setPlans(data);
      } catch (error:any) {
        console.error("Failed to fetch plans", error);
        setModalContent({ title: 'Error', message: 'Failed to fetch plans', success: false });
        setModalVisible(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const toggleSwitch = async (id: string) => {
    try {
      const updatedPlans = plans.map((plan) => {
        if (plan.id === id) {
          const newStatus = plan.status === 'active' ? 'inactive' : 'active';
          updateSubscriptionPlan(id, { ...plan, status: newStatus });
          return { ...plan, status: newStatus };
        }
        return plan;
      });
      setPlans(updatedPlans);
    } catch (error) {
      console.error("Failed to toggle plan status", error);
      setModalContent({ title: 'Error', message: 'Failed to toggle plan status', success: false });
      setModalVisible(true);
    }
  };

  const deletePlanHandler = (id: string) => {
    setSelectedPlanId(id);
    setModalContent({
      title: "Are you sure?",
      message: "Once deleted, you will not be able to recover this plan!",
      success: false,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const confirmModal = async () => {
    if (selectedPlanId) {
      try {
        await deleteSubscriptionPlan(selectedPlanId);
        setPlans(prevPlans => prevPlans.filter(plan => plan.id !== selectedPlanId));
        setModalContent({ title: 'Success', message: 'Plan has been deleted!', success: true });
      } catch (error) {
        console.error("Failed to delete plan", error);
        setModalContent({ title: 'Error', message: 'Failed to delete plan', success: false });
      } finally {
        setSelectedPlanId(null);
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
        <button onClick={addPlanHandler} className="bg-green-600 text-white rounded p-2 font-semibold">
          + Add Plan
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : plans.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-white text-xl">No plans available</span>
        </div>
      ) : (
        <div className="overflow-x-auto mt-3">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="border border-gray-600 p-3 text-white text-left">Plan Name</th>
                <th className="border border-gray-600 p-3 text-white text-left">Duration</th>
                <th className="border border-gray-600 p-3 text-white text-left">Price</th>
                <th className="border border-gray-600 p-3 text-white text-left">Device Limit</th>
                <th className="border border-gray-600 p-3 text-white text-left">Ads</th>
                <th className="border border-gray-600 p-3 text-white text-left">Download</th>
                <th className="border border-gray-600 p-3 text-white text-left">Status</th>
                <th className="border border-gray-600 p-3 text-white text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td className="border border-gray-600 p-3 text-white">{plan.name}</td>
                  <td className="border border-gray-600 p-3 text-white">{plan.duration}</td>
                  <td className="border border-gray-600 p-3 text-white">${plan.price}</td>
                  <td className="border border-gray-600 p-3 text-white">{plan.deviceLimit}</td>
                  <td className="border border-gray-600 p-3 text-white">
                    <span className={`rounded px-1 font-semibold ${plan.ads ? "bg-green-600" : "bg-red-600"}`}>
                      {plan.ads ? "ON" : "OFF"}
                    </span>
                  </td>
                  <td className="border border-gray-600 p-3 text-white">
                    <span className={`rounded px-1 font-semibold ${plan.download ? "bg-green-600" : "bg-red-600"}`}>
                      {plan.download ? "ON" : "OFF"}
                    </span>
                  </td>
                  <td className="border border-gray-600 p-3 text-white">
                    <span className={`rounded px-1 font-semibold ${plan.status === "active" ? "bg-green-600" : "bg-red-600"}`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="border border-gray-600 p-3 text-white">
                    <div className="flex gap-2">
                      <button className="rounded bg-green-600 text-white p-2" onClick={() => editPlanHandler(plan.id)}>
                        <FaEdit />
                      </button>
                      <button className="rounded bg-red-600 text-white p-2 ml-1" onClick={() => deletePlanHandler(plan.id)}>
                        <MdDelete />
                      </button>
                      <input
                        type="checkbox"
                        className="hidden"
                        id={`toggleSwitch-${plan.id}`}
                        checked={plan.status === "active"}
                        onChange={() => toggleSwitch(plan.id)}
                      />
                      <label
                        htmlFor={`toggleSwitch-${plan.id}`}
                        className={`w-12 h-6 bg-gray-400 rounded-full cursor-pointer ${plan.status === "active" ? "bg-green-500" : ""}`}
                      >
                        <span
                          className={`inline-block w-6 h-6 bg-white rounded-full transform transition-transform ${plan.status === "active" ? "translate-x-6" : ""}`}
                        />
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default SubscriptionPlans;
