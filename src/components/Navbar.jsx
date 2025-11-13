import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary font-poppins">
              Digital Learning
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors font-medium">
              About
            </Link>
            
            {currentUser && (
              <>
                <Link to="/notes" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Notes
                </Link>
                <Link to="/quizzes" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Quizzes
                </Link>
                <Link to="/pyqs" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  PYQs
                </Link>
                <Link to="/lectures" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Lectures
                </Link>
              </>
            )}
            
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Contact
            </Link>

            {/* Auth buttons */}
            {currentUser ? (
              <div className="flex items-center space-x-4">
                {userRole === 'student' && (
                  <Link 
                    to="/student/profile" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                )}
                {userRole === 'teacher' && (
                  <Link 
                    to="/teacher/dashboard" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary transition-colors font-medium">
                  Login
                </Link>
                <Link to="/signin" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-primary transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            
            {currentUser && (
              <>
                <Link 
                  to="/notes" 
                  className="block py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Notes
                </Link>
                <Link 
                  to="/quizzes" 
                  className="block py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Quizzes
                </Link>
                <Link 
                  to="/pyqs" 
                  className="block py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  PYQs
                </Link>
                <Link 
                  to="/lectures" 
                  className="block py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Lectures
                </Link>
              </>
            )}
            
            <Link 
              to="/contact" 
              className="block py-2 text-gray-700 hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>

            {currentUser ? (
              <>
                {userRole === 'student' && (
                  <Link 
                    to="/student/profile" 
                    className="block py-2 text-gray-700 hover:text-primary transition-colors"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                )}
                {userRole === 'teacher' && (
                  <Link 
                    to="/teacher/dashboard" 
                    className="block py-2 text-gray-700 hover:text-primary transition-colors"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signin" 
                  className="block py-2 text-primary font-semibold hover:text-blue-900 transition-colors"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;