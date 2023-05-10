import { FC } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';

interface DeleteBtnProps {
  size: number;
  color: string;
}

export const DeleteBtn: FC<DeleteBtnProps> = ({ size, color }) => {
  return (
    <div className="py-1 px-3 bg-blue-gray-500  hover:bg-blue-gray-700 rounded mr-2 cursor-pointer transition  flex items-center">
      {' '}
      <AiTwotoneDelete color={color} size={size} />
    </div>
  );
};
