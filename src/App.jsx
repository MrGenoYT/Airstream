import { useState, useEffect } from 'react';
import { fetchInfo } from './api';
import Loader from './components/Loader';
import DownloadOptions from './components/DownloadOptions';

function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-lg' : 'bg-black/70'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img 
              src="/airstream.jpg" 
              alt="Airstream Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              AIRSTREAM
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wide transition-colors">Home</a>
            <a href="#" className="text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wide transition-colors">Features</a>
            <a href="#" className="text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wide transition-colors">FAQ</a>
            <a href="#" className="text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wide transition-colors">Contact</a>
          </nav>
          
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black py-8 px-4 relative z-10 mt-auto border-t border-gray-800">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/airstream.jpg" 
                alt="Airstream Logo"
                className="w-6 h-6 rounded-full mr-2 object-cover"
              />
              <span className="font-extrabold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
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
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white uppercase mb-4 text-sm tracking-wider">FEATURES</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">HD Downloads</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Audio Extraction</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Batch Processing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">No Watermarks</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fast Conversion</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white uppercase mb-4 text-sm tracking-wider">HELP</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Airstream. All rights reserved. Airstream is not affiliated with YouTube.
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [formats, setFormats] = useState([]);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200 relative">
      {/* Background elements */}
      <BackgroundShapes />
      
      {/* Header */}
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-start pt-24 pb-20 px-4 z-10 relative">
        {/* Hero section with form */}
        <div className="w-full max-w-3xl mx-auto mb-16 mt-6">
          <div className={`transition-all duration-500 ease-out transform ${showSuccessAnimation ? 'scale-105' : 'scale-100'}`}>
            <h1 className="text-5xl font-extrabold mb-2 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                AIRSTREAM
              </span>
            </h1>
            <p className="text-gray-300 text-center mb-8 max-w-lg mx-auto">
              Download YouTube videos with our lightning-fast converter. High quality MP4 and MP3 downloads.
            </p>
          </div>

          {/* Input and Fetch Button */}
          <div className="w-full backdrop-blur-md bg-black/50 p-6 rounded-xl shadow-xl border border-gray-700">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                className="flex-1 p-4 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all w-full"
                placeholder="Paste YouTube link here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                aria-label="YouTube URL"
              />
              <button
                className="md:w-auto w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 rounded-lg font-bold flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none text-lg"
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
              <div className="mt-4 p-3 bg-red-900/70 border border-red-800 text-red-200 rounded-lg flex items-center">
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
        </div>

        {/* Loading State */}
        {loading && <Loader />}

        {/* Thumbnail and Title Display */}
        {thumbnail && title && !loading && (
          <div className="mt-4 w-full max-w-3xl backdrop-blur-md bg-black/50 p-6 rounded-xl shadow-xl border border-gray-700 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 rounded-lg overflow-hidden shadow-md border border-gray-700">
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
