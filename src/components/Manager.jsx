import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [Inputform, setInputform] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [passwordsArray, setPasswordsArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordsArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = async () => {
    if (
      Inputform.site.length > 3 &&
      Inputform.username.length > 3 &&
      Inputform.password.length > 3
    ) {
      // If any such id exists in the db, delete it
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Inputform.id }),
      });

      setPasswordsArray([...passwordsArray, { ...Inputform, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Inputform, id: uuidv4() }),
      });

      // Otherwise clear the form and show toast
      setInputform({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password not saved!");
    }
  };

  const deletePassword = async (id) => {
    let cf = confirm("Do you really want to delete the password");
    if (cf) {
      setPasswordsArray(passwordsArray.filter((item) => item.id !== id));
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    }
  };

  const editPassword = (id) => {
    toast.info("Edit the fields above!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setInputform({
      ...passwordsArray.filter((item) => item.id === id)[0],
      id: id,
    });
    setPasswordsArray(passwordsArray.filter((item) => item.id !== id));
  };

  const ref = useRef();
  const PasswordRef = useRef();
  function showPasswordClick() {
    PasswordRef.current.type = "password";
    if (ref.current.src.includes("/assets/eye.svg")) {
      ref.current.src = "/assets/eyecross.png";
      PasswordRef.current.type = "password";
    } else {
      ref.current.src = "/assets/eye.svg";
      PasswordRef.current.type = "text";
    }
  }

  const handelChange = (e) => {
    setInputform({ ...Inputform, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast.success("Copied to clipboard!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="bg-green-200 text-green-900">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="relative">
        <div className="container mx-auto bg-green-500 p-8 rounded-lg shadow-lg max-w-4xl mt-12 sm:p-6 sm:mt-10 md:p-8 md:mt-12 lg:max-w-4xl">
          <h1 className="text-white text-4xl font-bold text-center mb-4 flex items-center justify-center gap-2">
            PasswordShield
          </h1>
          <h2 className="text-green-100 text-lg text-center mb-8">
            Your own Password Manager
          </h2>

          {/* Form Section */}
          <div className="relative">
            {/* Background with grid pattern and radial gradient */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#e0ffe0_1px,transparent_1px),linear-gradient(to_bottom,#e0ffe0_1px,transparent_1px)] bg-[size:6rem_4rem]">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#B8FFCC,transparent)]"></div>
            </div>

            {/* Main form container with border */}
            <div className="container mx-auto bg-green-600 p-8 rounded-lg shadow-lg border-4 border-green-300  max-w-4xl mt-12 relative">
              {/* Form */}
              <div className="text-white flex flex-col space-y-6 items-center w-full">
                <input
                  value={Inputform.site}
                  onChange={handelChange}
                  name="site"
                  className="rounded-full px-4 py-2 w-full max-w-lg bg-green-300 text-green-900 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  placeholder="Add website URL"
                />

                <div className="flex flex-col md:flex-row gap-5 w-full max-w-lg">
                  <div className="flex flex-col md:flex-row w-full gap-5 relative">
                    <input
                      value={Inputform.username}
                      onChange={handelChange}
                      name="username"
                      type="text"
                      className="rounded-full px-4 py-2 flex-grow bg-green-300 text-green-900 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                      placeholder="Username"
                    />

                    <div className="relative w-1/3">
                      <input
                        ref={PasswordRef}
                        value={Inputform.password}
                        onChange={handelChange}
                        name="password"
                        type="text"
                        className="rounded-full px-4 py-2 w-full bg-green-300 text-green-900 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 pr-12"
                        placeholder="Password"
                      />
                      <span
                        className="absolute right-4 inset-y-0 flex items-center cursor-pointer"
                        onClick={showPasswordClick}
                      >
                        <img
                          ref={ref}
                          src="/assets/eye.svg"
                          alt="eye icon"
                          className="h-6 w-6"
                        />
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="bg-green-800 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 flex justify-center items-center gap-1 group"
                  onClick={savePassword}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                    trigger="hover"
                    className="group-hover: trigger"
                  ></lord-icon>
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* data table  */}
          <div className="passwords bg-green-500 pt-10 rounded-lg shadow-lg ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <div className="pb-4 bg-green-100 dark:bg-green-800 p-4 rounded-lg shadow-md">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-green-600 dark:text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    className="block w-full py-2 pl-10 pr-3 text-sm text-white border border-green-300 rounded-lg  focus:ring-green-500 focus:border-green-500 dark:bg-gray-800"
                    placeholder="Search for site..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
              {passwordsArray.length === 0 && (
                <div className="flex justify-center items-center">
                  {" "}
                  No passwords to show
                </div>
              )}
              {passwordsArray.length != 0 && (
                <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                  <thead className="bg-green-800 text-white">
                    <tr>
                      <th className="py-2">Site</th>
                      <th className="py-2">Username</th>
                      <th className="py-2">Password</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-green-900">
                    {passwordsArray
                      .filter((item) =>
                        item.site.toLowerCase().includes(searchTerm)
                      )
                      .map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="py-2 border border-white text-center relative">
                              <div className="flex items-center justify-center">
                                <a
                                  href={item.site}
                                  target="_blank"
                                  className="truncate text-green-200 hover:text-green-700 font-semibold underline decoration-dotted decoration-green-500 hover:decoration-wavy transition-all duration-200"
                                >
                                  {highlightText(item.site, searchTerm)}
                                </a>
                              </div>
                            </td>

                            <td className="py-2 border border-white text-center relative">
                              <div className="flex flex-wrap md:flex-nowrap  items-center justify-center">
                                <span>{item.username}</span>

                                <div
                                  className="absolute right-0 pr-2 cursor-pointer hidden sm:block"
                                  onClick={() => {
                                    copyText(item.username);
                                  }}
                                >
                                  <lord-icon
                                    style={{
                                      width: "25px",
                                      height: "25px",
                                    }}
                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                    trigger="hover"
                                  ></lord-icon>
                                </div>
                              </div>
                            </td>

                            <td className="py-2 border border-white text-center relative ">
                              <div className="flex flex-wrap md:flex-nowrap items-center justify-center">
                                <span className="truncate w-full md:w-auto">
                                  {item.password}
                                </span>

                                <div
                                  className="absolute right-0 pr-2 cursor-pointer hidden sm:block"
                                  onClick={() => {
                                    copyText(item.password);
                                  }}
                                >
                                  <lord-icon
                                    style={{
                                      width: "25px",
                                      height: "25px",
                                    }}
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
                                ></lord-icon>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* table end */}
        </div>
      </div>
    </>
  );
};

export default Manager;
