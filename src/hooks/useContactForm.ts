import { useState } from 'react'
import type { FormData, FormResponse } from '../types'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formFeedback, setFormFeedback] = useState('')
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    turnstile_token: ''
  })

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        if (value.trim().length > 50) return 'Name must be less than 50 characters'
        break
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address'
        break
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters'
        break
    }
    return undefined
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}
    
    errors.name = validateField('name', formData.name)
    errors.email = validateField('email', formData.email)
    errors.message = validateField('message', formData.message)
    
    setFormErrors(errors)
    return !errors.name && !errors.email && !errors.message
  }

  const setTurnstileToken = (token: string) => {
    setFormData(prev => ({
      ...prev,
      turnstile_token: token
    }))
  }

  const clearTurnstileToken = () => {
    setFormData(prev => ({
      ...prev,
      turnstile_token: ''
    }))
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '', turnstile_token: '' })
    setFormErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormFeedback('')

    // Validate form before submission
    if (!validateForm()) {
      setFormFeedback('Please fix the errors in the form before submitting.')
      setIsSubmitting(false)
      return
    }

    if (!formData.turnstile_token) {
      setFormFeedback('Please complete the verification.')
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
        resetForm()
        clearTurnstileToken() // Clear turnstile token on success
      } else {
        setFormFeedback(result.error || 'Failed to send message. Please try again.')
        clearTurnstileToken() // Clear turnstile token on error
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormFeedback('Failed to send message. Please check your connection and try again.')
      clearTurnstileToken() // Clear turnstile token on error
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    isSubmitting,
    formFeedback,
    formErrors,
    handleInputChange,
    handleSubmit,
    setTurnstileToken,
    clearTurnstileToken,
    resetForm
  }
}
