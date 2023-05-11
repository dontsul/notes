import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './components/modal/Modal';
import { Layout } from './layout/Layout';
import { openDatabase, addNote, getNotes, deleteNoteById, updateNoteById } from './notesDB';
import { MyDate } from './utils/dateUtils';
import { filterByText } from './utils/filterByText';
import { sortNotesByDate } from './utils/sortNotes';

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
  notes: INote[];
  defaultNotes: INote[];
  setNotes: Dispatch<SetStateAction<INote[]>>;
  isActiveNote: INote | null;
  setIsActiveNote: Dispatch<SetStateAction<INote | null>>;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  statusNewNote: boolean;
  setStatusNewNote: Dispatch<SetStateAction<boolean>>;
  filterSortNotes: (note: INote[], text: string) => void;
}

export const NotesContext = createContext<IContext>({} as IContext);

function App() {
  const navigate = useNavigate();
  const [defaultNotes, setDefaultNotes] = useState<INote[]>([] as INote[]);
  const [notes, setNotes] = useState<INote[]>([] as INote[]);
  const [isActiveNote, setIsActiveNote] = useState<null | INote>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [statusNewNote, setStatusNewNote] = useState<boolean>(false);

  useEffect(() => {
    openDatabase();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const result = await getNotes();

        setDefaultNotes(result);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNotes();
  }, []);

  useEffect(() => {
    setNotes(defaultNotes);
  }, [defaultNotes]);

  const filterSortNotes = (notesList: INote[], text: string) => {
    Promise.resolve(notesList)
      .then(sortNotesByDate)
      .then((sortedNotes) => filterByText(sortedNotes, text))
      .then((filteredNotes) => {
        setNotes(filteredNotes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //ADD
  const handleAddNote = useCallback(
    (note: INote) => {
      addNote(note)
        .then((res) => {
          if (defaultNotes !== null) {
            setDefaultNotes((prevNotes) => {
              const index = prevNotes.findIndex((n) => n.id === res.id);
              setStatusNewNote(false);

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
    },
    [defaultNotes]
  );
  //UPDATE
  const handleEditNote = useCallback(
    (note: INote) => {
      updateNoteById(note)
        .then((res) => {
          if (defaultNotes !== null) {
            setDefaultNotes((prevNotes) => {
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
    },
    [defaultNotes]
  );
  //REMOVE
  const handleRemoveNote = useCallback(
    (id: string) => {
      deleteNoteById(id)
        .then(() => {
          const note = defaultNotes?.find((elem) => id === elem.id);
          if (note) {
            const newNotes = defaultNotes?.filter((note) => note.id !== id);
            if (newNotes !== undefined) {
              setDefaultNotes(newNotes);
              setIsActiveNote(null);
              navigate('/');
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [navigate, defaultNotes]
  );

  const context: IContext = {
    handleAddNote,
    handleEditNote,
    handleRemoveNote,
    notes,
    defaultNotes,
    setNotes,
    isActiveNote,
    setIsActiveNote,
    openModal,
    setOpenModal,
    statusNewNote,
    setStatusNewNote,
    filterSortNotes,
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
