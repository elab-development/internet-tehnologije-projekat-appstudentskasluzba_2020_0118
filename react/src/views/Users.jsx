import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from "../axios-client";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUsers();
    }, [])

    const onDelete = (u) => {
        if (!window.confirm("Da li ste sigurni da želite obrisati korisnika?")) {
            return
        }
        axiosClient.delete(`/users/${u.id}`)
            .then(() => {
                //TODO prikazi notifikaciju
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Korisnici</h1>
                <Link to="/users/new" className='btn-add'>Dodaj</Link>
            </div>
            <div className='card animated fadeInDown'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ime</th>
                            <th>E-mail</th>
                            <th>Datum Kreiranja</th>
                            <th>Akcije</th>
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
            </div>
        </div>
    )
}