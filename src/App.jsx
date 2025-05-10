import { useState, useEffect } from 'react';
import { fetchInfo } from './api';
import Loader from './components/Loader';
import DownloadOptions from './components/DownloadOptions';
// Removed import for BackgroundShapes

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [formats, setFormats] = useState([]);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  // Removed scrolled state as header is removed
  // Removed useEffect for scroll handling as header is removed

  const validateYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i;
    return youtubeRegex.test(url);
  };

  const handleFetch = async () => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL.');
      return;
    }

    if (!validateYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL.');
      return;
    }

    setLoading(true);
    setFormats([]);
    setError('');
    setTitle(''); // Clear previous title and thumbnail
    setThumbnail('');

    try {
      const res = await fetchInfo(url);
      setTitle(res.data.title);
      setThumbnail(res.data.thumbnail);
      setFormats(res.data.formats);
      setShowSuccessAnimation(true);
      setTimeout(() => setShowSuccessAnimation(false), 2000);
    } catch (err) {
      setError('Failed to fetch video info.');
    }

    setLoading(false);
  };

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        handleFetch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [url]);

  // Removed Footer content

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200 relative overflow-hidden">
      {/* Removed BackgroundShapes component */}

      {/* Removed Header */}

      <main className="flex-1 flex flex-col items-center justify-center pt-10 pb-20 px-4 z-10 relative">
        <div className={`transition-all duration-500 ease-out transform ${showSuccessAnimation ? 'scale-105' : 'scale-100'}`}>
          <h1 className="text-5xl font-extrabold mb-2 text-blue-500 text-center">
            AIRSTREAM
          </h1>
          <p className="text-gray-400 text-center mb-8 max-w-md mx-auto">
            Download YouTube videos with our lightning-fast converter. High quality MP4 and MP3 downloads.
          </p>
        </div>

        {/* Input and Fetch Button */}
        <div className="w-full max-w-3xl backdrop-blur-sm bg-gray-800/70 p-6 rounded-xl shadow-xl border border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              className="flex-1 p-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all w-full"
              placeholder="Paste YouTube link here."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="YouTube URL"
            />
            <button
              className="md:w-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg font-bold flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none text-lg"
              onClick={handleFetch}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              FETCH
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-800 border border-red-700 text-red-300 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          )}

          <div className="mt-3 text-sm text-gray-400 text-center md:text-left">
            Press Ctrl+Enter to quickly fetch download links.
          </div>
        </div>

        {/* Loading State */}
        {loading && <Loader />}

        {/* Thumbnail and Title Display */}
        {thumbnail && title && !loading && (
          <div className="mt-12 w-full max-w-3xl backdrop-blur-sm bg-gray-800/70 p-6 rounded-xl shadow-xl border border-gray-700 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 rounded-lg overflow-hidden shadow-md">
                <img src={thumbnail} alt={title} className="w-full h-auto object-cover" />
              </div>
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-200 mb-2">{title}</h2>
                <p className="text-gray-400">Ready to download in your preferred format.</p>
              </div>
            </div>
          </div>
        )}

        {/* Download Options */}
        {formats.length > 0 && !loading && (
          <DownloadOptions formats={formats} title={title} />
        )}
      </main>

      {/* Removed Footer */}
    </div>
  );
}

export default App;
