import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FileText, Download, Search, Eye, Calendar } from 'lucide-react';

const PYQs = () => {
  const [pyqs, setPyqs] = useState([]);
  const [filteredPyqs, setFilteredPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');

  useEffect(() => {
    fetchPyqs();
  }, []);

  useEffect(() => {
    filterPyqs();
  }, [searchTerm, selectedSubject, selectedClass, pyqs]);

  const fetchPyqs = async () => {
    try {
      const q = query(collection(db, 'pyqs'), orderBy('uploadedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const pyqsData = [];
      querySnapshot.forEach((doc) => {
        pyqsData.push({ id: doc.id, ...doc.data() });
      });

      setPyqs(pyqsData);
      setFilteredPyqs(pyqsData);
    } catch (err) {
      console.error('Error fetching PYQs:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterPyqs = () => {
    let filtered = pyqs;

    if (searchTerm) {
      filtered = filtered.filter(pyq =>
        pyq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pyq.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(pyq => pyq.subject === selectedSubject);
    }

    if (selectedClass !== 'all') {
      filtered = filtered.filter(pyq => pyq.class === selectedClass);
    }

    setFilteredPyqs(filtered);
  };

  const subjects = Array.from(new Set(pyqs.map(pyq => pyq.subject)));
  const classes = Array.from(new Set(pyqs.map(pyq => pyq.class)));

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
          <h1 className="text-4xl font-bold text-primary mb-2 font-poppins">Previous Year Questions</h1>
          <p className="text-gray-600">Practice with verified PYQs to excel in your exams</p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search PYQs..."
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

        {/* PYQs Grid */}
        {filteredPyqs.length === 0 ? (
          <div className="card text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No PYQs Found</h3>
            <p className="text-gray-600">
              {pyqs.length === 0 
                ? 'No previous year questions have been uploaded yet. Check back soon!'
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPyqs.map((pyq) => (
              <div key={pyq.id} className="card hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <FileText className="h-8 w-8 text-amber-600" />
                  </div>
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                    Class {pyq.class}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-primary mb-2 font-poppins">
                  {pyq.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  {pyq.description || 'No description available'}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-semibold mr-2">Subject:</span>
                    <span>{pyq.subject}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {pyq.uploadedAt ? new Date(pyq.uploadedAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t">
                  <a
                    href={pyq.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex-1 text-center flex items-center justify-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </a>
                  <a
                    href={pyq.fileUrl}
                    download
                    className="btn-primary flex-1 text-center flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 text-center text-gray-600">
          <p>Showing {filteredPyqs.length} of {pyqs.length} PYQs</p>
        </div>
      </div>
    </div>
  );
};

export default PYQs;