import { AiTwotoneDelete } from 'react-icons/ai';
export const DeleteBtn = () => {
  return (
    <div className="py-1 px-3 bg-blue-gray-500  hover:bg-blue-gray-700 rounded mr-2 cursor-pointer transition  flex items-center">
      {' '}
      <AiTwotoneDelete size={25} />
    </div>
  );
};
