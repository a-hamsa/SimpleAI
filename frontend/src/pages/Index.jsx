import React, { useState, useEffect } from "react";
import About from "../components/Landing/About";
import Features from "../components/Landing/Features";
import GetStarted from "../components/Landing/GetStarted";
import Footer from "../components/Landing/Footer";
import Carousel from "../components/Landing/Carousel";
import { Link } from 'react-router-dom';

function Index() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full p-4 shadow-lg transition-all duration-300 z-50 ${isScrolled ? 'bg-opacity-70 bg-gray-900' : 'bg-gradient-to-r from-purple-500 to-blue-500'}`}>
        <ul className="flex justify-between">
          <li>
            <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
          </li>
          <li className="ml-auto">
            <Link to="/login" className="text-white hover:text-yellow-300">Login</Link>
          </li>
        </ul>
      </nav>
      <main className="pt-16 p-4">
        <Carousel />
        <section className="my-8">
          <About />
          <Features />
          <GetStarted />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Index;
