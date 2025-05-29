import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isContactCreated, setIsContactCreated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser))
        }
        setLoading(false);
    }, [])

    const login = ((newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData))
    })

    const logout = (() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        navigate('/login')
    })

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, isContactCreated, setIsContactCreated }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext