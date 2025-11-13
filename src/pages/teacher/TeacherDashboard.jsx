import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { 
  Upload, FileText, Brain, Video, File, Trash2, Eye, 
  BarChart3, Users, BookOpen, CheckCircle, AlertCircle 
} from 'lucide-react';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadType, setUploadType] = useState('notes');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalNotes: 0,
    totalQuizzes: 0,
    totalLectures: 0,
    totalPYQs: 0
  });
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    file: null,
    videoUrl: ''
  });

  const [quizData, setQuizData] = useState({
    title: '',
    subject: '',
    class: '',
    duration: 30,
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const notesSnap = await getDocs(collection(db, 'notes'));
      const quizzesSnap = await getDocs(collection(db, 'quizzes'));
      const lecturesSnap = await getDocs(collection(db, 'lectures'));
      const pyqsSnap = await getDocs(collection(db, 'pyqs'));

      setStats({
        totalNotes: notesSnap.size,
        totalQuizzes: quizzesSnap.size,
        totalLectures: lecturesSnap.size,
        totalPYQs: pyqsSnap.size
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let fileUrl = '';
      
      if (formData.file) {
        const storageRef = ref(storage, `${uploadType}/${Date.now()}_${formData.file.name}`);
        await uploadBytes(storageRef, formData.file);
        fileUrl = await getDownloadURL(storageRef);
      }

      const uploadData = {
        title: formData.title,
        description: formData.description,
        subject: formData.subject,
        class: formData.class,
        uploadedBy: currentUser.uid,
        uploadedAt: new Date().toISOString(),
        fileUrl: fileUrl || formData.videoUrl
      };

      await addDoc(collection(db, uploadType), uploadData);
      
      setSuccess(`${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} uploaded successfully!`);
      setFormData({
        title: '',
        description: '',
        subject: '',
        class: '',
        file: null,
        videoUrl: ''
      });
      fetchStats();
      
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError('Failed to upload. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...quizData.questions];
    newQuestions[index][field] = value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...quizData.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { question: '', options: ['', '', '', ''], correctAnswer: 0 }
      ]
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await addDoc(collection(db, 'quizzes'), {
        ...quizData,
        uploadedBy: currentUser.uid,
        uploadedAt: new Date().toISOString()
      });

      setSuccess('Quiz created successfully!');
      setQuizData({
        title: '',
        subject: '',
        class: '',
        duration: 30,
        questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]
      });
      fetchStats();
      
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError('Failed to create quiz. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 font-poppins">Teacher Dashboard</h1>
          <p className="text-gray-600">Manage your content and view analytics</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            <BarChart3 className="inline h-5 w-5 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'upload'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            <Upload className="inline h-5 w-5 mr-2" />
            Upload Content
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'manage'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            <FileText className="inline h-5 w-5 mr-2" />
            Manage Content
          </button>
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <BookOpen className="h-12 w-12 mb-4" />
              <h3 className="text-3xl font-bold mb-2">{stats.totalNotes}</h3>
              <p className="text-blue-100">Total Notes</p>
            </div>

            <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <Brain className="h-12 w-12 mb-4" />
              <h3 className="text-3xl font-bold mb-2">{stats.totalQuizzes}</h3>
              <p className="text-purple-100">Total Quizzes</p>
            </div>

            <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
              <Video className="h-12 w-12 mb-4" />
              <h3 className="text-3xl font-bold mb-2">{stats.totalLectures}</h3>
              <p className="text-green-100">Recorded Lectures</p>
            </div>

            <div className="card bg-gradient-to-br from-amber-500 to-amber-600 text-white">
              <File className="h-12 w-12 mb-4" />
              <h3 className="text-3xl font-bold mb-2">{stats.totalPYQs}</h3>
              <p className="text-amber-100">PYQs Uploaded</p>
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="card max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6 font-poppins">Upload Content</h2>

            {/* Upload Type Selector */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-3">Content Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setUploadType('notes')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    uploadType === 'notes'
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <span className="text-sm font-semibold">Notes</span>
                </button>
                <button
                  onClick={() => setUploadType('quizzes')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    uploadType === 'quizzes'
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <span className="text-sm font-semibold">Quiz</span>
                </button>
                <button
                  onClick={() => setUploadType('lectures')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    uploadType === 'lectures'
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  <Video className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <span className="text-sm font-semibold">Lecture</span>
                </button>
                <button
                  onClick={() => setUploadType('pyqs')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    uploadType === 'pyqs'
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  <File className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <span className="text-sm font-semibold">PYQs</span>
                </button>
              </div>
            </div>

            {/* Upload Form for Notes, Lectures, PYQs */}
            {uploadType !== 'quizzes' && (
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Enter title"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="input-field resize-none"
                    placeholder="Enter description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="e.g., Mathematics"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Class *</label>
                    <select
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select class</option>
                      {[6, 7, 8, 9, 10, 11, 12].map(cls => (
                        <option key={cls} value={cls}>Class {cls}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {uploadType === 'lectures' ? (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Video URL *</label>
                    <input
                      type="url"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="YouTube or video URL"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Upload File *</label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      required
                      accept=".pdf,.doc,.docx"
                      className="input-field"
                    />
                    <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Uploading...' : 'Upload Content'}
                </button>
              </form>
            )}

            {/* Quiz Creation Form */}
            {uploadType === 'quizzes' && (
              <form onSubmit={handleQuizSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Quiz Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={quizData.title}
                    onChange={handleQuizChange}
                    required
                    className="input-field"
                    placeholder="Enter quiz title"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={quizData.subject}
                      onChange={handleQuizChange}
                      required
                      className="input-field"
                      placeholder="e.g., Mathematics"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Class *</label>
                    <select
                      name="class"
                      value={quizData.class}
                      onChange={handleQuizChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select class</option>
                      {[6, 7, 8, 9, 10, 11, 12].map(cls => (
                        <option key={cls} value={cls}>Class {cls}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Duration (min) *</label>
                    <input
                      type="number"
                      name="duration"
                      value={quizData.duration}
                      onChange={handleQuizChange}
                      required
                      min="5"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-xl font-semibold text-primary mb-4">Questions</h3>
                  
                  {quizData.questions.map((q, qIndex) => (
                    <div key={qIndex} className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold">Question {qIndex + 1}</h4>
                        {quizData.questions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeQuestion(qIndex)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                        required
                        className="input-field mb-3"
                        placeholder="Enter question"
                      />

                      <div className="space-y-2">
                        {q.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`correct-${qIndex}`}
                              checked={q.correctAnswer === oIndex}
                              onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                              required
                              className="input-field flex-1"
                              placeholder={`Option ${oIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="btn-outline w-full"
                  >
                    Add Question
                  </button>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Creating Quiz...' : 'Create Quiz'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Manage Tab */}
        {activeTab === 'manage' && (
          <div className="card">
            <h2 className="text-2xl font-bold text-primary mb-6 font-poppins">Manage Content</h2>
            <p className="text-gray-600">Content management interface coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;