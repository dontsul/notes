import { Note } from '../note/Note';
import { useContext, useState, useEffect } from 'react';
import { NotesContext } from '../../App';
import { INote } from '../../App';

export const ListNotes = () => {
  const [notesList, setNoteList] = useState<INote[] | null>(null);
  const context = useContext(NotesContext);

  useEffect(() => {
    if (context && context.notes) {
      const { notes } = context;
      setNoteList(notes);
    }
  }, [context]);

  return (
    <ul className="flex flex-col items-satrt justify-center border border-blue-gray-100 ">
      {notesList &&
        notesList.map((note: INote) => {
          return <Note key={note.id} note={note} />;
        })}
    </ul>
  );
};
