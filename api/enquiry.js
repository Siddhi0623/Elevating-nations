// Serverless function for handling form enquiries
// Deploy on Vercel with this endpoint: /api/enquiry

const nodemailer = require('nodemailer');

// Store submissions (in production, use a database)
const submissions = [];

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Validate email format
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Send email notification
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
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    return false;
  }
}

// Generate WhatsApp message
function generateWhatsAppMessage(submission) {
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

  const whatsappNumber = process.env.WHATSAPP_PHONE || '9422554886';
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return { message, whatsappLink };
}

// Main handler
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, org, phone, type, message } = req.body;

    // Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Valid email is required' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Create submission object
    const submission = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      org: (org || 'N/A').trim(),
      phone: (phone || 'N/A').trim(),
      type: (type || 'General enquiry').trim(),
      message: message.trim()
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

    // Send email notification (async, don't wait)
    sendEmailNotification(submission).catch(err => {
      console.error('Email error:', err);
    });

    // Generate WhatsApp link
    const { message: whatsappMsg, whatsappLink } = generateWhatsAppMessage(submission);
    console.log('📱 WhatsApp Message Ready:');
    console.log(whatsappMsg);
    console.log('\n🔗 WhatsApp Link:', whatsappLink);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your enquiry. We will be in touch shortly.',
      submissionId: submission.id
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
    });
  }
};
