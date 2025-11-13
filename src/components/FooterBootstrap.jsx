import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-primary-custom text-white mt-5">
      <div className="container py-5">
        <div className="row g-4">
          {/* About Section */}
          <div className="col-md-3">
            <div className="d-flex align-items-center mb-3">
              <BookOpen size={32} className="me-2" />
              <h5 className="mb-0">Digital Learning</h5>
            </div>
            <p className="text-white-50 small">
              Empowering rural students through accessible, high-quality digital education.
            </p>
            <p className="text-white-50 small">
              Developed by <strong>Code Nova</strong>
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white-50 text-decoration-none">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white-50 text-decoration-none">Contact</Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-white-50 text-decoration-none">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-3">
            <h5 className="mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/notes" className="text-white-50 text-decoration-none">Notes</Link>
              </li>
              <li className="mb-2">
                <Link to="/quizzes" className="text-white-50 text-decoration-none">Quizzes</Link>
              </li>
              <li className="mb-2">
                <Link to="/pyqs" className="text-white-50 text-decoration-none">Previous Year Questions</Link>
              </li>
              <li className="mb-2">
                <Link to="/lectures" className="text-white-50 text-decoration-none">Recorded Lectures</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-start">
                <Mail size={18} className="me-2 mt-1 text-warning" />
                <span className="text-white-50 small">contact@digitallearning.in</span>
              </li>
              <li className="mb-2 d-flex align-items-start">
                <Phone size={18} className="me-2 mt-1 text-warning" />
                <span className="text-white-50 small">+91 1234567890</span>
              </li>
              <li className="mb-2 d-flex align-items-start">
                <MapPin size={18} className="me-2 mt-1 text-warning" />
                <span className="text-white-50 small">Rural India</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white-50">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white-50">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white-50">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white-50">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-top border-secondary mt-4 pt-4">
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="text-white-50 small mb-2">
                &copy; {currentYear} Digital Learning Platform - Code Nova. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="text-white-50 small mb-2">
                Team: Sanskar (Leader), Janvi, Sanjana Soni, Krishnaveer, Rahul, Yashpal
              </p>
            </div>
          </div>
          <div className="text-center mt-2">
            <p className="text-white-50 small mb-0">
              <Link to="/terms" className="text-white-50 text-decoration-none me-3">Privacy Policy</Link>
              <Link to="/terms" className="text-white-50 text-decoration-none me-3">Terms of Service</Link>
              <Link to="/contact" className="text-white-50 text-decoration-none">Support</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;