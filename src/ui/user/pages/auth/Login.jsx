import { AiOutlineLock } from 'react-icons/ai';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { gridItems } from '../../../../data/loginDescription';
import InputField from '../../../common/atoms/InputField';
import Label from '../../../common/atoms/Label';
import Logo from '../../../common/molecules/Logo';

const Login = () => {
    return (
        <div className='w-full flex flex-col md:flex-row h-screen fixed overflow-y-auto md:overflow-hidden'>
            {/* Purple background section - hidden on mobile */}
            <div className='hidden md:flex md:w-1/2 bg-[#6941c5] items-center justify-center'>
                <div className='text-white p-8'>
                    <h2 className='text-3xl font-bold mb-4'>Welcome to Your Library Portal</h2>
                    <h3 className='text-2xl font-bold mb-4'>Access Your Library, Anytime Anywhere</h3>
                    <div className='grid grid-cols-2 gap-y-3'>
                        {gridItems.map((item, index) => (
                            <p
                                key={index}
                                className='border border-white p-2 m-2 rounded-full text-center'
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form section - full width on mobile, half on desktop */}
            <div className='w-full md:w-1/2 h-screen flex flex-col justify-center items-center px-6 py-8 md:px-12 md:py-16'>
                <div className='w-full flex flex-col justify-center items-center max-w-md'>
                    <div className='flex justify-center items-center'>
                        <Logo />
                    </div>

                    <h1 className='text-xl md:text-2xl font-bold text-gray-800 my-4 md:my-8'>Log into your account</h1>

                    <form className='w-full'>
                        <div className='w-full flex flex-col gap-4 md:gap-6'>
                            {/* Email */}
                            <div className='relative'>
                                <Label name={'email'} label={'Email'} required />
                                <IoMailUnreadOutline className='absolute left-3 top-[45px] text-[#52637a]' />
                                <InputField name='email' type='email' autocomplete='off' placeholder='Enter Your email' />
                            </div>

                            {/* Password */}
                            <div className='relative'>
                                <Label name={'password'} label={'Password'} required />
                                <AiOutlineLock className='absolute left-3 top-[45px] text-[#52637a]' />
                                <InputField name='password' type='password' autocomplete='off' placeholder='Enter Your Password' />
                            </div>

                            {/* Submit Button */}
                            <button
                                type='submit'
                                className='w-full bg-[#6941c5] text-white py-2 px-4 rounded-md hover:bg-[#5c3aa7] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5c3aa7] focus:ring-offset-2 mt-2 md:mt-0'
                            >
                                Log In
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
                        {/* <p className='mt-2'>
                            <Link to="/auth/forgot-password" className='text-[#6941c5] font-medium hover:underline'>
                                Forgot password?
                            </Link>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;