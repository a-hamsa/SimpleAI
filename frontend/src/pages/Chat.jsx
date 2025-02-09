import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Chat/Sidebar';
import Bot from '../components/Chat/Bot';
import History from '../components/Chat/History';
import Swal from 'sweetalert2';
import { FaBars, FaTimes } from 'react-icons/fa';

function Chat() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [historyTrigger, setHistoryTrigger] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOutsideClick = (e) => {
    if (isSidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.open-sidebar-button')) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Unauthorized',
        text: 'Please login first',
        icon: 'warning',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/login');
      });
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row relative">
      {!isSidebarOpen && (
        <button
          className="md:hidden p-2 bg-blue-600 text-white fixed top-2 left-2 z-20 open-sidebar-button"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars />
        </button>
      )}
      <div className={`md:block ${isSidebarOpen ? 'block' : 'hidden'} md:relative fixed top-0 left-0 h-full sidebar z-30`}>
        <Sidebar
          onHistoryClick={(history) => setSelectedHistory(history)}
          onChatClick={() => setSelectedHistory(null)}
          historyTrigger={historyTrigger}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      <div className={`flex-1 ${isSidebarOpen ? 'blur-sm' : ''}`}>
        {selectedHistory ? (
          <History history={selectedHistory} />
        ) : (
          <Bot onNewMessage={() => setHistoryTrigger(prev => prev + 1)} />
        )}
      </div>
    </div>
  );
}

export default Chat;
