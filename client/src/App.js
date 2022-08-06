import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import SetAvatar from './pages/SetAvatar'

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Chat/>} index/>
            <Route path='/login' element={<Login/>} index/>
            <Route path='/register' element={<Register/>} index/>
            <Route path='/set-avatar' element={<SetAvatar/>} index/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
}
