import React, {useState} from 'react'
import useLogin from '../../hooks/useLogin'
import { Container } from 'react-bootstrap'
import '../../css/auth.css'


const Login = () => {
    //dati inseriti nel form
    const [formData, setFormData] = useState({
        username: '',
        password:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    }

    const { showError, handleSubmit } = useLogin(formData);

    return (
        <div className='page'>
            <Container className='d-flex align-items-center justify-content-center'>
                <div className='box'>
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input type='text' name='username'  value={formData.username} onChange={handleChange}/>
                        
                        <label>Password</label>
                        <input type='password' name='password'  value={formData.password} onChange={handleChange}/>
                        
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            {showError.value ? <span className='error-mex'>{showError.message} </span> : <span></span>}
                            <button type='submit' className='btn-t1'>Login</button>
                        </div>
                    </form>
                    <div className='switch-operation'>
                        <hr/>
                        <p>New to WorldBookShelf ?</p>
                        <a href='/signup'>Sign Up</a>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Login
