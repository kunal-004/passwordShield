import { useRef } from "react";

const Manager = () => {
  const ref = useRef();
  function showPasswordClick() {
    // alert("password");
    if (ref.current.src.includes("/assets/eye.svg")) {
      ref.current.src = "/assets/eyecross.png";
    } else {
      ref.current.src = "/assets/eye.svg";
    }
  }
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0fff0_1px,transparent_1px),linear-gradient(to_bottom,#f0fff0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#E6FFE6,transparent)]"></div>
        </div>

        <div className="container mx-auto bg-green-500 p-8 rounded-lg shadow-lg max-w-4xl mt-12">
          <h1 className="text-white text-4xl font-bold text-center mb-4 flex items-center justify-center gap-2">
            PasswordShield
          </h1>
          <h2 className="text-green-100 text-lg text-center mb-8">
            Your own Password Manager
          </h2>

          {/* Form Section */}
          <div className="text-white flex flex-col items-center space-y-6">
            <input
              className="rounded-full px-4 py-2 w-full max-w-lg bg-green-300 text-green-900 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
              placeholder="Add website URL"
            />

            <div className="flex gap-5 w-full max-w-lg">
              <div className="flex w-full gap-5 relative">
                <input
                  type="text"
                  className="rounded-full px-4 py-2 flex-grow bg-green-300 text-green-900 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Username"
                />

                <div className="relative w-1/3">
                  <input
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

            <button className="bg-green-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 flex justify-center items-center gap-1 group">
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
                className="group-hover: trigger"
              ></lord-icon>
              Add Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
