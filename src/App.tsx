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
import { useNavigate } from 'react-router-dom';
import { Modal } from './components/modal/Modal';
import { Layout } from './layout/Layout';
import { openDatabase, addNote, getNotes, deleteNoteById, updateNoteById } from './notesDB';
import { MyDate } from './utils/dateUtils';
import './App.css';

export interface INote {
  id: string;
  title: string;
  text: string;
  date: MyDate;
}

export interface IContext {
  handleAddNote: (note: INote) => void;
  handleEditNote: (note: INote) => void;
  handleRemoveNote: (id: string) => void;
  notes: INote[] | null;
  setNotes: Dispatch<SetStateAction<INote[]>>;
  isActiveNote: INote | null;
  setIsActiveNote: Dispatch<SetStateAction<INote | null>>;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  statusNewNote: boolean;
  setStatusNewNote: Dispatch<SetStateAction<boolean>>;
}

export const NotesContext = React.createContext<IContext>({} as IContext);

function App() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<INote[]>([] as INote[]);
  const [isActiveNote, setIsActiveNote] = useState<null | INote>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<MyDate>({} as MyDate);
  const [statusNewNote, setStatusNewNote] = useState<boolean>(false);

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
  //ADD
  const handleAddNote = (note: INote) => {
    addNote(note)
      .then((res) => {
        if (notes !== null) {
          setNotes((prevNotes) => {
            const index = prevNotes.findIndex((n) => n.id === res.id);
            if (index !== -1) {
              prevNotes[index] = res;
              return [...prevNotes];
            } else {
              return [...prevNotes, res];
            }
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //UPDATE
  const handleEditNote = (note: INote) => {
    updateNoteById(note)
      .then((res) => {
        if (notes !== null) {
          setNotes((prevNotes) => {
            const index = prevNotes.findIndex((n) => n.id === res.id);
            if (index !== -1) {
              prevNotes[index] = res;
              return [...prevNotes];
            } else {
              return [...prevNotes, res];
            }
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //REMOVE
  const handleRemoveNote = (id: string) => {
    console.log(1);

    deleteNoteById(id)
      .then(() => {
        console.log(2);
        const note = notes?.find((elem) => id === elem.id);
        if (note) {
          const newNotes = notes?.filter((note) => note.id !== id);
          if (newNotes !== undefined) {
            setNotes(newNotes);
            setIsActiveNote(null);
            navigate('/');
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const context: IContext = {
    handleAddNote,
    handleEditNote,
    handleRemoveNote,
    notes,
    setNotes,
    isActiveNote,
    setIsActiveNote,
    openModal,
    setOpenModal,
    statusNewNote,
    setStatusNewNote,
  };

  return (
    <div className="App ">
      <NotesContext.Provider value={context}>
        <Layout />
        <Modal />
      </NotesContext.Provider>
    </div>
  );
}

export default App;
