import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";

export default function GuestLayout() {
    const { token } = useStateContext()

    if (token) {
        return <Navigate to="/" />
    }

    return (
        <div id="defaultLayout">
            <div className="content">
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}