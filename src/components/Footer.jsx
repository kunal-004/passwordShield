const Footer = () => {
  return (
    <div className="bg-green-800 text-gray-300 mt-10 py-3 w-full flex flex-col justify-center items-center space-y-2">
      <div className="flex items-center space-x-1">
        <img src="/assets/shield-logo.svg" alt="logo" className="h-8 w-8" />
        <span className="font-bold text-xl text-white">PasswordShield</span>
      </div>

      <div className="flex justify-center items-center text-sm text-gray-400">
        © {new Date().getFullYear()} Created by kunal
      </div>

      <div className="text-xs text-gray-300">All rights reserved.</div>
    </div>
  );
};

export default Footer;
