import { Link } from 'react-router-dom';
import { BookOpen, Brain, Video, FileText, Users, Award, Clock, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <BookOpen size={48} />,
      title: 'Comprehensive Notes',
      description: 'Access subject-wise notes curated by experienced teachers, available for download and offline viewing.',
      color: '#06b6d4'
    },
    {
      icon: <Brain size={48} />,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with auto-graded quizzes and get instant feedback on your performance.',
      color: '#8b5cf6'
    },
    {
      icon: <Video size={48} />,
      title: 'Recorded Lectures',
      description: 'Learn at your own pace with high-quality video lectures from expert educators.',
      color: '#10b981'
    },
    {
      icon: <FileText size={48} />,
      title: 'Previous Year Questions',
      description: 'Practice with verified PYQs to excel in your examinations and build confidence.',
      color: '#f59e0b'
    }
  ];

  const benefits = [
    {
      icon: <Users size={32} />,
      title: 'Free for All',
      description: 'Completely free educational resources for rural students across India.'
    },
    {
      icon: <Clock size={32} />,
      title: 'Learn Anytime',
      description: 'Access content 24/7, even in low-connectivity areas with offline support.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure & Private',
      description: 'Your data is protected with role-based access and Firebase security.'
    },
    {
      icon: <Award size={32} />,
      title: 'Quality Content',
      description: 'All materials are verified and uploaded by qualified teachers.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Students' },
    { number: '50+', label: 'Teachers' },
    { number: '500+', label: 'Resources' },
    { number: '100%', label: 'Free' }
  ];

  return (
    <div style={{ paddingTop: '56px' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #2563eb 100%)',
        color: 'white',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4" style={{ lineHeight: '1.2' }}>
                Easy to Learn with Digital Learning Platform
              </h1>
              <p className="lead mb-4" style={{ fontSize: '1.25rem', opacity: 0.9 }}>
                Learn from industry experts, get certified, and take your career to the next level
              </p>
              <p className="mb-4" style={{ opacity: 0.85 }}>
                Empowering rural students across India with free, accessible, and high-quality digital education.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/signin" className="btn btn-lg text-white fw-semibold" style={{
                  background: '#06b6d4',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '12px 32px'
                }}>
                  Get Started
                  <ArrowRight size={20} className="ms-2" style={{ display: 'inline' }} />
                </Link>
                <Link to="/about" className="btn btn-lg btn-outline-light fw-semibold" style={{
                  borderRadius: '50px',
                  padding: '12px 32px',
                  borderWidth: '2px'
                }}>
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                  alt="Students learning" 
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row g-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-md-3 text-center">
                <h2 className="display-4 fw-bold text-primary mb-2">{stat.number}</h2>
                <p className="text-muted mb-0">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">Our Features</h2>
            <p className="lead text-muted">Everything you need for effective learning</p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm" style={{
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-3" style={{
                      width: '80px',
                      height: '80px',
                      background: `linear-gradient(135deg, ${feature.color}22 0%, ${feature.color}11 100%)`,
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      color: feature.color
                    }}>
                      {feature.icon}
                    </div>
                    <h5 className="fw-bold mb-3">{feature.title}</h5>
                    <p className="text-muted small mb-0">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">Why Choose Us</h2>
            <p className="lead text-muted">Benefits that make us stand out</p>
          </div>

          <div className="row g-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="text-center">
                  <div className="mb-3" style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #F59E0B 0%, #d97706 100%)',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    color: 'white'
                  }}>
                    {benefit.icon}
                  </div>
                  <h5 className="fw-bold mb-2">{benefit.title}</h5>
                  <p className="text-muted small mb-0">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #2563eb 100%)',
        color: 'white'
      }}>
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <h2 className="display-6 fw-bold mb-3">Ready to Start Learning?</h2>
              <p className="lead mb-0" style={{ opacity: 0.9 }}>
                Join thousands of students already learning on our platform
              </p>
              <div className="mt-3">
                <CheckCircle size={20} className="me-2" style={{ display: 'inline' }} />
                <span>Free forever</span>
                <CheckCircle size={20} className="ms-4 me-2" style={{ display: 'inline' }} />
                <span>No credit card required</span>
              </div>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/signin" className="btn btn-lg text-primary fw-semibold" style={{
                background: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '14px 36px'
              }}>
                Sign Up Now
                <ArrowRight size={20} className="ms-2" style={{ display: 'inline' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">What Students Say</h2>
            <p className="lead text-muted">Real feedback from our community</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <span className="text-warning">★★★★★</span>
                  </div>
                  <p className="mb-3">"This platform has completely changed how I study. The notes are clear and the quizzes help me test my knowledge."</p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                      <span className="fw-bold">R</span>
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold">Rahul Kumar</h6>
                      <small className="text-muted">Class 10 Student</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <span className="text-warning">★★★★★</span>
                  </div>
                  <p className="mb-3">"As a teacher, I love how easy it is to upload content and track student progress. Great platform!"</p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                      <span className="fw-bold">P</span>
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold">Priya Sharma</h6>
                      <small className="text-muted">Mathematics Teacher</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <span className="text-warning">★★★★★</span>
                  </div>
                  <p className="mb-3">"The video lectures are excellent and I can watch them anytime. Perfect for rural areas with limited internet."</p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                      <span className="fw-bold">A</span>
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold">Anita Devi</h6>
                      <small className="text-muted">Class 12 Student</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;