import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    // Funzione per verificare se l'utente esiste nel database
    const checkUserInDatabase = async (username) => {
        try {
            const response = await axios.post('http://localhost:4000/api/user/existUser', { username });
            return response.data.success; // Supponendo che il server risponda con { exists: true/false }
            
        } catch (error) {
            console.error('Errore durante la verifica dell\'utente:', error);
            return false;
        }
    };

    // Verifica l'utente al montaggio del componente
    useEffect(() => {
        const verifyUser = async () => {
            if (user) {
                const userExists = await checkUserInDatabase(user.username);
                if (!userExists) {
                    logout();
                }
            }
        };
        verifyUser();
    }, []); // Esegui una sola volta al montaggio

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