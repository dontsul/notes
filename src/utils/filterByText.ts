import { INote } from '../App';

export const filterItems = (items: INote[], searchText: string): INote[] => {
  const searchRegex = new RegExp(searchText, 'i');
  return items.filter((item) => searchRegex.test(item.text) || searchRegex.test(item.title));
};
