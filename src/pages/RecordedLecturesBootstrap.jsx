import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Video, Search, Play, Calendar } from 'lucide-react';

const RecordedLecturesBootstrap = () => {
  const [lectures, setLectures] = useState([]);
  const [filteredLectures, setFilteredLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchLectures();
  }, []);

  useEffect(() => {
    filterLectures();
  }, [searchTerm, selectedSubject, selectedClass, lectures]);

  const fetchLectures = async () => {
    try {
      const q = query(collection(db, 'lectures'), orderBy('uploadedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const lecturesData = [];
      querySnapshot.forEach((doc) => {
        lecturesData.push({ id: doc.id, ...doc.data() });
      });

      setLectures(lecturesData);
      setFilteredLectures(lecturesData);
    } catch (err) {
      console.error('Error fetching lectures:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterLectures = () => {
    let filtered = lectures;

    if (searchTerm) {
      filtered = filtered.filter(lecture =>
        lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecture.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(lecture => lecture.subject === selectedSubject);
    }

    if (selectedClass !== 'all') {
      filtered = filtered.filter(lecture => lecture.class === selectedClass);
    }

    setFilteredLectures(filtered);
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    
    // Extract video ID from various YouTube URL formats
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const subjects = Array.from(new Set(lectures.map(lecture => lecture.subject)));
  const classes = Array.from(new Set(lectures.map(lecture => lecture.class)));

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
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
          <h1 className="display-5 fw-bold text-primary mb-2">Recorded Lectures</h1>
          <p className="lead text-muted">Learn at your own pace with expert video lectures</p>
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title text-primary fw-bold">{selectedVideo.title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedVideo(null)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-0">
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={getYouTubeEmbedUrl(selectedVideo.fileUrl)}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-bottom"
                    ></iframe>
                  </div>
                </div>
                <div className="modal-footer border-0 pt-3">
                  <div className="w-100">
                    <p className="text-muted">{selectedVideo.description}</p>
                    <div className="d-flex justify-content-between text-muted small">
                      <span><strong>Subject:</strong> {selectedVideo.subject}</span>
                      <span><strong>Class:</strong> {selectedVideo.class}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
                    placeholder="Search lectures..."
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

        {/* Lectures Grid */}
        {filteredLectures.length === 0 ? (
          <div className="card shadow-sm text-center p-5">
            <Video size={64} className="mx-auto text-muted mb-3" />
            <h3 className="h3 text-muted mb-2">No Lectures Found</h3>
            <p className="text-muted">
              {lectures.length === 0 
                ? 'No recorded lectures have been uploaded yet. Check back soon!'
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredLectures.map((lecture) => (
              <div key={lecture.id} className="col">
                <div className="card h-100 shadow-sm hover-shadow transition-all">
                  <div 
                    className="position-relative bg-dark bg-opacity-10 rounded-top overflow-hidden ratio ratio-16x9 cursor-pointer"
                    onClick={() => setSelectedVideo(lecture)}
                  >
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-flex align-items-center justify-content-center transition-all hover-bg-opacity-50">
                      <div className="bg-white bg-opacity-75 rounded-circle p-3 d-flex align-items-center justify-content-center">
                        <Play size={32} className="text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title text-primary mb-0">{lecture.title}</h5>
                      <span className="badge bg-primary bg-opacity-10 text-primary">
                        Class {lecture.class}
                      </span>
                    </div>

                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
                        <span className="d-flex align-items-center">
                          <Calendar size={14} className="me-1" />
                          {new Date(lecture.uploadedAt?.toDate()).toLocaleDateString()}
                        </span>
                        <span>{lecture.subject}</span>
                      </div>
                      <button
                        className="btn btn-outline-primary w-100"
                        onClick={() => setSelectedVideo(lecture)}
                      >
                        <Play size={16} className="me-2" />
                        Watch Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-5 text-center text-muted">
          <p>Showing {filteredLectures.length} of {lectures.length} lectures</p>
        </div>
      </div>
    </div>
  );
};

export default RecordedLecturesBootstrap;