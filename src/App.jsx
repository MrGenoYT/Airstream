import { useState } from 'react'
import { fetchInfo } from './api'
import Loader from './components/Loader'
import DownloadOptions from './components/DownloadOptions'

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [formats, setFormats] = useState([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const handleFetch = async () => {
    setLoading(true)
    setFormats([])
    setError('')
    try {
      const res = await fetchInfo(url)
      setTitle(res.data.title)
      setFormats(res.data.formats)
    } catch (err) {
      setError('Failed to fetch video info. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">Airstream</h1>
      <div className="w-full max-w-xl">
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
          placeholder="Paste YouTube link here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
        />
        <button
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          onClick={handleFetch}
        >
          Fetch Download Links
        </button>
      </div>

      {loading && <Loader />}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {formats.length > 0 && <DownloadOptions formats={formats} title={title} />}
    </div>
  )
}

export default App
