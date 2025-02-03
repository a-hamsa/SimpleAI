import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import Swal from 'sweetalert2'

function Chat() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post('Auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      localStorage.removeItem('token')
      Swal.fire({
        title: 'Success!',
        text: 'Logout successful!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/login')
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Logout failed!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Chat Page</h2>
      <button
        className="bg-red-600 text-white py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default Chat
