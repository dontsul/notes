import { useState, useCallback, ChangeEvent, useContext, useEffect, FC } from 'react';
import { NotesContext } from '../../App';
import { useParams } from 'react-router-dom';
import { INote } from '../../App';
interface noteItemProps {
  noteItem: INote | null;
}

export const NoteEditor: FC<noteItemProps> = ({ noteItem }) => {
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    if (noteItem) {
      const { text } = noteItem;
      setNote(text);
    }
  }, [noteItem]);

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
