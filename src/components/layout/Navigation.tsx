import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Button } from '../ui/button'

interface NavigationProps {
  isScrolled: boolean
  scrollToTop: () => void
  scrollToSection: (sectionId: string) => void
}

export function Navigation({ isScrolled, scrollToTop, scrollToSection }: NavigationProps) {
  return (
    <Disclosure as="nav" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'} bg-gray-800 text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'}`}>
          {/* Brand/Logo */}
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              onClick={scrollToTop}
              className={`font-bold uppercase tracking-wider hover:text-gray-300 transition-colors duration-200 ${isScrolled ? 'text-lg' : 'text-2xl'} text-white`}
              aria-label="Back to top"
            >
              Bryce Hoehn
            </Button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button
                variant="ghost"
                onClick={() => scrollToSection('portfolio')}
                className="px-3 py-2 text-sm font-medium uppercase hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 text-white"
                aria-label="Portfolio"
              >
                Portfolio
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('contact')}
                className="px-3 py-2 text-sm font-medium uppercase hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 text-white"
                aria-label="Contact Section"
              >
                Contact
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <DisclosureButton
              className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium uppercase hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              Menu
              <span className="ml-2">☰</span>
            </DisclosureButton>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <DisclosurePanel className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <DisclosureButton
              as="button"
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium uppercase hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-label="Portfolio"
            >
              Portfolio
            </DisclosureButton>
            <DisclosureButton
              as="button"
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium uppercase hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-label="Contact Section"
            >
              Contact
            </DisclosureButton>
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
  )
}
