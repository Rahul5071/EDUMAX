import { Target, Eye, Users, Code } from 'lucide-react';

const About = () => {
  const team = [
    { name: 'Sanskar', role: 'Team Leader' },
    { name: 'Janvi', role: 'Developer' },
    { name: 'Sanjana Soni', role: 'Developer' },
    { name: 'Krishnaveer Chaudhary', role: 'Developer' },
    { name: 'Rahul Kumar', role: 'Developer' },
    { name: 'Yashpal Gola', role: 'Developer' }
  ];

  const technologies = [
    'React.js',
    'Vite',
    'Tailwind CSS',
    'Firebase Authentication',
    'Firestore Database',
    'Firebase Storage',
    'Progressive Web App (PWA)',
    'Service Workers'
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
              About Digital Learning Platform
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Bridging the educational gap in rural India through technology and innovation
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="h-12 w-12 text-accent mr-4" />
                <h2 className="text-3xl font-bold text-primary font-poppins">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                The Digital Learning Platform is dedicated to empowering rural students across India 
                by providing free, accessible, and high-quality educational resources. We believe that 
                every student, regardless of their location or economic background, deserves access to 
                excellent education.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our platform ensures that students can access notes, quizzes, recorded lectures, and 
                previous year questions even in low-connectivity regions, making education truly accessible.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <Eye className="h-12 w-12 text-accent mr-4" />
                <h2 className="text-3xl font-bold text-primary font-poppins">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We envision a future where geographical boundaries and economic constraints no longer 
                limit educational opportunities. Through technology, we aim to create an inclusive 
                learning ecosystem that reaches every corner of rural India.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                By leveraging Progressive Web App technology, we ensure our platform works seamlessly 
                offline, providing uninterrupted learning experiences even in areas with poor internet 
                connectivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Nova Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Code className="h-12 w-12 text-primary mr-4" />
              <h2 className="text-3xl font-bold text-primary font-poppins">Developed by Code Nova</h2>
            </div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Code Nova is a passionate team of developers committed to using technology for social good. 
              This platform represents our dedication to making quality education accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Users className="h-12 w-12 text-accent mr-4" />
              <h2 className="text-3xl font-bold text-primary font-poppins">Our Team</h2>
            </div>
            <p className="text-gray-700 text-lg">
              Meet the talented individuals behind this platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="card text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2 font-poppins">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 font-poppins">
              Technology Stack
            </h2>
            <p className="text-gray-700 text-lg">
              Built with modern, reliable, and scalable technologies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              >
                <p className="font-semibold text-primary">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-poppins">
              Platform Highlights
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3 text-accent">PWA Technology</h3>
              <p className="text-blue-100">
                Installable app experience with offline capability and fast loading
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3 text-accent">Role-Based Access</h3>
              <p className="text-blue-100">
                Secure authentication with separate experiences for students and teachers
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3 text-accent">Privacy First</h3>
              <p className="text-blue-100">
                Firebase security rules ensure data protection and user privacy
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;