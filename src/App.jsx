import { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [formats, setFormats] = useState({ video: [], audio: [] });
  const [selected, setSelected] = useState({ id: '', type: '' });

  const getFormats = async () => {
    const res = await axios.post('https://your-backend-url.onrender.com/api/formats', { url });
    setFormats(res.data);
  };

  const download = async () => {
    const res = await axios.post(
      'https://your-backend-url.onrender.com/api/download',
      { url, formatId: selected.id, type: selected.type },
      { responseType: 'blob' }
    );
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([res.data]));
    link.download = `${selected.type}.${selected.type === 'audio' ? 'mp3' : 'mp4'}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">YouTube to MP4/MP3 Downloader</h1>
      <input
        type="text"
        placeholder="Paste YouTube link..."
        value={url}
        onChange={e => setUrl(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && getFormats()}
        className="w-full max-w-lg p-3 rounded bg-gray-800 border border-gray-700 text-white"
      />

      <div className="mt-6 w-full max-w-lg">
        {formats.video.length > 0 && (
          <>
            <h2 className="text-xl mb-2">Video Quality</h2>
            <div className="grid gap-2">
              {formats.video.map(f => (
                <button
                  key={f.format_id}
                  onClick={() => setSelected({ id: f.format_id, type: 'video' })}
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
                >
                  {f.format_note || f.resolution} - {f.ext}
                </button>
              ))}
            </div>
          </>
        )}
        {formats.audio.length > 0 && (
          <>
            <h2 className="text-xl mt-4 mb-2">Audio Quality</h2>
            <div className="grid gap-2">
              {formats.audio.map(f => (
                <button
                  key={f.format_id}
                  onClick={() => setSelected({ id: f.format_id, type: 'audio' })}
                  className="bg-green-600 hover:bg-green-700 p-2 rounded"
                >
                  {f.abr || 'Audio'} - {f.ext}
                </button>
              ))}
            </div>
          </>
        )}
        {selected.id && (
          <button
            onClick={download}
            className="mt-6 bg-purple-600 hover:bg-purple-700 p-3 rounded text-white font-bold w-full"
          >
            Download {selected.type.toUpperCase()}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
