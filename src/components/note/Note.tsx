import { Link, useParams } from 'react-router-dom';

export const Note = () => {
  let { id } = useParams();

  return (
    <li className="py-3 border-b border-blue-gray-100 border-collapse px-4 hover:bg-blue-gray-50 ">
      <Link className="block h-full" to={`/${id}`}>
        <h2 className="text-lg font-semibold mb-2">Note title some text</h2>
        <div className="grid grid-cols-6 py-1">
          <div className="flex items-center text-sm col-span-2 lg:col-span-1 font-semibold">
            12:17 PM
          </div>
          <div className="flex items-center col-span-4 lg:col-span-5 line-clamp-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam exercitationem deserunt
            pariatur doloremque architecto sequi rem eligendi unde vero voluptate voluptatum
            excepturi tenetur corrupti voluptates soluta, maxime id recusandae dolor!
          </div>
        </div>
      </Link>
    </li>
  );
};
