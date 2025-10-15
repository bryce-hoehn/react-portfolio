export interface Project {
  title: string
  description: string
  technologies: string
  source?: string
  live?: string
  image?: string
  alt?: string
}

export interface FormData {
  name: string
  email: string
  message: string
  recaptcha_token: string
}

export interface FormResponse {
  success?: string
  error?: string
}
