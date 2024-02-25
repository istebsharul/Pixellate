// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Homepage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';


function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Router>
      <div>
        <nav className="bg-gray-800 py-4 flex justify-between items-center">
          <ul className="flex px-5 space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            </li>
          </ul>
          <div className="relative px-5">
            <button onClick={toggleDropdown} className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faUser} className="text-lg" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">User Profile</Link>
                <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</Link>
                <Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Sign Up</Link>
              </div>
            )}
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
