import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Error from './pages/Error.jsx';
import Root from './pages/Root.jsx';
import NewList from './pages/NewList.jsx';
import List from './components/List.jsx';
import { listLoader, rootLoader } from './server.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: '',
                element: <Navigate to={'/home'} replace={true} />,
            },
            {
                path: '/home',
                loader: rootLoader,
                element: <App />,
            },
            {
                path: '/new',
                element: <NewList />,
            },
            {
                path: '/lists/:id',
                loader: listLoader,
                element: <List />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
