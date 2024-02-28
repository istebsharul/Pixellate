//Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";


const Login = () => {
  const [email, setEmail] = useState(""); // Changed from username to email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if email is empty
    if (!email.trim()) {
      toast.error("Email field cannot be empty.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/user/login', {
        email: email,
        password: password
      },
      {
        withCredentials: true
      }
      );

      // console.log(response);

      if (response.error) {
        toast.error(response.error)
      }

      // Redirect to user profile
      navigate('/profile');

      // Show a success toast
      toast.success('Login Successful. Welcome!');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response.status === 401) {
        toast.error("Entered Password is Wrong!");
      } else if (error.response.status === 400) {
        toast.error("Empty password. Please enter your password.");
      } else if (error.response.status === 500) {
        toast.error("Error signing JWT");
      } else {
        toast.error("An error occurred. Please try again later.");
        // console.error(error);
      }
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-white-50">
      <div className="w-full max-w-xs bg-slate-300">
        <form
          className="bg-white-500 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl text-center mb-4">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email" // Changed from username to email
            >
              Email: {/* Changed label from "Username" to "Email" */}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" // Changed from username to email
              type="text"
              value={email} // Changed from username to email
              onChange={(e) => setEmail(e.target.value)} // Changed from setUsername to setEmail
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-1 flex items-center"
            >
              {showPassword ? (
                <AiOutlineEye className="w-6 h-6 text-gray cursor-pointer" />
              ) : (
                <AiOutlineEyeInvisible className="w-6 h-6 text-gray cursor-pointer" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="text-center py-4">
            New Registration?
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
