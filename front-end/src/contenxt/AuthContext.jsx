import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const login = (username) => {
        setUser({ username });
        localStorage.setItem('user', JSON.stringify({ username }));

        // Reindirizza alla pagina Account dopo il login
        const params = new URLSearchParams({ username });
        navigate(`/account?${params.toString()}`);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate(`/`);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);