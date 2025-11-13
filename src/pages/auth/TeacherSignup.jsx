import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Users, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';

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
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-10 w-10 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-primary font-poppins">Teacher Signup</h2>
            <p className="text-gray-600 mt-2">Join us to empower rural students</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="teacher@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="+91 1234567890"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject Specialization *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="e.g., Mathematics"
                />
              </div>
            </div>

            <div>
              <label htmlFor="qualification" className="block text-gray-700 font-medium mb-2">
                Qualification *
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="e.g., M.Sc. in Mathematics, B.Ed."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="At least 6 characters"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="acceptedTerms"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className="mt-1 mr-3"
                required
              />
              <label htmlFor="acceptedTerms" className="text-sm text-gray-700">
                I accept the{' '}
                <Link to="/terms" className="text-primary hover:text-blue-900 font-semibold">
                  Terms and Conditions
                </Link>{' '}
                and understand my responsibilities as a teacher on this platform
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-secondary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="spinner border-white border-t-transparent w-5 h-5" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Create Teacher Account</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/teacher-login" className="text-accent font-semibold hover:text-yellow-700">
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/signin" className="text-sm text-gray-600 hover:text-primary">
              ← Back to signup options
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSignup;