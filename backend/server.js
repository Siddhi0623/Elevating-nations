const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const path = require('path');
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

  // Log submission (in production, save to database and send email)
  console.log('New enquiry received:', submission);

  // Simulate sending email (in production, use nodemailer or email service)
  sendEmailNotification(submission);

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

// Function to send email notification
function sendEmailNotification(submission) {
  // In production, use nodemailer to send actual emails
  console.log(`
    ========== NEW ENQUIRY ==========
    Name: ${submission.name}
    Email: ${submission.email}
    Organisation: ${submission.org}
    Phone: ${submission.phone}
    Type: ${submission.type}
    Message: ${submission.message}
    Received: ${submission.timestamp}
    ================================
  `);

  // TODO: Implement actual email sending with nodemailer
  // const transporter = nodemailer.createTransport({...});
  // transporter.sendMail({to, subject, html, ...});
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
