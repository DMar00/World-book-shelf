import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Account from './pages/account/Account'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'
import './App.css'
import './css/input.css'
import './css/buttons.css'
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {
  return (
    <div className='app'>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/account' element={<Account/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
