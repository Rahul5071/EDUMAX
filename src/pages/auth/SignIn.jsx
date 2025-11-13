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
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-primary font-poppins">Student Sign Up</h2>
            <p className="text-gray-600 mt-2">Start your learning journey today</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="student@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="class" className="block text-gray-700 font-medium mb-2">
                Class/Grade *
              </label>
              <select
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
                className="input-field"
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
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="spinner border-white border-t-transparent w-5 h-5" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Create Student Account</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/student-login" className="text-primary font-semibold hover:text-blue-900">
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">Are you a teacher?</p>
            <Link to="/teacher-signup" className="text-accent font-semibold hover:text-yellow-700">
              Sign up as Teacher
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;