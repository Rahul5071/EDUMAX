import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { BookOpen, Download, Search, Filter, Eye } from 'lucide-react';

const NotesBootstrap = () => {
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
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 pt-5">
      <div className="container py-5">
        {/* Header */}
        <div className="mb-5">
          <h1 className="display-5 fw-bold text-primary mb-2">Study Notes</h1>
          <p className="text-muted">Access comprehensive notes for all subjects</p>
        </div>

        {/* Search and Filters */}
        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Search className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-3">
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

              <div className="col-md-3">
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

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="card shadow-sm text-center p-5">
            <BookOpen className="mx-auto text-muted mb-3" size={48} />
            <h3 className="h3 text-muted mb-2">No Notes Found</h3>
            <p className="text-muted">
              {notes.length === 0 
                ? 'No notes have been uploaded yet. Check back soon!'
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredNotes.map((note) => (
              <div key={note.id} className="col">
                <div className="card h-100 shadow-sm hover-shadow transition-all">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-3">
                        <BookOpen className="text-primary" size={24} />
                      </div>
                      <span className="badge bg-primary bg-opacity-10 text-primary">
                        Class {note.class}
                      </span>
                    </div>

                    <h5 className="card-title text-primary mb-3">{note.title}</h5>
                    <p className="card-text text-muted small mb-4">
                      {note.description || 'No description available'}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <span className="badge bg-secondary bg-opacity-10 text-secondary">
                        {note.subject}
                      </span>
                      <small className="text-muted">
                        {note.uploadedAt ? new Date(note.uploadedAt).toLocaleDateString() : 'N/A'}
                      </small>
                    </div>

                    <div className="d-grid gap-2 d-sm-flex">
                      <a
                        href={note.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </a>
                      <a
                        href={note.fileUrl}
                        download
                        className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                      >
                        <Download size={16} />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-5 text-center text-muted">
          <p>Showing {filteredNotes.length} of {notes.length} notes</p>
        </div>
      </div>
    </div>
  );
};

export default NotesBootstrap;