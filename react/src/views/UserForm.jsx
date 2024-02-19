import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext()
    const [user, setUser] = useState({
        id: null,
        role: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setUser(data);
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [])

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification("Korisnik je uspešno ažuriran!")
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        } else {
            axiosClient.post(`/users`, user)
                .then(() => {
                    setNotification("Korisnik je uspešno kreiran!")
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                })
        }
    };

    return (
        <>
            <header>
                {user.id ? <h1>Ažuriranje Korisnika: {user.name}</h1> : <h1>Novi Korisnik</h1>},
            </header>
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Učitavanje...</div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <select onChange={ev => setUser({ ...user, role: ev.target.value })} value={user.role} required>
                            <option value="">Izaberite ulogu</option>
                            <option value="student">Student</option>
                            <option value="profesor">Profesor</option>
                            <option value="admin">Admin</option>
                        </select>
                        <input onChange={ev => setUser({ ...user, name: ev.target.value })} value={user.name} placeholder="Ime" />
                        <input onChange={ev => setUser({ ...user, email: ev.target.value })} type="email" value={user.email} placeholder="E-mail" />
                        <input onChange={ev => setUser({ ...user, password: ev.target.value })} type="password" placeholder="Lozinka" />
                        <input onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} type="password" placeholder="Potvrda Lozinke" />
                        <button className="btn">Save</button>
                    </form>
                }
            </div>
        </>
    )
}