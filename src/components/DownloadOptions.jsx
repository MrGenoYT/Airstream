import { useState, useEffect } from 'react';

export default function DownloadOptions({ formats, title }) {
  const [activeTab, setActiveTab] = useState('all');
  const [filteredFormats, setFilteredFormats] = useState([]);
  const [downloadProgress, setDownloadProgress] = useState({});

  // Group formats by type
  const audioFormats = formats.filter(f => f.type === 'Audio');
  const videoFormats = formats.filter(f => f.type === 'Video');
  const combinedFormats = formats.filter(f => f.type === 'Audio+Video');

  useEffect(() => {
    // Initialize with all formats
    setFilteredFormats(formats);
  }, [formats]);

  useEffect(() => {
    // Filter formats based on active tab
    switch(activeTab) {
      case 'audio':
        setFilteredFormats(audioFormats);
        break;
      case 'video':
        setFilteredFormats(videoFormats);
        break;
      case 'combined':
        setFilteredFormats(combinedFormats);
        break;
      default:
        setFilteredFormats(formats);
    }
  }, [activeTab, formats, audioFormats, videoFormats, combinedFormats]);

  const handleDownload = (index) => {
    // Simulate download progress
    setDownloadProgress(prev => ({ ...prev, [index]: 0 }));

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const newProgress = (prev[index] || 0) + Math.floor(Math.random() * 15);

        if (newProgress >= 100) {
          clearInterval(interval);
          return { ...prev, [index]: 100 };
        }

        return { ...prev, [index]: newProgress };
      });
    }, 300);
  };

  return (
    <div className="mt-8 w-full max-w-3xl backdrop-blur-sm bg-white/70 p-6 rounded-xl shadow-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-bold text-gray-800 flex-1 truncate">Available Download Options</h2>
      </div>

      {/* Tabs */}
      <div className="flex mb-4 border-b border-gray-300 overflow-x-auto hide-scrollbar">
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
            activeTab === 'all'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('all')}
        >
          ALL FORMATS
          <span className="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full text-gray-700">{formats.length}</span>
        </button>

        {audioFormats.length > 0 && (
          <button
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'audio'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('audio')}
          >
            AUDIO
            <span className="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full text-gray-700">{audioFormats.length}</span>
          </button>
        )}

        {videoFormats.length > 0 && (
          <button
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'video'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('video')}
          >
            VIDEO
            <span className="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full text-gray-700">{videoFormats.length}</span>
          </button>
        )}

        {combinedFormats.length > 0 && (
          <button
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'combined'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('combined')}
          >
            AUDIO+VIDEO
            <span className="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full text-gray-700">{combinedFormats.length}</span>
          </button>
        )}
      </div>

      {/* Format List */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {filteredFormats.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center bg-gray-100 rounded-lg overflow-hidden hover:bg-gray-200 transition-colors border border-gray-200"
          >
            <div className="p-4 flex-1">
              <div className="flex items-center flex-wrap">
                {item.type === 'Audio' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                ) : item.type === 'Video' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                )}
                <span className="font-medium text-gray-800">{item.quality}</span>
                <span className="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full text-gray-700">{item.type}</span>
              </div>

              {downloadProgress[index] !== undefined && (
                <div className="mt-2">
                  <div className="w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${downloadProgress[index]}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-600">Downloading...</span>
                    <span className="text-xs text-gray-600">{downloadProgress[index]}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Download Button */}
            <a
              href={item.url}
              className="block bg-blue-600 text-white py-3 px-8 font-semibold transition-all hover:bg-blue-700 flex items-center justify-center md:self-stretch whitespace-nowrap text-center"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleDownload(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              DOWNLOAD
            </a>
          </div>
        ))}

        {filteredFormats.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No formats available in this category.</p>
          </div>
        )}
      </div>

      {/* Info Text */}
      <div className="mt-4 pt-4 border-t border-gray-300">
        <div className="flex items-center justify-between flex-wrap gap-2 text-sm text-gray-600">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Select the quality that best suits your needs.
          </div>
          <div className="text-gray-500">
            {filteredFormats.length} options available
          </div>
        </div>
      </div>
    </div>
  );
}
