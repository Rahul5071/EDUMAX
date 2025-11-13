import { FileText, Shield, AlertCircle, Users, Scale } from 'lucide-react';

const Terms = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in">
            <FileText className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
              Terms and Conditions
            </h1>
            <p className="text-xl text-blue-100">
              Last Updated: October 5, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4 font-poppins flex items-center">
                <Scale className="h-6 w-6 mr-2" />
                1. Introduction & Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to the Digital Learning Platform developed by Code Nova. By accessing or using our platform, 
                you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, 
                please do not use our services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These terms apply to all users of the platform, including students, teachers, and visitors.
              </p>
            </div>

            {/* User Roles */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4 font-poppins flex items-center">
                <Users className="h-6 w-6 mr-2" />
                2. User Roles & Responsibilities
              </h2>
              
              <div className="ml-4 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Students</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Must provide accurate information during registration</li>
                    <li>Are responsible for maintaining the confidentiality of their account</li>
                    <li>May access notes, quizzes, PYQs, and recorded lectures</li>
                    <li>Must not share their login credentials with others</li>
                    <li>Should use the platform solely for educational purposes</li>
                    <li>Must not attempt to access teacher-only areas or other students' private data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Teachers</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Must verify their credentials during signup</li>
                    <li>Are responsible for the accuracy and quality of uploaded content</li>
                    <li>May upload notes, quizzes, PYQs, and recorded lectures</li>
                    <li>Must respect student privacy and not access personal information without consent</li>
                    <li>Should ensure all content is appropriate and educational</li>
                    <li>Must not upload copyrighted material without proper authorization</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Administrators</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Have access to platform management and user oversight</li>
                    <li>Are responsible for maintaining platform security and integrity</li>
                    <li>May review and moderate content as necessary</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Privacy & Data Protection */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4 font-poppins flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                3. Privacy & Data Protection
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>We collect only necessary information for platform functionality</li>
                <li>User data is stored securely using Firebase with encryption</li>
                <li>Student personal information is not shared with teachers without consent</li>
                <li>Teachers cannot access individual student private data</li>
                <li>We implement role-based access control to protect user privacy</li>
                <li>Users have the right to request deletion of their data</li>
                <li>We do not sell or share user data with third parties</li>
                <li>All data transmission is encrypted using HTTPS</li>
              </ul>
            </div>

            {/* Content Ownership */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4 font-poppins">
                4. Content Ownership & Usage
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Teachers retain ownership of content they upload</li>
                <li>By uploading content, teachers grant the platform a license to display and distribute it</li>
                <li>Students may download content for personal educational use only</li>
                <li>Content may not be redistributed, sold, or used for commercial purposes</li>
                <li>The platform reserves the right to remove inappropriate content</li>
                <li>Users must respect intellectual property rights</li>
              </ul>
            </div>

            {/* Prohibited Activities */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4 font-poppins flex items-center">
                <AlertCircle className="h-6 w-6 mr-2" />
                5. Prohibited Activities
              </h2>
              <p className="text-gray-700 mb-4">Users must not:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Attempt to hack, breach, or compromise platform security</li>
                <li>Upload malicious software, viruses, or harmful code</li>
                <li>Harass, threaten, or abuse other users</li>
                <li>Upload inappropriate, offensive, or illegal content</li>
                <li>Impersonate other users or provide false information</li>
                <li>Attempt to access areas or data they are not authorized to view</li>
                <li>Use automated tools to scrape or download content in bulk</li>
                <li>Interfere with the proper functioning of the platform</li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4 font-poppins">
                6. Disclaimer / Limitation of Liability
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>The platform is provided "as is" without warranties of any kind</li>
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>Content accuracy is the responsibility of uploading teachers</li>
                <li>We are not liable for any damages arising from platform use</li>
                <li>Users are responsible for their own learning outcomes</li>
                <li>We are not responsible for third-party content or links</li>
              </ul>
            </div>

            {/* Platform Availability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4 font-poppins">
                7. Platform Availability & Maintenance
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>We strive to maintain 24/7 availability but cannot guarantee it</li>
                <li>Scheduled maintenance will be announced in advance when possible</li>
                <li>We reserve the right to modify or discontinue features</li>
                <li>Offline functionality is provided through PWA technology</li>
                <li>We may temporarily suspend accounts for security or policy violations</li>
              </ul>
            </div>

            {/* Changes to Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-4 font-poppins">
                8. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Users will be notified of significant 
                changes via email or platform notification. Continued use of the platform after changes constitutes 
                acceptance of the new terms.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4 font-poppins">
                9. Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For questions about these Terms and Conditions, please contact us:
              </p>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li><strong>Email:</strong> legal@digitallearning.in</li>
                <li><strong>Support:</strong> contact@digitallearning.in</li>
                <li><strong>Phone:</strong> +91 1234567890</li>
              </ul>
            </div>

            {/* Acceptance */}
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded">
              <p className="text-gray-700 font-semibold mb-2">
                By creating an account and using this platform, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms and Conditions.
              </p>
              <p className="text-sm text-gray-600">
                Digital Learning Platform - Code Nova © 2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;