import {
  useState,
  useCallback,
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  KeyboardEvent,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { INote } from '../../App';
import { AiTwotoneDelete } from 'react-icons/ai';
import { TfiWrite } from 'react-icons/tfi';
import { IconBtn } from '../iconBtn/IconBtn';
import { MyDate } from '../../utils/dateUtils';
import { NotesContext } from '../../App';
import { createCurrentDate } from '../../utils/dateUtils';
import { formatDate } from '../../utils/formateDate';

export const NoteEditor = () => {
  const navigate = useNavigate();
  const context = useContext(NotesContext);

  const {
    handleAddNote,
    handleEditNote,
    setOpenModal,
    openModal,
    setIsActiveNote,
    isActiveNote,
    notes,
    statusNewNote,
    setStatusNewNote,
  } = context;

  const { idNote } = useParams();
  const [note, setNote] = useState<string>('');
  const [titleNote, setTitleNote] = useState<string>('');
  const [dateInfo, setDateInfo] = useState<MyDate | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isActiveNote) {
      const { text, title, date } = isActiveNote;

      setNote(text);
      setTitleNote(title);
      setDateInfo(date);
    } else {
      setNote('');
      setTitleNote('');
      setDateInfo(null);
    }
  }, [isActiveNote, idNote]);

  const handleTitleNote = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitleNote(e.target.value);
  }, []);

  const handleTextNote = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  }, []);

  const onDeleteNote = () => {
    setOpenModal(!openModal);
    setIsActiveNote(isActiveNote);
  };

  const onWriteNote = useCallback(() => {
    if (titleRef.current !== null) {
      titleRef.current.focus();
    }
  }, []);

  const onWriteText = useCallback(() => {
    if (textRef.current !== null) {
      textRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (statusNewNote) {
      onWriteNote();
      setNote('');
      setTitleNote('');
      setDateInfo(null);
    }
    // setStatusNewNote(false);
  }, [statusNewNote, onWriteNote, setStatusNewNote]);

  const onAddNewNote = () => {
    const singleNote = notes?.find((elem) => elem.id === idNote);
    if (singleNote !== undefined) {
      const newNote: INote = {
        id: singleNote.id,
        title: titleNote,
        text: note,
        date: singleNote.date,
      };
      handleAddNote(newNote);
      navigate('/');
    }
  };

  const handleBlurTitle = (): void => {
    onWriteText();
    if (!statusNewNote) {
      onUpdateNote();
    }
  };

  const handleKeyDownTitle = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (!statusNewNote) {
      onUpdateNote();
    }
    if (e.key === 'Enter') {
      onWriteText();
    }
  };
  const handleBlurText = (): void => {
    if (statusNewNote) {
      onAddNewNote();
    }

    if (!statusNewNote) {
      onUpdateNote();
    }
  };

  const onUpdateNote = () => {
    if (isActiveNote) {
      const updateNote: INote = {
        id: isActiveNote.id,
        title: titleNote,
        text: note,
        date: createCurrentDate(),
      };
      handleEditNote(updateNote);
      navigate(`/${isActiveNote.id}`);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center text-sm font-semibold py-6 h-5 text-blue-gray-300">
          {dateInfo && formatDate(dateInfo)}
        </div>
        <div className="flex">
          <IconBtn
            color="white"
            size={25}
            element={AiTwotoneDelete}
            handleClick={onDeleteNote}
            status={Boolean(idNote)}
          />
          <IconBtn
            color="white"
            size={25}
            element={TfiWrite}
            handleClick={onWriteNote}
            status={Boolean(idNote)}
          />
        </div>
      </div>
      <div className="h-[64vh] ">
        <div className="mb-2">
          <input
            ref={titleRef}
            value={titleNote}
            onChange={handleTitleNote}
            onKeyDown={handleKeyDownTitle}
            onBlur={handleBlurTitle}
            className="w-full py-2 px-5 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-gray-400"
            type="text"
            placeholder="Title"
          />
        </div>
        <textarea
          onChange={handleTextNote}
          value={note}
          ref={textRef}
          onBlur={handleBlurText}
          placeholder="Enter your text here..."
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
        px-5
        py-3
      "
        />
      </div>
    </>
  );
};
