import { useState, useEffect } from 'react'
import { fetchInfo } from './api'
import Loader from './components/Loader'
import DownloadOptions from './components/DownloadOptions'
import Header from './components/Header'
import Footer from './components/Footer'
import BackgroundShapes from './components/BackgroundShapes'

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [formats, setFormats] = useState([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)

  const handleFetch = async () => {
    if (!url.trim()) {
      setError('Please enter a valid YouTube URL')
      return
    }
    
    setLoading(true)
    setFormats([])
    setError('')
    
    try {
      const res = await fetchInfo(url)
      setTitle(res.data.title)
      setFormats(res.data.formats)
      setShowSuccessAnimation(true)
      setTimeout(() => setShowSuccessAnimation(false), 2000)
    } catch (err) {
      setError('Failed to fetch video info. Please verify the URL and try again.')
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
    <div className="min-h-screen flex flex-col bg-slate-900 relative overflow-hidden">
      <BackgroundShapes />
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-24 z-10 relative">
        <div className={`transition-all duration-500 ease-out transform ${showSuccessAnimation ? 'scale-105' : 'scale-100'}`}>
          <h1 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            AIRSTREAM
          </h1>
          <p className="text-gray-400 text-center mb-8 max-w-md mx-auto">
            Download YouTube videos with our lightning-fast converter. High quality MP4 and MP3 downloads.
          </p>
        </div>

        <div className="w-full max-w-xl backdrop-blur-sm bg-gray-900/70 p-6 rounded-xl border border-gray-800 shadow-xl">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              className="flex-1 p-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Paste YouTube link here (Ctrl+Enter to fetch)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="YouTube URL"
            />
            <button
              className="md:w-auto w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-lg font-bold flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
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
            Press Ctrl+Enter to quickly fetch download links
          </div>
        </div>

        {loading && <Loader />}
        
        {formats.length > 0 && <DownloadOptions formats={formats} title={title} />}
      </main>
      
      <Footer />
    </div>
  )
}

export default App
