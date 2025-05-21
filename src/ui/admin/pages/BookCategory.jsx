import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from '../../common/organism/toast/ToastManage';
import AddCategoryForm from '../organism/AddCategory';

const BookCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null); // <-- ✅ For edit mode

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get("http://localhost:8080/api/category/getAllCategory", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(res)
            setCategories(res.data || []);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddOrUpdateCategory = async (formData, id) => {
        const token = localStorage.getItem('token');

        try {
            if (id) {
                // EDIT MODE
                await axios.post(`http://localhost:8080/api/category/admin/update/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.show({ title: 'Success', content: 'Category updated successfully', duration: 2000, type: 'success' });
            } else {
                // ADD MODE
                await axios.post("http://localhost:8080/api/category/admin/add", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.show({ title: 'Success', content: 'Category added successfully', duration: 2000, type: 'success' });
            }

            fetchCategories();
            setShowForm(false);
            setEditData(null);
        } catch (error) {
            console.error("Submit error:", error);
            toast.show({ title: 'Error', content: id ? 'Failed to update' : 'Failed to add category', duration: 2000, type: 'error' });
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            await axios.get(`http://localhost:8080/api/category/admin/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.show({ title: 'Deleted', content: 'Category deleted successfully', duration: 2000, type: 'success' });
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
        } catch (error) {
            console.error("Delete error:", error);
            toast.show({ title: 'Error', content: 'Failed to delete category', duration: 2000, type: 'error' });
        }
    };


    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                onClick={() => {
                    setEditData(null); // Ensure add mode
                    setShowForm(true);
                }}
            >
                Add New Category
            </button>

            {/* Modal for Add/Edit */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white text-black p-6 rounded-lg w-full max-w-lg relative">
                        <button
                            className="absolute top-2 right-3 text-gray-400 hover:text-red-600 text-xl"
                            onClick={() => {
                                setShowForm(false);
                                setEditData(null);
                            }}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            {editData ? 'Edit Category' : 'Add New Category'}
                        </h2>
                        <AddCategoryForm
                            onSubmitCategory={handleAddOrUpdateCategory}
                            editData={editData}
                        />
                    </div>
                </div>
            )}

            <div className="mt-6">
                {loading ? (
                    <p className="text-gray-300">Loading...</p>
                ) : categories.length === 0 ? (
                    <p className="text-gray-400">No categories found.</p>
                ) : (
                    <ul className="space-y-3">
                        {categories.map((cat) => (
                            <li key={cat.id} className="flex justify-between items-center bg-gray-800 p-3 rounded text-white">
                                <div>
                                    <h3 className="font-semibold">{cat.categoryName}</h3>
                                    <p className="text-sm text-gray-400">{cat.categoryDescription}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        className="text-yellow-400 hover:underline"
                                        onClick={() => {
                                            setEditData(cat); // Trigger edit
                                            setShowForm(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDelete(cat.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default BookCategory;
