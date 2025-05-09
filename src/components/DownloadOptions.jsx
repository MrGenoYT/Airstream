import { useState, useEffect } from 'react'

export default function DownloadOptions({ formats, title }) {
  const [activeTab, setActiveTab] = useState('all')
  const [filteredFormats, setFilteredFormats] = useState([])
  const [downloadProgress, setDownloadProgress] = useState({})
  
  // Group formats by type
  const audioFormats = formats.filter(f => f.type === 'Audio')
  const videoFormats = formats.filter(f => f.type === 'Video')
  const combinedFormats = formats.filter(f => f.type === 'Audio+Video')

  useEffect(() => {
    // Initialize with all formats
    setFilteredFormats(formats)
  }, [formats])

  useEffect(() => {
    // Filter formats based on active tab
    switch(activeTab) {
      case 'audio':
        setFilteredFormats(audioFormats)
        break
      case 'video':
        setFilteredFormats(videoFormats)
        break
      case 'combined':
        setFilteredFormats(combinedFormats)
        break
      default:
        setFilteredFormats(formats)
    }
  }, [activeTab, formats])

  const handleDownload = (index) => {
    // Simulate download progress
    setDownloadProgress(prev => ({ ...prev, [index]: 0 }))
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const newProgress = (prev[index] || 0) + Math.floor(Math.random() * 15)
        
        if (newProgress >= 100) {
          clearInterval(interval)
          return { ...prev, [index]: 100 }
        }
        
        return { ...prev, [index]: newProgress }
      })
    }, 300)
  }

  return (
    <div className="mt-8 w-full max-w-2xl backdrop-blur-sm bg-gray-900/70 p-6 rounded-xl border border-gray-800 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-bold text-white flex-1 truncate">{title}</h2>
      </div>
      
      <div className="flex mb-4 border-b border-gray-800">
        <button 
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'all' 
              ? 'text-blue-400 border-b-2 border-blue-400' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('all')}
        >
          ALL FORMATS
          <span className="ml-2 bg-gray-700 text-xs px-2 py-0.5 rounded-full">{formats.length}</span>
        </button>
        
        {audioFormats.length > 0 && (
          <button 
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'audio' 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('audio')}
          >
            AUDIO
            <span className="ml-2 bg-gray-700 text-xs px-2 py-0.5 rounded-full">{audioFormats.length}</span>
          </button>
        )}
        
        {videoFormats.length > 0 && (
          <button 
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'video' 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('video')}
          >
            VIDEO
            <span className="ml-2 bg-gray-700 text-xs px-2 py-0.5 rounded-full">{videoFormats.length}</span>
          </button>
        )}
        
        {combinedFormats.length > 0 && (
          <button 
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'combined' 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('combined')}
          >
            AUDIO+VIDEO
            <span className="ml-2 bg-gray-700 text-xs px-2 py-0.5 rounded-full">{combinedFormats.length}</span>
          </button>
        )}
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {filteredFormats.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col md:flex-row md:items-center bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors"
          >
            <div className="p-4 flex-1">
              <div className="flex items-center">
                {item.type === 'Audio' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                ) : item.type === 'Video' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                )}
                <span className="font-medium text-white">{item.quality}</span>
                <span className="ml-2 bg-gray-700 text-xs px-2 py-0.5 rounded-full text-gray-300">{item.type}</span>
              </div>
              
              {downloadProgress[index] !== undefined && (
                                  <div className="mt-2">
                  <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                      style={{ width: `${downloadProgress[index]}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400">Downloading...</span>
                    <span className="text-xs text-gray-400">{downloadProgress[index]}%</span>
                  </div>
                </div>
              )}
            </div>
            
            <a
              href={item.url}
              className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 font-semibold transition-all hover:from-blue-700 hover:to-purple-700 flex items-center justify-center md:self-stretch"
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
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400">No formats available in this category.</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Select the quality that best suits your needs
          </div>
          <div className="text-sm text-gray-500">
            {filteredFormats.length} options available
          </div>
        </div>
      </div>
    </div>
  )
          }
