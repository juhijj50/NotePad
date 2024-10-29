import React, { useEffect, useState } from 'react';

const Toolbar = ({ formatText }) => {
  const [currentAlignment, setCurrentAlignment] = useState('Left');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For mobile dropdown toggle

  const handleAlignment = (alignment) => {
    if (alignment) {
      document.execCommand('justify' + alignment);
    }
  };

  // Detect the alignment of the currently selected text
  const detectAlignment = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const selectedNode = selection.anchorNode.parentNode;
      const textAlign = window.getComputedStyle(selectedNode).textAlign;
      const align = textAlign === 'center' ? 'Center' : textAlign === 'right' ? 'Right' : 'Left';
      setCurrentAlignment(align);
    }
  };

  useEffect(() => {
    document.addEventListener('selectionchange', detectAlignment);
    return () => {
      document.removeEventListener('selectionchange', detectAlignment);
    };
  }, []);

  return (
    <div className="flex justify-end">
      {/* For larger screens */}
      <div className="hidden sm:flex space-x-2 p-2 bg-FCFFE0 border border-black rounded-lg">
        <button
          onClick={() => formatText('bold')}
          className="text-black bg-F5DAD2 px-4 py-2 rounded transition-transform transform hover:rotate-12"
        >
          B
        </button>
        <button
          onClick={() => formatText('italic')}
          className="text-black bg-F5DAD2 px-4 py-2 rounded transition-transform transform hover:rotate-12"
        >
          I
        </button>
        <button
          onClick={() => formatText('underline')}
          className="text-black bg-F5DAD2 px-4 py-2 rounded transition-transform transform hover:rotate-12"
        >
          U
        </button>

        {/* Alignment Dropdown */}
        <select
          onChange={(e) => handleAlignment(e.target.value)}
          className="bg-orange-100 px-4 py-2 border border-black rounded"
          value={currentAlignment}
        >
          <option value="Left">Left</option>
          <option value="Center">Center</option>
          <option value="Right">Right</option>
        </select>

        {/* Font Size Dropdown */}
        <select
          onChange={(e) => formatText('fontSize', e.target.value)}
          className="bg-orange-100 px-4 py-2 border border-black rounded"
        >
          <option value="3">Normal</option>
          <option value="1">Small</option>
          <option value="5">Large</option>
        </select>
      </div>

      {/* For smaller screens (Mobile) */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className=" bg-F5DAD2 px-4 py-2 flex items-center  bg-orange-100 border border-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
        >
          Toolbar
          <span className="ml-2">&#9660;</span> {/* Dropdown icon (downward caret) */}
        </button>

        {/* Dropdown for mobile */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border border-black rounded-lg shadow-lg p-2 w-48">
            <div className="flex justify-between space-x-2 mb-2">
              <button
                onClick={() => { formatText('bold'); setIsDropdownOpen(false); }}
                className="text-black bg-F5DAD2 px-4 py-2 rounded hover:bg-gray-100"
              >
                B
              </button>
              <button
                onClick={() => { formatText('italic'); setIsDropdownOpen(false); }}
                className="text-black bg-F5DAD2 px-4 py-2 rounded hover:bg-gray-100"
              >
                I
              </button>
              <button
                onClick={() => { formatText('underline'); setIsDropdownOpen(false); }}
                className="text-black bg-F5DAD2 px-4 py-2 rounded hover:bg-gray-100"
              >
                U
              </button>
            </div>

            {/* Alignment options */}
            <select
              onChange={(e) => { handleAlignment(e.target.value); setIsDropdownOpen(false); }}
              className="block w-full bg-orange-100 px-4 py-2 mb-2 border border-black rounded"
              value={currentAlignment}
            >
              <option value="Left">Left</option>
              <option value="Center">Center</option>
              <option value="Right">Right</option>
            </select>

            {/* Font Size options */}
            <select
              onChange={(e) => { formatText('fontSize', e.target.value); setIsDropdownOpen(false); }}
              className="block w-full bg-orange-100 px-4 py-2 border border-black rounded"
            >
              <option value="3">Normal</option>
              <option value="1">Small</option>
              <option value="5">Large</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
