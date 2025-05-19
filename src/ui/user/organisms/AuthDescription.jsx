import { gridItems } from '../../../data/loginDescription';

const AuthDescription = () => {
    return (
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
    )
}

export default AuthDescription
