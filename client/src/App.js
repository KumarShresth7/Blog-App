import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import BlogList from './components/BlogList'
import NewPost from './components/NewPost'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token)
      setToken(token)
  }, [])


  return (
    <Router>
      <Routes>
        <Route path="/" element={token?<BlogList setToken={setToken}/> :<Navigate to='/login'/>}/>
        <Route path="/new" element={token ? <NewPost token={token} /> : <Navigate to="/login" />} />
        <Route path="/login" element={!token ? <Login setToken={setToken}/> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register setToken={setToken}/> : <Navigate to="/"/>}/>
      </Routes>
    </Router>
  )
}

export default App
