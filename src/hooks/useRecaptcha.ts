import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    grecaptcha?: {
      reset: () => void
    }
    handleRecaptchaCallback?: (token: string) => void
    handleRecaptchaExpiredCallback?: () => void
    handleRecaptchaErrorCallback?: () => void
  }
}

export function useRecaptcha(
  setRecaptchaToken: (token: string) => void,
  clearRecaptchaToken: () => void
) {
  const recaptchaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set up global callback functions
    window.handleRecaptchaCallback = (token: string) => {
      setRecaptchaToken(token)
    }

    window.handleRecaptchaExpiredCallback = () => {
      clearRecaptchaToken()
    }

    window.handleRecaptchaErrorCallback = () => {
      clearRecaptchaToken()
    }

    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      // Cleanup global functions
      delete window.handleRecaptchaCallback
      delete window.handleRecaptchaExpiredCallback
      delete window.handleRecaptchaErrorCallback
    }
  }, [setRecaptchaToken, clearRecaptchaToken])

  const resetRecaptcha = () => {
    if (window.grecaptcha) {
      window.grecaptcha.reset()
    }
  }

  return { recaptchaRef, resetRecaptcha }
}
