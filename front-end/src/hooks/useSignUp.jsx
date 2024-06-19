import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contenxt/AuthContext';
import axios from 'axios';

const useSignUp = (formData) => {
    const navigate = useNavigate();
    const { user, login } = useAuth();

    // Stato per mostrare gli errori
    const [showError, setShowError] = useState({ value: false, message: '' });

    // Stato per gli errori nei campi del form
    const [formError, setFormError] = useState({
        username: '',
        password: '',
        password2: '',
        email: '',
        name: '',
        surname: '',
        date: ''
    });

    // Gestisce l'invio della richiesta di signup
    const handleSubmit = async (e) => {
        e.preventDefault(); // Impedisce il comportamento predefinito del form

        let hasError = false;

        // Validazione dei campi del form
        const newErrorMessages = {
            password2: '',
            name: '',
            surname: '',
            date: '',
            usernameRegex: '',
            passwordRegex: '',
            passwordConfirm: '',
            emailRegex: '',
            dateValue: ''
        };

        // Regex patterns per la validazione
        const usernamePattern = /^[a-zA-Z0-9_]{6,}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        // Estrae i dati dal form
        const { username, password, password2, email, name, surname, date } = formData;

        // Controlla se tutti i campi sono stati compilati

        if (!usernamePattern.test(username)) {
            hasError = true;
            newErrorMessages.usernameRegex = "Username must contain only alphanumeric characters and underscores, and be at least 6 characters long";
        }

        if (!passwordPattern.test(password)) {
            hasError = true;
            newErrorMessages.passwordRegex = 'Password must be at least 8 characters long and contain letters, numbers, and special characters';
        }

        if (!password2) {
            hasError = true;
            newErrorMessages.password2 = 'Confirm password is required';
        }

        if (password !== password2) {
            hasError = true;
            newErrorMessages.passwordConfirm = 'Passwords do not match';
        }

        if (!emailPattern.test(email)) {
            hasError = true;
            newErrorMessages.emailRegex = 'Please enter a valid email address';
        }

        if (!name) {
            hasError = true;
            newErrorMessages.name = 'Name is required';
        }

        if (!surname) {
            hasError = true;
            newErrorMessages.surname = 'Surname is required';
        }

        if (!date) {
            hasError = true;
            newErrorMessages.date = 'Date of birth is required';
        }

        const today = new Date();
        const selectedDate = new Date(date);
        if (selectedDate > today) {
            hasError = true;
            newErrorMessages.dateValue = 'Date of birth cannot be in the future';
        }

        if (hasError) {
            setFormError(newErrorMessages);
            return;
        }

        // Invia la richiesta di signup
        try {
            const response = await axios.post('http://localhost:4000/api/auth/signup', {
                username: formData.username,
                password: formData.password,
                password2: formData.password2,
                email: formData.email,
                name: formData.name,
                surname: formData.surname,
                date: formData.date
            });
            
            if (response.data.success) {
                login(formData.username);  // Effettua l'autenticazione con token e reindirizzamento
                setShowError({ value: false, message: '' });
            } else {
                setShowError({ value: true, message: response.data.message });
            }

        } catch (error) {
            //setShowError({ value: true, message: error });
            console.error('Errore durante la richiesta di signup:', error);
        }
    }

    // Effettua il reindirizzamento alla home se l'utente è già autenticato
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return { showError, handleSubmit, formError }

}

export default useSignUp
