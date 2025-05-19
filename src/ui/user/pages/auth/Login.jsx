import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLock } from 'react-icons/ai';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSchema } from '../../../../config/schema/auth.schema';
import { gridItems } from '../../../../data/loginDescription';
import InputField from '../../../common/atoms/InputField';
import Label from '../../../common/atoms/Label';
import Logo from '../../../common/molecules/Logo';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(loginSchema())
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:9090/api/user/auth/sign-in', data);

            const { token, refreshToken, userId, userName } = response.data;

            // Store tokens and user info (use sessionStorage if you want it cleared on browser close)
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', userId);
            localStorage.setItem('userName', userName);


            window.location.href = '/';

        } catch (error) {
            console.error('Login error:', error.response?.data?.message || error.message);

        }
    };

    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                console.log("⏳ Running token refresh check...");
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) throw new Error("No refresh token available");

                const res = await axios.post(
                    "http://localhost:9090/api/user/token/refreshToken",
                    { refreshToken }
                );

                const newAccessToken = res.data?.token;
                if (newAccessToken) {
                    localStorage.setItem("accessToken", newAccessToken);
                    console.log("✅ Access token refreshed");
                } else {
                    throw new Error("Failed to obtain new access token");
                }
            } catch (error) {
                console.error("❌ Error refreshing access token:", error);
                if (location.pathname !== "/auth") {
                    navigate("/auth", { replace: true });
                }
            }
        };

        const interval = setInterval(() => {
            refreshAccessToken();
        }, 50 * 60 * 1000); // every 50 minutes

        return () => clearInterval(interval);
    }, [location.pathname, navigate]);




    return (
        <div className='w-full flex flex-col md:flex-row h-screen fixed overflow-y-auto md:overflow-hidden'>
            {/* Purple section */}
            <div className='hidden md:flex md:w-1/2 bg-[#6941c5] items-center justify-center'>
                <div className='text-white p-8'>
                    <h2 className='text-3xl font-bold mb-4'>Welcome to Your Library Portal</h2>
                    <h3 className='text-2xl font-bold mb-4'>Access Your Library, Anytime Anywhere</h3>
                    <div className='grid grid-cols-2 gap-y-3'>
                        {gridItems.map((item, index) => (
                            <p key={index} className='border border-white p-2 m-2 rounded-full text-center'>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form section */}
            <div className='w-full md:w-1/2 h-screen flex flex-col justify-center items-center px-6 py-8 md:px-12 md:py-16'>
                <div className='w-full flex flex-col justify-center items-center max-w-md'>
                    <Logo />
                    <h1 className='text-xl md:text-2xl font-bold text-gray-800 my-4 md:my-8'>
                        Log into your account
                    </h1>

                    <form className='w-full' onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className='w-full flex flex-col gap-4 md:gap-6'>
                            {/* Email */}
                            <div className='relative'>
                                <Label name='email' label='Email' required />
                                <IoMailUnreadOutline className='absolute left-3 top-[45px] text-[#52637a]' />
                                <InputField
                                    name='email'
                                    type='email'
                                    placeholder='Enter Your Email'
                                    autocomplete='off'
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p className='text-red-500 text-sm'>{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className='relative'>
                                <Label name='password' label='Password' required />
                                <AiOutlineLock className='absolute left-3 top-[45px] text-[#52637a]' />
                                <InputField
                                    name='password'
                                    type='password'
                                    placeholder='Enter Your Password'
                                    autocomplete='off'
                                    {...register('password')}
                                />
                                {errors.password && (
                                    <p className='text-red-500 text-sm'>{errors.password.message}</p>
                                )}
                            </div>

                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='w-full bg-[#6941c5] text-white py-2 px-4 rounded-md hover:bg-[#5c3aa7] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5c3aa7] focus:ring-offset-2 mt-2 md:mt-0'
                            >
                                {isSubmitting ? 'Logging in...' : 'Log In'}
                            </button>
                        </div>
                    </form>

                    {/* Additional links */}
                    <div className='mt-4 md:mt-6 text-center text-sm text-gray-600'>
                        <p>
                            Don't have an account?{' '}
                            <Link to='/auth/signup' className='text-[#6941c5] font-medium hover:underline'>
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
