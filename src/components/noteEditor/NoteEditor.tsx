import { useState, useCallback, ChangeEvent } from 'react';

export const NoteEditor = () => {
  const [note, setNote] = useState('');

  const handleNote = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  }, []);

  return (
    <div className="min-h-[86vh] h-full">
      <textarea
        onChange={handleNote}
        value={note}
        className="
        w-full 
        h-full 
        resize-none 
        text-gray-700  
        border
        rounded-lg
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
