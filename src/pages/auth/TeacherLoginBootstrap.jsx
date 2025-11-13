import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Users, Mail, Lock, AlertCircle } from 'lucide-react';

const TeacherLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/teacher/dashboard');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1E3A8A 0%, #2563eb 100%)',
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                {/* Icon */}
                <div className="text-center mb-4">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #F59E0B 0%, #d97706 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    <Users size={40} color="white" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-center fw-bold text-primary mb-2">Teacher Login</h2>
                <p className="text-center text-muted mb-4">Access your teaching dashboard</p>

                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <AlertCircle size={20} className="me-2" />
                    <div>{error}</div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <Mail size={18} className="text-muted" />
                      </span>
                      <input
                        type="email"
                        className="form-control border-start-0 ps-0"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="teacher@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <Lock size={18} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className="form-control border-start-0 ps-0"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember" />
                      <label className="form-check-label small" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="small text-primary text-decoration-none">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-lg w-100 text-white fw-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #d97706 100%)',
                      border: 'none',
                      borderRadius: '10px'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>
                </form>

                {/* Footer Links */}
                <div className="text-center mt-4">
                  <p className="text-muted small mb-2">
                    Don't have an account?{' '}
                    <Link to="/teacher-signup" className="text-warning fw-semibold text-decoration-none">
                      Sign up as Teacher
                    </Link>
                  </p>
                  <Link to="/login" className="text-muted small text-decoration-none">
                    ← Back to login options
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;