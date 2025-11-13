import { Link } from 'react-router-dom';
import { GraduationCap, Users } from 'lucide-react';

const Login = () => {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4 font-poppins">
            Welcome Back!
          </h1>
          <p className="text-xl text-gray-600">
            Choose your role to continue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Login */}
          <Link 
            to="/student-login"
            className="card hover:scale-105 transition-all duration-300 text-center group"
          >
            <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-3 font-poppins">
              Student Login
            </h2>
            <p className="text-gray-600 mb-6">
              Access your profile, notes, quizzes, and track your progress
            </p>
            <div className="btn-primary inline-block">
              Login as Student
            </div>
          </Link>

          {/* Teacher Login */}
          <Link 
            to="/teacher-login"
            className="card hover:scale-105 transition-all duration-300 text-center group"
          >
            <div className="bg-accent/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
              <Users className="h-12 w-12 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-3 font-poppins">
              Teacher Login
            </h2>
            <p className="text-gray-600 mb-6">
              Manage content, upload resources, and view class analytics
            </p>
            <div className="btn-secondary inline-block">
              Login as Teacher
            </div>
          </Link>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signin" className="text-primary font-semibold hover:text-blue-900 transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;