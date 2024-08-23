import { useState } from "react";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Background from "./components/Background";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Background />
      <Navbar />
      <div className="min-h-[88vh]">
        <Manager />
      </div>

      <Footer />
    </>
  );
}

export default App;
