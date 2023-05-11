import { SearchBox } from '../searchBox/SearchBox';
import { IconBtn } from '../iconBtn/IconBtn';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useContext } from 'react';
import { NotesContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { createCurrentDate } from '../../utils/dateUtils';

export const Header = () => {
  const navigate = useNavigate();
  const context = useContext(NotesContext);
  const { idNote } = useParams();
  const {
    isActiveNote,
    setIsActiveNote,
    setStatusNewNote,
    notes,
    setNotes,
    setOpenModal,
    openModal,
  } = context;

  const onAddNote = () => {
    const id = uuidv4();
    navigate(`/${id}`);

    if (notes) {
      setNotes([{ id: id, date: createCurrentDate(), title: '', text: '' }, ...notes]);
    } else {
      setNotes([{ id: id, date: createCurrentDate(), title: '', text: '' }]);
    }

    setStatusNewNote(true);
  };

  const onDeleteNote = () => {
    setOpenModal(!openModal);
    setIsActiveNote(isActiveNote);
    return;
  };

  return (
    <div className="bg-gray-800 text-white px-4 py-2 md:col-span-3">
      <div className="flex justify-between flex-col md:flex-row">
        <div className="flex mb-2 md:mb-0">
          <IconBtn
            color="white"
            size={25}
            element={AiFillPlusCircle}
            handleClick={onAddNote}
            status={true}
          />
          <IconBtn
            color="white"
            size={25}
            element={AiTwotoneDelete}
            handleClick={onDeleteNote}
            status={Boolean(idNote)}
          />
        </div>
        <div>
          <SearchBox />
        </div>
      </div>
    </div>
  );
};
