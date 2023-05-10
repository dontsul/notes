import { AddBtn } from '../iconBtns/AddBtn';
import { DeleteBtn } from '../iconBtns/DeleteBtn';
import { WriteBtn } from '../iconBtns/WriteBtn';
import { SearchBox } from '../searchBox/SearchBox';

export const Header = () => {
  return (
    <div className="bg-gray-800 text-white px-4 py-2 md:col-span-3">
      <div className="flex justify-between flex-col md:flex-row">
        <div className="flex mb-2 md:mb-0">
          <AddBtn />
          <DeleteBtn />
          <WriteBtn />{' '}
        </div>
        <div>
          <SearchBox />
        </div>
      </div>
    </div>
  );
};
