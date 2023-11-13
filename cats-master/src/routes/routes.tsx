import { createBrowserRouter } from 'react-router-dom';
import App from '../components/App';
import { Cat } from '../components/Cat/Cat';
import { CatForm } from '../components/CatForm/CatForm';
import { CatsList } from '../components/CatsList/CatsList';

export const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    children: [
      { path: 'cats', element: <CatsList /> },
      { path: 'cats/:id', element: <Cat /> },
      {
        path: 'add',
        element: <CatForm />,
      },
    ],
  },
]);
