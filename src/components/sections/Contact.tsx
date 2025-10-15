import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import type { FormData } from '../../types'

interface ContactProps {
  formData: FormData
  isSubmitting: boolean
  formFeedback: string
  formErrors: {
    name?: string
    email?: string
    message?: string
  }
  recaptchaRef: React.RefObject<HTMLDivElement | null>
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}

export function Contact({
  formData,
  isSubmitting,
  formFeedback,
  formErrors,
  recaptchaRef,
  handleInputChange,
  handleSubmit
}: ContactProps) {
  return (
    <section id="contact" className="py-20 w-full">
      <div className="w-full px-4">
        {/* Contact Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase text-gray-800 mb-4">Contact Me</h2>
        {/* Icon Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-16 h-1 bg-gray-800"></div>
          <div className="mx-4 text-2xl text-blue-600"><span className="fas fa-star"></span></div>
          <div className="w-16 h-1 bg-gray-800"></div>
        </div>
        {/* Contact Section Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-600">Name</Label>
              <Input 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Your name" 
                aria-label="Name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
                className={formErrors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-600">Email</Label>
              <Input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="you@example.com" 
                aria-label="Email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
                className={formErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
          </div>
          
          <div className="mb-6 space-y-2">
            <Label htmlFor="message" className="text-blue-600">Message</Label>
            <Textarea 
              id="message" 
              name="message" 
              placeholder="Your message" 
              aria-label="Message"
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              required 
              className={formErrors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {formErrors.message && (
              <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
            )}
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
          
          <Button 
            type="submit" 
            disabled={isSubmitting || !formData.recaptcha_token}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
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
  )
}
