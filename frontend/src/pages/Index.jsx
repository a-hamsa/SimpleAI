import React from "react";
import Header from "../components/Landing/Header";
import About from "../components/Landing/About";
import Features from "../components/Landing/Features";
import GetStarted from "../components/Landing/GetStarted";
import Footer from "../components/Landing/Footer";

function Index() {
  return (
    <>
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
