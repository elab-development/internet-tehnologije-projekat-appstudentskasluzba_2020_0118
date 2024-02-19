import { Navigate, createBrowserRouter } from "react-router-dom"
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import Posts from "./views/Posts"
import PostForm from "./views/PostForm"
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import UserForm from "./views/UserForm";


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/posts' />
            },
            {
                path: '/posts',
                element: <Posts />
            },
            {
                path: '/posts/new',
                element: <PostForm key="postCreate" />
            },
            
            {
                path: '/posts/:id',
                element: <PostForm key="postUpdate" />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
])

export default router;