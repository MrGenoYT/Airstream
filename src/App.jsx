import { useState, useEffect } from 'react'
import { fetchInfo } from './api'
import Loader from './components/Loader'
import DownloadOptions from './components/DownloadOptions'
import Footer from './components/Footer'
import BackgroundShapes from './components/BackgroundShapes'

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [formats, setFormats] = useState([])
  const [title, setTitle] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      // Show thumbnail and title immediately with placeholder data
      setTitle("Loading video information...")
      setThumbnail("/api/placeholder/640/360")
      
      // Process data after a short delay to simulate API call
      setTimeout(async () => {
        try {
          const res = await fetchInfo(url)
          setTitle(res.data.title)
          setThumbnail(res.data.thumbnail)
          setFormats(res.data.formats)
          setShowSuccessAnimation(true)
          setTimeout(() => setShowSuccessAnimation(false), 2000)
        } catch (err) {
          setError('Failed to fetch video info.')
          setTitle('')
          setThumbnail('')
        }
        setLoading(false)
      }, 800)
    } catch (err) {
      setError('Failed to fetch video info.')
      setLoading(false)
      setTitle('')
      setThumbnail('')
    }
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
    <div className="min-h-screen flex flex-col bg-slate-900 relative">
      <BackgroundShapes />
      
      {/* Header - aligned to the left with consistent spacing */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md bg-opacity-90' : ''} bg-slate-900 py-3 border-b border-blue-900/30`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-start items-center">
            <div className="flex items-center">
              <img 
                src="/airstream.jpg" 
                alt="Airstream Logo" 
                className="w-8 h-8 rounded-full mr-3 object-cover border-2 border-blue-500"
              />
              <span className="font-bold text-2xl tracking-tight text-white">
                <span className="text-blue-500">AIR</span>STREAM
              </span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-start pt-24 pb-16 px-6 z-10 relative container mx-auto max-w-6xl">
        <div className={`transition-all duration-500 ease-out transform ${showSuccessAnimation ? 'scale-105' : 'scale-100'} mb-10`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white text-center">
            Download <span className="text-blue-500">YouTube</span> Videos
          </h1>
          <p className="text-gray-300 text-center mb-8 max-w-lg mx-auto text-lg">
            Fast, reliable, high-quality MP4 and MP3 downloads with no limitations.
          </p>
        </div>

        {/* URL Input Box - wider for desktop */}
        <div className="w-full max-w-3xl bg-white bg-opacity-5 p-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm mb-10">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              className="flex-1 p-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Paste YouTube link here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="YouTube URL"
            />
            <button
              className="md:w-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg font-semibold flex items-center justify-center transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              onClick={handleFetch}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              DOWNLOAD
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
          
          <div className="mt-2 text-sm text-gray-400 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Press Ctrl+Enter to quickly fetch download links
          </div>
        </div>

        {loading && <Loader />}
        
        {/* Video info container - consistent width with input box */}
        {thumbnail && title && !loading && (
          <div className="w-full max-w-3xl bg-white bg-opacity-5 p-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm mb-10">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-2/5 rounded-lg overflow-hidden shadow-lg">
                <img src={thumbnail} alt={title} className="w-full h-auto object-cover" />
              </div>
              <div className="w-full md:w-3/5">
                <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
                <p className="text-gray-300 mb-4">Ready to download in your preferred format.</p>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Video information available</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Download options with consistent width */}
        {formats.length > 0 && <DownloadOptions formats={formats} title={title} />}
      </main>
      
      <Footer />
    </div>
  )
}

export default App
