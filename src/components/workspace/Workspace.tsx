import { NoteEditor } from '../noteEditor/NoteEditor';
import { DeleteBtn } from '../iconBtns/DeleteBtn';
import { WriteBtn } from '../iconBtns/WriteBtn';

export const Workspace = () => {
  return (
    <div className="bg-gray-100 md:col-span-2 rounded-md h-[86vh] px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center text-sm font-semibold py-6 text-blue-gray-300">
          10.05.2023
        </div>
        <div className="flex">
          <DeleteBtn size={25} color={'white'} />
          <WriteBtn size={25} color={'white'} />
        </div>
      </div>
      <NoteEditor />
    </div>
  );
};
