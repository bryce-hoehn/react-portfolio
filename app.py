from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import smtplib
import time
import requests
from email.message import EmailMessage
from dotenv import load_dotenv
import os

app = Flask(__name__, static_folder='dist', template_folder='dist')
CORS(app)  # Enable CORS for all routes

load_dotenv()

EMAIL_ADDRESS = os.environ.get("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")

# Serve React app for all routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

def verify_recaptcha(token):
    """Verify Google reCAPTCHA token"""
    secret_key = os.environ.get("RECAPTCHA_SECRET_KEY")
    if not secret_key:
        return False, "reCAPTCHA secret key not configured"
    
    data = {
        'secret': secret_key,
        'response': token
    }
    
    try:
        response = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data=data,
            timeout=10
        )
        result = response.json()
        return result.get('success', False), result.get('error-codes', [])
    except requests.RequestException as e:
        return False, [f"Request error: {str(e)}"]

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name', '')
    email = data.get('email', '')
    message = data.get('message', '')
    recaptcha_token = data.get('recaptcha_token', '')

    if not message.strip():
        return jsonify(error="Message cannot be empty."), 400

    # Verify reCAPTCHA
    if not recaptcha_token:
        return jsonify(error="Please complete the reCAPTCHA verification."), 400

    recaptcha_valid, recaptcha_errors = verify_recaptcha(recaptcha_token)
    if not recaptcha_valid:
        print(f"reCAPTCHA verification failed: {recaptcha_errors}")
        return jsonify(error="reCAPTCHA verification failed. Please try again."), 400

    msg = EmailMessage()
    msg['Subject'] = f"Portfolio Contact from {name}"
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = EMAIL_ADDRESS
    msg.set_content(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")

    try:
        with smtplib.SMTP_SSL('smtp.mailbox.org', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return jsonify(success="Message sent successfully!")
    except Exception as e:
        print(e)
        return jsonify(error="Failed to send message. Try again later."), 500
        
if __name__ == '__main__':
    app.run(debug=True)
