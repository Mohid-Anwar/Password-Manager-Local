import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white flex flex-col justify-center items-center bottom-0 sticky w-full">
      <div className="logo font-bold text-2xl">
        <span className="text-blue-500">&lt;</span>
        <span className="">Pass</span>
        <span className="text-blue-500">Local/&gt;</span>
      </div>

      <div className="flex justify-center items-center">
        Learning to Code{" "}
        <img className="w-7 m-2" src="icons/heart.png" alt="heart" /> &copy;
        Mohid Anwar
      </div>
    </footer>
  );
};

export default Footer;
