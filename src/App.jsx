import { useState } from 'react'
import { fetchInfo } from './api'

function App() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const currentYear = new Date().getFullYear()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!url) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetchInfo(url)
      setResult(response.data)
    } catch (err) {
      setError('Failed to fetch video information. Please check the URL.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black py-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center md:justify-start justify-center">
            <img 
              src="/airstream.jpg" 
              alt="Airstream Logo"
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <h1 className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              AIRSTREAM
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Download YouTube Videos Fast & Free
          </h2>
          
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube link here..."
                className="flex-grow px-4 py-3 rounded-l bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-r bg-blue-600 hover:bg-blue-700 font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Download'}
              </button>
            </div>
          </form>

          {error && (
            <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{result.title}</h3>
              {/* Display download options here */}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black py-8 px-4 relative z-10 mt-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:text-left text-center">
              <div className="flex items-center mb-4 md:justify-start justify-center">
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
              <div className="flex space-x-4 md:justify-start justify-center">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {/* Roblox Logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M105.2 80.1l99.5 0 105.6 160.1-105.6 159.7-99.5 0L210.9 240 105.2 80.1zM256 298.3l54.5 82.4L365 298.3 310.5 215.9 256 298.3z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="md:text-right text-center">
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
