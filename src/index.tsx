import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Workspace } from './components/workspace/Workspace';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/:idNote',
        element: <Workspace />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);
