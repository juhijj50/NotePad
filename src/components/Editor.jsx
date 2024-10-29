// src/components/Editor.jsx
import React, { useRef } from 'react';
import Toolbar from './Toolbar';
import backgroundImage from '../assets/1.png'; // Adjust the path if necessary

const Editor = ({ onSave }) => {
  const contentRef = useRef(null);

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleSaveNote = () => {
    const noteContent = contentRef.current.innerHTML;
    onSave(noteContent); // Call the save function passed from the parent
    contentRef.current.innerHTML = ''; // Clear the editor after saving
  };

  return (
    <div 
      className="p-4 bg-white order border-black-300 relative h-full bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Toolbar formatText={formatText} />
      <div 
        ref={contentRef}
        contentEditable="true"
        className="bg-orange-100 border-2 border-black-400 p-2 mt-2 min-h-[200px] w-1/3 ml-auto" 
        placeholder="Type your note here..."
      />
      {/* Container for button, using flex to align to the right */}
      <div className="flex justify-end mt-2">
        <button 
          onClick={handleSaveNote} 
          className="px-6 py-2 bg-orange-100 border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
        >
          Create Note
        </button>
      </div>
    </div>
  );
};

export default Editor;
