import { useState, useCallback, ChangeEvent } from 'react';

export const NoteEditor = () => {
  const [note, setNote] = useState('');

  const handleNote = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  }, []);

  return (
    <div className="h-[72vh] ">
      <textarea
        onChange={handleNote}
        value={note}
        className="
        w-full 
        h-full 
        resize-none 
        text-gray-700  
        border
        rounded-sm
        focus:outline-none
        focus:ring-1
        focus:ring-blue-gray-300
        focus:border-transparent
        p-4
      "
      />
    </div>
  );
};
