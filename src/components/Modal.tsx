import React from 'react';

interface ModalProps {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-primary-gray rounded-lg shadow-lg overflow-hidden w-11/12 md:w-[30%] transform transition-all duration-300 ease-in-out scale-95">
        <div className="p-6 " >
          <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2><hr/>
          <p className="mt-6 mb-6 text-white">{message}</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-primary-red text-white py-1 px-4 rounded-lg transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-secondary-gray text-white py-1 px-4 rounded-lg shadow-lg transition-colors duration-300"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
