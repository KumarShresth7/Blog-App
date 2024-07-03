import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import BlogList from './components/BlogList'
import NewPost from './components/NewPost'
import Login from './pages/Login'
import Register from './pages/Register'

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
        <Route path="/" element={<BlogList />} />
        <Route path="/new" element={token ? <NewPost token={token} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
      </Routes>
    </Router>
  )
}

export default App
