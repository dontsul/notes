import { FC, FunctionComponent, SVGProps, ComponentType } from 'react';

interface iconBtnProps {
  size: number;
  color: string;
  handleClick: () => void;
  element: ComponentType<{ size: number; color: string }>;
  status: boolean;
}

export const IconBtn: FC<iconBtnProps> = ({
  size,
  color,
  handleClick,
  element: Element,
  status,
}) => {
  return (
    <>
      <button
        onClick={() => {
          handleClick();
          console.log('click');
        }}
        disabled={!status}
        className={` py-1 px-3 bg-blue-gray-500  hover:bg-blue-gray-700 rounded mr-2 cursor-pointer transition flex items-center disabled:opacity-50 ${
          !status ? 'disabled:cursor-not-allowed disabled:bg-blue-gray-700' : ''
        }`}
      >
        <Element size={size} color={color} />
      </button>
    </>
  );
};
