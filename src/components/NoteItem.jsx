import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faThumbtack } from '@fortawesome/free-solid-svg-icons';

const NoteItem = ({ note, onEdit, onDelete, onPin }) => {
  return (
    <div
      className="border rounded-lg shadow-md p-4 bg-white flex flex-col transition duration-300 hover:shadow-xl"
      style={{ height: '150px' }} // Set a fixed height for square shape
    >
      <div className="flex-grow overflow-y-auto" dangerouslySetInnerHTML={{ __html: note.content }} />
      <div className="mt-2 flex space-x-2">
        <button onClick={onEdit} className="px-4 py-2 bg-orange-100 border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-200">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button onClick={onDelete} className="px-4 py-2 bg-orange-100 border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-200">
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button onClick={onPin} className="px-4 py-2 bg-orange-100 border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-200">
          <FontAwesomeIcon icon={faThumbtack} />
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
