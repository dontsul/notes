import { INote } from '../App';

// export const filterByText = (items: INote[], searchText: string): INote[] => {
//   const searchRegex = new RegExp(searchText, 'i');
//   return items.filter((item) => searchRegex.test(item.text) || searchRegex.test(item.title));
// };

export const filterByText = (items: INote[], searchText: string): INote[] => {
  const newNotes = items.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.text.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return newNotes;
};
