import { createBrowserRouter } from "react-router-dom";
import Login from "./views/login.jsx";
import Register from "./views/register.jsx";
import Users from "./views/users.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import Create from "./views/Create.jsx";
import Vision3D from "./views/Vision3D.jsx";
import Chat from "./views/Chat.jsx";
import Contact from "./views/Contact.jsx";
import Home from "./views/Home.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/create',
                element: <Create />,
            },
            {
                path: '/3d-vision',
                element: <Vision3D />,
            },
            {
                path: '/chat',
                element: <Chat />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />
            },
        ],
    },
]);

export default router;