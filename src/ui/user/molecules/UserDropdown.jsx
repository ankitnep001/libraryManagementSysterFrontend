import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem("userName") || "";
        setUserName(storedName);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        navigate("/auth");
    };

    // Get initials from full name
    const getInitials = (name) => {
        const parts = name.trim().split(" ");
        const firstInitial = parts[0]?.charAt(0).toUpperCase() || "";
        const secondInitial = parts[1]?.charAt(0).toUpperCase() || "";
        return firstInitial + secondInitial;
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 focus:outline-none"
            >
                <span className="text-white hidden md:inline">Hi, {userName.split(" ")[0]}</span>
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                    {getInitials(userName)}
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <p className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold">{userName}</p>
                    <hr className="block px-4 py-2" />
                    <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        View Profile
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
