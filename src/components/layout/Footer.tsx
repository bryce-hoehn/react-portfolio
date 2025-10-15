interface FooterProps {
  scrollToTop: () => void
  showScrollTop: boolean
}

export function Footer({ scrollToTop, showScrollTop }: FooterProps) {
  return (
    <>
      <footer className="bg-gray-800 text-white w-full">
        {/* Social Icons Section */}
        <div className="py-12">
          <div className="w-full px-4">
            <div className="flex justify-center">
              <div className="text-center mb-8">
                <h4 className="text-xl font-bold uppercase mb-4">Around the Web</h4>
                <div className="flex justify-center space-x-4">
                  <a 
                    className="bg-transparent border-2 border-white text-white p-3 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-110 flex items-center justify-center w-12 h-12" 
                    href="https://www.linkedin.com/in/brycehoehn/"
                    aria-label="LinkedIn"
                  >
                    <i className="fab fa-linkedin-in text-lg"></i>
                  </a>
                  <a 
                    className="bg-transparent border-2 border-white text-white p-3 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-110 flex items-center justify-center w-12 h-12" 
                    href="https://github.com/bryce-hoehn"
                    aria-label="GitHub"
                  >
                    <i className="fab fa-github text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="bg-gray-900 py-4 text-center">
          <div className="w-full">
            <small>Copyright &copy; Bryce Hoehn {new Date().getFullYear()}</small>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-40 flex items-center justify-center"
          aria-label="Back to top"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      )}
    </>
  )
}
