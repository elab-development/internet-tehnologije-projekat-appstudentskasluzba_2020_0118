import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx"
import { useEffect } from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    return (
        <div id="defaultLayout">
            <aside>
                <img src="/logo-512.png" alt="" />
                <h1 style={{ color: 'white' }}> {user.role.charAt(0).toUpperCase() + user.role.slice(1)} <br /> {user.name}</h1>
                <Link to="/posts">Vesti</Link>
                {user.role === 'admin' &&
                    <>
                        <Link to="/users">Korisnici</Link>
                    </>
                }
                <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
            </aside>
            <div className="content">
                <main>
                    <Outlet />
                </main>
            </div>
            {notification &&
                <div className="notification">
                    {notification}
                </div>
            }
        </div>
    )
}