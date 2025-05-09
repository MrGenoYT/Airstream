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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-md' : 'bg-transparent'} py-4`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-start items-center">
          <div className="flex items-center">
            <img 
              src="/airstream.jpg" 
              alt="Airstream Logo" 
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              AIRSTREAM
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
