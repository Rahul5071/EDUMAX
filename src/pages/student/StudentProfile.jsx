import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, GraduationCap, BookOpen, Brain, Video, FileText, Edit2, Save, CheckCircle, AlertCircle } from 'lucide-react';

const StudentProfile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [editData, setEditData] = useState({
    name: '',
    class: ''
  });

  useEffect(() => {
    fetchUserData();
  }, [currentUser]);

  const fetchUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        setEditData({
          name: data.name || '',
          class: data.class || ''
        });
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await updateDoc(doc(db, 'users', currentUser.uid), editData);
      setUserData({ ...userData, ...editData });
      setEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-secondary flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  const quickLinks = [
    { icon: <BookOpen className="h-8 w-8" />, title: 'Notes', path: '/notes', color: 'blue' },
    { icon: <Brain className="h-8 w-8" />, title: 'Quizzes', path: '/quizzes', color: 'purple' },
    { icon: <Video className="h-8 w-8" />, title: 'Lectures', path: '/lectures', color: 'green' },
    { icon: <FileText className="h-8 w-8" />, title: 'PYQs', path: '/pyqs', color: 'amber' }
  ];

  return (
    <div className="pt-16 min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 font-poppins">Student Profile</h1>
          <p className="text-gray-600">Manage your profile and access learning resources</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {userData?.name?.charAt(0).toUpperCase() || 'S'}
                </div>
                <h2 className="text-2xl font-bold text-primary font-poppins">
                  {userData?.name || 'Student'}
                </h2>
                <p className="text-gray-600">Class {userData?.class || 'N/A'}</p>
              </div>

              {!editing ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold">{userData?.name || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-sm break-all">{userData?.email || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Class</p>
                      <p className="font-semibold">Class {userData?.class || 'N/A'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setEditing(true)}
                    className="btn-outline w-full flex items-center justify-center space-x-2"
                  >
                    <Edit2 className="h-5 w-5" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Class</label>
                    <select
                      name="class"
                      value={editData.class}
                      onChange={handleEditChange}
                      className="input-field"
                    >
                      <option value="">Select class</option>
                      {[6, 7, 8, 9, 10, 11, 12].map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn-primary flex-1 flex items-center justify-center space-x-2"
                    >
                      <Save className="h-5 w-5" />
                      <span>{saving ? 'Saving...' : 'Save'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setEditData({
                          name: userData?.name || '',
                          class: userData?.class || ''
                        });
                      }}
                      className="btn-outline flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <Link to="/student/report" className="btn-secondary w-full text-center">
                  View My Report
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-primary mb-6 font-poppins">Quick Access</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className={`p-6 rounded-lg border-2 border-${link.color}-500 hover:bg-${link.color}-50 transition-all text-center group`}
                  >
                    <div className={`text-${link.color}-600 mb-3 flex justify-center group-hover:scale-110 transition-transform`}>
                      {link.icon}
                    </div>
                    <p className="font-semibold text-gray-900">{link.title}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h2 className="text-2xl font-bold text-primary mb-6 font-poppins">Recent Activity</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="font-semibold text-gray-900">Welcome to Digital Learning Platform!</p>
                  <p className="text-sm text-gray-600 mt-1">Start exploring notes, quizzes, and lectures</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-center">No recent activity yet</p>
                </div>
              </div>
            </div>

            {/* Learning Stats */}
            <div className="card mt-8">
              <h2 className="text-2xl font-bold text-primary mb-6 font-poppins">Learning Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <p className="text-3xl font-bold text-primary">0</p>
                  <p className="text-sm text-gray-600 mt-1">Quizzes Taken</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">0</p>
                  <p className="text-sm text-gray-600 mt-1">Notes Read</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">0</p>
                  <p className="text-sm text-gray-600 mt-1">Lectures Watched</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                  <p className="text-3xl font-bold text-amber-600">0%</p>
                  <p className="text-sm text-gray-600 mt-1">Avg Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
