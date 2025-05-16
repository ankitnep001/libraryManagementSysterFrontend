import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { menuItems } from '../../../data/userMenuNavbar';
import Logo from "../../common/molecules/Logo";
import NavMenu from "../molecules/NavMenu";
import UserDropdown from "../molecules/UserDropdown";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const username = "User"; // Replace with actual user data

    return (
        <nav className="bg-[#6941c5] px-4 py-3 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo and Mobile Menu Button */}
                <div className="flex items-center space-x-4">
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <HiOutlineMenuAlt3 size={24} />
                    </button>
                    <Link to="/home" className="flex items-center">
                        <Logo className="h-8 w-auto" />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <NavMenu />

                {/* Search Bar */}
                <div className="hidden md:flex flex-1  max-w-md mx-6">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search books..."
                            className="w-full pl-10 pr-4 py-2 rounded-full border text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                        />
                        <FiSearch size={20} className="absolute left-3 top-2.5 text-white" />
                    </div>
                </div>

                {/* User Section */}
                <div className="flex items-center space-x-4">
                    <UserDropdown username={username} />
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#6941c5] py-4 px-4 shadow-lg text-white">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search books..."
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-black"
                        />
                        <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
                    </div>
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="block px-4 py-2 text-white hover:bg-[#5c38b1] rounded transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
