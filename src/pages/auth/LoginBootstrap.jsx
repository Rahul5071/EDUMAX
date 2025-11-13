import { Link } from 'react-router-dom';
import { GraduationCap, Users } from 'lucide-react';

const Login = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1E3A8A 0%, #2563eb 100%)',
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="text-center text-white mb-5 fade-in">
              <h1 className="display-4 fw-bold mb-3">Ready to Begin Your Learning Journey?</h1>
              <p className="lead">Sign in or create an account to access your notes, PYQS, and learning resources.</p>
            </div>

            {/* Login Options */}
            <div className="row g-4 mb-4">
              {/* Student Login Card */}
              <div className="col-md-6">
                <Link to="/student-login" className="text-decoration-none">
                  <div className="card h-100 shadow-lg border-0" style={{ 
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                  }}>
                    <div className="card-body text-center p-5">
                      <div className="mb-4">
                        <div style={{
                          width: '100px',
                          height: '100px',
                          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto'
                        }}>
                          <GraduationCap size={50} color="white" />
                        </div>
                      </div>
                      <h2 className="h3 fw-bold text-primary mb-3">Student Login</h2>
                      <p className="text-muted mb-4">
                        Access your profile, notes, quizzes, and track your progress
                      </p>
                      <button className="btn btn-lg w-100" style={{
                        background: '#06b6d4',
                        color: 'white',
                        borderRadius: '50px',
                        padding: '12px 40px',
                        fontWeight: '600',
                        border: 'none'
                      }}>
                        Login
                      </button>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Teacher Login Card */}
              <div className="col-md-6">
                <Link to="/teacher-login" className="text-decoration-none">
                  <div className="card h-100 shadow-lg border-0" style={{ 
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                  }}>
                    <div className="card-body text-center p-5">
                      <div className="mb-4">
                        <div style={{
                          width: '100px',
                          height: '100px',
                          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          border: '3px solid #1E3A8A'
                        }}>
                          <Users size={50} color="#1E3A8A" />
                        </div>
                      </div>
                      <h2 className="h3 fw-bold text-primary mb-3">Teacher Login</h2>
                      <p className="text-muted mb-4">
                        Manage content, upload resources, and view class analytics
                      </p>
                      <button className="btn btn-lg w-100" style={{
                        background: 'white',
                        color: '#1E3A8A',
                        borderRadius: '50px',
                        padding: '12px 40px',
                        fontWeight: '600',
                        border: '2px solid #1E3A8A'
                      }}>
                        Sign Up
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <div className="bg-white rounded-pill shadow-sm d-inline-flex align-items-center px-5 py-3">
                <Link to="/contact" className="text-decoration-none text-dark fw-semibold mx-3">Contact</Link>
                <span className="text-muted">|</span>
                <Link to="/about" className="text-decoration-none text-dark fw-semibold mx-3">About</Link>
                <span className="text-muted">|</span>
                <Link to="/terms" className="text-decoration-none text-dark fw-semibold mx-3">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;