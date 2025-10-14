# Google reCAPTCHA Setup Guide

## 1. Get Your reCAPTCHA API Keys

1. Go to the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click the "+" button to create a new site
3. Fill in the form:
   - **Label**: "Bryce Hoehn Portfolio"
   - **reCAPTCHA type**: Select "reCAPTCHA v2" → "I'm not a robot" Checkbox
   - **Domains**: Add your domain(s):
     - `localhost` (for development)
     - `yourdomain.com` (for production)
4. Accept the reCAPTCHA Terms of Service
5. Click "Submit"
6. Copy your **Site Key** and **Secret Key**

## 2. Configure Environment Variables

Update your `.env` file with the reCAPTCHA keys:

```
# Email Configuration
EMAIL_ADDRESS=your-email@example.com
EMAIL_PASSWORD=your-email-password

# Google reCAPTCHA Configuration
RECAPTCHA_SITE_KEY=your-actual-site-key-here
RECAPTCHA_SECRET_KEY=your-actual-secret-key-here
```

## 3. Update React App with Your Site Key

In `src/App.tsx`, replace the placeholder site key:

```tsx
<div
  className="g-recaptcha"
  data-sitekey="your-actual-site-key-here"
  data-callback={handleRecaptchaChange}
  data-size="normal"
  ref={recaptchaRef}
></div>
```

## 4. Install Required Python Dependencies

Make sure `requests` is in your requirements:

```bash
pip install -r requirements.txt
```

## 5. Test the Integration

1. Build the React app: `npm run build`
2. Run the Flask server: `python app.py`
3. Visit `http://localhost:5000`
4. Go to the contact form and test the reCAPTCHA

## Features Implemented

- ✅ Google reCAPTCHA v2 (checkbox)
- ✅ Server-side token verification
- ✅ Form validation with reCAPTCHA
- ✅ Error handling for reCAPTCHA failures
- ✅ reCAPTCHA reset on form submission/errors
- ✅ TypeScript support for React components

## Security Benefits

- **Server-side validation**: All reCAPTCHA tokens are verified on the server
- **No client-side bypass**: Tokens are validated with Google's API
- **Rate limiting**: Google provides built-in spam protection
- **Accessibility**: reCAPTCHA includes accessibility features

## Troubleshooting

### Common Issues:

1. **reCAPTCHA not showing**: Check your site key and domain configuration
2. **Verification failing**: Ensure your secret key is correct
3. **Network errors**: Check if your server can reach Google's API
4. **Token expired**: reCAPTCHA tokens expire after 2 minutes

### Development Notes:

- Use `localhost` in your reCAPTCHA domain settings for development
- The reCAPTCHA widget will only work on configured domains
- Test with different IP addresses to ensure proper functionality
