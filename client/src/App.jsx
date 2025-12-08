import React, { useContext } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'

const App = () => {
  const {authUser} = useContext(AuthContext)
  return (
    <div className='min-h-screen bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900 text-gray-100'>
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> :<Navigate to="/login"/>} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" /> } />
      </Routes>
    </div>
  )
}

export default App
