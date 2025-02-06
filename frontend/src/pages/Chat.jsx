import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Chat/Sidebar';
import Bot from '../components/Chat/Bot';
import History from '../components/Chat/History';
import Swal from 'sweetalert2';

function Chat() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHistory, setSelectedHistory] = useState(null);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar
        onHistoryClick={(history) => setSelectedHistory(history)}
        onChatClick={() => setSelectedHistory(null)}
      />
      <div className="flex-1">
        {selectedHistory ? (
          <History history={selectedHistory} />
        ) : (
          <Bot />
        )}
      </div>
    </div>
  );
}

export default Chat;
