import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import logo from '../assets/logob.png';
import { UserContext } from '../context/UserContext';

function Header() {
    const { user } = useContext(UserContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className=' bg-black px-20'>
            <nav className="mx-20 px-20 py-2 flex justify-between items-center">
                <div>
                    <Link to="/home"><img src={logo} alt="" className="h-12" /></Link>
                </div>
                <ul className="flex px-5 space-x-10">
                    <li className='space-x-8'>
                        <Link to="/home" className="text-white hover:text-gray-300">Home </Link>
                        <Link to="/myimages" className="text-white hover:text-gray-300">My Images</Link>
                    </li>
                    {user && (
                        <li className="relative">
                            <div onClick={toggleDropdown} className="text-white hover:text-gray-300 cursor-pointer">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            {dropdownOpen && (
                                <ul className=" absolute top-8 right-0 bg-white shadow-md rounded-md py-2">
                                    <li><Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link></li>
                                    <li>
                                        <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">SignUp</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Header;