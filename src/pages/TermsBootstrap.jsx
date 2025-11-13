import { FileText, Shield, AlertCircle, Users, Scale } from 'lucide-react';

const TermsBootstrap = () => {
  return (
    <div className="pt-5">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="text-center">
            <FileText className="h4 w-4 mx-auto mb-3" />
            <h1 className="display-4 fw-bold mb-3">Terms and Conditions</h1>
            <p className="lead text-white-50">
              Last Updated: October 5, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-md-5">
                  {/* Introduction */}
                  <div className="mb-5">
                    <h2 className="h3 fw-bold text-primary mb-3 d-flex align-items-center">
                      <Scale className="me-2" size={24} />
                      1. Introduction & Acceptance of Terms
                    </h2>
                    <p className="text-muted mb-3">
                      Welcome to the Digital Learning Platform developed by Code Nova. By accessing or using our platform, 
                      you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, 
                      please do not use our services.
                    </p>
                    <p className="text-muted mb-0">
                      These terms apply to all users of the platform, including students, teachers, and visitors.
                    </p>
                  </div>

                  {/* User Roles */}
                  <div className="mb-5">
                    <h2 className="h3 fw-bold text-primary mb-4 d-flex align-items-center">
                      <Users className="me-2" size={24} />
                      2. User Roles & Responsibilities
                    </h2>
                    
                    <div className="ms-4">
                      <div className="mb-4">
                        <h3 className="h4 fw-semibold text-dark mb-2">Students</h3>
                        <ul className="list-disc ps-3 text-muted">
                          <li className="mb-1">Must provide accurate information during registration</li>
                          <li className="mb-1">Are responsible for maintaining the confidentiality of their account</li>
                          <li className="mb-1">May access notes, quizzes, PYQs, and recorded lectures</li>
                          <li className="mb-1">Must not share their login credentials with others</li>
                          <li className="mb-1">Should use the platform solely for educational purposes</li>
                          <li>Must not attempt to access teacher-only areas or other students' private data</li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h3 className="h4 fw-semibold text-dark mb-2">Teachers</h3>
                        <ul className="list-disc ps-3 text-muted">
                          <li className="mb-1">Must verify their credentials during signup</li>
                          <li className="mb-1">Are responsible for the accuracy and quality of uploaded content</li>
                          <li className="mb-1">May upload notes, quizzes, PYQs, and recorded lectures</li>
                          <li className="mb-1">Must respect student privacy and not access personal information without consent</li>
                          <li className="mb-1">Should ensure all content is appropriate and educational</li>
                          <li>Must not upload copyrighted material without proper authorization</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="h4 fw-semibold text-dark mb-2">Administrators</h3>
                        <ul className="list-disc ps-3 text-muted">
                          <li className="mb-1">Have access to platform management and user oversight</li>
                          <li className="mb-1">Are responsible for maintaining platform security and integrity</li>
                          <li>May review and moderate content as necessary</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Privacy & Data Protection */}
                  <div className="mb-5">
                    <h2 className="h3 fw-bold text-primary mb-3 d-flex align-items-center">
                      <Shield className="me-2" size={24} />
                      3. Privacy & Data Protection
                    </h2>
                    <ul className="list-disc ps-3 text-muted">
                      <li className="mb-1">We collect only necessary information for platform functionality</li>
                      <li className="mb-1">User data is stored securely using Firebase with encryption</li>
                      <li className="mb-1">Student personal information is not shared with teachers without consent</li>
                      <li className="mb-1">Teachers cannot access individual student private data</li>
                      <li className="mb-1">We implement role-based access control to protect user privacy</li>
                      <li className="mb-1">Users have the right to request deletion of their data</li>
                      <li className="mb-1">We do not sell or share user data with third parties</li>
                      <li>All data transmission is encrypted using HTTPS</li>
                    </ul>
                  </div>

                  {/* Content Ownership */}
                  <div className="mb-5">
                    <h2 className="h3 fw-bold text-primary mb-3">
                      4. Content Ownership & Usage
                    </h2>
                    <ul className="list-disc ps-3 text-muted">
                      <li className="mb-1">Teachers retain ownership of content they upload</li>
                      <li className="mb-1">By uploading content, teachers grant the platform a license to display and distribute it</li>
                      <li className="mb-1">Students may download content for personal educational use only</li>
                      <li className="mb-1">Content may not be redistributed, sold, or used for commercial purposes</li>
                      <li className="mb-1">The platform reserves the right to remove inappropriate content</li>
                      <li>Users must respect intellectual property rights</li>
                    </ul>
                  </div>

                  {/* Prohibited Activities */}
                  <div className="mb-5">
                    <h2 className="h3 fw-bold text-primary mb-3 d-flex align-items-center">
                      <AlertCircle className="me-2" size={24} />
                      5. Prohibited Activities
                    </h2>
                    <p className="text-muted mb-3">Users must not:</p>
                    <ul className="list-disc ps-3 text-muted">
                      <li className="mb-1">Attempt to hack, breach, or compromise platform security</li>
                      <li className="mb-1">Upload malicious software, viruses, or harmful code</li>
                      <li className="mb-1">Harass, threaten, or abuse other users</li>
                      <li className="mb-1">Upload inappropriate, offensive, or illegal content</li>
                      <li className="mb-1">Impersonate other users or provide false information</li>
                      <li className="mb-1">Attempt to access areas or data they are not authorized to view</li>
                      <li className="mb-1">Use automated tools to scrape or download content in bulk</li>
                      <li>Interfere with the proper functioning of the platform</li>
                    </ul>
                  </div>

                  {/* Disclaimer */}
                  <div className="mb-5">
                    <h2 className="h3 fw-bold text-primary mb-3">
                      6. Disclaimer / Limitation of Liability
                    </h2>
                    <ul className="list-disc ps-3 text-muted">
                      <li className="mb-1">The platform is provided "as is" without warranties of any kind</li>
                      <li className="mb-1">We do not guarantee uninterrupted or error-free service</li>
                      <li className="mb-1">Content accuracy is the responsibility of uploading teachers</li>
                      <li className="mb-1">We are not liable for any damages arising from platform use</li>
                      <li className="mb-1">Users are responsible for their own learning outcomes</li>
                      <li>We are not responsible for third-party content or links</li>
                    </ul>
                  </div>

                  {/* Platform Availability */}
                  <div className="mb-5">
                    <h2 className="h3 fw-bold text-primary mb-3">
                      7. Platform Availability & Maintenance
                    </h2>
                    <ul className="list-disc ps-3 text-muted">
                      <li className="mb-1">We strive to maintain 24/7 availability but cannot guarantee it</li>
                      <li className="mb-1">Scheduled maintenance will be announced in advance when possible</li>
                      <li className="mb-1">We reserve the right to modify or discontinue features</li>
                      <li className="mb-1">Offline functionality is provided through PWA technology</li>
                      <li>We may temporarily suspend accounts for security or policy violations</li>
                    </ul>
                  </div>

                  {/* Changes to Terms */}
                  <div className="mb-5">
                    <h2 className="h3 fw-bold text-primary mb-3">
                      8. Changes to Terms
                    </h2>
                    <p className="text-muted mb-0">
                      We reserve the right to modify these terms at any time. Users will be notified of significant 
                      changes via email or platform notification. Continued use of the platform after changes constitutes 
                      acceptance of the new terms.
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="mb-4">
                    <h2 className="h3 fw-bold text-primary mb-3">
                      9. Contact Information
                    </h2>
                    <p className="text-muted mb-3">
                      For questions about these Terms and Conditions, please contact us:
                    </p>
                    <ul className="list-unstyled text-muted">
                      <li className="mb-1"><strong>Email:</strong> legal@digitallearning.in</li>
                      <li className="mb-1"><strong>Support:</strong> contact@digitallearning.in</li>
                      <li><strong>Phone:</strong> +91 1234567890</li>
                    </ul>
                  </div>

                  {/* Acceptance */}
                  <div className="bg-primary bg-opacity-10 border-start border-primary border-4 p-4 rounded">
                    <p className="fw-semibold text-primary mb-2">
                      By creating an account and using this platform, you acknowledge that you have read, 
                      understood, and agree to be bound by these Terms and Conditions.
                    </p>
                    <p className="text-muted small mb-0">
                      Digital Learning Platform - Code Nova © 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsBootstrap;