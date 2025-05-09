import { useState, useEffect } from 'react'
import { fetchInfo } from './api'

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [formats, setFormats] = useState([])
  const [title, setTitle] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const currentYear = new Date().getFullYear()
  
  const validateYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i
    return youtubeRegex.test(url)
  }

  const handleFetch = async () => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL.')
      return
    }

    if (!validateYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL.')
      return
    }
    
    setLoading(true)
    setFormats([])
    setError('')
    
    try {
      // Simulate a quick response for thumbnail and title
      setTimeout(() => {
        // Default placeholder thumbnail if real data is still loading
        setThumbnail('/api/placeholder/400/240')
        setTitle('Loading video information...')
      }, 300)
      
      const res = await fetchInfo(url)
      setTitle(res.data.title)
      setThumbnail(res.data.thumbnail)
      setFormats(res.data.formats)
      setShowSuccessAnimation(true)
      setTimeout(() => setShowSuccessAnimation(false), 2000)
    } catch (err) {
      setError('Failed to fetch video info.')
    }
    
    setLoading(false)
  }

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        handleFetch()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [url])

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 relative overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Abstract gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/20 to-blue-700/5"></div>
        
        {/* Top right circle */}
        <div className="absolute top-[-10%] right-[-10%] w-1/3 h-1/3 rounded-full bg-blue-600/5 backdrop-blur-3xl"></div>
        
        {/* Bottom left circle */}
        <div className="absolute bottom-[-15%] left-[-5%] w-1/2 h-1/2 rounded-full bg-blue-600/5 backdrop-blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTMwIDBIMHYzMGgzMHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxwYXRoIGQ9Ik02MCAwSDMwdjMwaDMweiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        {/* Animated floating shapes */}
        <div className="absolute top-1/3 right-1/4">
          <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-5 animate-float">
            <path fill="currentColor" className="text-blue-400" d="M40 0L80 60H0z" />
          </svg>
        </div>
        
        <div className="absolute bottom-1/4 left-1/3">
          <svg width="60" height="60" viewBox="0 0 60 60" className="opacity-5 animate-float-delay">
            <rect width="60" height="60" fill="currentColor" className="text-blue-400" />
          </svg>
        </div>
        
        <div className="absolute top-1/2 right-1/3">
          <svg width="70" height="70" viewBox="0 0 70 70" className="opacity-5 animate-float-slow">
            <circle cx="35" cy="35" r="35" fill="currentColor" className="text-blue-300" />
          </svg>
        </div>
      </div>
      
      {/* Header */}
      <header className="w-full bg-black/90 py-4 shadow-md z-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-start items-center">
            <div className="flex items-center">
              <img 
                src="/airstream.jpg" 
                alt="Airstream Logo" 
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                AIRSTREAM
              </span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 z-10 relative container mx-auto">
        <div className={`transition-all duration-500 ease-out transform ${showSuccessAnimation ? 'scale-105' : 'scale-100'}`}>
          <h1 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-center">
            AIRSTREAM
          </h1>
          <p className="text-gray-300 text-center mb-8 max-w-md mx-auto">
            Download YouTube videos with our lightning-fast converter. High quality MP4 and MP3 downloads.
          </p>
        </div>

        {/* Input Section - Consistent Width */}
        <div className="w-full max-w-3xl backdrop-blur-sm bg-gray-900/70 p-6 rounded-xl border border-gray-800 shadow-xl">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              className="flex-1 p-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Paste YouTube link here."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="YouTube URL"
            />
            <button
              className="md:w-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-bold flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              onClick={handleFetch}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              FETCH
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-800 text-red-200 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          )}
          
          <div className="mt-2 text-xs text-gray-500">
            Press Ctrl+Enter to quickly fetch download links.
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="my-6 flex flex-col items-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-300 border-opacity-20 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 animate-spin rounded-full absolute top-0 left-0"></div>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <p className="text-lg font-semibold text-blue-400">PROCESSING</p>
              <div className="w-48 h-2 bg-gray-700 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Fetching available formats{loading ? '...' : ''}
              </p>
            </div>
          </div>
        )}
        
        {/* Video Information - Same width as Input Box */}
        {thumbnail && title && (
          <div className="mt-8 w-full max-w-3xl backdrop-blur-sm bg-gray-900/70 p-6 rounded-xl border border-gray-800 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
                <img src={thumbnail} alt={title} className="w-full h-auto" />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <p className="text-gray-400 mt-2">Ready to download in your preferred format.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Download Options - Same width as above sections */}
        {formats.length > 0 && (
          <div className="mt-8 w-full max-w-3xl backdrop-blur-sm bg-gray-900/70 p-6 rounded-xl border border-gray-800 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-bold text-white flex-1 truncate">Available Download Options</h2>
            </div>
            
            <div className="flex mb-4 border-b border-gray-800 overflow-x-auto hide-scrollbar">
              <button 
                className="px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap text-blue-400 border-b-2 border-blue-400"
              >
                ALL FORMATS
                <span className="ml-2 bg-gray-700 text-xs px-2 py-0.5 rounded-full">{formats.length}</span>
              </button>
              
              <button 
                className="px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap text-gray-400 hover:text-white"
              >
                AUDIO
                <span className="ml-2 bg-gray-700 text-xs px-2 py-0.5 rounded-full">0</span>
              </button>
              
              <button 
                className="px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap text-gray-400 hover:text-white"
              >
                VIDEO
                <span className="ml-2 bg-gray-700 text-xs px-2 py-0.5 rounded-full">0</span>
              </button>
              
              <button 
                className="px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap text-gray-400 hover:text-white"
              >
                AUDIO+VIDEO
                <span className="ml-2 bg-gray-700 text-xs px-2 py-0.5 rounded-full">0</span>
              </button>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {/* Example format item */}
              <div className="flex flex-col md:flex-row md:items-center bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
                <div className="p-4 flex-1">
                  <div className="flex items-center flex-wrap">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <span className="font-medium text-white">720p</span>
                    <span className="ml-2 bg-gray-700 text-xs px-2 py-0.5 rounded-full text-gray-300">Audio+Video</span>
                  </div>
                </div>
                
                <a
                  href="#"
                  className="block bg-blue-600 text-white py-3 px-6 font-semibold transition-all hover:bg-blue-700 flex items-center justify-center md:self-stretch whitespace-nowrap"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  DOWNLOAD
                </a>
              </div>
              
              {/* No formats placeholder */}
              {formats.length === 0 && (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-400">No formats available in this category.</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center text-sm text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Select the quality that best suits your needs.
                </div>
                <div className="text-sm text-gray-500">
                  {formats.length} options available
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer - Always visible at the bottom */}
      <footer className="bg-black/90 py-8 px-4 relative z-10 mt-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/airstream.jpg" 
                  alt="Airstream Logo"
                  className="w-6 h-6 rounded-full mr-2 object-cover"
                />
                <span className="font-extrabold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
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
  )
}

export default App
