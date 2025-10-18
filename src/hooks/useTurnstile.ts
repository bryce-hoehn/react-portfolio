import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: TurnstileOptions) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

interface TurnstileOptions {
  sitekey: string
  callback?: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'compact'
}

export function useTurnstile(
  setTurnstileToken: (token: string) => void,
  clearTurnstileToken: () => void
) {
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      // Cleanup widget when component unmounts
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (turnstileRef.current && window.turnstile) {
      // Render Turnstile widget
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: '1x00000000000000000000AA', // Default test key - replace with your actual site key
        callback: (token: string) => {
          setTurnstileToken(token)
        },
        'error-callback': () => {
          clearTurnstileToken()
        },
        'expired-callback': () => {
          clearTurnstileToken()
        },
        theme: 'auto',
        size: 'normal'
      })
    }
  }, [setTurnstileToken, clearTurnstileToken])

  const resetTurnstile = () => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
      clearTurnstileToken()
    }
  }

  return { turnstileRef, resetTurnstile }
}
