# Quick Start Guide

## ⚡ Get Running in 2 Minutes

### Step 1: Open Terminal/PowerShell
Navigate to your Desktop:
```powershell
cd Desktop/elevating-nations
```

### Step 2: Start the Server

**Option A: Using PowerShell (Recommended)**
```powershell
.\START.ps1
```

**Option B: Using Command Prompt**
```cmd
START.bat
```

**Option C: Manual**
```bash
cd backend
npm start
```

### Step 3: Open in Browser
```
http://localhost:5000
```

You should see the beautiful Elevating Nations homepage!

---

## 📋 What You Get

✅ **Home Page** (`http://localhost:5000/`)
- Hero section with headline animation
- Who we are section
- Services cards
- Dark "Our Approach" band
- Partner grid
- Contact form
- Footer with links

✅ **Partnerships Page** (`http://localhost:5000/contact`)
- Partnership overview
- Councils & Charities section
- Landlords & Housing providers
- Support pathways
- Contact form
- Contact details card

✅ **Features**
- Beautiful, responsive design
- Form submissions to backend API
- Success confirmation messages
- Mobile-friendly layout
- Smooth animations and transitions

---

## 🔧 Next Steps

### View Submissions
To see all form submissions received:
1. Check the terminal/console where the server is running
2. All submissions are logged with details

### Customize the Site
- **Colors:** Edit CSS variables in `public/css/styles.css`
- **Content:** Edit `public/index.html` and `public/contact.html`
- **Images:** Replace images in `public/assets/`
- **Email:** Configure SMTP in `backend/.env` (see README.md)

### Deploy to Production
1. Copy entire `elevating-nations` folder to your web server
2. Install Node.js on the server
3. Run `npm install` in the backend folder
4. Start with a process manager (PM2, systemd, etc.)
5. Set `NODE_ENV=production` in `.env`

---

## ❓ Troubleshooting

**"Port 5000 is already in use"**
- Edit `backend/.env` and change PORT to 3001 or another number
- Or stop the other process using port 5000

**"Node.js is not installed"**
- Download from https://nodejs.org (LTS version recommended)
- Restart your terminal after installation

**"Module not found" error**
- Run `npm install` in the `backend` folder again
- Delete `node_modules` folder and reinstall if needed

**Images not showing**
- Ensure `.image-slots.state.json` exists in `public/` folder
- Check browser console (F12) for errors

---

## 📞 Support

For issues or questions:
📧 **Email:** elevatingnationscic@hotmail.com
📱 **Instagram:** @elevatingnationscic

---

**Enjoy your new website! 🎉**
