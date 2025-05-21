import axios from 'axios';
import { useEffect, useState } from 'react';

const BorrowedDetail = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [booksMap, setBooksMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [returning, setReturning] = useState(null);

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const fetchBorrowedBooks = async () => {
        try {
            // 1. Get all borrowed data
            const res = await axios.get('http://localhost:8080/api/borrow/getAll', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const userBorrowedBooks = res.data.filter((borrow) => borrow.userId === userId);
            setBorrowedBooks(userBorrowedBooks);
        } catch (err) {
            console.error('Error fetching borrowed books:', err);
            setError('Failed to load borrowed books.');
        } finally {
            setLoading(false);
        }
    };

    const fetchAllBooks = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/book/getAllBooks', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const bookData = res.data.reduce((map, book) => {
                map[book.id] = book; // assuming each book has `id`, `title`, `author`
                return map;
            }, {});
            console.log(bookData)
            setBooksMap(bookData);
        } catch (err) {
            console.error('Error fetching books:', err);
            setError('Failed to load book details.');
        }
    };

    const handleReturnBook = async (bookId) => {
        setReturning(bookId);
        try {
            await axios.post(
                'http://localhost:8080/api/user/returnBook',
                { bookId, userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setBorrowedBooks((prev) => prev.filter((b) => b.bookId !== bookId));
        } catch (err) {
            console.error('Error returning book:', err);
            alert('Failed to return the book.');
        } finally {
            setReturning(null);
        }
    };

    useEffect(() => {
        fetchBorrowedBooks();
        fetchAllBooks();
    }, []);

    if (loading) return <p className="text-center mt-10 text-white">Loading borrowed books...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="bg-white text-black p-4 shadow-2xl rounded-xl mx-4 md:mx-10">
            <h2 className="text-xl font-bold mb-4">My Borrowed Books</h2>
            {borrowedBooks.length === 0 ? (
                <p>You have no borrowed books.</p>
            ) : (
                <ul className="space-y-4">
                    {borrowedBooks.map((borrow) => {
                        const book = booksMap[borrow.bookId];
                        return (
                            <li
                                key={borrow.id}
                                className="flex justify-between items-center border-b border-gray-300 pb-3"
                            >
                                <div>
                                    <p><strong>Title:</strong> {book?.title || 'Unknown Title'}</p>
                                    <p><strong>Author:</strong> {book?.authorName || 'Unknown Author'}</p>
                                    <p><strong>Borrow Date:</strong> {new Date(borrow.borrowDate).toLocaleDateString()}</p>
                                </div>
                                <button
                                    onClick={() => handleReturnBook(borrow.bookId)}
                                    disabled={returning === borrow.bookId}
                                    className={`px-4 py-2 rounded-md ${returning === borrow.bookId
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700'
                                        } text-white`}
                                >
                                    {returning === borrow.bookId ? 'Returning...' : 'Return'}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default BorrowedDetail;
