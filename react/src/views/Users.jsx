import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Users() {
    const [currentUserRole, setCurrentUserRole] = useState()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext()
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                if (data.role !== 'admin') {
                    navigate('/news');
                } else {
                    getUsers();
                }
            });
    }, [])

    const onDelete = (u) => {
        if (currentUserRole === 'admin' && !window.confirm("Da li ste sigurni da želite obrisati korisnika?")) {
            return
        }
        axiosClient.delete(`/users/${u.id}`)
            .then(() => {
                setNotification("Korisnik je uspešno obrisan!")
                getUsers()
            })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false)
                console.log(data);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Korisnici</h1>
                <Link to="/users/new" className='btn-add'>Dodaj Novog Korisnika</Link>
            </header>
            <div className='card animated fadeInDown'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Uloga</th>
                            <th>Ime i Prezime</th>
                            <th>E-mail</th>
                            <th>Datum Kreiranja</th>
                            <th></th>
                        </tr>
                    </thead>
                    {loading &&
                        <tbody>
                            <tr>
                                <td colSpan='5' className='text-center'>
                                    Učitavanje...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.role.charAt(0).toUpperCase() + u.role.slice(1)}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                        <Link to={'/users/' + u.id} className='btn-edit'>Izmeni</Link>
                                        &nbsp;
                                        <button onClick={ev => onDelete(u)} className='btn-delete'>Ukloni</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
                <div style={{ padding: '20px 10px', display: 'flex', justifyContent: 'start', alignContent: 'center' }}>
                    <Link to={'/users/'} className='btn-edit'>Prethodna Strana</Link>
                    &nbsp;
                    <Link to={'/users/'} className='btn-edit'>Naredna Strana</Link>
                </div>
            </div>
        </div>
    )
}