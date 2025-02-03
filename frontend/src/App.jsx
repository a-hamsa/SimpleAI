import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Index from './pages/Index'
import Login from './pages/Login'
import Chat from './pages/Chat'

import './App.css'
import 'tailwindcss/tailwind.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white">Home</Link>
          </li>
          <li>
            <Link to="/login" className="text-white">Login</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  )
}

export default App
