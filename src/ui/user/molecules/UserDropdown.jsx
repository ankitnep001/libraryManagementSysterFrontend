// src/components/UserDropdown.js
import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserDropdown = ({ username }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 focus:outline-none"
            >

                <span className="text-white hidden md:inline">Hi, {username}</span>
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                    {username.charAt(0).toUpperCase()}
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        View Profile
                    </Link>
                    <Link
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Logout
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;