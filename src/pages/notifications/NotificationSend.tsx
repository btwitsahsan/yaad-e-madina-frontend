import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal';
import { IoIosSend } from 'react-icons/io';

const NotificationSend: React.FC = () => {
  const navigate = useNavigate();
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationImage, setNotificationImage] = useState<File | null>(null);
  const [postType, setPostType] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', success: true });
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNotificationImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationMessage) {
      alert('Please enter a notification message');
      return;
    }

    setIsLoading(true);

    let imageUrl = '';
    if (notificationImage) {
      const formData = new FormData();
      formData.append('file', notificationImage);
      formData.append('upload_preset', 'ubfgufcm');

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dvew55mcu/image/upload',
          formData
        );
        imageUrl = res.data.secure_url;
      } catch (err) {
        console.error('Error uploading image:', err);
        setModalContent({ title: 'Error', message: 'Error while uploading image', success: false });
        setModalVisible(true);
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/sendNotification', {
        title: notificationTitle,
        message: notificationMessage,
        imageUrl,
        link: externalLink,
        type: postType,
      });

      if (response.status === 200) {
        setModalContent({ title: 'Success', message: 'Notification sent successfully', success: true });
      } else {
        setModalContent({ title: 'Failed', message: 'Failed to send notification', success: false });
      }
    } catch (err) {
      console.error('Error sending notification:', err);
      setModalContent({ title: 'Error', message: 'Error while sending notification', success: false });
    } finally {
      setModalVisible(true);
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const confirmModal = () => {
    setModalVisible(false);
    if (modalContent.success) {
      navigate('/categories');
    }
  };

  return (
    <div className="w-full bg-primary-gray rounded p-4">
      <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="notification-title" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            Title*
          </label>
          <input
            type="text"
            id="notification-title"
            value={notificationTitle}
            onChange={(e) => setNotificationTitle(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="notification-message" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            Notification Message*
          </label>
          <textarea
            id="notification-message"
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            className="w-full md:w-2/3 rounded bg-gray-700 pl-2 text-white"
            rows={4}
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="notification-image" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            Image<br/>
            <span className='text-sm text-gray-500'>(optional)</span>
          </label>
          <div className="w-full md:w-2/3 flex items-center">
            <input
              type="file"
              id="notification-image"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="notification-image"
              className="w-full flex justify-between items-center pl-2 min-h-10 bg-gray-700 rounded cursor-pointer"
            >
              <span className="text-gray-400 overflow-hidden break-words">{notificationImage ? notificationImage.name : 'No file chosen'}</span>
              <span className="flex items-center bg-gray-600 min-h-10 hover:bg-gray-700 text-white px-4 rounded">
                Select
              </span>
            </label>
          </div>
        </div>

        {notificationImage && (
          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <label className="w-full md:w-1/3 pr-4 text-md text-white font-semibold"></label>
            <div className="w-full md:w-2/3 flex items-center">
              <div className="flex items-center mt-2">
                <img
                  src={URL.createObjectURL(notificationImage)}
                  alt="Notification Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="post-type" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            Post Type
          </label>
          <select
            id="post-type"
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          >
            <option value="" disabled selected>Select Type</option>
            <option value="categories">Categories</option>
            <option value="artists">Artists</option>
            <option value="album">Album</option>
            <option value="audio">Audio</option>
            <option value="playlist">Playlist</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label htmlFor="external-link" className="w-full md:w-1/3 pr-4 text-md text-white font-semibold">
            External Link
          </label>
          <input
            type="text"
            id="external-link"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            className="w-full md:w-2/3 p-2 rounded bg-gray-700 text-white min-h-10"
          />
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <label className="w-full md:w-1/3 pr-4 text-lg text-white font-semibold"></label>
          <button type="submit" className="hover:bg-secondary-gray bg-red-600 text-white font-bold py-1 px-2 rounded" disabled={isLoading}>
          <IoIosSend className="inline-block w-5 h-5 mr-1 "></IoIosSend>{isLoading ? 'Sending...' : 'Send'}
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

export default NotificationSend;
