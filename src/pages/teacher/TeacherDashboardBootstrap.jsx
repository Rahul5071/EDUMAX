import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { 
  Upload, FileText, Brain, Video, File, Trash2, Eye, 
  BarChart3, Users, BookOpen, CheckCircle, AlertCircle, 
  Plus, X, Save, Clock, Book, Bookmark, User, Edit, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherDashboardBootstrap = () => {
  // State for tabs and UI
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadType, setUploadType] = useState('notes');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [contentList, setContentList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { currentUser } = useAuth();

  // Stats state
  const [stats, setStats] = useState({
    totalNotes: 0,
    totalQuizzes: 0,
    totalLectures: 0,
    totalPYQs: 0
  });

  // Form data state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    file: null,
    videoUrl: ''
  });

  // Quiz data state
  const [quizData, setQuizData] = useState({
    title: '',
    subject: '',
    class: '',
    duration: 30,
    questions: [{
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }]
  });

  // Common subjects and classes
  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science'];
  const classes = [6, 7, 8, 9, 10, 11, 12];

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!currentUser) return;
      
      try {
        const [notesSnap, quizzesSnap, lecturesSnap, pyqsSnap] = await Promise.all([
          getDocs(query(collection(db, 'notes'), where('uploadedBy', '==', currentUser.uid))),
          getDocs(query(collection(db, 'quizzes'), where('createdBy', '==', currentUser.uid))),
          getDocs(query(collection(db, 'lectures'), where('uploadedBy', '==', currentUser.uid))),
          getDocs(query(collection(db, 'pyqs'), where('uploadedBy', '==', currentUser.uid)))
        ]);

        setStats({
          totalNotes: notesSnap.size,
          totalQuizzes: quizzesSnap.size,
          totalLectures: lecturesSnap.size,
          totalPYQs: pyqsSnap.size
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard data');
      }
    };

    fetchStats();
  }, [currentUser]);

  // Fetch content based on active tab
  useEffect(() => {
    if (activeTab === 'manage') {
      fetchContent();
    }
  }, [activeTab]);

  const fetchContent = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      let collectionName = '';
      switch (uploadType) {
        case 'notes': collectionName = 'notes'; break;
        case 'quizzes': collectionName = 'quizzes'; break;
        case 'lectures': collectionName = 'lectures'; break;
        case 'pyqs': collectionName = 'pyqs'; break;
        default: collectionName = 'notes';
      }

      const q = query(
        collection(db, collectionName),
        where('uploadedBy', '==', currentUser.uid),
        orderBy('uploadedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setContentList(items);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError(`Failed to load ${uploadType}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle quiz form changes
  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuizData(prev => ({ ...prev, [name]: value }));
  };

  // Handle question changes in quiz
  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const newQuestions = [...quizData.questions];
    newQuestions[index] = { ...newQuestions[index], [name]: value };
    setQuizData(prev => ({ ...prev, questions: newQuestions }));
  };

  // Handle option changes in quiz questions
  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...quizData.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuizData(prev => ({ ...prev, questions: newQuestions }));
  };

  // Add new question to quiz
  const addQuestion = () => {
    setQuizData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        { question: '', options: ['', '', '', ''], correctAnswer: 0 }
      ]
    }));
  };

  // Remove question from quiz
  const removeQuestion = (index) => {
    if (quizData.questions.length > 1) {
      const newQuestions = quizData.questions.filter((_, i) => i !== index);
      setQuizData(prev => ({ ...prev, questions: newQuestions }));
    }
  };

  // Handle file upload (notes, lectures, pyqs)
  const handleFileUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!currentUser) {
      setError('You must be logged in to upload files.');
      setLoading(false);
      return;
    }

    try {
      const { title, description, subject, class: classLevel, file, videoUrl } = formData;
      
      if (!title || !description || !subject || !classLevel) {
        throw new Error('Please fill in all required fields');
      }

      // Determine collection and storage path
      let collectionName = '';
      let storagePath = '';
      let fileUrl = videoUrl || '';
      
      switch (uploadType) {
        case 'notes':
          if (!file) throw new Error('Please select a file to upload');
          collectionName = 'notes';
          storagePath = `notes/${currentUser.uid}/${Date.now()}_${file.name}`;
          break;
        case 'lecture':
          if (!file && !videoUrl) {
            throw new Error('Please provide either a video file or a video URL');
          }
          collectionName = 'lectures';
          storagePath = file ? `lectures/${currentUser.uid}/${Date.now()}_${file.name}` : '';
          break;
        case 'pyq':
          if (!file) throw new Error('Please select a file to upload');
          collectionName = 'pyqs';
          storagePath = `pyqs/${currentUser.uid}/${Date.now()}_${file.name}`;
          break;
        default:
          throw new Error('Invalid upload type');
      }

      // Upload file to storage if provided
      if (file) {
        const fileRef = ref(storage, storagePath);
        await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(fileRef);
      }

      // Prepare document data
      const docData = {
        title,
        description,
        subject,
        class: classLevel,
        url: fileUrl,
        uploadedBy: currentUser.uid,
        uploadedAt: Timestamp.now(),
        type: uploadType,
        fileName: file ? file.name : 'Video URL'
      };

      // Add to Firestore
      await addDoc(collection(db, collectionName), docData);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        [`total${uploadType.charAt(0).toUpperCase() + uploadType.slice(1, -1)}`]: 
          prev[`total${uploadType.charAt(0).toUpperCase() + uploadType.slice(1, -1)}`] + 1
      }));

      setSuccess(`${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} uploaded successfully!`);
      resetForm();
      
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || `Failed to upload ${uploadType}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Handle quiz submission
  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!currentUser) {
      setError('You must be logged in to create quizzes.');
      setLoading(false);
      return;
    }

    try {
      const { title, subject, class: classLevel, duration, questions } = quizData;
      
      // Validate quiz data
      if (!title || !subject || !classLevel) {
        throw new Error('Please fill in all required fields');
      }
      
      if (questions.length === 0) {
        throw new Error('Please add at least one question');
      }
      
      // Validate each question
      const validatedQuestions = questions.map((q, index) => {
        if (!q.question.trim()) {
          throw new Error(`Question ${index + 1} is missing text`);
        }
        
        if (q.options.some(opt => !opt.trim())) {
          throw new Error(`Question ${index + 1} has empty options`);
        }
        
        if (q.correctAnswer === undefined || q.correctAnswer === null) {
          throw new Error(`Question ${index + 1} is missing a correct answer`);
        }
        
        return {
          question: q.question.trim(),
          options: q.options.map(opt => opt.trim()),
          correctAnswer: q.correctAnswer
        };
      });

      // Save quiz to Firestore
      const quizDoc = {
        title: title.trim(),
        subject: subject.trim(),
        class: classLevel,
        duration: parseInt(duration) || 30,
        questions: validatedQuestions,
        createdBy: currentUser.uid,
        uploadedBy: currentUser.uid,
        uploadedAt: Timestamp.now(),
        totalQuestions: validatedQuestions.length,
        type: 'quiz'
      };

      await addDoc(collection(db, 'quizzes'), quizDoc);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalQuizzes: prev.totalQuizzes + 1
      }));

      setSuccess('Quiz created successfully!');
      resetQuizForm();
      
    } catch (err) {
      console.error('Quiz creation error:', err);
      setError(err.message || 'Failed to create quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      subject: '',
      class: '',
      file: null,
      videoUrl: ''
    });
    const fileInput = document.getElementById('file');
    if (fileInput) fileInput.value = '';
  };

  // Reset quiz form
  const resetQuizForm = () => {
    setQuizData({
      title: '',
      subject: '',
      class: '',
      duration: 30,
      questions: [{
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }]
    });
  };

  // Delete content item
  const handleDelete = async (id, type, fileUrl = null) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      setLoading(true);
      
      // Delete from Firestore
      let collectionName = type === 'quiz' ? 'quizzes' : `${type}s`;
      await deleteDoc(doc(db, collectionName, id));

      // Delete file from storage if it exists
      if (fileUrl && !fileUrl.startsWith('http')) {
        const fileRef = ref(storage, fileUrl);
        await deleteObject(fileRef).catch(console.error);
      }

      // Update UI
      setContentList(prev => prev.filter(item => item.id !== id));
      setStats(prev => ({
        ...prev,
        [`total${type.charAt(0).toUpperCase() + type.slice(1)}`]: 
          Math.max(0, prev[`total${type.charAt(0).toUpperCase() + type.slice(1)}`] - 1)
      }));

      setSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
    } catch (err) {
      console.error('Delete error:', err);
      setError(`Failed to delete ${type}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Edit content item
  const handleEdit = (item) => {
    setEditingId(item.id);
    if (item.type === 'quiz') {
      setQuizData({
        title: item.title,
        subject: item.subject,
        class: item.class,
        duration: item.duration,
        questions: item.questions
      });
      setUploadType('quiz');
    } else {
      setFormData({
        title: item.title,
        description: item.description,
        subject: item.subject,
        class: item.class,
        file: null,
        videoUrl: item.url.startsWith('http') ? item.url : ''
      });
      setUploadType(item.type);
    }
    setActiveTab('upload');
  };

  // Render content list
  const renderContentList = () => {
    if (loading) {
      return (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (contentList.length === 0) {
      return (
        <div className="alert alert-info">
          No {uploadType} found. Upload some content to get started.
        </div>
      );
    }

    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contentList.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    {item.type === 'quiz' ? (
                      <Brain size={18} className="me-2 text-primary" />
                    ) : item.type === 'lecture' ? (
                      <Video size={18} className="me-2 text-danger" />
                    ) : (
                      <FileText size={18} className="me-2 text-success" />
                    )}
                    {item.title}
                  </div>
                </td>
                <td>{item.subject}</td>
                <td>Class {item.class}</td>
                <td>{item.uploadedAt?.toDate().toLocaleDateString()}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(item.id, item.type, item.url)}
                    >
                      <Trash2 size={16} />
                    </button>
                    {item.url && !item.url.startsWith('http') && (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline-success"
                      >
                        <Eye size={16} />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render upload form based on type
  const renderUploadForm = () => {
    if (uploadType === 'quiz') {
      return (
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-4">Create Quiz</h5>
            <form onSubmit={handleQuizSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="quizTitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="quizTitle"
                    name="title"
                    value={quizData.title}
                    onChange={handleQuizChange}
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="quizSubject" className="form-label">Subject</label>
                  <select
                    className="form-select"
                    id="quizSubject"
                    name="subject"
                    value={quizData.subject}
                    onChange={handleQuizChange}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="quizClass" className="form-label">Class</label>
                  <select
                    className="form-select"
                    id="quizClass"
                    name="class"
                    value={quizData.class}
                    onChange={handleQuizChange}
                    required
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls, index) => (
                      <option key={index} value={cls}>Class {cls}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="duration" className="form-label">Duration (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  id="duration"
                  name="duration"
                  min="1"
                  value={quizData.duration}
                  onChange={handleQuizChange}
                  required
                />
              </div>

              <h6 className="mb-3">Questions</h6>
              {quizData.questions.map((q, qIndex) => (
                <div key={qIndex} className="card mb-3 border">
                  <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <span>Question {qIndex + 1}</span>
                    {quizData.questions.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeQuestion(qIndex)}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Question Text</label>
                      <input
                        type="text"
                        className="form-control"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, e)}
                        name="question"
                        required
                      />
                    </div>
                    
                    <label className="form-label">Options</label>
                    {q.options.map((option, oIndex) => (
                      <div key={oIndex} className="input-group mb-2">
                        <div className="input-group-text">
                          <input
                            className="form-check-input mt-0"
                            type="radio"
                            name={`correct-${qIndex}`}
                            checked={q.correctAnswer === oIndex}
                            onChange={() => {
                              const newQuestions = [...quizData.questions];
                              newQuestions[qIndex].correctAnswer = oIndex;
                              setQuizData(prev => ({ ...prev, questions: newQuestions }));
                            }}
                            required
                          />
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Option ${oIndex + 1}`}
                          value={option}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={addQuestion}
                >
                  <Plus size={16} className="me-1" /> Add Question
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Create Quiz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">
            {uploadType === 'notes' ? 'Upload Notes' : 
             uploadType === 'lecture' ? 'Upload Lecture' : 'Upload PYQ'}
          </h5>
          <form onSubmit={handleFileUpload}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleFormChange}
                required
              ></textarea>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <select
                  className="form-select"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="class" className="form-label">Class</label>
                <select
                  className="form-select"
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>Class {cls}</option>
                  ))}
                </select>
              </div>
            </div>

            {uploadType === 'lecture' && (
              <div className="mb-3">
                <label htmlFor="videoUrl" className="form-label">
                  Video URL (YouTube, Vimeo, etc.) - Leave empty if uploading a file
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="videoUrl"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleFormChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            )}

            {!(uploadType === 'lecture' && formData.videoUrl) && (
              <div className="mb-3">
                <label htmlFor="file" className="form-label">
                  {uploadType === 'notes' ? 'Upload PDF/DOCX' : 
                   uploadType === 'lecture' ? 'Upload Video File' : 'Upload PYQ File'}
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  name="file"
                  onChange={handleFormChange}
                  accept={uploadType === 'lecture' ? 'video/*' : '.pdf,.doc,.docx'}
                  required={!formData.videoUrl}
                />
                <div className="form-text">
                  {uploadType === 'lecture' 
                    ? 'MP4, WebM, or OGG format (max 100MB)'
                    : 'PDF or Word document (max 20MB)'}
                </div>
              </div>
            )}

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Uploading...' : `Upload ${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container-fluid p-0">
        <div className="row g-0">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 bg-white shadow-sm min-vh-100">
            <div className="d-flex flex-column p-3 h-100">
              <div className="mb-4">
                <h4 className="text-primary mb-0">Teacher Dashboard</h4>
                <small className="text-muted">{currentUser?.email}</small>
              </div>
              
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-2">
                  <button 
                    className={`nav-link d-flex align-items-center ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <BarChart3 size={18} className="me-2" />
                    Overview
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button 
                    className={`nav-link d-flex align-items-center ${activeTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upload')}
                  >
                    <Upload size={18} className="me-2" />
                    Upload Content
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button 
                    className={`nav-link d-flex align-items-center ${activeTab === 'manage' ? 'active' : ''}`}
                    onClick={() => setActiveTab('manage')}
                  >
                    <FileText size={18} className="me-2" />
                    Manage Content
                  </button>
                </li>
              </ul>
              
              <div className="mt-auto pt-3 border-top">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-2">
                    <User size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="mb-0 small fw-bold">{currentUser?.displayName || 'Teacher'}</p>
                    <button 
                      className="btn btn-sm btn-outline-secondary mt-1"
                      onClick={() => {
                        // Handle logout
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9 col-lg-10 p-4">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" className="btn-close" onClick={() => setError('')}></button>
              </div>
            )}
            
            {success && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {success}
                <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
              </div>
            )}

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="mb-4">Dashboard Overview</h2>
                
                <div className="row g-4 mb-4">
                  <div className="col-md-6 col-lg-3">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                            <Book size={24} className="text-primary" />
                          </div>
                          <div>
                            <h6 className="mb-1">Total Notes</h6>
                            <h3 className="mb-0">{stats.totalNotes}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 col-lg-3">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="bg-success bg-opacity-10 p-3 rounded-3 me-3">
                            <Brain size={24} className="text-success" />
                          </div>
                          <div>
                            <h6 className="mb-1">Total Quizzes</h6>
                            <h3 className="mb-0">{stats.totalQuizzes}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 col-lg-3">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="bg-warning bg-opacity-10 p-3 rounded-3 me-3">
                            <Video size={24} className="text-warning" />
                          </div>
                          <div>
                            <h6 className="mb-1">Total Lectures</h6>
                            <h3 className="mb-0">{stats.totalLectures}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 col-lg-3">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="bg-info bg-opacity-10 p-3 rounded-3 me-3">
                            <FileText size={24} className="text-info" />
                          </div>
                          <div>
                            <h6 className="mb-1">PYQs</h6>
                            <h3 className="mb-0">{stats.totalPYQs}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title mb-4">Quick Actions</h5>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <button 
                              className="btn btn-outline-primary w-100 text-start p-3 d-flex align-items-center"
                              onClick={() => {
                                setActiveTab('upload');
                                setUploadType('notes');
                              }}
                            >
                              <FileText size={20} className="me-2" />
                              <div>
                                <div className="fw-bold">Upload Notes</div>
                                <small className="text-muted">Share study materials</small>
                              </div>
                            </button>
                          </div>
                          <div className="col-md-6">
                            <button 
                              className="btn btn-outline-success w-100 text-start p-3 d-flex align-items-center"
                              onClick={() => {
                                setActiveTab('upload');
                                setUploadType('quiz');
                              }}
                            >
                              <Brain size={20} className="me-2" />
                              <div>
                                <div className="fw-bold">Create Quiz</div>
                                <small className="text-muted">Test your students</small>
                              </div>
                            </button>
                          </div>
                          <div className="col-md-6">
                            <button 
                              className="btn btn-outline-warning w-100 text-start p-3 d-flex align-items-center"
                              onClick={() => {
                                setActiveTab('upload');
                                setUploadType('lecture');
                              }}
                            >
                              <Video size={20} className="me-2" />
                              <div>
                                <div className="fw-bold">Upload Lecture</div>
                                <small className="text-muted">Share video content</small>
                              </div>
                            </button>
                          </div>
                          <div className="col-md-6">
                            <button 
                              className="btn btn-outline-info w-100 text-start p-3 d-flex align-items-center"
                              onClick={() => {
                                setActiveTab('upload');
                                setUploadType('pyq');
                              }}
                            >
                              <Bookmark size={20} className="me-2" />
                              <div>
                                <div className="fw-bold">Upload PYQ</div>
                                <small className="text-muted">Previous year questions</small>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title mb-4">Recent Activities</h5>
                        <div className="list-group list-group-flush">
                          <div className="list-group-item border-0 px-0 py-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="bg-light p-2 rounded-circle me-3">
                                  <Plus size={18} />
                                </div>
                                <div>
                                  <p className="mb-0 fw-medium">New quiz created</p>
                                  <small className="text-muted">2 minutes ago</small>
                                </div>
                              </div>
                              <span className="badge bg-light text-dark">Quiz</span>
                            </div>
                          </div>
                          <div className="list-group-item border-0 px-0 py-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="bg-light p-2 rounded-circle me-3">
                                  <Upload size={18} />
                                </div>
                                <div>
                                  <p className="mb-0 fw-medium">New notes uploaded</p>
                                  <small className="text-muted">1 hour ago</small>
                                </div>
                              </div>
                              <span className="badge bg-light text-dark">Notes</span>
                            </div>
                          </div>
                          <div className="list-group-item border-0 px-0 py-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="bg-light p-2 rounded-circle me-3">
                                  <Video size={18} />
                                </div>
                                <div>
                                  <p className="mb-0 fw-medium">New lecture added</p>
                                  <small className="text-muted">5 hours ago</small>
                                </div>
                              </div>
                              <span className="badge bg-light text-dark">Lecture</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div>
                <h2 className="mb-4">Upload Content</h2>
                
                <ul className="nav nav-tabs mb-4">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${uploadType === 'notes' ? 'active' : ''}`}
                      onClick={() => setUploadType('notes')}
                    >
                      <FileText size={18} className="me-2" />
                      Notes
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${uploadType === 'quiz' ? 'active' : ''}`}
                      onClick={() => setUploadType('quiz')}
                    >
                      <Brain size={18} className="me-2" />
                      Quiz
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${uploadType === 'lecture' ? 'active' : ''}`}
                      onClick={() => setUploadType('lecture')}
                    >
                      <Video size={18} className="me-2" />
                      Lecture
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${uploadType === 'pyq' ? 'active' : ''}`}
                      onClick={() => setUploadType('pyq')}
                    >
                      <Bookmark size={18} className="me-2" />
                      PYQ
                    </button>
                  </li>
                </ul>

                {renderUploadForm()}
              </div>
            )}

            {/* Manage Tab */}
            {activeTab === 'manage' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="mb-0">Manage Content</h2>
                  <div className="d-flex">
                    <div className="input-group" style={{ width: '300px' }}>
                      <span className="input-group-text bg-white">
                        <Search size={18} />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="ms-3">
                      <select
                        className="form-select"
                        value={uploadType}
                        onChange={(e) => setUploadType(e.target.value)}
                      >
                        <option value="notes">Notes</option>
                        <option value="quizzes">Quizzes</option>
                        <option value="lectures">Lectures</option>
                        <option value="pyqs">PYQs</option>
                      </select>
                    </div>
                  </div>
                </div>

                {renderContentList()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardBootstrap;