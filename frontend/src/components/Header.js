import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div>
            <nav className="bg-gray-800 py-4 flex justify-center items-center">
                <ul className="flex px-5 space-x-4">
                    <li>
                        <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
                    </li>
                    <li>
                        <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup" className="text-white hover:text-gray-300">SignUp</Link>
                    </li>
                    <li>
                        <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header