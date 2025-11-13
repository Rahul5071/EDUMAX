import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Award, Target, Clock } from 'lucide-react';

const StudentReport = () => {
  const { currentUser } = useAuth();
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    highestScore: 0,
    totalTime: 0
  });

  useEffect(() => {
    fetchQuizResults();
  }, [currentUser]);

  const fetchQuizResults = async () => {
    try {
      const q = query(
        collection(db, 'quizResults'),
        where('studentId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      setQuizResults(results);
      calculateStats(results);
    } catch (err) {
      console.error('Error fetching quiz results:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (results) => {
    if (results.length === 0) {
      setStats({
        totalQuizzes: 0,
        averageScore: 0,
        highestScore: 0,
        totalTime: 0
      });
      return;
    }

    const totalQuizzes = results.length;
    const totalScore = results.reduce((sum, result) => sum + (result.score || 0), 0);
    const averageScore = Math.round(totalScore / totalQuizzes);
    const highestScore = Math.max(...results.map(r => r.score || 0));
    const totalTime = results.reduce((sum, result) => sum + (result.timeTaken || 0), 0);

    setStats({
      totalQuizzes,
      averageScore,
      highestScore,
      totalTime
    });
  };

  const chartData = quizResults.map((result, index) => ({
    name: "Quiz ${index + 1}",
    score : result.score || 0,
    subject : result.subject || 'Unknown'
  }));

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
          <h1 className="text-4xl font-bold text-primary mb-2 font-poppins">My Performance Report</h1>
          <p className="text-gray-600">Track your progress and achievements</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <Target className="h-10 w-10 mb-3" />
            <h3 className="text-3xl font-bold mb-2">{stats.totalQuizzes}</h3>
            <p className="text-blue-100">Quizzes Completed</p>
          </div>

          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <TrendingUp className="h-10 w-10 mb-3" />
            <h3 className="text-3xl font-bold mb-2">{stats.averageScore}%</h3>
            <p className="text-green-100">Average Score</p>
          </div>

          <div className="card bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <Award className="h-10 w-10 mb-3" />
            <h3 className="text-3xl font-bold mb-2">{stats.highestScore}%</h3>
            <p className="text-amber-100">Highest Score</p>
          </div>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <Clock className="h-10 w-10 mb-3" />
            <h3 className="text-3xl font-bold mb-2">{Math.round(stats.totalTime / 60)}</h3>
            <p className="text-purple-100">Minutes Spent</p>
          </div>
        </div>

        {quizResults.length === 0 ? (
          <div className="card text-center py-12">
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Quiz Results Yet</h3>
            <p className="text-gray-600 mb-6">Start taking quizzes to see your performance report</p>
            <a href="/quizzes" className="btn-primary inline-block">
              Take a Quiz
            </a>
          </div>
        ) : (
          <>
            {/* Performance Chart */}
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-primary mb-6 font-poppins">Performance Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#1E3A8A" name="Score (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Progress Trend */}
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-primary mb-6 font-poppins">Progress Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#F59E0B" strokeWidth={2} name="Score (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Quiz Results */}
            <div className="card">
              <h2 className="text-2xl font-bold text-primary mb-6 font-poppins">Recent Quiz Results</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quiz Title</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subject</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Score</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {quizResults.slice(0, 10).map((result, index) => (
                      <tr key={result.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{result.quizTitle || `Quiz ${index + 1}`}</td>
                        <td className="px-4 py-3 text-sm">{result.subject || 'N/A'}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`font-semibold ${
                            result.score >= 80 ? 'text-green-600' :
                            result.score >= 60 ? 'text-amber-600' :
                            'text-red-600'
                          }`}>
                            {result.score}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {result.completedAt ? new Date(result.completedAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            result.score >= 80 ? 'bg-green-100 text-green-800' :
                            result.score >= 60 ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {result.score >= 80 ? 'Excellent' :
                             result.score >= 60 ? 'Good' :
                             'Need Improvement'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subject-wise Performance */}
            <div className="card mt-8">
              <h2 className="text-2xl font-bold text-primary mb-6 font-poppins">Subject-wise Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from(new Set(quizResults.map(r => r.subject))).map((subject, index) => {
                  const subjectResults = quizResults.filter(r => r.subject === subject);
                  const avgScore = Math.round(
                    subjectResults.reduce((sum, r) => sum + (r.score || 0), 0) / subjectResults.length
                  );

                  return (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">{subject || 'Unknown'}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{subjectResults.length} quizzes</span>
                        <span className={`text-lg font-bold ${
                          avgScore >= 80 ? 'text-green-600' :
                          avgScore >= 60 ? 'text-amber-600' :
                          'text-red-600'
                        }`}>
                          {avgScore}%
                        </span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            avgScore >= 80 ? 'bg-green-600' :
                            avgScore >= 60 ? 'bg-amber-600' :
                            'bg-red-600'
                          }`}
                          style={{ width:` ${avgScore}% `}}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentReport;