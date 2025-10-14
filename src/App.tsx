import { useState, useRef, useEffect } from 'react'
import './App.css'
import profileImage from './assets/profile.png'

interface FormData {
  name: string;
  email: string;
  message: string;
  recaptcha_token: string;
}

interface FormResponse {
  success?: string;
  error?: string;
}

declare global {
  interface Window {
    grecaptcha: any;
  }
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formFeedback, setFormFeedback] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    recaptcha_token: ''
  })
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const [portfolioProjects, setPortfolioProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Fetch portfolio projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects.json')
        const projects = await response.json()
        setPortfolioProjects(projects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Scroll detection for back-to-top button and header shrinking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setShowScrollTop(window.scrollY > 300)
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Load reCAPTCHA script and set up global callbacks
  useEffect(() => {
    // Set up global callback functions
    ;(window as any).handleRecaptchaCallback = (token: string) => {
      console.log('reCAPTCHA token received:', token)
      setFormData(prev => ({
        ...prev,
        recaptcha_token: token
      }))
    }

    ;(window as any).handleRecaptchaExpiredCallback = () => {
      console.log('reCAPTCHA expired')
      setFormData(prev => ({
        ...prev,
        recaptcha_token: ''
      }))
    }

    ;(window as any).handleRecaptchaErrorCallback = () => {
      console.log('reCAPTCHA error')
      setFormData(prev => ({
        ...prev,
        recaptcha_token: ''
      }))
    }

    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      // Cleanup global functions
      delete (window as any).handleRecaptchaCallback
      delete (window as any).handleRecaptchaExpiredCallback
      delete (window as any).handleRecaptchaErrorCallback
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormFeedback('')

    if (!formData.recaptcha_token) {
      setFormFeedback('Please complete the reCAPTCHA verification.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result: FormResponse = await response.json()

      if (response.ok && result.success) {
        setFormFeedback(result.success)
        setFormData({ name: '', email: '', message: '', recaptcha_token: '' })
        // Reset reCAPTCHA
        if (window.grecaptcha) {
          window.grecaptcha.reset()
        }
      } else {
        setFormFeedback(result.error || 'Failed to send message. Please try again.')
        // Reset reCAPTCHA on error
        if (window.grecaptcha) {
          window.grecaptcha.reset()
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormFeedback('Failed to send message. Please check your connection and try again.')
      // Reset reCAPTCHA on error
      if (window.grecaptcha) {
        window.grecaptcha.reset()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <nav className={`bg-gray-800 text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`} role="navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'}`}>
            {/* Brand/Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={scrollToTop}
                className={`font-bold uppercase tracking-wider hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ${isScrolled ? 'text-lg' : 'text-2xl'}`}
                aria-label="Back to top"
              >
                Bryce Hoehn
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className="px-3 py-2 rounded-md text-sm font-medium uppercase hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-label="Portfolio"
                >
                  Portfolio
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-3 py-2 rounded-md text-sm font-medium uppercase hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-label="Contact Section"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium uppercase hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
                onClick={toggleMenu}
              >
                Menu
                <span className="ml-2">☰</span>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 border-t border-gray-700">
              <button
                onClick={() => {
                  scrollToSection('portfolio')
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium uppercase hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-label="Portfolio"
              >
                Portfolio
              </button>
              <button
                onClick={() => {
                  scrollToSection('contact')
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium uppercase hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-label="Contact Section"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content with padding to account for fixed navbar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'pt-16' : 'pt-24'}`}>
        
        {/* Masthead Section */}
        <header className="bg-blue-600 text-white text-center py-20 w-full">
          <div className="w-full px-4 flex flex-col items-center">
            {/* Masthead Avatar Image */}
            <img
              className="w-48 h-48 rounded-full mb-8 border-4 border-white"
              src={profileImage}
              alt="Bryce Hoehn, UX Designer Avatar"
            />
            {/* Masthead Heading */}
            <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">Bryce Hoehn</h1>
            {/* Icon Divider */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-white"></div>
              <div className="mx-4 text-2xl"><i className="fas fa-star"></i></div>
              <div className="w-16 h-1 bg-white"></div>
            </div>
            {/* Masthead Subheading */}
            <p className="text-xl font-light mb-2">UX Developer</p>
            <p className="text-lg font-light max-w-2xl">
              Hi, I'm Bryce. I combine UX research and front-end development to craft web experiences that are both beautiful and easy to use. I specialize in React, modern JavaScript, and building interfaces that solve real user problems.
            </p>
          </div>
        </header>
        
        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 bg-gray-50 w-full">
          <div className="w-full px-4">
            {/* Portfolio Section Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-center uppercase text-gray-800 mb-4">Portfolio</h2>
            {/* Icon Divider */}
            <div className="flex items-center justify-center mb-12">
              <div className="w-16 h-1 bg-gray-800"></div>
              <div className="mx-4 text-2xl text-blue-600"><i className="fas fa-star"></i></div>
              <div className="w-16 h-1 bg-gray-800"></div>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" id="projects-container">
                {isLoading ? (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">Loading projects...</p>
                  </div>
                ) : portfolioProjects.length > 0 ? (
                  portfolioProjects.map((project, index) => (
                    <div key={index} className="project-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      {project.image && (
                        <img 
                          src={project.image} 
                          alt={project.alt || project.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="project-card-content p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                        <p className="project-card-description text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                        <div className="project-card-technologies">
                          <p className="text-sm text-gray-700 font-medium">Technologies:</p>
                          <p className="text-sm text-gray-600">{project.technologies}</p>
                        </div>
                        <div className="project-card-buttons flex gap-2">
                          {project.source && (
                            <a 
                              href={project.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                              Source Code
                            </a>
                          )}
                          {project.live && (
                            <a 
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No projects found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 w-full">
          <div className="w-full px-4">
            {/* Contact Section Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-center uppercase text-gray-800 mb-4">Contact Me</h2>
            {/* Icon Divider */}
            <div className="flex items-center justify-center mb-12">
              <div className="w-16 h-1 bg-gray-800"></div>
              <div className="mx-4 text-2xl text-blue-600"><i className="fas fa-star"></i></div>
              <div className="w-16 h-1 bg-gray-800"></div>
            </div>
            {/* Contact Section Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-600 mb-1">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder="Your name" 
                    aria-label="Name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-600 mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="you@example.com" 
                    aria-label="Email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-blue-600 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Your message" 
                  aria-label="Message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-vertical" 
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              {/* Google reCAPTCHA */}
              <div className="mb-6 flex justify-center">
                <div
                  className="g-recaptcha"
                  data-sitekey="6LfKaeorAAAAADbmnSCnNxLb4INgvB9RuXFCw_W-"
                  data-callback="handleRecaptchaCallback"
                  data-expired-callback="handleRecaptchaExpiredCallback"
                  data-error-callback="handleRecaptchaErrorCallback"
                  data-size="normal"
                  ref={recaptchaRef}
                ></div>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting || !formData.recaptcha_token}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            {formFeedback && (
              <div className="w-full text-center">
                <div className={`max-w-2xl mx-auto p-4 rounded-md ${
                  formFeedback.includes('success') 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {formFeedback}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
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
      </div>
    </>
  )
}

export default App
