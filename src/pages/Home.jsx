import { Link } from 'react-router-dom';
import { BookOpen, Brain, Video, FileText, Users, Award, Clock, Shield } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      title: 'Comprehensive Notes',
      description: 'Access subject-wise notes curated by experienced teachers, available for download and offline viewing.'
    },
    {
      icon: <Brain className="h-12 w-12 text-primary" />,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with auto-graded quizzes and get instant feedback on your performance.'
    },
    {
      icon: <Video className="h-12 w-12 text-primary" />,
      title: 'Recorded Lectures',
      description: 'Learn at your own pace with high-quality video lectures from expert educators.'
    },
    {
      icon: <FileText className="h-12 w-12 text-primary" />,
      title: 'Previous Year Questions',
      description: 'Practice with verified PYQs to excel in your examinations and build confidence.'
    }
  ];

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: 'Free for All',
      description: 'Completely free educational resources for rural students across India.'
    },
    {
      icon: <Clock className="h-8 w-8 text-accent" />,
      title: 'Learn Anytime',
      description: 'Access content 24/7, even in low-connectivity areas with offline support.'
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: 'Secure & Private',
      description: 'Your data is protected with role-based access and Firebase security.'
    },
    {
      icon: <Award className="h-8 w-8 text-accent" />,
      title: 'Quality Content',
      description: 'All materials are verified and uploaded by qualified teachers.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Class 12 Student',
      message: 'This platform has been a game-changer for my studies. The notes and quizzes helped me improve my grades significantly!',
      avatar: 'PS'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Teacher',
      message: 'An excellent initiative! The platform makes it easy to share quality content with students in remote areas.',
      avatar: 'RK'
    },
    {
      name: 'Anita Verma',
      role: 'Class 10 Student',
      message: 'The recorded lectures are amazing! I can learn at my own pace and revisit topics whenever I need.',
      avatar: 'AV'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">
              Empowering Rural Students Through Digital Learning
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Free, accessible, and high-quality education for everyone, everywhere
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signin" className="bg-accent hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started
              </Link>
              <Link to="/about" className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Features</h2>
            <p className="section-subtitle">
              Everything you need for effective learning in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary font-poppins">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-subtitle">
              Designed specifically for rural students with their needs in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-primary font-poppins">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">
              Real feedback from students and teachers using our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="card"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.message}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students already benefiting from our platform
          </p>
          <Link 
            to="/signin" 
            className="inline-block bg-accent hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Sign Up Now - It's Free!
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;