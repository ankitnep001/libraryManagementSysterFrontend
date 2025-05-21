import { yupResolver } from '@hookform/resolvers/yup';
import { LayoutDashboard, Pencil } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../common/atoms/InputField';
import Label from '../../common/atoms/Label';

const categorySchema = yup.object().shape({
    categoryName: yup.string().required('Category name is required'),
    categoryDescription: yup.string().required('Description is required'),
});

const AddCategoryForm = ({ onSubmitCategory, editData }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(categorySchema),
        defaultValues: {
            categoryName: '',
            categoryDescription: '',
        },
    });

    useEffect(() => {
        if (editData) {
            // If editing, fill the form with existing data
            reset({
                categoryName: editData.categoryName,
                categoryDescription: editData.categoryDescription,
            });
        } else {
            // If adding new, reset to blank
            reset({
                categoryName: '',
                categoryDescription: '',
            });
        }
    }, [editData, reset]);

    const onSubmit = async (data) => {
        await onSubmitCategory(data, editData?.id);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto p-6  rounded-xl space-y-4">
            <div className="relative">
                <Label name="categoryName" label="Category Name" required />
                <LayoutDashboard className="absolute left-3 top-[45px] text-gray-400" size={18} />
                <InputField
                    name="categoryName"
                    placeholder="Enter category name"
                    className="pl-10 bg-gray-900  border border-gray-700"
                    {...register('categoryName')}
                />
                {errors.categoryName && <p className="text-red-500 text-sm">{errors.categoryName.message}</p>}
            </div>

            <div className="relative">
                <Label name="categoryDescription" label="Description" required />
                <Pencil className="absolute left-3 top-[45px] text-gray-400" size={18} />
                <InputField
                    name="categoryDescription"
                    placeholder="Enter description"
                    className="pl-10 bg-gray-900  border border-gray-700"
                    {...register('categoryDescription')}
                />
                {errors.categoryDescription && <p className="text-red-500 text-sm">{errors.categoryDescription.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
                {isSubmitting ? (editData ? 'Updating...' : 'Adding...') : editData ? 'Update Category' : 'Add Category'}
            </button>
        </form>
    );
};

export default AddCategoryForm;
