import { useState } from 'react';
import { fetchInfo } from './api';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await fetchInfo(url);
      setVideoInfo(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch video information');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header - adjusted to be more left-aligned on desktop */}
      <header className="py-4 px-4">
        <div className="container mx-auto">
          <div className="flex justify-start">
            <div className="flex items-center">
              <img 
                src="/airstream.jpg" 
                alt="Airstream Logo"
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                AIRSTREAM
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 py-8">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-8">
            Download YouTube Videos Easily
          </h1>
          
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL here..."
                className="flex-grow px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Download'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>

          {videoInfo && (
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4">{videoInfo.title}</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={videoInfo.thumbnail}
                  alt={videoInfo.title}
                  className="w-full md:w-48 rounded-lg object-cover"
                />
                <div className="flex-grow">
                  <p className="mb-2"><span className="font-bold">Channel:</span> {videoInfo.author}</p>
                  <p className="mb-4"><span className="font-bold">Duration:</span> {videoInfo.duration}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {videoInfo.formats.map((format) => (
                      <a
                        key={format.itag}
                        href={format.url}
                        download
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-center transition-colors"
                      >
                        {format.qualityLabel || format.audioQuality} ({format.container})
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer - integrated from Footer.jsx */}
      <footer className="bg-black py-8 px-4 relative z-10 mt-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
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
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
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
