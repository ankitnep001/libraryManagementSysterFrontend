import { AiOutlineLock } from 'react-icons/ai';
import { BsPhone } from 'react-icons/bs';
import { IoMailUnreadOutline, IoPersonOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { gridItems } from '../../../../data/loginDescription';
import InputField from '../../../common/atoms/InputField';
import Label from '../../../common/atoms/Label';
import Logo from '../../../common/molecules/Logo';
const Signup = () => {
    return (
        <div className='w-full flex flex-col md:flex-row h-screen overflow-hidden'>
            {/* Fixed purple background section - hidden on mobile */}
            <div className='hidden md:flex md:w-1/2 bg-[#6941c5] items-center justify-center fixed h-screen left-0 top-0'>
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

            {/* Scrollable form section - full width on mobile, half on desktop */}
            <div className='w-full md:w-1/2 md:ml-[50%] h-screen overflow-y-auto'>
                <div className='flex flex-col justify-center min-h-full px-6 py-8 md:px-12 md:py-16'>
                    <div className='w-full max-w-md mx-auto'>
                        <div className='flex justify-center items-center'>
                            <Logo />
                        </div>

                        <h1 className='text-xl md:text-2xl font-bold text-gray-800 my-4 md:my-8 text-center'>Create your account</h1>

                        <form className='w-full'>
                            <div className='w-full flex flex-col gap-4 md:gap-6'>
                                {/* name */}
                                <div className='relative'>
                                    <Label name={'name'} label={'Name'} required />
                                    <IoPersonOutline className='absolute left-3 top-[45px] text-[#52637a]' />
                                    <InputField name='name' type='text' autocomplete='off' placeholder='Enter your Name' />
                                </div>

                                {/* Email */}
                                <div className='relative'>
                                    <Label name={'email'} label={'Email'} required />
                                    <IoMailUnreadOutline className='absolute left-3 top-[45px] text-[#52637a]' />
                                    <InputField name='email' type='email' autocomplete='off' placeholder='Enter Your email' />
                                </div>

                                {/* phoneNumber */}
                                <div className='relative'>
                                    <Label name={'phoneNumber'} label={'Phone Number'} required />
                                    <BsPhone className='absolute left-3 top-[45px] text-[#52637a]' />
                                    <InputField name='phoneNumber' type='text' autocomplete='off' placeholder='Phone Number' />
                                </div>

                                {/* Password */}
                                <div className='relative'>
                                    <Label name={'password'} label={'Password'} required />
                                    <AiOutlineLock className='absolute left-3 top-[45px] text-[#52637a]' />
                                    <InputField name='password' type='password' autocomplete='off' placeholder='Password' />
                                </div>

                                {/* confirmPassoword */}
                                <div className='relative'>
                                    <Label name={'confirmPassword'} label={'Confirm Password'} required />
                                    <AiOutlineLock className='absolute left-3 top-[45px] text-[#52637a]' />
                                    <InputField name='confirmPassword' type='password' autocomplete='off' placeholder='Confirm Password' />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type='submit'
                                    className='w-full bg-[#6941c5] text-white py-2 px-4 rounded-md hover:bg-[#5c3aa7] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5c3aa7] focus:ring-offset-2 mt-2 md:mt-0'
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        <div className='mt-4 md:mt-6 text-center text-sm text-gray-600'>
                            <p>
                                Already have an account?{' '}
                                <Link to='/auth/login' className='text-[#6941c5] font-medium hover:underline'>
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