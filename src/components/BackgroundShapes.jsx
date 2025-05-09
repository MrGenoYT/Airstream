export default function BackgroundShapes() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Abstract gradient - Updated for blue/white theme */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-100/50 to-white/30"></div>

      {/* Top right circle - Updated color */}
      <div className="absolute top-[-10%] right-[-10%] w-1/3 h-1/3 rounded-full bg-blue-300/20 backdrop-blur-3xl"></div>

      {/* Bottom left circle - Updated color */}
      <div className="absolute bottom-[-15%] left-[-5%] w-1/2 h-1/2 rounded-full bg-blue-200/20 backdrop-blur-3xl"></div>

      {/* Grid pattern - Kept with reduced opacity */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTMwIDBIMHYzMGgzMHoiIHN0cm9rPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTYwIDBIMzB2MzBoMzB6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc=>')] opacity-10"></div>

      {/* Animated circles - Updated colors */}
      <div className="absolute top-1/4 left-1/5 w-16 h-16 rounded-full bg-blue-400/10 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-28 h-28 rounded-full bg-blue-300/10 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-blue-500/5 animate-ping"></div>

      {/* Animated floating shapes - Updated colors and slightly increased size */}
      <div className="absolute top-1/3 right-1/4">
        <svg width="100" height="100" viewBox="0 0 80 80" className="opacity-10 animate-float">
          <path fill="currentColor" className="text-blue-400" d="M40 0L80 60H0z" />
        </svg>
      </div>

      <div className="absolute bottom-1/4 left-1/3">
        <svg width="80" height="80" viewBox="0 0 60 60" className="opacity-10 animate-float-delay">
          <rect width="60" height="60" fill="currentColor" className="text-blue-300" />
        </svg>
      </div>

      <div className="absolute top-1/2 right-1/3">
        <svg width="90" height="90" viewBox="0 0 70 70" className="opacity-10 animate-float-slow">
          <circle cx="35" cy="35" r="35" fill="currentColor" className="text-blue-200" />
        </svg>
      </div>
    </div>
  );
}
