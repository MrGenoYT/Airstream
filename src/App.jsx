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
      {/* Background Elements - More abstract and animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Grid pattern */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoLTZ2LTZoNnptLTYtMTJ2NmgtNnYtNmg2em0tNiAwdjZoLTZ2LTZoNnptMTIgMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        {/* Animated abstract shapes */}
        <div className="absolute top-1/4 -left-10 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-blue-700/10 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/5 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '15s'}}></div>
        
        {/* Additional shapes */}
        <div className="absolute -top-20 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '12s'}}></div>
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full filter blur-3xl animate-pulse" style={{animationDuration: '10s'}}></div>
        
        {/* Abstract geometric elements */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" width="100%" height="100%">
          <rect x="10%" y="10%" width="80%" height="80%" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="10,10" className="animate-spin-slow" style={{animationDuration: '120s'}} />
          <circle cx="50%" cy="50%" r="30%" stroke="blue" strokeWidth="0.5" fill="none" strokeDasharray="5,15" className="animate-reverse-spin" style={{animationDuration: '90s'}} />
          <polygon points="50%,20% 80%,50% 50%,80% 20%,50%" stroke="white" strokeWidth="0.3" fill="none" className="animate-pulse" style={{animationDuration: '20s'}} />
        </svg>
      </div>

      {/* Header - converted to nav and increased size on desktop */}
      <nav className="bg-black border-b border-blue-900 py-6 px-4 sticky top-0 z-20">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/airstream.jpg" 
              alt="Airstream Logo"
              className="w-10 h-10 md:w-16 md:h-16 rounded-full mr-3 object-cover border-2 border-blue-500"
            />
            <span className="font-extrabold text-2xl md:text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
              AIRSTREAM
            </span>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col px-4 z-10 relative container mx-auto py-6 md:py-10">
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
            <div className="mt-4 p-3 bg-black border border-red-700 text-red-400 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          )}

          <div className="mt-3 text-sm text-blue-300 text-center md:text-left">
            Press Ctrl+Enter to quickly fetch download links.
          </div>
        </div>


              <span className="text-white">FAST</span> <span className="text-blue-400">DOWNLOAD</span>
            </h1>
            <p className="text-white mb-8 text-lg">
              Download YouTube videos with our lightning-fast converter. High quality MP4 and MP3 downloads without restrictions.
            </p>
            
            {/* Loading state appears above the features grid */}
            {loading && <div className="my-8"><Loader /></div>}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
        </div>

        {/* Thumbnail and Title Display */}
        {thumbnail && title && !loading && (
          <div className="mt-4 w-full max-w-3xl mx-auto backdrop-blur-sm bg-white/5 p-6 rounded-xl shadow-xl border border-blue-900 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 rounded-lg overflow-hidden shadow-md border border-blue-800">
                <img src={thumbnail} alt={title} className="w-full h-auto object-cover" />
              </div>
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                <p className="text-blue-300">Ready to download in your preferred format.</p>
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
      <footer className="bg-black py-8 px-4 relative z-10 mt-auto border-t border-blue-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <img 
                  src="/airstream.jpg" 
                  alt="Airstream Logo"
                  className="w-8 h-8 rounded-full mr-2 object-cover border border-blue-500"
                />
                <span className="font-extrabold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
                  AIRSTREAM
                </span>
              </div>
              <p className="text-white text-sm mb-4">
                The fastest and most reliable YouTube video downloader. No ads, no limits, 100% free.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-400 hover:text-white transition-colors">
                  {/* Roblox Logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M105.2 80.1l99.5 0 105.6 160.1-105.6 159.7-99.5 0L210.9 240 105.2 80.1zM256 298.3l54.5 82.4L365 298.3 310.5 215.9 256 298.3z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="md:text-right">
              <h3 className="font-bold text-white uppercase mb-4 text-sm tracking-wider">FEATURES</h3>
              <ul className="space-y-2 text-sm md:text-right">
                <li><a href="#" className="text-blue-300 hover:text-white transition-colors">HD DOWNLOADS</a></li>
                <li><a href="#" className="text-blue-300 hover:text-white transition-colors">AUDIO EXTRACTION</a></li>
                <li><a href="#" className="text-blue-300 hover:text-white transition-colors">BATCH PROCESSING</a></li>
                <li><a href="#" className="text-blue-300 hover:text-white transition-colors">NO WATERMARKS</a></li>
                <li><a href="#" className="text-blue-300 hover:text-white transition-colors">FAST CONVERSION</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-blue-900 text-center">
            <p className="text-blue-200 text-sm">
              &copy; {currentYear} AIRSTREAM. ALL RIGHTS RESERVED. AIRSTREAM IS NOT AFFILIATED WITH YOUTUBE.
            </p>
          </div>
        </div>
      </footer>

      {/* Animation keyframes - add to your global CSS */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 120s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 90s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
