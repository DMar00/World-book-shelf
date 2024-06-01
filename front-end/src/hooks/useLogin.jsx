import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contenxt/AuthContext'
import axios from 'axios'


const useLogin = (formData) => {
    const navigate = useNavigate();

    //dati da localstorage
    const { user, login } = useAuth();

    //eventuali errori sul login
    const [showError, setShowError] = useState({ value: false, message: '' });


    //invio richiesta per login al submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', {
                username: formData.username,
                password: formData.password
            });

            if(response.data.success){
                login(formData.username);  //effettua autenticazione con token e reidirizzamento
                setShowError({value: false, message: ''});
            }else{
                setShowError({value: true, message: response.data.message});
            }

        } catch (error) {
            console.error('Errore durante la richiesta di login:', error);
        }
    }


    // Reindirizza alla home se l'utente è già autenticato
    useEffect(() => {
        if (user) {
            navigate('/'); 
        }
    }, [user, navigate]);

    
    return { showError, handleSubmit }
}
export default useLogin