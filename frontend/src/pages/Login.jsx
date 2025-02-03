import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import Swal from 'sweetalert2'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await api.post('Auth/login', { username, password })
      localStorage.setItem('token', response.data.token)
      Swal.fire({
        title: 'Success!',
        text: 'Login successful!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/chat')
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Login failed!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
