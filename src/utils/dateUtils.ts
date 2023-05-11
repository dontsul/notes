export interface MyDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export const createCurrentDate = (): MyDate => {
  const now = new Date();
  const myDate: MyDate = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
  };

  return myDate;
};
