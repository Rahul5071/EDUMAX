import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Brain, Clock, Search, Play, Award } from 'lucide-react';

const Quizzes = () => {
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
      <div className="pt-16 min-h-screen bg-secondary flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 font-poppins">Interactive Quizzes</h1>
          <p className="text-gray-600">Test your knowledge and track your progress</p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="input-field"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="input-field"
              >
                <option value="all">All Classes</option>
                {classes.map((cls, index) => (
                  <option key={index} value={cls}>Class {cls}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        {filteredQuizzes.length === 0 ? (
          <div className="card text-center py-12">
            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Quizzes Found</h3>
            <p className="text-gray-600">
              {quizzes.length === 0 
                ? 'No quizzes have been created yet. Check back soon!'
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div key={quiz.id} className="card hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Brain className="h-8 w-8 text-purple-600" />
                  </div>
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                    Class {quiz.class}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-primary mb-2 font-poppins">
                  {quiz.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-semibold">{quiz.subject}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>{quiz.duration} minutes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Brain className="h-4 w-4 mr-2 text-primary" />
                    <span>{quiz.questions?.length || 0} questions</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Link
                    to={`/quiz/${quiz.id}`}
                    className="btn-primary w-full text-center flex items-center justify-center space-x-2"
                  >
                    <Play className="h-5 w-5" />
                    <span>Start Quiz</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 text-center text-gray-600">
          <p>Showing {filteredQuizzes.length} of {quizzes.length} quizzes</p>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;