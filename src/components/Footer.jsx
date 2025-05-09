export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-black py-8 px-4 relative z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                className="text-blue-500 mr-2"
              >
                <path 
                  fill="currentColor" 
                  d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
                  opacity="0.4"
                />
                <path 
                  fill="currentColor" 
                  d="M10,16.5l6-4.5l-6-4.5V16.5z" 
                />
              </svg>
              <span className="font-extrabold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
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
  )
}
