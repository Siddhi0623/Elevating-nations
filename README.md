# Elevating Nations CIC — Website

A beautiful, responsive website for Elevating Nations Community Interest Company. This project includes a production-ready frontend and backend built with Express.js.

## 📋 Project Structure

```
elevating-nations/
├── backend/              # Node.js/Express server
│   ├── server.js        # Main server file
│   ├── package.json     # Dependencies
│   └── .env             # Environment variables
├── public/              # Static frontend files
│   ├── index.html       # Home page
│   ├── contact.html     # Partnerships/Contact page
│   ├── css/
│   │   └── styles.css   # All page styles
│   ├── js/
│   │   ├── app.js       # Main app logic & form handling
│   │   └── image-slot.js # Image placeholder component
│   ├── assets/          # Logo and image files
│   └── .image-slots.state.json  # Image state storage
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd Desktop/elevating-nations
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Start the server:**
   ```bash
   npm --prefix backend start
   ```

   Or for development with auto-reload:
   ```bash
   npm --prefix backend run dev
   ```

4. **Open in your browser:**
   ```
   http://localhost:5000
   ```

## 🌐 Features

### Frontend
- **Responsive Design** — Mobile-first, works on all devices
- **Beautiful UI** — Warm editorial minimalism with soft-luxury aesthetics
- **Image Gallery** — Interactive image slots that persist state
- **Smooth Animations** — CSS-based reveal animations on scroll
- **Two Pages:**
  - **Home** (`/`) — Hero, services, testimonials, partnership grid, enquiry form
  - **Partnerships** (`/contact`) — Detailed partnership info, contact form

### Backend
- **Express.js Server** — Fast, lightweight, production-ready
- **Form API** — `/api/enquiry` endpoint for form submissions
- **CORS Enabled** — Safe cross-origin requests
- **Input Validation** — Email and required field validation
- **Error Handling** — Comprehensive error responses

### Forms
Both pages include an enquiry form that:
- Validates required fields (name, email, message)
- Submits to the backend API
- Shows success message on completion
- Supports multiple enquiry types

## 📝 API Endpoints

### POST `/api/enquiry`
Submit an enquiry from the contact form.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "org": "ABC Organization",
  "phone": "+1234567890",
  "type": "Partnership enquiry",
  "message": "I'd like to discuss partnership opportunities."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your enquiry. We will be in touch shortly.",
  "submissionId": 1617234567890
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## 🎨 Design Features

- **Color Scheme:** Warm neutrals with golden accent
- **Typography:** Newsreader (serif) + Hanken Grotesk (sans-serif)
- **Animations:** Smooth reveal animations, hover effects
- **Responsive:** Works perfectly on mobile, tablet, desktop
- **Accessibility:** Semantic HTML, proper ARIA labels

## 📊 Form Submissions

Currently, form submissions are logged to the console. In production, you should:

1. **Add Email Service** (optional)
   - Configure SMTP in `.env`
   - Update `sendEmailNotification()` in `server.js`
   - Use nodemailer to send actual emails

2. **Add Database** (optional)
   - Connect MongoDB, PostgreSQL, or another database
   - Replace in-memory storage with database queries
   - Track submissions long-term

3. **Add Admin Dashboard** (future)
   - View all submissions
   - Respond to enquiries
   - Export data

## 🔧 Configuration

Edit `backend/.env` to configure:
- `PORT` — Server port (default: 5000)
- `NODE_ENV` — Environment mode (development/production)
- Email settings (future)

## 📦 Dependencies

### Backend
- `express` — Web framework
- `cors` — Cross-origin resource sharing
- `body-parser` — Parse request bodies
- `express-validator` — Input validation
- `dotenv` — Environment variables

### Frontend
- Google Fonts (Newsreader, Hanken Grotesk)
- Custom `image-slot.js` component
- Vanilla JavaScript (no jQuery)

## 🚢 Deployment

### Heroku
```bash
heroku create elevating-nations
git push heroku main
```

### Docker
A `Dockerfile` can be added for containerization.

### Manual Server
1. SSH into your server
2. Clone the repository
3. Install Node.js
4. Run `npm --prefix backend install`
5. Start with a process manager (PM2, systemd)

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Change PORT in backend/.env
PORT=3001 npm --prefix backend start
```

**Images not loading?**
- Ensure `.image-slots.state.json` is in the `public/` folder
- Check browser console for errors
- Images are stored as base64 in the JSON

**Form not submitting?**
- Check browser console for errors
- Ensure backend is running: `http://localhost:5000/api/health`
- Verify CORS settings in `server.js`

## 📧 Contact

Email: elevatingnationscic@hotmail.com  
Instagram: [@elevatingnationscic](https://instagram.com/elevatingnationscic)

## 📄 License

© 2026 Elevating Nations CIC. All rights reserved.

---

**Built with ❤️ for Elevating Nations CIC**
