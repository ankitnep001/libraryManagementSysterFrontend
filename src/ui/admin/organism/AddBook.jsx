import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../common/atoms/InputField';
import Label from '../../common/atoms/Label';

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
        .test('fileSize', 'File size too large', (value) => {
            if (!value || value.length === 0) return true;
            return value[0].size <= 5 * 1024 * 1024;
        })
        .test('fileType', 'Unsupported file format', (value) => {
            if (!value || value.length === 0) return true;
            return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
        }),
});

const AddBook = ({ onSubmitBook, editData }) => {
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
            imageFile: null,
        },
    });

    useEffect(() => {
        if (editData) {
            reset({
                title: editData.title,
                description: editData.description,
                authorName: editData.authorName,
                numberOfBooks: editData.numberOfBooks,
                imageFile: null,
            });
        } else {
            reset({
                title: '',
                description: '',
                authorName: '',
                numberOfBooks: 1,
                imageFile: null,
            });
        }
    }, [editData, reset]);

    const onSubmit = async (data) => {
        const bookData = {
            title: data.title,
            description: data.description,
            authorName: data.authorName,
            numberOfBooks: data.numberOfBooks,
            image: data.imageFile?.[0] || null, // Access the uploaded file
        };

        await onSubmitBook(bookData); // Pass to parent handler
        reset(); // Clear form after submission
    }

    const imageFile = watch('image');

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <div className="relative">
                    <Label name="title" label="Title" required />
                    <InputField
                        {...register('title')}
                        name="title"
                        placeholder="Enter book title"
                        className="pl-3 border border-gray-300 rounded w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div className="relative">
                    <Label name="description" label="Description" required />
                    <textarea
                        {...register('description')}
                        name="description"
                        placeholder="Enter book description"
                        className="pl-3 border border-gray-300 rounded w-full h-24 resize-none"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                <div className="relative">
                    <Label name="authorName" label="Author Name" required />
                    <InputField
                        {...register('authorName')}
                        name="authorName"
                        placeholder="Enter author name"
                        className="pl-3 border border-gray-300 rounded w-full"
                    />
                    {errors.authorName && (
                        <p className="text-red-500 text-sm mt-1">{errors.authorName.message}</p>
                    )}
                </div>

                <div className="relative">
                    <Label name="numberOfBooks" label="Number of Books" required />
                    <InputField
                        {...register('numberOfBooks')}
                        type="number"
                        min={1}
                        name="numberOfBooks"
                        placeholder="Enter number of books"
                        className="pl-3 border border-gray-300 rounded w-full"
                    />
                    {errors.numberOfBooks && (
                        <p className="text-red-500 text-sm mt-1">{errors.numberOfBooks.message}</p>
                    )}
                </div>

                <div className="relative">
                    <Label name="image" label="Book Cover Image" />
                    <label
                        htmlFor="image"
                        className="inline-block cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm select-none"
                    >
                        Choose File
                    </label>
                    <input
                        {...register('image')}
                        type="file"
                        accept="image/*"
                        id="image"
                        name="image"
                        className="hidden"
                    />
                    {imageFile && imageFile.length > 0 && (
                        <span className="ml-3 text-gray-600">{imageFile[0].name}</span>
                    )}
                    {errors.imageFile && (
                        <p className="text-red-500 text-sm mt-1">{errors.imageFile.message}</p>
                    )}
                    {imageFile && imageFile.length > 0 && (
                        <img
                            src={URL.createObjectURL(imageFile[0])}
                            alt="Preview"
                            className="mt-2 h-24 w-auto rounded"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#5c3aa7] text-white px-4 py-2 rounded w-full hover:bg-[#4a2d85] transition"
                >
                    {isSubmitting ? (editData ? 'Updating...' : 'Adding...') : editData ? 'Update Book' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};

export default AddBook;
