const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const path = require('path');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '../public')));

// Store submissions (in production, use a real database)
const submissions = [];

// API endpoint for enquiry form submission
app.post('/api/enquiry', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('org').trim().optional(),
  body('phone').trim().optional(),
  body('type').trim().optional()
], (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, org, phone, type, message } = req.body;

  // Create submission object
  const submission = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    name,
    email,
    org: org || 'N/A',
    phone: phone || 'N/A',
    type: type || 'General enquiry',
    message
  };

  // Store submission
  submissions.push(submission);

  // Log submission
  console.log('\n========== NEW ENQUIRY RECEIVED ==========');
  console.log(`Name: ${submission.name}`);
  console.log(`Email: ${submission.email}`);
  console.log(`Organisation: ${submission.org}`);
  console.log(`Phone: ${submission.phone}`);
  console.log(`Type: ${submission.type}`);
  console.log(`Message: ${submission.message}`);
  console.log('==========================================\n');

  // Send email and WhatsApp notifications (async, don't wait)
  sendEmailNotification(submission);
  sendWhatsAppNotification(submission);

  res.json({
    success: true,
    message: 'Thank you for your enquiry. We will be in touch shortly.',
    submissionId: submission.id
  });
});

// API endpoint to get all submissions (protected in production)
app.get('/api/submissions', (req, res) => {
  // In production, add authentication/authorization
  res.json({
    total: submissions.length,
    submissions: submissions
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Specific routes for pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/contact.html'));
});

app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/contact.html'));
});

// Serve any other .html files
app.get('*.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', req.path));
});

// Catch-all for 404
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Function to send email notification
async function sendEmailNotification(submission) {
  try {
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #B0894F; border-bottom: 2px solid #B0894F; padding-bottom: 10px;">
          New Enquiry Received
        </h2>
        <div style="background-color: #FAF5EA; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${submission.name}</p>
          <p><strong>Email:</strong> ${submission.email}</p>
          <p><strong>Organisation:</strong> ${submission.org}</p>
          <p><strong>Phone:</strong> ${submission.phone}</p>
          <p><strong>Type:</strong> ${submission.type}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: white; padding: 10px; border-left: 4px solid #B0894F;">${submission.message}</p>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">
            Received: ${new Date(submission.timestamp).toLocaleString()}
          </p>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 12px; color: #999;">
          Elevating Nations CIC<br>
          Safe homes. Real support. Fresh starts.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Enquiry from ${submission.name} - Elevating Nations`,
      html: emailHTML
    });

    console.log('✅ Email sent to:', process.env.ADMIN_EMAIL);
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
  }
}

// Function to send WhatsApp notification
async function sendWhatsAppNotification(submission) {
  try {
    const message = `
*New Enquiry - Elevating Nations CIC*

*Name:* ${submission.name}
*Email:* ${submission.email}
*Organisation:* ${submission.org}
*Phone:* ${submission.phone}
*Type:* ${submission.type}
*Message:* ${submission.message}

_Received: ${new Date(submission.timestamp).toLocaleString()}_
    `.trim();

    // Using direct WhatsApp link approach (will open WhatsApp with pre-filled message)
    // For automated sending, you would use Twilio or WhatsApp Business API

    // Method 1: Log WhatsApp link
    const whatsappNumber = process.env.WHATSAPP_PHONE;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    console.log('📱 WhatsApp Message Ready:');
    console.log(message);
    console.log('\n🔗 WhatsApp Link:', whatsappLink);

    // Method 2: If you have Twilio set up, uncomment below
    // const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    // await client.messages.create({
    //   body: message,
    //   from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
    //   to: 'whatsapp:' + process.env.WHATSAPP_RECIPIENT
    // });

  } catch (error) {
    console.error('❌ WhatsApp notification failed:', error.message);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`
    ╔════════════════════════════════════════╗
    ║  Elevating Nations Backend Server      ║
    ║  Running on: http://localhost:${PORT}   ║
    ║  Frontend: http://localhost:${PORT}    ║
    ╚════════════════════════════════════════╝
  `);
});
