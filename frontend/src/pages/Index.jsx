import React from "react";
import Header from "../components/Landing/Header";
import About from "../components/Landing/About";
import Features from "../components/Landing/Features";
import GetStarted from "../components/Landing/GetStarted";
import Footer from "../components/Landing/Footer";
import { Link } from 'react-router-dom'

function Index() {
  return (
    <>
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
      <Header />
      <main className="p-4">
        <About />
        <Features />
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}

export default Index;
