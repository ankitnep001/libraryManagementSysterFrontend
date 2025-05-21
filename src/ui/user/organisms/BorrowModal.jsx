import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../common/atoms/InputField';
import Label from '../../common/atoms/Label';

const borrowSchema = yup.object().shape({
    userId: yup.string().required('User ID is required'),
    bookId: yup.string().required('Book ID is required'),
});

const BorrowModal = ({ bookId, userId, onClose }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(borrowSchema),
        defaultValues: {
            userId: userId || '',
            bookId: bookId || '',
        },
    });

    // Reset form if bookId or userId changes
    useEffect(() => {
        reset({
            userId: userId || '',
            bookId: bookId || '',
        });
    }, [bookId, userId, reset]);

    const onSubmit = async (data) => {
        try {
            await axios.post(
                'http://localhost:8080/api/borrow/add',
                {
                    bookId: data.bookId,
                    userId: data.userId,
                    borrowDate: new Date().toISOString(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            alert('Book borrowed successfully!');
            onClose();
            reset();
        } catch (error) {
            console.error('Failed to borrow book:', error);
            alert('Failed to borrow book.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
                <button
                    className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                    aria-label="Close"
                    type="button"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center">Borrow Book</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label name="userId" label="User ID" required />
                        <InputField
                            {...register('userId')}
                            name="userId"
                            readOnly
                            className="pl-3 border border-gray-300 rounded w-full bg-gray-100"
                            error={errors.userId}
                        />
                        {errors.userId && (
                            <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>
                        )}
                    </div>

                    <div>
                        <Label name="bookId" label="Book ID" required />
                        <InputField
                            {...register('bookId')}
                            name="bookId"
                            readOnly
                            className="pl-3 border border-gray-300 rounded w-full bg-gray-100"
                            error={errors.bookId}
                        />
                        {errors.bookId && (
                            <p className="text-red-500 text-sm mt-1">{errors.bookId.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Processing...' : 'Confirm Borrow'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BorrowModal;
