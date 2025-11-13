import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: 'student',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await addDoc(collection(db, 'contactMessages'), {
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'unread'
      });

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        userType: 'student',
        subject: '',
        message: ''
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f3f4f6' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-primary mb-3">Get In Touch</h1>
              <p className="lead text-muted">We'd love to hear from you. Send us a message!</p>
            </div>

            <div className="row g-4">
              {/* Contact Form */}
              <div className="col-lg-7">
                <div className="card shadow-sm border-0 rounded-4">
                  <div className="card-body p-4 p-md-5">
                    <h2 className="h3 fw-bold text-primary mb-4">Send Us A Message</h2>

                    {/* Success Alert */}
                    {success && (
                      <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                        <CheckCircle size={20} className="me-2" />
                        <div>Message sent successfully! We'll get back to you soon.</div>
                      </div>
                    )}

                    {/* Error Alert */}
                    {error && (
                      <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                        <AlertCircle size={20} className="me-2" />
                        <div>{error}</div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        {/* Full Name */}
                        <div className="col-md-6">
                          <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                          />
                        </div>

                        {/* Email */}
                        <div className="col-md-6">
                          <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                          />
                        </div>

                        {/* User Type */}
                        <div className="col-12">
                          <label htmlFor="userType" className="form-label fw-semibold">I am a</label>
                          <select
                            className="form-select"
                            id="userType"
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            required
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="visitor">Visitor</option>
                          </select>
                        </div>

                        {/* Subject */}
                        <div className="col-12">
                          <label htmlFor="subject" className="form-label fw-semibold">Subject</label>
                          <input
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="What is this regarding?"
                          />
                        </div>

                        {/* Message */}
                        <div className="col-12">
                          <label htmlFor="message" className="form-label fw-semibold">Message</label>
                          <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            placeholder="Write your message here..."
                          />
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
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send size={20} className="me-2" style={{ display: 'inline' }} />
                                Send Message
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="col-lg-5">
                <div className="card shadow-sm border-0 rounded-4 mb-4">
                  <div className="card-body p-4">
                    <h2 className="h4 fw-bold text-primary mb-4">Contact Information</h2>
                    
                    <div className="d-flex align-items-start mb-4">
                      <div className="p-3 rounded-3" style={{ background: '#e0f2fe' }}>
                        <Mail size={24} className="text-primary" />
                      </div>
                      <div className="ms-3">
                        <h5 className="fw-semibold mb-1">Email</h5>
                        <p className="text-muted small mb-0">contact@digitallearning.in</p>
                        <p className="text-muted small mb-0">support@digitallearning.in</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start mb-4">
                      <div className="p-3 rounded-3" style={{ background: '#e0f2fe' }}>
                        <Phone size={24} className="text-primary" />
                      </div>
                      <div className="ms-3">
                        <h5 className="fw-semibold mb-1">Phone</h5>
                        <p className="text-muted small mb-0">+91 1234567890</p>
                        <p className="text-muted small mb-0">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start">
                      <div className="p-3 rounded-3" style={{ background: '#e0f2fe' }}>
                        <MapPin size={24} className="text-primary" />
                      </div>
                      <div className="ms-3">
                        <h5 className="fw-semibold mb-1">Location</h5>
                        <p className="text-muted small mb-0">Nationwide Coverage</p>
                        <p className="text-muted small mb-0">Serving Rural India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card shadow-sm border-0 rounded-4" style={{
                  background: 'linear-gradient(135deg, #1E3A8A 0%, #2563eb 100%)'
                }}>
                  <div className="card-body p-4 text-white">
                    <h5 className="fw-bold mb-3">Need Immediate Help?</h5>
                    <p className="small mb-3">
                      Check out our FAQ section or reach out to our support team. 
                      We typically respond within 24 hours.
                    </p>
                    <p className="small mb-0 opacity-75">
                      For urgent technical issues, please mention "URGENT" in your subject line.
                    </p>
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

export default Contact;