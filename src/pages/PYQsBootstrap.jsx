import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FileText, Download, Search, Eye, Calendar } from 'lucide-react';

const PYQsBootstrap = () => {
  const [pyqs, setPyqs] = useState([]);
  const [filteredPyqs, setFilteredPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');

  // Add these arrays at the top of your component
  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'Hindi', 'Social Science', 'Computer Science'
  ];

  const classes = [6, 7, 8, 9, 10, 11, 12];

  // Fetch PYQs from Firestore
  useEffect(() => {
    const fetchPYQs = async () => {
      try {
        const pyqsRef = collection(db, 'pyqs');
        const q = query(pyqsRef, orderBy('uploadedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const pyqsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPyqs(pyqsData);
        setFilteredPyqs(pyqsData);
      } catch (error) {
        console.error('Error fetching PYQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPYQs();
  }, []);

  // Filter PYQs based on search term and filters
  useEffect(() => {
    let result = [...pyqs];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        pyq => 
          pyq.title?.toLowerCase().includes(term) ||
          pyq.description?.toLowerCase().includes(term) ||
          pyq.subject?.toLowerCase().includes(term)
      );
    }

    if (selectedSubject !== 'all') {
      result = result.filter(pyq => pyq.subject === selectedSubject);
    }

    if (selectedClass !== 'all') {
      result = result.filter(pyq => pyq.class == selectedClass);
    }

    setFilteredPyqs(result);
  }, [searchTerm, selectedSubject, selectedClass, pyqs]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
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
        <div className="mb-5">
          <h1 className="display-5 fw-bold text-primary mb-2">Previous Year Questions</h1>
          <p className="text-muted">Practice with verified PYQs to excel in your exams</p>
        </div>

        {/* Rest of your JSX remains the same */}
        {/* ... */}
      </div>
    </div>
  );
};

export default PYQsBootstrap;