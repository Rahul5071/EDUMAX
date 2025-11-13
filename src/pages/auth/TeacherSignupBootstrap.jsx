import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Users, Mail, Lock, User, Phone, AlertCircle, CheckCircle, BookOpen, Award } from 'lucide-react';

const TeacherSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    subject: '',
    qualification: '',
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
        role: 'teacher',
        name: formData.name,
        phone: formData.phone,
        subject: formData.subject,
        qualification: formData.qualification,
        acceptedTerms: formData.acceptedTerms
      });
      navigate('/teacher/dashboard');
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
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                {/* Icon & Title */}
                <div className="text-center mb-4">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #F59E0B 0%, #d97706 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <Users size={40} color="white" />
                  </div>
                  <h2 className="fw-bold text-primary mb-2">Teacher Signup</h2>
                  <p className="text-muted">Join us to empower rural students</p>
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
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
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
                          placeholder="teacher@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <Phone size={18} className="text-muted" />
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91 1234567890"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="col-md-6">
                      <label htmlFor="subject" className="form-label fw-semibold">Subject Specialization</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <BookOpen size={18} className="text-muted" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="e.g., Mathematics"
                        />
                      </div>
                    </div>

                    {/* Qualification */}
                    <div className="col-12">
                      <label htmlFor="qualification" className="form-label fw-semibold">Qualification</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <Award size={18} className="text-muted" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="qualification"
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleChange}
                          required
                          placeholder="e.g., M.Sc. in Mathematics, B.Ed."
                        />
                      </div>
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
                          {' '}and understand my responsibilities as a teacher on this platform
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
                          background: 'linear-gradient(135deg, #F59E0B 0%, #d97706 100%)',
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
                            Create Teacher Account
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
                    <Link to="/teacher-login" className="text-warning fw-semibold text-decoration-none">
                      Login here
                    </Link>
                  </p>
                  <Link to="/signin" className="text-muted small text-decoration-none">
                    ← Back to signup options
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

export default TeacherSignup;