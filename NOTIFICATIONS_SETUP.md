# Email & WhatsApp Notifications Setup Guide

Your form submissions now automatically send notifications to:
- 📧 **Email:** xesiddhikale51@gmail.com
- 📱 **WhatsApp:** +91 9422554886

## ✅ What's Already Configured

### Email (Gmail)
The email configuration is already set up in `.env`:
```
SMTP_USER=xesiddhikale51@gmail.com
SMTP_PASSWORD=xzpc jmho kbkj zvei (Gmail App Password)
ADMIN_EMAIL=xesiddhikale51@gmail.com
```

### WhatsApp
WhatsApp notifications are ready. We use two methods:
1. **Automatic Alerts** - Logs formatted message with WhatsApp link
2. **Twilio API** - Optional for fully automated sending

---

## 📧 Email Setup (Already Working!)

### What Happens When Someone Submits a Form:
1. User fills out form on website
2. Clicks "Submit enquiry"
3. ✅ Email automatically sent to: **xesiddhikale51@gmail.com**
4. Email includes:
   - Name, Email, Organisation, Phone
   - Enquiry Type
   - Full Message
   - Timestamp

### Email Appearance:
```
From: xesiddhikale51@gmail.com
To: xesiddhikale51@gmail.com
Subject: New Enquiry from [Name] - Elevating Nations

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW ENQUIRY RECEIVED

Name: John Doe
Email: john@example.com
Organisation: ABC Corp
Phone: +44 1234 567890
Type: Partnership enquiry
Message: I would like to discuss...

Received: 7/6/2026 2:45 PM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Troubleshooting Email Issues:

**"Email not sending" Error?**

The Gmail app password might need to be regenerated. Here's how:

1. **Go to Google Account Settings:**
   - Visit: https://myaccount.google.com
   - Click "Security" (left sidebar)

2. **Enable 2-Factor Authentication (if not already):**
   - Scroll to "2-Step Verification"
   - Follow the steps

3. **Generate App Password:**
   - Go to "App passwords" (appears after 2FA is enabled)
   - Select: App = "Mail", Device = "Windows Computer"
   - Google generates a 16-character password

4. **Update .env file:**
   - Open: `C:\Users\xesid\Desktop\elevating-nations\backend\.env`
   - Replace the SMTP_PASSWORD with the new generated password
   - Save the file

5. **Restart the server:**
   - Stop the current server (Ctrl+C)
   - Run START.bat again

---

## 📱 WhatsApp Notifications

### Current Setup (Already Working!)

When a form is submitted, the server:
1. ✅ Generates a formatted message
2. ✅ Logs the message to server console
3. ✅ Creates a WhatsApp link: `https://wa.me/919422554886?text=...`

### How to Send WhatsApp Messages:

**Method 1: Automatic Link in Console (Easiest)**
1. When form submitted, check server console
2. You'll see the "WhatsApp Link"
3. Copy & paste into browser
4. Or click the link
5. Message opens in WhatsApp

### Server Console Output Example:
```
========== NEW ENQUIRY RECEIVED ==========
Name: John Doe
Email: john@example.com
...
==========================================

📱 WhatsApp Message Ready:
*New Enquiry - Elevating Nations CIC*

*Name:* John Doe
*Email:* john@example.com
...

🔗 WhatsApp Link: https://wa.me/919422554886?text=...
```

---

## 🚀 Advanced: Set Up Automated WhatsApp (Optional)

If you want **automatic WhatsApp messages** (without manual clicking), follow these steps:

### Option 1: Using Twilio (Recommended)

**Cost:** Free trial (~$15 credit), then ~$0.01 per message

1. **Sign Up for Twilio:**
   - Go to: https://www.twilio.com/console
   - Create free account
   - Verify your phone number

2. **Get WhatsApp Sandbox:**
   - In Twilio Dashboard: Settings > WhatsApp Sandbox
   - Get your TWILIO_WHATSAPP_NUMBER (e.g., +14155552671)
   - Add your WhatsApp number to sandbox

3. **Get API Credentials:**
   - Dashboard > Account Info
   - Copy: Account SID
   - Copy: Auth Token

4. **Update .env file:**
   ```
   TWILIO_ACCOUNT_SID=your_account_sid_here
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_WHATSAPP_NUMBER=+14155552671
   WHATSAPP_RECIPIENT=+919422554886
   ```

5. **Enable Automated Sending:**
   - Open `backend/server.js`
   - Find the `sendWhatsAppNotification` function
   - Uncomment the Twilio section:
   ```javascript
   // Uncomment these lines:
   // const client = require('twilio')(...)
   // await client.messages.create({...})
   ```

6. **Restart server**

### Option 2: Using WhatsApp Business API

For high-volume, production use. Contact WhatsApp directly:
- https://developers.facebook.com/docs/whatsapp

---

## 📊 Monitoring Form Submissions

### View All Submissions:
Open your browser and go to:
```
http://localhost:5000/api/submissions
```

You'll see a JSON response with all form submissions:
```json
{
  "total": 2,
  "submissions": [
    {
      "id": 1717761234567,
      "timestamp": "2026-06-07T14:30:45.123Z",
      "name": "John Doe",
      "email": "john@example.com",
      "org": "ABC Corp",
      "phone": "+44 1234 567890",
      "type": "Partnership enquiry",
      "message": "..."
    }
  ]
}
```

### In Server Console:
Every submission is logged in the terminal where the server runs.

---

## 🔐 Security Notes

1. **Never commit .env to Git** - It contains sensitive data
2. **Don't share your Gmail password** - Use App Passwords only
3. **Don't share Twilio credentials** - Keep them private
4. **Validate all inputs** - Server already does this
5. **Use HTTPS in production** - Add SSL certificate

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Email not sending | Check .env file SMTP_PASSWORD, restart server |
| WhatsApp link not working | Check phone number format: +919422554886 |
| 404 error on /api/submissions | Make sure server is running |
| Forms not submitting | Check browser console (F12) for errors |
| Message truncated in email | Check email client, may have character limit |

---

## 📞 Testing

### Test Form Submission:

1. **Start the server:**
   ```
   Double-click START.bat
   ```

2. **Open in browser:**
   ```
   http://localhost:5000/
   ```

3. **Fill out the form:**
   - Name: Test User
   - Email: test@example.com
   - Organisation: Test Org
   - Message: This is a test message

4. **Click "Submit enquiry"**

5. **Check:**
   - ✅ Success message appears on screen
   - ✅ Check your email (xesiddhikale51@gmail.com)
   - ✅ Check server console for WhatsApp link

---

## 📝 Customization

### Change Email Recipient:
1. Open `.env`
2. Change: `ADMIN_EMAIL=different@example.com`
3. Restart server

### Change WhatsApp Number:
1. Open `.env`
2. Change: `WHATSAPP_PHONE=9999999999`
3. Restart server

### Change Email Template:
1. Open `backend/server.js`
2. Find `sendEmailNotification` function
3. Edit the HTML template
4. Restart server

---

## ✨ Features Included

✅ Email notifications with beautiful HTML template
✅ WhatsApp link generation for manual sending
✅ Optional Twilio integration for automated WhatsApp
✅ Form validation before sending
✅ All submissions logged to console
✅ API endpoint to view all submissions
✅ Error handling and logging

---

## 🎉 You're All Set!

Your website now sends form notifications via:
- 📧 Email (automatic)
- 📱 WhatsApp (manual link or Twilio automated)

**Test it now by submitting a form!**

---

**Need help?** Check the troubleshooting section or restart the server.

© 2026 Elevating Nations CIC
