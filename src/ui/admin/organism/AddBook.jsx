import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from '../../../ui/common/organism/toast/ToastManage';

const bookSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    authorName: yup.string().required('Author name is required'),
    numberOfBooks: yup
        .number()
        .typeError('Number of Books must be a number')
        .min(1, 'At least 1 book is required')
        .required('Number of Books is required'),
    image: yup
        .mixed()
        .required('Image is required')
        .test('fileSize', 'File size too large', (value) => {
            if (!value?.length) return false;
            return value[0].size <= 5 * 1024 * 1024;
        })
        .test('fileType', 'Unsupported file format', (value) => {
            if (!value?.length) return false;
            return ['image/jpeg', 'image/png', 'image/webp'].includes(value[0].type);
        }),
    categoryId: yup.string().required('Category is required'),
});

const AddBook = () => {
    const [categories, setCategories] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        watch,
    } = useForm({
        resolver: yupResolver(bookSchema),
        defaultValues: {
            title: '',
            description: '',
            authorName: '',
            numberOfBooks: 1,
            image: null,
            categoryId: '',
        },
    });

    const imageFile = watch('image');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:8080/api/category/getAllCategory", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const activeCategories = (response.data || []).filter(
                    (category) => category.status !== "DELETED"
                );
                setCategories(activeCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');

            const formData = new FormData();

            // Append the image file
            formData.append('image', data.image[0]);

            // Prepare the book DTO
            const bookDto = {
                title: data.title,
                description: data.description,
                authorName: data.authorName,
                numberOfBooks: parseInt(data.numberOfBooks, 10), // Ensure it's a number
                categoryId: data.categoryId, // Assume this is from a dropdown or similar
            };

            // Append the book DTO as JSON Blob
            formData.append('book', new Blob([JSON.stringify(bookDto)], { type: 'application/json' }));

            // Send the request using your existing axios instance (make sure it does NOT set 'Content-Type' manually)
            await axios.post('http://localhost:8080/api/book/admin/add', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // ❌ Do NOT set 'Content-Type' here manually
                },
            });
            toast.show({ title: "Success", content: "Added successfully", duration: 2000, type: 'success' });


            reset();

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Book</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block font-medium">Title</label>
                    <input
                        type="text"
                        {...register('title')}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter book title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        {...register('description')}
                        className="w-full border px-3 py-2 rounded resize-none"
                        placeholder="Enter description"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Author Name */}
                <div>
                    <label className="block font-medium">Author Name</label>
                    <input
                        type="text"
                        {...register('authorName')}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter author name"
                    />
                    {errors.authorName && <p className="text-red-500 text-sm">{errors.authorName.message}</p>}
                </div>

                {/* Number of Books */}
                <div>
                    <label className="block font-medium">Number of Books</label>
                    <input
                        type="number"
                        min={1}
                        {...register('numberOfBooks')}
                        className="w-full border px-3 py-2 rounded"
                        placeholder="Enter quantity"
                    />
                    {errors.numberOfBooks && <p className="text-red-500 text-sm">{errors.numberOfBooks.message}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium">Category</label>
                    <select {...register('categoryId')} className="w-full border px-3 py-2 rounded">
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.categoryName}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-medium">Cover Image</label>
                    <input type="file" accept="image/*" {...register('image')} />
                    {imageFile?.length > 0 && (
                        <img
                            src={URL.createObjectURL(imageFile[0])}
                            alt="Preview"
                            className="w-32 mt-2 border rounded"
                        />
                    )}
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                    {isSubmitting ? 'Submitting...' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};

export default AddBook;
