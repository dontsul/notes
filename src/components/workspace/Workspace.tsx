import { NoteEditor } from '../noteEditor/NoteEditor';

export const Workspace = () => {
  return (
    <div className="bg-gray-100 md:col-span-2 rounded-md h-[86vh]">
      <div className="flex items-center justify-center text-sm font-semibold ">10.05.2023</div>
      <NoteEditor />
    </div>
  );
};
