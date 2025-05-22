import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { image } from '../../../config/constant/image'; // fallback image import
import BorrowModal from '../organisms/BorrowModal';

const Category = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [selectedBookId, setSelectedBookId] = useState(null);
    const modalRef = useRef(null);

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

                let fetchedBooks = booksRes.data || [];
                const fetchedCategories = categoriesRes.data || [];


                const filteredBooks = fetchedBooks.filter(book => book.status !== 'DELETED');


                setBooks(filteredBooks);
                setCategories(fetchedCategories);
                console.log(fetchedBooks)
                // Preload images for books
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
        <div className="p-6 md:p-10 bg-[#f9f9f9] min-h-screen relative">
            <h1 className="text-3xl font-bold text-center mb-10 text-[#222]">Books by Category</h1>

            {categories.map((category) => {
                const booksInCategory = books.filter((book) => book.categoryId === category.id);

                if (booksInCategory.length === 0) return null;

                return (
                    <div key={category.id} className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 text-[#333] border-l-4 border-blue-500 pl-4">
                            {category.categoryName}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {booksInCategory.map((book) => (
                                <div
                                    key={book.id}
                                    className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col"
                                >
                                    <img
                                        src={imageUrls[book.id] || image.fallback}
                                        alt={book.title}
                                        className="w-full h-40 object-cover rounded-t-xl"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = image.fallback;
                                        }}
                                    />

                                    <div className="p-4 flex flex-col h-full">
                                        <h3 className="text-xl font-semibold text-[#222] mb-1">{book.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{book.description}</p>
                                        <p className="text-sm text-gray-500 mb-1">
                                            Author: <span className="font-medium">{book.authorName}</span>
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
                    </div>
                );
            })}

            {books.length === 0 && (
                <p className="text-center text-gray-500">No books available at the moment.</p>
            )}

            {selectedBookId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div ref={modalRef} className="bg-white p-6 rounded-lg w-full max-w-lg relative">
                        <button
                            onClick={() => setSelectedBookId(null)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
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
