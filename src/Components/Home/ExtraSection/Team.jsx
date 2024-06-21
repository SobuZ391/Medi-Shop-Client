import React from 'react';

const Team = () => {
	const teamMembers = [
		{
			name: 'Dr. Alice Smith',
			role: 'Medical Researcher',
			imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
			email: 'alice.smith@example.com',
			twitter: 'https://twitter.com/alicesmith',
			linkedin: 'https://www.linkedin.com/in/alicesmith',
			github: 'https://github.com/alicesmith'
		},
		{
			name: 'Dr. John Doe',
			role: 'Cardiologist',
			imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
			email: 'john.doe@example.com',
			twitter: 'https://twitter.com/johndoe',
			linkedin: 'https://www.linkedin.com/in/johndoe',
			github: 'https://github.com/johndoe'
		},
		{
			name: 'Dr. Emily Brown',
			role: 'Neurologist',
			imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
			email: 'emily.brown@example.com',
			twitter: 'https://twitter.com/emilybrown',
			linkedin: 'https://www.linkedin.com/in/emilybrown',
			github: 'https://github.com/emilybrown'
		},
		{
			name: 'Dr. Michael Johnson',
			role: 'Surgeon',
			imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
			email: 'michael.johnson@example.com',
			twitter: 'https://twitter.com/michaeljohnson',
			linkedin: 'https://www.linkedin.com/in/michaeljohnson',
			github: 'https://github.com/michaeljohnson'
		},
		{
			name: 'Dr. Sarah Lee',
			role: 'Pediatrician',
			imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
			email: 'sarah.lee@example.com',
			twitter: 'https://twitter.com/sarahlee',
			linkedin: 'https://www.linkedin.com/in/sarahlee',
			github: 'https://github.com/sarahlee'
		},
		{
			name: 'Dr. David Clark',
			role: 'Oncologist',
			imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
			email: 'david.clark@example.com',
			twitter: 'https://twitter.com/davidclark',
			linkedin: 'https://www.linkedin.com/in/davidclark',
			github: 'https://github.com/davidclark'
		}
	];
	
    return (
        <section className="py-6 border-2 rounded-xl my-10">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-lg">
                            <img
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-40 h-40 rounded-full object-cover mb-4"
                            />
                            <div className="text-center">
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-gray-600">{member.role}</p>
                                <div className="flex justify-center mt-2 space-x-4">
                                    <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6m6 0V6m0 0V0.5" />
                                        </svg>
                                    </a>
                                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.707 20.707a1 1 0 01-1.414-1.414l3.003-3.003a1 1 0 00-.765-1.664 6.366 6.366 0 01-4.746-2.076 1 1 0 111.524-1.272 4.363 4.363 0 006.47.522 1 1 0 01.965 1.65 6.364 6.364 0 01-3.562 2.198l3.002 3.002a1 1 0 11-1.414 1.414l-3.002-3.002-2.293 2.293zM12 2a10 10 0 100 20 10 10 0 000-20z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M3 3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2H3zm5 5H5v10h3V8zm.5-2a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM7 16H5v-6h2v6zm4.5-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm7-1.5h-2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1h-2v6h2v-3a2 2 0 012-2h1a2 2 0 012 2v3h2v-6zm-5.5 1a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.17 6.839 9.488.5.09.682-.218.682-.485 0-.24-.008-.875-.013-1.715-2.782.604-3.37-1.342-3.37-1.342-.455-1.153-1.111-1.462-1.111-1.462-.908-.618.069-.605.069-.605 1.003.07 1.531 1.03 1.531 1.03.891 1.527 2.341 1.087 2.913.831.091-.644.349-1.087.635-1.337-2.22-.253-4.555-1.11-4.555-4.94 0-1.09.39-1.984 1.031-2.683-.103-.253-.448-1.266.098-2.637 0 0 .837-.268 2.743 1.022a9.57 9.57 0 012.494-.335c.847.007 1.705.113 2.495.334 1.904-1.29 2.74-1.022 2.74-1.022.548 1.371.202 2.384.1 2.637.642.699 1.03 1.593 1.03 2.683 0 3.839-2.339 4.684-4.567 4.931.36.308.681.919.681 1.853 0 1.338-.012 2.415-.012 2.745 0 .269.18.579.688.482A10.98 10.98 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
