

import { Link } from 'react-router-dom';

import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8" />
              <span className="text-xl font-bold font-poppins">Digital Learning</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Empowering rural students through accessible, high-quality digital education.
            </p>
            <p className="text-gray-300 text-sm">
              Developed by <span className="font-semibold">Code Nova</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/notes" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Notes
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link to="/pyqs" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Previous Year Questions
                </Link>
              </li>
              <li>
                <Link to="/lectures" className="text-gray-300 hover:text-accent transition-colors text-sm">
                  Recorded Lectures
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-accent mt-0.5" />
                <span className="text-gray-300 text-sm">contact@digitallearning.in</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-accent mt-0.5" />
                <span className="text-gray-300 text-sm">+91 1234567890</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-accent mt-0.5" />
                <span className="text-gray-300 text-sm">Rural India</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            &copy; {currentYear} Digital Learning Platform - Code Nova. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Team: Sanskar (Leader), Janvi, Sanjana Soni, Krishnaveer Chaudhary, Rahul Kumar, Yashpal Gola
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;