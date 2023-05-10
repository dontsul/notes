import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  createContext,
  FC,
  ProviderProps,
  Dispatch,
  SetStateAction,
} from 'react';
import { Modal } from './components/modal/Modal';
import { Layout } from './layout/Layout';
import { openDatabase, addNote, getNotes, deleteNoteById, updateNoteById } from './notesDB';
import './App.css';

interface MyDate {
  year?: number;
  month?: number;
  day?: number;
  hour: number;
  minute: number;
}
interface INote {
  id: string;
  title: string;
  text: string;
  date: MyDate;
}

interface IContext {
  handleAddNote: (note: INote) => void;
  handleEditNote: (note: INote) => void;
  handleRemoveNote: (id: string) => void;
  notes: INote[] | null;
  setNotes: Dispatch<SetStateAction<INote[] | null>>;
}

const NotesContext = React.createContext<IContext | string>('');

function App() {
  const [notes, setNotes] = useState<null | INote[]>(null);

  const now = new Date();

  const myDate: MyDate = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
  };

  useEffect(() => {
    openDatabase();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const result = await getNotes();

        setNotes(result);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNotes();
  }, []);

  const handleAddNote = (note: INote) => {
    addNote(note);
  };

  const handleEditNote = (note: INote) => {
    updateNoteById(note);
  };

  const handleRemoveNote = (id: string) => {
    deleteNoteById(id);
  };

  const context: IContext = {
    handleAddNote,
    handleEditNote,
    handleRemoveNote,
    notes,
    setNotes,
  };

  return (
    <div className="App ">
      <NotesContext.Provider value={context}>
        <Layout />
      </NotesContext.Provider>
      {/* <Modal /> */}
    </div>
  );
}

export default App;
