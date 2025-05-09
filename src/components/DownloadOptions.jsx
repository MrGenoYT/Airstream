export default function DownloadOptions({ formats, title }) {
  return (
    <div className="mt-6 w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {formats.map((item, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
            <span>{item.quality} - {item.type}</span>
            <a
              href={item.url}
              className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
