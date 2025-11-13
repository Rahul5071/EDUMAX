import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Brain, Clock, Search, Play, Award } from 'lucide-react';

const QuizzesBootstrap = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    filterQuizzes();
  }, [searchTerm, selectedSubject, selectedClass, quizzes]);

  const fetchQuizzes = async () => {
    try {
      const q = query(collection(db, 'quizzes'), orderBy('uploadedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const quizzesData = [];
      querySnapshot.forEach((doc) => {
        quizzesData.push({ id: doc.id, ...doc.data() });
      });

      setQuizzes(quizzesData);
      setFilteredQuizzes(quizzesData);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterQuizzes = () => {
    let filtered = quizzes;

    if (searchTerm) {
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(quiz => quiz.subject === selectedSubject);
    }

    if (selectedClass !== 'all') {
      filtered = filtered.filter(quiz => quiz.class === selectedClass);
    }

    setFilteredQuizzes(filtered);
  };

  const subjects = Array.from(new Set(quizzes.map(quiz => quiz.subject)));
  const classes = Array.from(new Set(quizzes.map(quiz => quiz.class)));

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 pt-5">
      <div className="container py-5">
        {/* Header */}
        <div className="mb-5 text-center text-md-start">
          <h1 className="display-5 fw-bold text-primary mb-2">Interactive Quizzes</h1>
          <p className="lead text-muted">Test your knowledge and track your progress</p>
        </div>

        {/* Search and Filters */}
        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-6">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Search className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search quizzes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-3">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="form-select"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="col-lg-3">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="form-select"
                >
                  <option value="all">All Classes</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>Class {cls}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        {filteredQuizzes.length === 0 ? (
          <div className="card shadow-sm text-center p-5">
            <Brain size={64} className="mx-auto text-muted mb-3" />
            <h3 className="h3 text-muted mb-2">No Quizzes Found</h3>
            <p className="text-muted">
              {quizzes.length === 0 
                ? 'No quizzes have been created yet. Check back soon!'
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredQuizzes.map((quiz) => (
              <div key={quiz.id} className="col">
                <div className="card h-100 shadow-sm hover-shadow transition-all">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div className="bg-purple bg-opacity-10 p-2 rounded-3">
                        <Brain className="text-purple" size={24} />
                      </div>
                      <span className="badge bg-purple bg-opacity-10 text-purple">
                        Class {quiz.class}
                      </span>
                    </div>

                    <h5 className="card-title text-primary mb-3">{quiz.title}</h5>
                    
                    <ul className="list-unstyled mb-4">
                      <li className="mb-2 d-flex align-items-center">
                        <Award size={16} className="text-primary me-2" />
                        <span className="text-muted">{quiz.subject}</span>
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <Clock size={16} className="text-primary me-2" />
                        <span className="text-muted">{quiz.duration} minutes</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <Brain size={16} className="text-primary me-2" />
                        <span className="text-muted">{quiz.questions?.length || 0} questions</span>
                      </li>
                    </ul>

                    <div className="mt-auto pt-3 border-top">
                      <Link
                        to={`/quiz/${quiz.id}`}
                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                      >
                        <Play size={18} />
                        <span>Start Quiz</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-5 text-center text-muted">
          <p>Showing {filteredQuizzes.length} of {quizzes.length} quizzes</p>
        </div>
      </div>
    </div>
  );
};

export default QuizzesBootstrap;