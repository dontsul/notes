import { useState, ChangeEvent, useContext } from 'react';
import { INote, NotesContext } from '../../App';

export const SearchBox = () => {
  const [value, setValue] = useState('');
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

  // const filterItems = (items: INote[], searchText: string): INote[] => {
  //   const searchRegex = new RegExp(searchText, 'i');
  //   return items.filter((item) => searchRegex.test(item.text) || searchRegex.test(item.title));
  // };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    // filterItems(value);
  };

  return (
    <div className="flex items-center justify-start md:justify-center w-full">
      <label>
        <input
          id="input-field"
          type="text"
          className="w-full px-4 py-2 bg-blue-gray-400 border border-white rounded-md focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent shadow text-white placeholder:text-blue-gray-700"
          placeholder="Search"
          value={value}
          onChange={handleInput}
        />
      </label>
    </div>
  );
};
