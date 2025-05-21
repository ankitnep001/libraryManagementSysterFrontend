import { image } from '../../../config/constant/image';

const HeroSection = () => {
    return (
        <section className="bg-[#ffffff] text-[#222222] py-20 px-6 md:px-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                        Welcome to <span className="block text-4xl md:text-6xl ">Library Zen</span>
                    </h1>
                    <p className="text-base md:text-lg text-[#222222] mt-4">
                        Dive into a vast collection of books, explore your favorite genres, and manage your borrowings effortlessly.
                    </p>
                </div>

                {/* Hero Image */}
                <div className="flex-1">
                    <img
                        src={image.libraryHero}
                        alt="Library illustration"
                        className="mx-auto w-40 sm:w-60 md:w-80 lg:w-[22rem]"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
