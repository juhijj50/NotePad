import React, { useRef } from 'react';
import Toolbar from './Toolbar';

const Modal = ({ note, onClose, onSave }) => {
  const contentRef = useRef(null);

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleSave = () => {
    const updatedContent = contentRef.current.innerHTML;
    onSave(updatedContent);
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg border border-gray-400 shadow-lg transition-transform transform">
        <Toolbar formatText={formatText} />
        <div
          ref={contentRef}
          contentEditable="true"
          className="border-2 border-gray-400 p-2 min-h-[200px] mt-2 rounded-md transition duration-300"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
        <div className="mt-2 flex space-x-2 justify-start">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-orange-100 border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-orange-100 border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
