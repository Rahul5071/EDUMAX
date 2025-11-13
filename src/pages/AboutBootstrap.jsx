import { Target, Eye, Users, Code, Heart, Award, BookOpen, Zap } from 'lucide-react';

const About = () => {
  const team = [
    { name: 'Sanskar', role: 'Team Leader', initial: 'S' },
    { name: 'Janvi', role: 'Developer', initial: 'J' },
    { name: 'Sanjana Soni', role: 'Developer', initial: 'SS' },
    { name: 'Krishnaveer Chaudhary', role: 'Developer', initial: 'KC' },
    { name: 'Rahul Kumar', role: 'Developer', initial: 'RK' },
    { name: 'Yashpal Gola', role: 'Developer', initial: 'YG' }
  ];

  const technologies = [
    { name: 'React.js', icon: '⚛' },
    { name: 'Vite', icon: '⚡' },
    { name: 'Bootstrap', icon: '🎨' },
    { name: 'Firebase Authentication', icon: '🔐' },
    { name: 'Firestore Database', icon: '🗄' },
    { name: 'Firebase Storage', icon: '☁' },
    { name: 'Progressive Web App', icon: '📱' },
    { name: 'Service Workers', icon: '⚙' }
  ];

  const values = [
    {
      icon: <Heart size={40} />,
      title: 'Accessibility',
      description: 'Making quality education accessible to every student, regardless of location or economic background.',
      color: '#ef4444'
    },
    {
      icon: <Award size={40} />,
      title: 'Quality',
      description: 'Providing high-quality, verified educational content curated by experienced teachers.',
      color: '#f59e0b'
    },
    {
      icon: <BookOpen size={40} />,
      title: 'Innovation',
      description: 'Leveraging modern technology to create engaging and effective learning experiences.',
      color: '#06b6d4'
    },
    {
      icon: <Zap size={40} />,
      title: 'Empowerment',
      description: 'Empowering students to learn at their own pace and achieve their full potential.',
      color: '#8b5cf6'
    }
  ];

  return (
    <div style={{ paddingTop: '56px' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #2563eb 100%)',
        color: 'white',
        padding: '80px 0'
      }}>
        <div className="container">
          <div className="text-center">
            <h1 className="display-3 fw-bold mb-4">About Digital Learning Platform</h1>
            <p className="lead mb-0" style={{ fontSize: '1.5rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
              Bridging the educational gap in rural India through technology and innovation
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row g-5">
            {/* Mission */}
            <div className="col-lg-6">
              <div className="h-100">
                <div className="d-flex align-items-center mb-4">
                  <div className="p-3 rounded-3 me-3" style={{ background: '#fef3c7' }}>
                    <Target size={40} style={{ color: '#f59e0b' }} />
                  </div>
                  <h2 className="h3 fw-bold text-primary mb-0">Our Mission</h2>
                </div>
                <p className="text-muted mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  The Digital Learning Platform is dedicated to empowering rural students across India 
                  by providing free, accessible, and high-quality educational resources.
                </p>
                <p className="text-muted mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  We believe that every student deserves access to quality education, regardless of 
                  their geographical location or economic background.
                </p>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  Through innovative technology and dedicated educators, we're making this vision a reality.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="col-lg-6">
              <div className="h-100">
                <div className="d-flex align-items-center mb-4">
                  <div className="p-3 rounded-3 me-3" style={{ background: '#dbeafe' }}>
                    <Eye size={40} style={{ color: '#1E3A8A' }} />
                  </div>
                  <h2 className="h3 fw-bold text-primary mb-0">Our Vision</h2>
                </div>
                <p className="text-muted mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  To create a future where every rural student in India has equal access to world-class 
                  educational resources and opportunities.
                </p>
                <p className="text-muted mb-3" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  We envision a digital learning ecosystem that bridges the urban-rural divide and 
                  empowers students to achieve their dreams.
                </p>
                <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  Our platform serves as a catalyst for educational transformation in rural communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-5" style={{background: '#f8f9fa' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary mb-3">Our Core Values</h2>
            <p className="lead text-muted">The principles that guide everything we do</p>
          </div>

          <div className="row g-4">
            {values.map((value, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 text-center" style={{
                  transition: 'transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div className="card-body p-4">
                    <div className="mb-3" style={{
                      width: '80px',
                      height: '80px',
                      background: `${value.color}22`,
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      color: value.color
                    }}>
                      {value.icon}
                    </div>
                    <h5 className="fw-bold mb-3">{value.title}</h5>
                    <p className="text-muted small mb-0">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <Users size={40} className="text-primary me-3" />
              <h2 className="display-5 fw-bold text-primary mb-0">Meet Team Code Nova</h2>
            </div>
            <p className="lead text-muted">The passionate developers behind this platform</p>
          </div>

          <div className="row g-4">
            {team.map((member, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm h-100" style={{
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}>
                  <div className="card-body text-center p-4">
                    <div className="mb-3" style={{
                      width: '100px',
                      height: '100px',
                      background: index === 0 ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'linear-gradient(135deg, #1E3A8A 0%, #2563eb 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}>
                      {member.initial}
                    </div>
                    <h5 className="fw-bold mb-2">{member.name}</h5>
                    <p className="text-muted mb-0">{member.role}</p>
                    {index === 0 && (
                      <span className="badge mt-2" style={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        padding: '6px 12px'
                      }}>
                        Leader
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <Code size={40} className="text-primary me-3" />
              <h2 className="display-5 fw-bold text-primary mb-0">Built With Modern Tech</h2>
            </div>
            <p className="lead text-muted">Cutting-edge technologies powering our platform</p>
          </div>

          <div className="row g-3">
            {technologies.map((tech, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100" style={{
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #1E3A8A 0%, #2563eb 100%)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = 'inherit';
                }}>
                  <div className="card-body text-center p-3">
                    <div className="mb-2" style={{ fontSize: '2rem' }}>{tech.icon}</div>
                    <h6 className="mb-0 fw-semibold">{tech.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold text-primary mb-4">Our Impact</h2>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Since our launch, we've been making a significant difference in rural education:
              </p>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-start">
                  <div className="p-2 rounded-circle me-3" style={{ background: '#d1fae5', minWidth: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                  </div>
                  <div>
                    <strong>Free Access:</strong> 100% free educational resources for all students
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <div className="p-2 rounded-circle me-3" style={{ background: '#d1fae5', minWidth: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                  </div>
                  <div>
                    <strong>Offline Support:</strong> PWA technology enables learning without constant internet
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <div className="p-2 rounded-circle me-3" style={{ background: '#d1fae5', minWidth: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                  </div>
                  <div>
                    <strong>Quality Content:</strong> Verified materials from experienced educators
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <div className="p-2 rounded-circle me-3" style={{ background: '#d1fae5', minWidth: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                  </div>
                  <div>
                    <strong>Interactive Learning:</strong> Quizzes, videos, and comprehensive notes
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <div className="card border-0 shadow-sm text-center p-4" style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', color: 'white' }}>
                    <h2 className="display-4 fw-bold mb-2">1000+</h2>
                    <p className="mb-0">Students Reached</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card border-0 shadow-sm text-center p-4" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white' }}>
                    <h2 className="display-4 fw-bold mb-2">50+</h2>
                    <p className="mb-0">Teachers</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card border-0 shadow-sm text-center p-4" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
                    <h2 className="display-4 fw-bold mb-2">500+</h2>
                    <p className="mb-0">Resources</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card border-0 shadow-sm text-center p-4" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
                    <h2 className="display-4 fw-bold mb-2">100%</h2>
                    <p className="mb-0">Free</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #2563eb 100%)',
        color: 'white'
      }}>
        <div className="container py-4 text-center">
          <h2 className="display-5 fw-bold mb-3">Join Our Mission</h2>
          <p className="lead mb-4" style={{ opacity: 0.9, maxWidth: '700px', margin: '0 auto 2rem' }}>
            Whether you're a student seeking knowledge or a teacher willing to share, 
            you're welcome to be part of our growing community.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <a href="/signin" className="btn btn-lg text-primary fw-semibold" style={{
              background: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '14px 36px'
            }}>
              Join as Student
            </a>
            <a href="/teacher-signup" className="btn btn-lg btn-outline-light fw-semibold" style={{
              borderRadius: '50px',
              padding: '14px 36px',
              borderWidth: '2px'
            }}>
              Join as Teacher
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;