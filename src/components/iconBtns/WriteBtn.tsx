import { TfiWrite } from 'react-icons/tfi';

import { FC } from 'react';

interface WriteBtnProps {
  size: number;
  color: string;
}

export const WriteBtn: FC<WriteBtnProps> = ({ size, color }) => {
  return (
    <div className="py-1 px-3 bg-blue-gray-500  hover:bg-blue-gray-700 rounded mr-2 cursor-pointer transition  flex items-center">
      {' '}
      <TfiWrite color={color} size={size} />
    </div>
  );
};
