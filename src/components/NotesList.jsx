import React from 'react';
import NoteItem from './NoteItem';

const NotesList = ({ notes, onEdit, onDelete, onPin }) => {

  // Sort notes so pinned ones come first
  const sortedNotes = [...notes].sort((a, b) => {
    if (b.pinned) return 1; // Pinned notes come first
    return 0; // Preserve the order of notes
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Notes List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {sortedNotes.map((note, index) => (
          <NoteItem
            key={index}
            note={note}
            onEdit={() => onEdit(index)}
            onDelete={() => onDelete(index)}
            onPin={() => onPin(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
