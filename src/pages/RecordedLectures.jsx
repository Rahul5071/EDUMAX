import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Video, Search, Play, Calendar } from 'lucide-react';

const RecordedLectures = () => {
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
          <h1 className="text-4xl font-bold text-primary mb-2 font-poppins">Recorded Lectures</h1>
          <p className="text-gray-600">Learn at your own pace with expert video lectures</p>
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-5xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-primary font-poppins">{selectedVideo.title}</h2>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                <iframe
                  src={getYouTubeEmbedUrl(selectedVideo.fileUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-gray-700">{selectedVideo.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span><strong>Subject:</strong> {selectedVideo.subject}</span>
                <span><strong>Class:</strong> {selectedVideo.class}</span>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lectures..."
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

        {/* Lectures Grid */}
        {filteredLectures.length === 0 ? (
          <div className="card text-center py-12">
            <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Lectures Found</h3>
            <p className="text-gray-600">
              {lectures.length === 0 
                ? 'No recorded lectures have been uploaded yet. Check back soon!'
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLectures.map((lecture) => (
              <div key={lecture.id} className="card hover:shadow-xl transition-shadow">
                <div className="relative mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-lg overflow-hidden aspect-video flex items-center justify-center group cursor-pointer"
                  onClick={() => setSelectedVideo(lecture)}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all" />
                  <Play className="h-16 w-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-primary font-poppins flex-1">
                    {lecture.title}
                  </h3>
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold ml-2">
                    Class {lecture.class}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {lecture.description || 'No description available'}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-semibold mr-2">Subject:</span>
                    <span>{lecture.subject}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {lecture.uploadedAt ? new Date(lecture.uploadedAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVideo(lecture)}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Play className="h-5 w-5" />
                  <span>Watch Lecture</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 text-center text-gray-600">
          <p>Showing {filteredLectures.length} of {lectures.length} lectures</p>
        </div>
      </div>
    </div>
  );
};

export default RecordedLectures;
