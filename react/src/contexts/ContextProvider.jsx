import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => { },
    setToken: () => { },
    setNotification: () => { },
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    const setToken = (newToken) => {
        _setToken(newToken)
        if (newToken) {
            localStorage.setItem('ACCESS_TOKEN', newToken);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)