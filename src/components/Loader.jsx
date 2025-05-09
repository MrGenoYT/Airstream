export default function Loader() {
  return (
    <div className="my-8 flex flex-col items-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-300 border-opacity-20 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 animate-spin rounded-full absolute top-0 left-0"></div>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <p className="text-lg font-semibold text-blue-400">PROCESSING</p>
        <div className="w-48 h-2 bg-gray-700 rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
        </div>
        <p className="text-gray-400 text-sm mt-2">Fetching available formats...</p>
      </div>
    </div>
  )
}
