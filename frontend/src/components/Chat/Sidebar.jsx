import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import HistoryButton from './HistoryButton';
import Swal from 'sweetalert2';

const Sidebar = ({ onHistoryClick, onChatClick, historyTrigger }) => {
  const [histories, setHistories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistories();
  }, [historyTrigger]);

  const fetchHistories = async () => {
    try {
      const response = await api.get('History');
      setHistories(response.data);
    } catch (error) {
      console.error('Error fetching histories:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed && id) {
        await api.delete(`History/${id}`);
        await fetchHistories();
        Swal.fire(
          'Deleted!',
          'Your history has been deleted.',
          'success'
        );
      }
    } catch (error) {
      console.error('Error details:', error.response?.data);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to delete history',
        icon: 'error'
      });
    }
  };

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out of the application",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!'
      });

      if (result.isConfirmed) {
        await api.post('Auth/logout');
        localStorage.removeItem('token');
        navigate('/login');
        Swal.fire(
          'Logged Out!',
          'You have been successfully logged out.',
          'success'
        );
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Logout failed!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <button
        onClick={onChatClick}
        className="mb-4 p-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        New Chat
      </button>
      
      <div className="flex-1 overflow-y-auto">
        {histories.map((history) => (
          <HistoryButton
            key={history.key}
            history={history}
            onClick={() => onHistoryClick(history)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 p-2 bg-red-600 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
