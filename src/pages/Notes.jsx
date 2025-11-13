import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { BookOpen, Download, Search, Filter, Eye } from 'lucide-react';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [searchTerm, selectedSubject, selectedClass, notes]);

  const fetchNotes = async () => {
    try {
      const q = query(collection(db, 'notes'), orderBy('uploadedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const notesData = [];
      querySnapshot.forEach((doc) => {
        notesData.push({ id: doc.id, ...doc.data() });
      });

      setNotes(notesData);
      setFilteredNotes(notesData);
    } catch (err) {
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterNotes = () => {
    let filtered = notes;

    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(note => note.subject === selectedSubject);
    }

    if (selectedClass !== 'all') {
      filtered = filtered.filter(note => note.class === selectedClass);
    }

    setFilteredNotes(filtered);
  };

  const subjects = Array.from(new Set(notes.map(note => note.subject)));
  const classes = Array.from(new Set(notes.map(note => note.class)));

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
          <h1 className="text-4xl font-bold text-primary mb-2 font-poppins">Study Notes</h1>
          <p className="text-gray-600">Access comprehensive notes for all subjects</p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes..."
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

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="card text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Notes Found</h3>
            <p className="text-gray-600">
              {notes.length === 0 
                ? 'No notes have been uploaded yet. Check back soon!'
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div key={note.id} className="card hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                    Class {note.class}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-primary mb-2 font-poppins">
                  {note.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  {note.description || 'No description available'}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-700">
                    {note.subject}
                  </span>
                  <span className="text-xs text-gray-500">
                    {note.uploadedAt ? new Date(note.uploadedAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex-1 text-center flex items-center justify-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </a>
                  <a
                    href={note.fileUrl}
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
          <p>Showing {filteredNotes.length} of {notes.length} notes</p>
        </div>
      </div>
    </div>
  );
};

export default Notes;