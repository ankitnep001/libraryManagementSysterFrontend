// src/components/NavMenu.js
import { Link } from 'react-router-dom';
import { menuItems } from '../../../data/userMenuNavbar';

const NavMenu = () => {
    return (
        <ul className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
                <li key={item.path} className="relative group">
                    <Link
                        to={item.path}
                        className="flex items-center text-[#ffffff] hover:text-gray-200 transition-colors"
                    >
                        <span className="mr-2">{item.icon}</span>
                        {item.title}
                        {item.submenu && (
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        )}
                    </Link>

                    {item.submenu && (
                        <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                            {item.submenu.map((subItem) => (
                                <li key={subItem.path}>
                                    <Link
                                        to={subItem.path}
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        {subItem.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;