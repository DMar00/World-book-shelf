import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contenxt/AuthContext'
import axios from 'axios'

const useSignUp = (formData) => {
    const navigate = useNavigate();

    //dati da localstorage
    const { user, login } = useAuth();

    //eventuali errori sul login
    const [showError, setShowError] = useState({ value: false, message: '' });

    //invio richiesta per login al submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/signup', {
                username: formData.username,
                password: formData.password,
                password2:formData.password2,
                email: formData.email,
                name:formData.name,
                surname:formData.surname,
                date:formData.date
            });

            if(response.data.success){
                login(formData.username);  //effettua autenticazione con token e reidirizzamento
                setShowError({value: false, message: ''});
            }else{
                setShowError({value: true, message: response.data.message});
            }

        } catch (error) {
            console.error('Errore durante la richiesta di signup:', error);
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

export default useSignUp
