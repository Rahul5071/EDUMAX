import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    class: '',
    acceptedTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    if (!formData.acceptedTerms) {
      return setError('You must accept the Terms and Conditions');
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, {
        role: 'student',
        name: formData.name,
        class: formData.class,
        acceptedTerms: formData.acceptedTerms
      });
      navigate('/student/profile');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                {/* Icon & Title */}
                <div className="text-center mb-4">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #1E3A8A 0%, #2563eb 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <GraduationCap size={40} color="white" />
                  </div>
                  <h2 className="fw-bold text-primary mb-2">Create Your Account</h2>
                  <p className="text-muted">Join our community to get started</p>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                    <AlertCircle size={20} className="me-2" />
                    <div>{error}</div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Full Name */}
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <User size={18} className="text-muted" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-semibold">Email</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <Mail size={18} className="text-muted" />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="student@example.com"
                        />
                      </div>
                    </div>

                    {/* Class */}
                    <div className="col-12">
                      <label htmlFor="class" className="form-label fw-semibold">Class/Grade</label>
                      <select
                        className="form-select"
                        id="class"
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select your class</option>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                      </select>
                    </div>

                    {/* Password */}
                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label fw-semibold">Password</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <Lock size={18} className="text-muted" />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          placeholder="At least 6 characters"
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="col-md-6">
                      <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <Lock size={18} className="text-muted" />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          placeholder="Re-enter password"
                        />
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="acceptedTerms"
                          name="acceptedTerms"
                          checked={formData.acceptedTerms}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label small" htmlFor="acceptedTerms">
                          I accept the{' '}
                          <Link to="/terms" className="text-primary text-decoration-none fw-semibold">
                            Terms and Conditions
                          </Link>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-lg w-100 text-white fw-semibold"
                        style={{
                          background: 'linear-gradient(135deg, #1E3A8A 0%, #2563eb 100%)',
                          border: 'none',
                          borderRadius: '10px'
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <CheckCircle size={20} className="me-2" style={{ display: 'inline' }} />
                            Sign Up
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Footer Links */}
                <div className="text-center mt-4">
                  <p className="text-muted small mb-2">
                    Already have an account?{' '}
                    <Link to="/student-login" className="text-primary fw-semibold text-decoration-none">
                      Login here
                    </Link>
                  </p>
                  <div className="border-top pt-3 mt-3">
                    <p className="text-muted small mb-0">Are you a teacher?</p>
                    <Link to="/teacher-signup" className="text-primary fw-semibold text-decoration-none">
                      Sign up as Teacher
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;