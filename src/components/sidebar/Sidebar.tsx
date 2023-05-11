import { ListNotes } from '../listNotes/ListNotes';
export const Sidebar = () => {
  return (
    <div className="bg-gray-200 md:bg-gray-100 md:col-span-1  max-h-[86vh] overflow-y-auto border border-blue-gray-100 ">
      <ListNotes />
    </div>
  );
};
