import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">
        <div className="logo font-bold text-2xl flex">
          <img className="w-7" src="/public/favicon.svg" alt="" />
          <span className="text-blue-500">&lt;</span>
          <span className="">Pass</span>
          <span className="text-blue-500">Local/&gt;</span>
        </div>
        {/* <ul className="flex gap-4 list-none m-0 p-0">
          <li>
            <a className="hover:font-bold" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="hover:font-bold" href="#">
              Icon 1
            </a>
          </li>
          <li>
            <a className="hover:font-bold" href="#">
              Icon 2
            </a>
          </li>
        </ul> */}
        <a target="_blank" href="https://github.com/Mohid-Anwar">
          <button className=" text-white bg-slate-600 my-5 rounded-full flex items-center justify-between ring-1 ring-white">
            <img
              src="icons/github.svg"
              alt="github logo"
              className="invert w-10 p-1"
            />
            <span className="font-bold px-2">Github</span>
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
