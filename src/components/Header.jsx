import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg 
            width="32" 
            height="32" 
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
          <span className="font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            AIRSTREAM
          </span>
        </div>
        
        <nav>
          <ul className="flex space-x-8">
            <li>
              <a 
                href="#" 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                HOME
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ABOUT
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                CONTACT
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
