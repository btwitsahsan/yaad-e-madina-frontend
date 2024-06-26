import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getSubscriptionPlanById, updateSubscriptionPlan } from "../../network/api";
import Modal from "../../components/Modal";

const EditSubscriptionPlan: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [planName, setPlanName] = useState("");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("days");
  const [price, setPrice] = useState("");
  const [deviceLimit, setDeviceLimit] = useState("");
  const [ads, setAds] = useState("1");
  const [download, setDownload] = useState("1");
  const [status, setStatus] = useState("active");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string }>({
    title: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSubscriptionPlan = async () => {
      try {
        const data = await getSubscriptionPlanById(id!);
        setPlanName(data.name);
        
        const [value, unit] = data.duration.split(" ");
        setDuration(value);
        setDurationUnit(unit);
        setPrice(data.price);
        setDeviceLimit(data.deviceLimit);
        setAds(data.ads);
        setDownload(data.download);
        setStatus(data.status);
      } catch (error) {
        console.error("Failed to fetch subscription plan", error);
        setModalContent({ title: 'Error', message: 'Failed to fetch subscription plan' });
        setModalVisible(true);
      }
    };
    fetchSubscriptionPlan();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const subscriptionPlanData = {
      name: planName,
      duration: `${duration} ${durationUnit}`,
      price,
      deviceLimit,
      ads,
      download,
      status
    };

    try {
      const response = await updateSubscriptionPlan(id!, subscriptionPlanData);
      if (response.success) {
        setModalContent({ title: "Update Successful", message: "Your Subscription Plan Has Been Updated Successfully" });
        setModalVisible(true);
      } else {
        setModalContent({ title: "Failed", message: "Your Subscription Plan Has Not Been Updated" });
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error while updating subscription plan", error);
      setModalContent({ title: 'Error', message: 'Error while updating subscription plan' });
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigate("/subscription-plans");
  };

  return (
    <div className="w-full bg-primary-gray rounded p-4">
      <div className="flex justify-start items-center">
        <button className="flex items-center gap-2 text-red-600 text-xl rounded p-2 font-bold" onClick={handleBackClick}>
          <FaArrowLeft /> Back
        </button>
      </div>

      <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="plan-name" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Plan Name*
          </label>
          <input
            type="text"
            id="plan-name"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
            required
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="duration" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Duration*
          </label>
          <div className="w-full md:w-2/3 flex gap-3">
            <input
              placeholder="7"
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white min-h-10"
              required
            />
            <select
              id="duration-unit"
              value={durationUnit}
              onChange={(e) => setDurationUnit(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white min-h-10"
            >
              <option value="days">Days</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="price" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Price*
          </label>
          <input
            placeholder="9.99"
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
            required
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="device-limit" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Device Limit*
          </label>
          <input
            placeholder="1"
            type="number"
            id="device-limit"
            value={deviceLimit}
            onChange={(e) => setDeviceLimit(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
            required
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="ads" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Ads
          </label>
          <select
            id="ads"
            value={ads}
            onChange={(e) => setAds(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          >
            <option value="1">ON</option>
            <option value="0">OFF</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="download" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
            Download
          </label>
          <select
            id="download"
            value={download}
            onChange={(e) => setDownload(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          >
            <option value="1">ON</option>
            <option value="0">OFF</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="status" className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold">
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
          <label className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold"></label>
          <button type="submit" className="hover:bg-secondary-gray bg-red-600 text-white font-bold py-2 px-4 rounded" disabled={isLoading}>
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

export default EditSubscriptionPlan;
