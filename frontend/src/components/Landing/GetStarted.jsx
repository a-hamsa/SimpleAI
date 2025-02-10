import React from 'react';
import Swal from 'sweetalert2';

function GetStarted() {
  const handleClick = () => {
    Swal.fire({
      title: 'Coming Soon!',
      text: 'Chatbot coming soon!',
      icon: 'info',
      confirmButtonText: 'OK'
    });
  };

  return (
    <section className="my-8 text-center">
      <h2 className="text-3xl font-bold text-purple-700">Get Started</h2>
      <button 
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded mt-4 hover:from-purple-700 hover:to-blue-700"
        onClick={handleClick}
      >
        Start Chatting
      </button>
    </section>
  );
}

export default GetStarted;