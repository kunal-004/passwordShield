const Navbar = () => {
  return (
    <nav className="bg-green-700 shadow-lg flex justify-between h-14 items-center px-4">
      <div className="flex items-center gap-2">
        <img src="/assets/shield-logo.svg" alt="logo" className="h-10 w-10" />
        <span className="font-bold text-lg text-white">PasswordShield</span>
      </div>
      <ul className="flex gap-6">
        <li>
          <a
            href="/"
            className="text-white hover:font-bold hover:text-gray-100 transition-all"
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="/"
            className="text-white hover:font-bold hover:text-gray-100 transition-all"
          >
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
