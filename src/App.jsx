import { useState, useEffect } from 'react';
import { fetchInfo } from './api';
import Loader from './components/Loader';
import DownloadOptions from './components/DownloadOptions';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [formats, setFormats] = useState([]);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const currentYear = new Date().getFullYear();

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
    setTitle('');
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

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-blue-700/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        {/* Animated lines */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="opacity-10">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"></rect>
          </svg>
        </div>
      </div>

      {/* Nav Header */}
      <nav className="bg-black border-b border-blue-900 py-6 px-4 sticky top-0 z-20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/airstream.jpg" 
              alt="Airstream Logo"
              className="w-12 h-12 rounded-full mr-4 object-cover md:w-16 md:h-16"
            />
            <span className="font-extrabold text-3xl md:text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-500">
              AIRSTREAM
            </span>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col px-4 z-10 relative container mx-auto py-8">
        {/* URL Input Form - Always appears right below header */}
        <div className="w-full backdrop-blur-sm bg-white/5 p-6 rounded-xl shadow-xl border border-blue-900 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <input
              type="text"
              className="flex-1 p-4 rounded-lg bg-black border border-blue-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all w-full"
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
            <div className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-lg flex items-center">
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

        {/* Fast Download Section - Always visible unless download options are shown */}
        {(!formats.length || loading) && (
          <div className={`transition-all duration-500 ease-out transform ${showSuccessAnimation ? 'scale-105 opacity-100' : 'scale-100 opacity-100'} text-center max-w-2xl mx-auto mb-8`}>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-white uppercase tracking-wider">
              FAST DOWNLOADS
            </h1>
            <p className="text-gray-400 mb-10 text-lg">
              Download YouTube videos with our lightning-fast converter. High quality MP4 and MP3 downloads without restrictions.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-blue-900/30 p-4 rounded-full mb-3 border border-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-white">FAST DOWNLOADS</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-900/30 p-4 rounded-full mb-3 border border-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white">HD QUALITY</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-900/30 p-4 rounded-full mb-3 border border-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-white">ALL FORMATS</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-900/30 p-4 rounded-full mb-3 border border-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-white">NO LIMITS</h3>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Loading State */}
          {loading && <Loader />}

          {/* Thumbnail and Title Display */}
          {thumbnail && title && !loading && (
            <div className="mt-4 w-full max-w-3xl backdrop-blur-sm bg-white/5 p-6 rounded-xl shadow-xl border border-blue-900 animate-fade-in">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/3 rounded-lg overflow-hidden shadow-md">
                  <img src={thumbnail} alt={title} className="w-full h-auto object-cover" />
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                  <p className="text-gray-400">Ready to download in your preferred format.</p>
                </div>
              </div>
            </div>
          )}

          {/* Download Options */}
          {formats.length > 0 && !loading && (
            <DownloadOptions formats={formats} title={title} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black py-8 px-4 relative z-10 mt-auto border-t border-blue-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <img 
                  src="/airstream.jpg" 
                  alt="Airstream Logo"
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <span className="font-extrabold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-500">
                  AIRSTREAM
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                The fastest and most reliable YouTube video downloader. No ads, no limits, 100% free.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {/* Roblox Logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M105.2 80.1l99.5 0 105.6 160.1-105.6 159.7-99.5 0L210.9 240 105.2 80.1zM256 298.3l54.5 82.4L365 298.3 310.5 215.9 256 298.3z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="text-right">
              <h3 className="font-bold text-white uppercase mb-4 text-sm tracking-wider">FEATURES</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">HD Downloads</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Audio Extraction</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Batch Processing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">No Watermarks</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fast Conversion</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-blue-900 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Airstream. All rights reserved. Airstream is not affiliated with YouTube.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
