import { INote } from '../App';

export const sortNotesByDate = (notes: INote[]) => {
  return notes.sort((a, b) => {
    const dateA = new Date(a.date.year, a.date.month - 1, a.date.day, a.date.hour, a.date.minute);
    const dateB = new Date(b.date.year, b.date.month - 1, b.date.day, b.date.hour, b.date.minute);
    return dateB.getTime() - dateA.getTime();
  });
};
