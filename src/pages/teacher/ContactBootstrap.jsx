import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, GraduationCap, BookOpen, Brain, Video, FileText, Edit2, Save, CheckCircle, AlertCircle, X } from 'lucide-react';

const StudentProfileBootstrap = () => {
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
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const quickLinks = [
    { icon: <BookOpen size={20} />, title: 'Notes', path: '/notes', color: 'primary' },
    { icon: <Brain size={20} />, title: 'Quizzes', path: '/quizzes', color: 'purple' },
    { icon: <Video size={20} />, title: 'Lectures', path: '/lectures', color: 'success' },
    { icon: <FileText size={20} />, title: 'PYQs', path: '/pyqs', color: 'warning' }
  ];

  return (
    <div className="bg-light min-vh-100 pt-5">
      <div className="container py-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="display-5 fw-bold text-primary mb-2">Student Profile</h1>
          <p className="lead text-muted">Manage your profile and access learning resources</p>
        </div>

        {/* Alerts */}
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <CheckCircle className="me-2" size={20} />
            {success}
            <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
          </div>
        )}

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <AlertCircle className="me-2" size={20} />
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        <div className="row g-4">
          {/* Left Column - Profile Card */}
          <div className="col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                    {userData?.name?.charAt(0).toUpperCase() || 'S'}
                  </div>
                  <h2 className="h4 fw-bold text-primary mb-1">{userData?.name || 'Student'}</h2>
                  <p className="text-muted mb-0">Class {userData?.class || 'N/A'}</p>
                </div>

                {!editing ? (
                  <div className="vstack gap-3">
                    <div className="d-flex align-items-center p-3 bg-light rounded-3">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                        <User className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="text-muted small mb-0">Name</p>
                        <p className="fw-semibold mb-0">{userData?.name || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center p-3 bg-light rounded-3">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                        <Mail className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="text-muted small mb-0">Email</p>
                        <p className="fw-semibold mb-0 text-break">{userData?.email || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center p-3 bg-light rounded-3 mb-3">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                        <GraduationCap className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="text-muted small mb-0">Class</p>
                        <p className="fw-semibold mb-0">Class {userData?.class || 'N/A'}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setEditing(true)}
                      className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 w-100"
                    >
                      <Edit2 size={18} />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                ) : (
                  <div className="vstack gap-3">
                    <div>
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="form-control"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="form-label">Class</label>
                      <select
                        name="class"
                        value={editData.class}
                        onChange={handleEditChange}
                        className="form-select"
                      >
                        <option value="">Select class</option>
                        {[6, 7, 8, 9, 10, 11, 12].map(cls => (
                          <option key={cls} value={cls}>Class {cls}</option>
                        ))}
                      </select>
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                      <button
                        onClick={() => {
                          setEditing(false);
                          setEditData({
                            name: userData?.name || '',
                            class: userData?.class || ''
                          });
                        }}
                        className="btn btn-outline-secondary me-md-2"
                        disabled={saving}
                      >
                        <X size={18} className="me-1" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn btn-primary"
                      >
                        {saving ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={18} className="me-1" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Links */}
          <div className="col-lg-8">
            <div className="card shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="h5 fw-bold text-primary mb-4">Quick Links</h3>
                <div className="row g-4">
                  {quickLinks.map((link, index) => (
                    <div key={index} className="col-sm-6">
                      <Link 
                        to={link.path} 
                        className={`card h-100 text-decoration-none text-dark hover-shadow border-${link.color} border-2`}
                      >
                        <div className="card-body text-center">
                          <div className={`bg-${link.color}-subtle text-${link.color} p-3 rounded-3 d-inline-flex mb-3`}>
                            {link.icon}
                          </div>
                          <h5 className="card-title mb-0">{link.title}</h5>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileBootstrap;