# Bryce Hoehn - React Portfolio with Flask Backend

A modern portfolio website built with React, TypeScript, and Flask. Features a responsive design, contact form with Google reCAPTCHA protection, and email integration.

## Features

- **React Frontend**: Modern, responsive design with TypeScript
- **Flask Backend**: Integrated Python backend for contact form processing
- **Google reCAPTCHA**: Spam protection for the contact form
- **Email Integration**: Contact form sends emails via SMTP
- **Production Ready**: Flask serves the built React app

## Project Structure

```
react-portfolio/
├── src/                 # React source code (TypeScript)
├── public/             # Static assets (projects.json, resume.pdf)
├── dist/               # Built React app (generated)
├── app.py              # Flask backend server
├── requirements.txt    # Python dependencies
├── package.json       # Node.js dependencies
└── .env.example       # Environment variables template
```

## Quick Start

### 1. Install Dependencies

**Node.js (Frontend):**
```bash
npm install
```

**Python (Backend):**
```bash
pip install -r requirements.txt
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
# Email Configuration
EMAIL_ADDRESS=your-email@example.com
EMAIL_PASSWORD=your-email-password

# Google reCAPTCHA Configuration
RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```

### 3. Development

**Integrated Production Build**
```bash
# Build React app
npm run build

# Serve with Flask (port 5000)
python app.py
```

## Google reCAPTCHA Setup

1. Get API keys from [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Choose "reCAPTCHA v2" → "I'm not a robot" Checkbox
3. Add domains: `localhost` (development) and your production domain
4. Update `.env` with your site key and secret key
5. Replace the placeholder site key in `src/App.tsx`

## Available Scripts

- `npm run dev` - Start React development server
- `npm run build` - Build React app for production
- `npm run preview` - Preview production build
- `python app.py` - Start Flask server

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Flask, Python 3
- **Security**: Google reCAPTCHA v2
- **Email**: SMTP with SSL
- **Deployment**: Flask static file serving

## Contact Form Features

- Real-time form validation
- Google reCAPTCHA protection
- Loading states and user feedback
- Email delivery via SMTP
- Server-side spam protection

## License

GNU License - see LICENSE file for details
