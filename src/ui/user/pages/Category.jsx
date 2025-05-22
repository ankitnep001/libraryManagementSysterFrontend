import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { image } from '../../../config/constant/image'; // fallback image import
import BorrowModal from '../organisms/BorrowModal';

const Category = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [selectedBookId, setSelectedBookId] = useState(null);
    const modalRef = useRef(null);

    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const fetchImage = async (imageName, bookId) => {
        if (!imageName) return;

        try {
            const res = await axios.get(`http://localhost:8080/api/book/image/${imageName}`, {
                responseType: 'blob',
                headers: { Authorization: `Bearer ${token}` },
            });

            const imageUrl = URL.createObjectURL(res.data);
            setImageUrls((prev) => ({ ...prev, [bookId]: imageUrl }));
        } catch (error) {
            console.error(`Error loading image for book ${bookId}:`, error);
            setImageUrls((prev) => ({ ...prev, [bookId]: image.fallback }));
        }
    };

    useEffect(() => {
        const fetchBooksAndCategories = async () => {
            try {
                const [booksRes, categoriesRes] = await Promise.all([
                    axios.get('http://localhost:8080/api/book/getAllBooks', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('http://localhost:8080/api/category/getAllCategory', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                const fetchedBooks = (booksRes.data || []).filter(book => book.status !== 'DELETED');
                const fetchedCategories = categoriesRes.data || [];

                setBooks(fetchedBooks);
                setCategories(fetchedCategories);

                fetchedBooks.forEach((book) => {
                    if (book.imageName) {
                        fetchImage(book.imageName, book.id);
                    }
                });

            } catch (err) {
                console.error('Failed to fetch books or categories:', err);
            }
        };

        fetchBooksAndCategories();
    }, [token]);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setSelectedBookId(null);
        }
    };

    useEffect(() => {
        if (selectedBookId) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [selectedBookId]);

    return (
        <div className="p-4 md:p-10 bg-[#f9f9f9] min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Books by Category</h1>

            {categories.map((category) => {
                const booksInCategory = books.filter((book) => book.categoryId === category.id);

                if (booksInCategory.length === 0) return null;

                return (
                    <div key={category.id} className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-l-4 border-blue-500 pl-4">
                            {category.categoryName}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {booksInCategory.map((book) => (
                                <div
                                    key={book.id}
                                    className="bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition duration-300 flex flex-col overflow-hidden"
                                >
                                    <img
                                        src={imageUrls[book.id] || image.fallback}
                                        alt={book.title || "Book cover"}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = image.fallback;
                                        }}
                                    />

                                    <div className="p-4 flex flex-col flex-1">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                                {book.title || "Untitled Book"}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                {book.description || "No description available"}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Author: <span className="font-medium">{book.authorName || "Unknown"}</span>
                                            </p>
                                        </div>
                                        <div className="flex gap-4 mt-auto">
                                            <button
                                                onClick={() =>
                                                    navigate(`/book/${book.id}`, {
                                                        state: { categoryName: category.categoryName }
                                                    })
                                                }
                                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => setSelectedBookId(book.id)}
                                                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                                            >
                                                Borrow Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

            {books.length === 0 && (
                <p className="text-center text-gray-500">No books available at the moment.</p>
            )}

            {selectedBookId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm px-4">
                    <div
                        ref={modalRef}
                        className="bg-white p-6 rounded-lg w-full max-w-lg relative shadow-lg"
                    >
                        <button
                            onClick={() => setSelectedBookId(null)}
                            className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <BorrowModal
                            bookId={selectedBookId}
                            userId={userId}
                            onClose={() => setSelectedBookId(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );

};

export default Category;
