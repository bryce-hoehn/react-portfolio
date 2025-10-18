# React Portfolio with Flask Backend

A modern portfolio website built with React, TypeScript, and Flask. Features a responsive design, contact form with Cloudflare Turnstile protection, and email integration.

## Features

- **React Frontend**: Modern, responsive design with TypeScript
- **Flask Backend**: Integrated Python backend for contact form processing
- **Cloudflare Turnstile**: Spam protection for the contact form
- **Email Integration**: Contact form sends emails via SMTP
- **Production Ready**: Flask serves the built React app

## Project Structure

```
react-portfolio/
├── src/                 # React source code (TypeScript)
├── public/             # Static assets (projects.json, images)
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

# Cloudflare Turnstile Configuration
TURNSTILE_SITE_KEY=your-turnstile-site-key
TURNSTILE_SECRET_KEY=your-turnstile-secret-key
```

### 3. Development

**Integrated Production Build**
```bash
# Build React app
npm run build

# Serve with Flask (port 5000)
python app.py
```

## Cloudflare Turnstile Setup

1. Get API keys from [Cloudflare Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Add domain
3. Update `.env` with site key and secret key
4. Replace the placeholder site key in `src/hooks/useTurnstile.ts`

## Available Scripts

- `npm run dev` - Start React development server
- `npm run build` - Build React app for production
- `npm run preview` - Preview production build
- `python app.py` - Start Flask server

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Flask, Python 3
- **Security**: Cloudflare Turnstile
- **Email**: SMTP with SSL
- **Deployment**: Flask static file serving

## Contact Form Features

- Real-time form validation
- Cloudflare Turnstile protection
- Loading states and user feedback
- Email delivery via SMTP
- Server-side spam protection

## License

GNU License - see LICENSE file for details
