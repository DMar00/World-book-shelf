import React, { useState } from 'react';
import useSignUp from '../../hooks/useSignUp';
import { Container } from 'react-bootstrap';
import './Signup.css'
import '../../css/auth.css';

const Signup = () => {
    // Dati inseriti nel form
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password2: '',
        email: '',
        name: '',
        surname: '',
        date: ''
    });

    // Gestione dei cambiamenti nei campi del form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Utilizzo del custom hook per la gestione della registrazione
    const { showError, handleSubmit, formError } = useSignUp(formData);

    return (
        <div className='page'>
            <Container className='d-flex align-items-center justify-content-center'>
                <div className='box'>
                    <h3>Sign Up</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input type='text' name='username' value={formData.username} onChange={handleChange} />
                        <span className='error-mex'>{formError.usernameRegex}</span>

                        <label>Email</label>
                        <input type='email' name='email' value={formData.email} onChange={handleChange} />
                        <span className='error-mex'>{formError.emailRegex}</span>

                        <div className='name-surname'>
                            <div className='d-flex flex-column'>
                                <label>Name</label>
                                <input type='text' name='name' value={formData.name} onChange={handleChange} />
                                <span className='error-mex'>{formError.name}</span>
                            </div>
                            <div className='d-flex flex-column'>
                                <label>Surname</label>
                                <input type='text' name='surname' value={formData.surname} onChange={handleChange} />
                                <span className='error-mex'>{formError.surname}</span>
                            </div>
                        </div>

                        <label>Date</label>
                        <input type='date' name='date' value={formData.date} onChange={handleChange} />
                        <span className='error-mex'>{formError.date}</span>
                        <span className='error-mex'>{formError.dateValue}</span>

                        <label>Password</label>
                        <input type='password' name='password' value={formData.password} onChange={handleChange} />
                        <span className='error-mex'>{formError.passwordRegex}</span>

                        <label>Ripeti password</label>
                        <input type='password' name='password2' value={formData.password2} onChange={handleChange} />
                        <span className='error-mex'>{formError.password2}</span>
                        <span className='error-mex'>{formError.passwordConfirm}</span>

                        <div className='d-flex align-items-center justify-content-center'>
                            <button type='submit' className='btn-t1'>Sign Up</button>
                        </div>
                    </form>
                    <div className='switch-operation'>
                        <hr />
                        <p>Already have an account?</p>
                        <a href='/login'>Login</a>
                    </div>
                    {
                        showError.value && <p>Error : {showError.message}</p>
                    }
                </div>
            </Container>
        </div>
    );
}

export default Signup;

