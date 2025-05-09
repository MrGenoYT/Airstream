export default function BackgroundShapes() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Abstract gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/20 to-purple-900/10"></div>
      
      {/* Top right circle */}
      <div className="absolute top-[-10%] right-[-10%] w-1/3 h-1/3 rounded-full bg-blue-600/5 backdrop-blur-3xl"></div>
      
      {/* Bottom left circle */}
      <div className="absolute bottom-[-15%] left-[-5%] w-1/2 h-1/2 rounded-full bg-purple-600/5 backdrop-blur-3xl"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTMwIDBIMHYzMGgzMHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxwYXRoIGQ9Ik02MCAwSDMwdjMwaDMweiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/5 w-12 h-12 rounded-full bg-blue-500/10 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-purple-500/10 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-blue-500/5 animate-ping"></div>
      
      {/* Animated floating shapes */}
      <div className="absolute top-1/3 right-1/4">
        <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-5 animate-float">
          <path fill="currentColor" className="text-blue-400" d="M40 0L80 60H0z" />
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 left-1/3">
        <svg width="60" height="60" viewBox="0 0 60 60" className="opacity-5 animate-float-delay">
          <rect width="60" height="60" fill="currentColor" className="text-purple-400" />
        </svg>
      </div>
      
      <div className="absolute top-1/2 right-1/3">
        <svg width="70" height="70" viewBox="0 0 70 70" className="opacity-5 animate-float-slow">
          <circle cx="35" cy="35" r="35" fill="currentColor" className="text-blue-300" />
        </svg>
      </div>
    </div>
  )
}
