import { Link } from "react-router-dom";

export default function Login() {

    const onSubmit = (ev) => {
        ev.preventDefault();
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Prijavite se na profil</h1>
                    <input type="email" placeholder="E-mail" />
                    <input type="password" placeholder="Lozinka" />
                    <button className="btn btn-block">Prijava</button>
                    <p className="message">
                        Nemate profil? <Link to="/signup">Registrujte.</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}