import React, { useRef, useState, useEffect } from "react";
import { Bounce, Slide, Zoom } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const disabledRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);
  useEffect(() => {
    deleteCheck();
  }, [passwordArray]);

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
      toast.success("🦄 Save password success!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    } else {
      toast.error("🦄 Insufficient Length of site, username or password!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  const deleteAll = () => {
    let c = confirm("Are you sure you want to delete all passwords");
    if (c) {
      setPasswordArray([]);
      localStorage.setItem("passwords", JSON.stringify([]));
      toast.error("All passwords deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const deletePassword = (id) => {
    console.log("deleting with id", id);
    let c = confirm("Are you sure you want to delete");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast.info("🦄 Deleted Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  };
  const editPassword = (id) => {
    console.log("editing with id", id);
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id)); // Corrected function name
  };

  const copyText = (text) => {
    toast("🦄 Copied to Clipboard!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const deleteCheck = () => {
    if (disabledRef.current) {
      // Ensure the ref is not null
      disabledRef.current.disabled = passwordArray.length === 0; // Disable if passwordArray is empty
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
        containerId={uuidv4()}
      />
      {/* Same as */}
      <ToastContainer />
      {/* Container For Inputs */}
      {/* todo: BG transparent */}
      <div className="md:mycontainer p-2 min-h-[88.2vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-blue-500">&lt;</span>
          <span className="text-white">Pass</span>
          <span className="text-blue-500">Local/&gt;</span>
        </h1>
        <p className="text-blue-600 text-lg text-center">
          Your Password Manager (Local Storage Version)
        </p>
        {/* Container for inputs */}
        <div className=" flex flex-col p-4 gap-8 text-black items-center">
          <input
            className="rounded-full border border-blue-400 w-full p-4 py-1"
            type="url"
            name="site"
            id="site"
            placeholder="Enter Website url"
            value={form.site}
            onChange={handleChange}
          />

          <div className="flex flex-col md:flex-row justify-between gap-8 w-full">
            <input
              className="rounded-full border border-blue-400 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
            />

            <div className="relative">
              <input
                className="rounded-full border border-blue-400 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                ref={passwordRef}
              />
              <span
                className=" absolute text-blue-400 right-[3px] top-[2px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center gap-4 items-center bg-blue-400 rounded-full px-8 py-2 w-fit hover:bg-blue-300 hover:border-4 border-blue-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover" // Use 'hover' trigger
              className=""
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl py-4 text-white my-5">
              Your Passwords
            </h2>

            <button
              onClick={() => {
                deleteAll();
                deleteCheck();
              }}
              className="flex justify-center gap-1 items-center bg-red-400 rounded-full px-3 py-2 my-5 w-fit hover:bg-red-300 hover:border-4 border-red-900 disabled:bg-slate-500 *:disabled:opacity-50 disabled:hover:border-0"
              ref={disabledRef}
            >
              {passwordArray.length !== 0 && (
                <lord-icon
                  src="https://cdn.lordicon.com/skkahier.json"
                  trigger="hover"
                  className=""
                ></lord-icon>
              )}
              Delete All
            </button>
          </div>
          {passwordArray.length === 0 && (
            <div className="text-white">No Passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <div className="overflow-x-auto">
              <table className="sm:table-fixed xs:table-fixed table-auto min-w-full text-white  sm:overflow-visible overflow-hidden rounded-md mb-10">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-[#7244ed66]">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center ">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                  fill: "white",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                colors="primary:#3080e8,secondary:#b4b4b4"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center ">
                            <span>{item.username}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                colors="primary:#3080e8,secondary:#b4b4b4"
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center ">
                            <span>{item.password}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                colors="primary:#3080e8,secondary:#b4b4b4"
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="justify-center py-2 border border-white text-center">
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                              colors="primary:#3080e8,secondary:#b4b4b4"
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                              colors="primary:#3080e8"
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
