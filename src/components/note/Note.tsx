import { Link, useParams } from 'react-router-dom';
import { FC } from 'react';
import { INote } from '../../App';
import { useContext, useState, useEffect } from 'react';
import { NotesContext } from '../../App';

interface INoteProps {
  note: INote;
}

export const Note: FC<INoteProps> = ({ note }) => {
  const { title, text, id, date } = note;
  const { year, month, day, hour, minute } = date;
  const context = useContext(NotesContext);
  const { setIsActiveNote } = context;

  const handleActiveNote = () => {
    setIsActiveNote(note);
  };

  return (
    <li
      onClick={handleActiveNote}
      className="py-3 border-b border-blue-gray-100 border-collapse px-4 hover:bg-blue-gray-50 "
    >
      <Link className="block h-full" to={`/${id}`}>
        <h2 className="text-lg font-semibold mb-2 line-clamp-1 pr-2">
          {title ? `${title}` : 'New Note'}
        </h2>
        <div className="grid grid-cols-6 py-1">
          <div className="flex items-center text-sm col-span-2 lg:col-span-1.5 font-semibold">
            {hour}:{minute}
          </div>
          <div className="flex items-center col-span-4 lg:col-span-4.5 line-clamp-1">{text}</div>
        </div>
      </Link>
    </li>
  );
};
