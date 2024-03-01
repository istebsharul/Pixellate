import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"


const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const handleSignUp = async (e) => {
        e.preventDefault();

        // Password validation
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Handle signup logic here
        try {
            const response = await axios.post('http://localhost:8000/api/user/signup', {
                username: username,
                email: email,
                password: password
            });

            // Assuming the server responds with a success message
            console.log("User successfully created:", response.data);

            // Navigate to login page
            navigate('/login');

            // Show success toast
            toast.success('Account Created. Congratulations!');

            // Clear error
            setError("");
        } catch (error) {
            // Handle signup error
            console.error('Signup failed:', error);

            // Display error message to the user using toast
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("An error occurred during signup. Please try again later.");
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-full w-full bg-white-50">
            <div className="w-1/5 flex justify-center items-center"><img src={logo} alt="" className="w-20 hover:rotate-90 transition-transform duration-400 ease-in-out" /></div>
            <h2 className="text-2xl font-bold text-center mb-4 p-3">Sign Up to register</h2>
            <div className="w-full rounded-lg max-w-xs bg-gray-300">
                <form
                    className="bg-white-500 px-8 pt-6 pb-6 mt-4"
                    onSubmit={handleSignUp}
                >
                    <div className="mb-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-1">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-1 relative">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
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
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <div className="flex items-center justify-center">
                        <button
                            className="border border-black bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className="text-center py-4">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="inline-block align-baseline font-bold text-sm text-black hover:text-black"
                        >
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
