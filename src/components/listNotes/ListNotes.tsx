import { Note } from '../note/Note';
import { useContext, useState, useEffect } from 'react';
import { NotesContext } from '../../App';
import { INote } from '../../App';
import { sortNotesByDate } from '../../utils/sortNotes';

export const ListNotes = () => {
  const [notesList, setNoteList] = useState<INote[] | null>(null);
  const { notes } = useContext(NotesContext);

  useEffect(() => {
    if (notes !== null) {
      setNoteList(sortNotesByDate(notes));
    }
  }, [notes]);

  return (
    <ul className="flex flex-col items-satrt justify-center border border-blue-gray-100 ">
      {notesList &&
        notesList.map((note: INote) => {
          return <Note key={note.id} note={note} />;
        })}
    </ul>
  );
};
