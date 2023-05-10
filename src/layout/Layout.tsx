import { Header } from '../components/header/Header';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Workspace } from '../components/workspace/Workspace';

export const Layout = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 ">
      <Header />
      <Sidebar />
      <Workspace />
    </div>
  );
};
