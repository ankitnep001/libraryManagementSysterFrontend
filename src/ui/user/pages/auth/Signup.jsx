import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { AiOutlineLock } from 'react-icons/ai';
import { BsPhone } from 'react-icons/bs';
import { IoMailUnreadOutline, IoPersonOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { signUpSchema } from '../../../../config/schema/auth.schema'; // adjust path if needed
import InputField from '../../../common/atoms/InputField';
import Label from '../../../common/atoms/Label';
import Logo from '../../../common/molecules/Logo';
import AuthDescription from '../../organisms/AuthDescription';

const Signup = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(signUpSchema()),
    });

    const onSubmit = async (data) => {
        try {
            console.log('Submitting data:', data); // <-- Log submitted data
            const response = await axios.post('http://localhost:9090/api/user/auth/sign-up', data);

            console.log('Response:', response.data); // <-- Log the response

            // On success, navigate to login page or dashboard
            navigate('/auth');
        } catch (error) {
            console.error('Signup error:', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Signup failed, please try again.');
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row h-screen overflow-hidden">
            <AuthDescription />

            {/* Scrollable form section - full width on mobile, half on desktop */}
            <div className="w-full md:w-1/2 md:ml-[50%] h-screen overflow-y-auto">
                <div className="flex flex-col justify-center min-h-full px-6 py-8 md:px-12 md:py-16">
                    <div className="w-full max-w-md mx-auto">
                        <div className="flex justify-center items-center">
                            <Logo />
                        </div>

                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 my-4 md:my-8 text-center">Create your account</h1>

                        <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="w-full flex flex-col gap-4 md:gap-6">
                                {/* firstname */}
                                <div className="relative">
                                    <Label name="firstname" label="First Name" required />
                                    <IoPersonOutline className="absolute left-3 top-12 text-[#52637a]" />
                                    <InputField
                                        name="firstname"
                                        type="text"
                                        placeholder="Enter your First Name"
                                        autoComplete="given-name"
                                        className="pl-10"
                                        {...register('firstname')}
                                    />
                                    {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
                                </div>
                                {/* lastname */}
                                <div className="relative">
                                    <Label name="lastname" label="Last Name" required />
                                    <IoPersonOutline className="absolute left-3 top-12 text-[#52637a]" />
                                    <InputField
                                        name="lastname"
                                        type="text"
                                        placeholder="Enter your Last Name"
                                        autoComplete="family-name"
                                        className="pl-10"
                                        {...register('lastname')}
                                    />
                                    {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
                                </div>

                                {/* Email */}
                                <div className="relative">
                                    <Label name="email" label="Email" required />
                                    <IoMailUnreadOutline className="absolute left-3 top-12 text-[#52637a]" />
                                    <InputField
                                        name="email"
                                        type="email"
                                        placeholder="Enter your Email"
                                        autoComplete="email"
                                        className="pl-10"
                                        {...register('email')}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>

                                {/* phoneNumber */}
                                <div className="relative">
                                    <Label name="contactNumber" label="Contact Number" required />
                                    <BsPhone className="absolute left-3 top-12 text-[#52637a]" />
                                    <InputField
                                        name="contactNumber"
                                        type="tel"
                                        placeholder="Contact Number"
                                        autoComplete="tel"
                                        className="pl-10"
                                        {...register('contactNumber')}
                                    />
                                    {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}
                                </div>

                                {/* Address */}
                                <div className="relative">
                                    <Label name="address" label="Address" required />
                                    {/* You might want a different icon for address */}
                                    <BsPhone className="absolute left-3 top-12 text-[#52637a]" />
                                    <InputField
                                        name="address"
                                        type="text"
                                        placeholder="Your Address"
                                        autoComplete="street-address"
                                        className="pl-10"
                                        {...register('address')}
                                    />
                                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                                </div>

                                {/* Password */}
                                <div className="relative">
                                    <Label name="password" label="Password" required />
                                    <AiOutlineLock className="absolute left-3 top-12 text-[#52637a]" />
                                    <InputField
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="new-password"
                                        className="pl-10"
                                        {...register('password')}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                </div>

                                {/* confirmPassword */}
                                <div className="relative">
                                    <Label name="confirmPassword" label="Confirm Password" required />
                                    <AiOutlineLock className="absolute left-3 top-12 text-[#52637a]" />
                                    <InputField
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        autoComplete="new-password"
                                        className="pl-10"
                                        {...register('confirmPassword')}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#6941c5] text-white py-2 px-4 rounded-md hover:bg-[#5c3aa7] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5c3aa7] focus:ring-offset-2 mt-2 md:mt-0"
                                >
                                    {isSubmitting ? 'Signing up...' : 'Sign Up'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 md:mt-6 text-center text-sm text-gray-600">
                            <p>
                                Already have an account?{' '}
                                <Link to="/auth/login" className="text-[#6941c5] font-medium hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
