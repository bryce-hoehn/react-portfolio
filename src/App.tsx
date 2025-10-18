import { Navigation } from './components/layout/Navigation'
import { Masthead } from './components/sections/Masthead'
import { Portfolio } from './components/sections/Portfolio'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'
import { usePortfolio } from './hooks/usePortfolio'
import { useScroll } from './hooks/useScroll'
import { useContactForm } from './hooks/useContactForm'
import { useTurnstile } from './hooks/useTurnstile'

function App() {
  // Custom hooks for business logic
  const { portfolioProjects, isLoading } = usePortfolio()
  const { showScrollTop, isScrolled, scrollToTop, scrollToSection } = useScroll()
  const {
    formData,
    isSubmitting,
    formFeedback,
    formErrors,
    handleInputChange,
    handleSubmit,
    setTurnstileToken,
    clearTurnstileToken
  } = useContactForm()
  const { turnstileRef, resetTurnstile } = useTurnstile(setTurnstileToken, clearTurnstileToken)


  return (
    <>
      <Navigation 
        isScrolled={isScrolled}
        scrollToTop={scrollToTop}
        scrollToSection={scrollToSection}
      />

      {/* Main content with padding to account for fixed navbar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'pt-16' : 'pt-24'}`}>
        <Masthead />
        
        <Portfolio 
          isLoading={isLoading}
          portfolioProjects={portfolioProjects}
        />

        <Contact
          formData={formData}
          isSubmitting={isSubmitting}
          formFeedback={formFeedback}
          formErrors={formErrors}
          turnstileRef={turnstileRef}
          handleInputChange={handleInputChange}
          handleSubmit={(e) => handleSubmit(e, resetTurnstile)}
        />

        <Footer 
          scrollToTop={scrollToTop}
          showScrollTop={showScrollTop}
        />
      </div>
    </>
  )
}

export default App
