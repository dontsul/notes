import { MyDate } from './dateUtils';

export const formatDate = (date: MyDate): string => {
  const day = date.day.toString().padStart(2, '0');
  const month = date.month.toString().padStart(2, '0');
  const year = date.year.toString();
  const hour = date.hour.toString().padStart(2, '0');
  const minute = date.minute.toString().padStart(2, '0');

  return `${day}.${month}.${year} at ${hour}:${minute}`;
};
