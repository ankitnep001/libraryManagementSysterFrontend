import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { image } from '../../../config/constant/image';
import BorrowModal from '../organisms/BorrowModal';

const Category = () => {
    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const modalRef = useRef(null);

    // Assume userId stored in localStorage after login
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:8080/api/book/getAllBooks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBooks(res.data || []);
            } catch (err) {
                console.error('Failed to fetch books:', err);
            }
        };

        fetchBooks();
    }, []);

    // Close modal if click outside modal content
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
        <div className="p-6 md:p-10 bg-[#f9f9f9] min-h-screen relative">
            <h1 className="text-3xl font-bold text-center mb-10 text-[#222]">Books</h1>

            {books.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {books.map((book, index) => (
                        <div
                            key={book._id || index}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col"
                        >
                            <img
                                src={book.image || image.fallback}
                                alt={book.title}
                                className="w-full h-48 object-cover rounded-t-xl"
                                onError={(e) => (e.target.src = image.fallback)}
                            />

                            <div className="p-4 flex flex-col h-full">
                                <h2 className="text-xl font-semibold text-[#222] mb-1">{book.title}</h2>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-3">{book.description}</p>
                                <p className="text-sm text-gray-500 mb-1">
                                    Author: <span className="font-medium">{book.authorName}</span>
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Category: <span className="font-medium">{book.categoryName}</span>
                                </p>

                                <button
                                    onClick={() => setSelectedBookId(book.id)}
                                    className="mt-auto px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
                                >
                                    Borrow Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No books available at the moment.</p>
            )}

            {/* Modal */}
            {selectedBookId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm">
                    <div ref={modalRef} className="bg-white p-6 rounded-lg w-full max-w-lg relative">
                        <button
                            onClick={() => setSelectedBookId(null)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                        <BorrowModal bookId={selectedBookId} userId={userId} onClose={() => setSelectedBookId(null)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
