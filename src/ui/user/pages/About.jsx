// Team Members Data
const teamMembers = [
    {
        name: 'person 1',
        role: 'Receptionist',
        img: '', // Add image URLs if you have any
    },
    {
        name: 'person 2',
        role: 'UI/UX Designer',
        img: '',
    },
    {
        name: 'person 3',
        role: 'Manager',
        img: '',
    },
];

const About = () => {
    return (
        <div className="bg-[#fefefe] text-[#222] min-h-screen">
            {/* Hero Section */}
            <section className="py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                <p className="max-w-3xl mx-auto text-lg text-gray-700">
                    Welcome to our platform! We are committed to making knowledge accessible, enjoyable, and impactful for everyone.
                </p>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-start bg-gray-100">
                <div>
                    <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Our mission is to empower readers, inspire curiosity, and cultivate a community where books and education are easily accessible.
                    </p>
                </div>
                <div>
                    <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We envision a future where learning is limitless, and where every individual can expand their horizons through knowledge and stories.
                    </p>
                </div>
            </section>

            {/* Meet Our Team Section */}
            <section className="py-16 px-6 md:px-20 bg-[#ffffff]">
                <h2 className="text-3xl font-semibold text-center mb-12">Meet Our Team</h2>
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-xl shadow p-6 text-center">
                            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4">
                                {/* Optionally display image if provided */}
                                {member.img && (
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                )}
                            </div>
                            <h3 className="text-xl font-medium">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gray-100 text-black py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Want to Collaborate or Learn More?</h2>
                <p className="mb-6 max-w-xl mx-auto text-lg">
                    Whether you're a reader, contributor, or partner — we're excited to connect with you.
                </p>
                <a
                    href="/contact"
                    className="inline-block bg-white text-[#5b3423] font-medium px-6 py-3 rounded"
                >
                    Contact Us
                </a>
            </section>
        </div>
    );
};

export default About;
