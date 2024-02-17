import { Link } from "react-router-dom";

export default function Signup() {

    const onSubmit = (ev) => {
        ev.preventDefault();
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Registrujte se</h1>
                    <input type="email" placeholder="Ime i Prezime" />
                    <input type="email" placeholder="E-mail Adresa" />
                    <input type="password" placeholder="Lozinka" />
                    <input type="password" placeholder="Potvrda Lozinke" />
                    <button className="btn btn-block">Prijava</button>
                    <p className="message">
                        Već ste registrovani? <Link to="/login">Prijavite se.</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}