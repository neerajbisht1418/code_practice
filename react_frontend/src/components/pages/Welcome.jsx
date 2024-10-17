import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-white">
      <div className="text-center p-10 bg-white bg-opacity-10 rounded-3xl shadow-lg backdrop-filter backdrop-blur-lg">
        <h1 className="text-6xl font-bold mb-4">Welcome!</h1>
        <p className="text-xl mb-6">
          We're glad to have you here. Start exploring the amazing features by logging in or creating an account.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
