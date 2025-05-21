import axios from 'axios';
import { Edit2, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { image } from '../../../config/constant/image';
import AddBook from '../organism/AddBook';

const BookTable = () => {
    const [books, setBooks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editBook, setEditBook] = useState(null);
    const modalRef = useRef(null);
    const token = localStorage.getItem('token');

    const fetchBooks = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/book/getAllBooks', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBooks(res.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleAddOrUpdateBook = async (bookData) => {
        try {
            const formData = new FormData();

            // Append the image Blob or File object
            if (bookData.image) {
                formData.append('image', bookData.image); // Make sure this is a File or Blob
            }

            // Append the rest of the book data as a JSON string
            const bookInfo = {
                title: bookData.title,
                description: bookData.description,
                authorName: bookData.authorName,
                numberOfBooks: bookData.numberOfBooks,
                categoryId: bookData.categoryId,
            };
            formData.append('book', new Blob([JSON.stringify(bookInfo)], { type: 'application/json' }));

            const res = editBook
                ? await axios.post(
                    `http://localhost:8080/api/book/update/${editBook.id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                : await axios.post(
                    'http://localhost:8080/api/book/admin/add',
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

            if (editBook) {
                setBooks((prev) =>
                    prev.map((b) => (b.id === editBook.id ? res.data : b))
                );
            } else {
                setBooks((prev) => [...prev, res.data]);
            }

            setShowForm(false);
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };



    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        try {
            await axios.delete(`http://localhost:8080/api/book/admin/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBooks((prev) => prev.filter((b) => b.id !== id));
        } catch (error) {
            console.error('Failed to delete book:', error);
        }
    };

    const handleEdit = (book) => {
        setEditBook(book);
        setShowForm(true);
    };

    const closeModal = () => {
        setShowForm(false);
        setEditBook(null);
    };

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        if (showForm) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showForm]);

    return (
        <div className="bg-[#262626] text-white p-4 rounded-xl mx-4 md:mx-10 overflow-x-auto">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Books</h2>
                <button
                    className="flex items-center gap-2 bg-[#5c3aa7] text-white px-4 py-2 rounded hover:bg-[#4a2d85]"
                    onClick={() => {
                        setShowForm(true);
                        setEditBook(null);
                    }}
                >
                    <PlusCircle size={20} />
                    Add Book
                </button>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="min-w-[1000px] w-full text-left border-separate border-spacing-y-2">
                    <thead className="text-gray-400 text-sm">
                        <tr>
                            <th className="px-4 py-2">S.N.</th>
                            <th className="py-2 px-4">Image</th>
                            <th className="py-2 px-4">Title</th>
                            <th className="py-2 px-4">Author</th>
                            <th className="py-2 px-4">Description</th>
                            <th className="py-2 px-4 text-center">Quantity</th>
                            <th className="py-2 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id} className="bg-[#1e1e1e] text-left rounded-lg">
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{index + 1}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">
                                    {book.image ? (
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    ) : (
                                        <img
                                            src={image.fallback}
                                            alt={book.title}
                                            className="w-16 h-20 object-cover rounded"
                                        />
                                    )}
                                </td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{book.title}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{book.authorName}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a] relative group">
                                    <span>{book.description?.slice(0, 15)}...</span>
                                    <div className="absolute z-50 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity w-max max-w-sm whitespace-pre-wrap pointer-events-none">
                                        {book.description}
                                    </div>
                                </td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a] text-center">{book.numberOfBooks}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a] text-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(book)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {books.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-4 text-gray-500">
                                    No books found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div
                        ref={modalRef}
                        className="bg-white text-black p-6 rounded-lg w-full max-w-lg relative"
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
                        >
                            &times;
                        </button>
                        <AddBook
                            onClose={closeModal}
                            onSubmitBook={handleAddOrUpdateBook}
                            editData={editBook}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookTable;
