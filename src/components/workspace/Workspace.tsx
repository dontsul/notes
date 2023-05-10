import { NoteEditor } from '../noteEditor/NoteEditor';
import { DeleteBtn } from '../iconBtns/DeleteBtn';
import { WriteBtn } from '../iconBtns/WriteBtn';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { NotesContext } from '../../App';
import { INote } from '../../App';

export const Workspace = () => {
  const { idNote } = useParams();

  const [notesList, setNoteList] = useState<INote[] | null>(null);
  const [noteItem, setNoteItem] = useState<INote | null>(null);

  const context = useContext(NotesContext);

  useEffect(() => {
    if (context && context.notes) {
      const { notes } = context;
      setNoteList(notes);
    }
  }, [context]);

  useEffect(() => {
    if (notesList) {
      const item = notesList.find((note) => note.id === idNote);
      if (item) {
        setNoteItem(item);
      }
    }
  }, [notesList, idNote]);

  return (
    <div className="bg-gray-100 md:col-span-2 rounded-md h-[86vh] px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center text-sm font-semibold py-6 text-blue-gray-300">
          10.05.2023
        </div>
        <div className="flex">
          <DeleteBtn size={25} color={'white'} />
          <WriteBtn size={25} color={'white'} />
        </div>
      </div>
      <NoteEditor noteItem={noteItem} />
    </div>
  );
};
