import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiLogIn, FiSearch } from 'react-icons/fi';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { image } from '../../../config/constant/image'; // fallback image import
import { menuItems } from '../../../data/userMenuNavbar';
import Logo from "../../common/molecules/Logo";
import NavMenu from "../molecules/NavMenu";
import UserDropdown from "../molecules/UserDropdown";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [imageUrls, setImageUrls] = useState({});

    const navigate = useNavigate();
    const username = "User"; // Replace with actual username if available

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    // Fetch image blob and create object URL, then store in imageUrls state by book ID
    const fetchImage = async (imageName, bookId) => {
        const token = localStorage.getItem('token');
        if (!imageName) return;

        try {
            const res = await axios.get(`http://localhost:8080/api/book/image/${imageName}`, {
                responseType: 'blob',
                headers: { Authorization: `Bearer ${token}` },
            });
            const imageUrl = URL.createObjectURL(res.data);
            setImageUrls(prev => ({ ...prev, [bookId]: imageUrl }));
        } catch (error) {
            console.error(`Error loading image for book ${bookId}:`, error);
            setImageUrls(prev => ({ ...prev, [bookId]: image.fallback }));
        }
    };

    useEffect(() => {
        const fetchResults = async () => {
            const token = localStorage.getItem('token');
            if (!token || searchTerm.trim() === '') {
                setSearchResults([]);
                setImageUrls({});
                return;
            }

            try {
                const res = await axios.get(
                    `http://localhost:8080/api/book/searchBook/${searchTerm}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: '*/*'
                        }
                    }
                );

                const books = res.data;
                setSearchResults(books);

                // Fetch images for all books
                books.forEach(book => {
                    if (book.image) {
                        fetchImage(book.image, book.id);
                    } else {
                        setImageUrls(prev => ({ ...prev, [book.id]: image.fallback }));
                    }
                });
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResults([]);
                setImageUrls({});
            }
        };

        const debounce = setTimeout(fetchResults, 300);
        return () => clearTimeout(debounce);
    }, [searchTerm]);

    const handleBookClick = (id) => {
        navigate(`/book/${id}`);
        setSearchTerm('');
        setShowResults(false);
    };

    return (
        <nav className="bg-[#6941c5] px-4 py-3 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
                {/* Logo and Mobile Menu */}
                <div className="flex items-center space-x-4">
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <HiOutlineMenuAlt3 size={24} />
                    </button>
                    <Logo className="h-8 w-auto" />
                </div>

                {/* Desktop Nav */}
                <NavMenu />

                {/* Search bar (desktop only) */}
                {isLoggedIn && (
                    <div className="relative hidden md:block w-72">
                        <input
                            type="text"
                            placeholder="Search books..."
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setShowResults(true)}
                            onBlur={() => setTimeout(() => setShowResults(false), 200)}
                        />
                        <FiSearch className="absolute left-3 top-2.5 text-gray-500" />

                        {showResults && searchResults.length > 0 && (
                            <ul className="absolute top-full mt-1 left-0 right-0 bg-white border rounded shadow-lg z-50 max-h-64 overflow-y-auto text-black">
                                {searchResults.map(book => (
                                    <li
                                        key={book.id}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                                        onMouseDown={() => handleBookClick(book.id)}
                                    >
                                        <img
                                            src={imageUrls[book.id] || image.fallback}
                                            alt={book.title}
                                            className="w-10 h-14 object-cover rounded"
                                        />
                                        <span>{book.title}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* Login or User dropdown */}
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <UserDropdown username={username} />
                    ) : (
                        <Link to="/auth/login" title="Login" className='flex flex-row'>
                            <p className='text-white'>Login</p>
                            <FiLogIn size={24} className="text-white" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#6941c5] py-4 px-4 shadow-lg text-white">
                    {isLoggedIn && (
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search books..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setShowResults(true)}
                                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                            />
                            <FiSearch className="absolute left-3 top-2.5 text-gray-500" />

                            {showResults && searchResults.length > 0 && (
                                <ul className="absolute top-full mt-1 left-0 right-0 bg-white border rounded shadow-lg z-50 max-h-64 overflow-y-auto text-black">
                                    {searchResults.map(book => (
                                        <li
                                            key={book.id}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onMouseDown={() => handleBookClick(book.id)}
                                        >
                                            {book.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

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
