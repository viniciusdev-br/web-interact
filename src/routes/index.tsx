import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

const router = createBrowserRouter([
    {
        path: '/login',
        element: (<Login />),
        index: true,
    },
    {
        path: '/',
        element: (<Home />),
    },
]);

export function Router() {
    return (
        <RouterProvider router={router} />
    );
}