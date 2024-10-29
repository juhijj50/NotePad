import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import NotesList from './components/NotesList';
import Modal from './components/Modal';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  // Load notes from local storage when the app starts
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to local storage whenever they change
  const saveNotesToLocalStorage = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const addNote = (noteContent) => {
    const newNotes = [{ content: noteContent, pinned: false }, ...notes];
    saveNotesToLocalStorage(newNotes);
  };

  const editNote = (index) => {
    setCurrentNote({ ...notes[index], index });
    setIsModalOpen(true);
  };

  const saveEditedNote = (updatedContent) => {
    const updatedNotes = notes.map((note, i) =>
      i === currentNote.index ? { ...note, content: updatedContent } : note
    );
    saveNotesToLocalStorage(updatedNotes);
    setCurrentNote(null);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    saveNotesToLocalStorage(updatedNotes);
  };

  const pinNote = (index) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, pinned: !note.pinned } : note
    );
    // Sort by pinned status
    updatedNotes.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    saveNotesToLocalStorage(updatedNotes);
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-semibold text-gray-800 mb-4 shadow-md p-2 rounded-md bg-white border border-gray-200">
        Notepad App
      </h1>
      <Editor onSave={addNote} />
      <NotesList
        notes={notes}
        onEdit={editNote}
        onDelete={deleteNote}
        onPin={pinNote}
      />
    
      {isModalOpen && (
        <Modal
          note={currentNote}
          onClose={() => setIsModalOpen(false)}
          onSave={saveEditedNote}
        />
      )}
    </div>
  );
};

export default App;
