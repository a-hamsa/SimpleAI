import React, { useState, useEffect } from "react";
import About from "../components/Landing/About";
import Features from "../components/Landing/Features";
import GetStarted from "../components/Landing/GetStarted";
import Footer from "../components/Landing/Footer";
import Carousel from "../components/Landing/Carousel";
import { Link } from "react-router-dom";

function Index() {
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <nav className={`w-full p-4 transition-all duration-300 z-50`}>
        <ul className="flex justify-end gap-6">
          <li>
            <Link to="/" className="text-white hover:text-yellow-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-yellow-300">
              Login
            </Link>
          </li>
        </ul>
      </nav>
      <main className="pt-4 p-4">
        <Carousel />
        <section className="my-8">
          <About />
          <Features />
          <GetStarted />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Index;
