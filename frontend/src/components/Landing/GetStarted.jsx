import React from 'react'
import Swal from 'sweetalert2'

function GetStarted() {
  const handleClick = () => {
    Swal.fire({
      title: 'Coming Soon!',
      text: 'Chatbot coming soon!',
      icon: 'info',
      confirmButtonText: 'OK'
    })
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold">Get Started</h2>
      <button 
        className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
        onClick={handleClick}
      >
        Start Chatting
      </button>
    </section>
  )
}

export default GetStarted