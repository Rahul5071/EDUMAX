import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { Clock, CheckCircle, XCircle, Award } from 'lucide-react';

const QuizTake = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted && !quizCompleted) {
      handleSubmit();
    }
  }, [timeLeft, quizStarted, quizCompleted]);

  const fetchQuiz = async () => {
    try {
      const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
      if (quizDoc.exists()) {
        const quizData = { id: quizDoc.id, ...quizDoc.data() };
        setQuiz(quizData);
        setTimeLeft(quizData.duration * 60); // Convert minutes to seconds
      } else {
        navigate('/quizzes');
      }
    } catch (err) {
      console.error('Error fetching quiz:', err);
      navigate('/quizzes');
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const handleSubmit = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setQuizCompleted(true);

    try {
      await addDoc(collection(db, 'quizResults'), {
        studentId: currentUser.uid,
        quizId: quiz.id,
        quizTitle: quiz.title,
        subject: quiz.subject,
        score: finalScore,
        answers: answers,
        totalQuestions: quiz.questions.length,
        completedAt: new Date().toISOString(),
        timeTaken: (quiz.duration * 60) - timeLeft
      });
    } catch (err) {
      console.error('Error saving quiz result:', err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-secondary flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="pt-16 min-h-screen bg-secondary flex items-center justify-center">
        <div className="card max-w-2xl w-full text-center">
          <h1 className="text-3xl font-bold text-primary mb-4 font-poppins">{quiz.title}</h1>
          <div className="space-y-4 mb-8">
            <p className="text-gray-700"><strong>Subject:</strong> {quiz.subject}</p>
            <p className="text-gray-700"><strong>Class:</strong> {quiz.class}</p>
            <p className="text-gray-700"><strong>Questions:</strong> {quiz.questions.length}</p>
            <p className="text-gray-700"><strong>Duration:</strong> {quiz.duration} minutes</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-primary p-4 mb-8 text-left">
            <h3 className="font-semibold text-primary mb-2">Instructions:</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Answer all questions within the time limit</li>
              <li>You can navigate between questions using Next/Previous buttons</li>
              <li>Select one option for each question</li>
              <li>Submit the quiz before time runs out</li>
              <li>Your score will be calculated automatically</li>
            </ul>
          </div>
          <button onClick={startQuiz} className="btn-primary text-lg px-8 py-4">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="pt-16 min-h-screen bg-secondary flex items-center justify-center">
        <div className="card max-w-2xl w-full text-center">
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
            score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-amber-100' : 'bg-red-100'
          }`}>
            <Award className={`h-12 w-12 ${
              score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'
            }`} />
          </div>
          
          <h1 className="text-3xl font-bold text-primary mb-4 font-poppins">Quiz Completed!</h1>
          
          <div className="bg-gradient-to-br from-primary to-blue-600 text-white rounded-lg p-8 mb-6">
            <p className="text-lg mb-2">Your Score</p>
            <p className="text-6xl font-bold mb-2">{score}%</p>
            <p className="text-blue-100">
              {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Questions</p>
              <p className="text-2xl font-bold text-primary">{quiz.questions.length}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Correct</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round((score / 100) * quiz.questions.length)}
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Incorrect</p>
              <p className="text-2xl font-bold text-red-600">
                {quiz.questions.length - Math.round((score / 100) * quiz.questions.length)}
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/student/report')}
              className="btn-primary flex-1"
            >
              View Report
            </button>
            <button
              onClick={() => navigate('/quizzes')}
              className="btn-outline flex-1"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="pt-16 min-h-screen bg-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="card mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-primary font-poppins">{quiz.title}</h2>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-2 text-lg font-semibold">
              <Clock className={`h-6 w-6 ${timeLeft < 60 ? 'text-red-600' : 'text-primary'}`} />
              <span className={timeLeft < 60 ? 'text-red-600' : 'text-primary'}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="card mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    answers[currentQuestion] === index
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion] === index && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full ${
                  answers[index] !== undefined
                    ? 'bg-primary text-white'
                    : index === currentQuestion
                    ? 'bg-accent text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === quiz.questions.length - 1 ? (
            <button onClick={handleSubmit} className="btn-primary">
              Submit Quiz
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizTake;