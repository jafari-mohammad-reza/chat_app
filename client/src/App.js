import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'
import HomePage from './pages/Chat'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Chat/>} index/>
      <Route path='/login' element={<Login/>} index/>
      <Route path='/register' element={<Register/>} index/>
      <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}
