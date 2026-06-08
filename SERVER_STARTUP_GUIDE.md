# Server Startup Guide

## ✅ Server is Running!

Your backend server is **currently active** on:
```
http://localhost:5000
```

---

## 🚀 How to Start the Server

### Method 1: Windows Batch File (EASIEST)

1. **Open**: `C:\Users\xesid\Desktop\elevating-nations\`
2. **Double-click**: `START.bat`
3. **A terminal window will open**
4. **Wait for message**: "Server running on http://localhost:5000"
5. **Done!** Server is ready

**To stop:** Close the terminal window or press Ctrl+C

---

### Method 2: PowerShell

1. **Press**: Windows key + type "PowerShell"
2. **Run command**:
   ```powershell
   cd Desktop\elevating-nations\backend
   npm start
   ```

3. **Wait for message**: "Server running on http://localhost:5000"

**To stop:** Press Ctrl+C

---

### Method 3: Command Prompt

1. **Press**: Windows key + type "cmd"
2. **Run commands**:
   ```cmd
   cd Desktop\elevating-nations\backend
   npm start
   ```

3. **Wait for message**: "Server running on http://localhost:5000"

**To stop:** Press Ctrl+C

---

## ✅ How to Know Server is Running

### Visual Sign:
You should see a message like:
```
╔════════════════════════════════════════╗
║  Elevating Nations Backend Server      ║
║  Running on: http://localhost:5000   ║
║  Frontend: http://localhost:5000    ║
╚════════════════════════════════════════╝
```

### Test in Browser:
Open: `http://localhost:5000/api/health`

If you see: `{"status":"OK","message":"Server is running"}`

Then ✅ **Server is working!**

---

## 🐛 Troubleshooting Server Won't Start

### Error: "Port 5000 already in use"

**Solution:**
1. Open PowerShell
2. Run:
   ```powershell
   netstat -ano | findstr :5000
   ```
3. Note the PID number
4. Run:
   ```powershell
   taskkill /PID [PID_NUMBER] /F
   ```
5. Try starting server again

**Or:** Change port in `.env` file:
```
PORT=3001
```

---

### Error: "Cannot find module 'express'"

**Solution:**
1. Open PowerShell in backend folder
2. Run:
   ```powershell
   npm install
   ```
3. Wait for it to finish
4. Run: `npm start`

---

### Error: "node: command not found"

**Solution:**
Node.js is not installed or not in PATH

1. Download Node.js: https://nodejs.org (LTS version)
2. Install it
3. Restart your computer
4. Try: `npm start` again

---

### Server starts but immediately stops

Check the error message in terminal:
- Look for red text
- Note the error
- Check below for your specific error

---

## 📊 What Happens When Server Starts

```
1. Node.js loads the Express framework
2. Reads configuration from .env file
3. Connects to email service (Gmail)
4. Starts listening on port 5000
5. Displays: "Server running on http://localhost:5000"
6. Ready to receive form submissions!
```

---

## 📝 Server Console Output Meanings

### When Form Submitted:

```
========== NEW ENQUIRY RECEIVED ==========
Name: [form name]
Email: [form email]
Organisation: [form org]
Phone: [form phone]
Type: [form type]
Message: [form message]
==========================================
```
→ ✅ **Form submission received**

```
✅ Email sent to: xesiddhikale51@gmail.com
```
→ ✅ **Email sent successfully**

```
❌ Email sending failed: ...
```
→ ⚠️ **Email failed** (but form still submitted)
→ Probably Gmail password needs update

```
📱 WhatsApp Message Ready:
🔗 WhatsApp Link: https://wa.me/...
```
→ ✅ **WhatsApp link generated**
→ Copy link to send WhatsApp message

---

## ⚙️ Configuration

The server reads settings from `.env` file:

```
PORT=5000                                    ← Port to run on
NODE_ENV=development                         ← Mode
SMTP_USER=xesiddhikale51@gmail.com         ← Email to send from
SMTP_PASSWORD=xzpc jmho kbkj zvei          ← Email password
WHATSAPP_PHONE=9422554886                   ← WhatsApp number
```

**To change settings:**
1. Open: `backend\.env`
2. Edit values
3. Save file
4. Restart server

---

## 📊 Server Health Check

To verify server is running without going to browser:

**PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/health" | Select-Object -ExpandProperty Content
```

**Should return:**
```
{"status":"OK","message":"Server is running"}
```

---

## 🎯 Next Steps

1. **Start server** (using one of the 3 methods above)
2. **Open browser**: http://localhost:5000/
3. **Test form submission**
4. **Check email**: xesiddhikale51@gmail.com
5. **Check server console**: For WhatsApp link

---

## 🚀 Quick Command Reference

| Task | Command |
|------|---------|
| Start server | `npm start` (in backend folder) |
| Stop server | Ctrl+C (in terminal) |
| Install packages | `npm install` (in backend folder) |
| Check Node version | `node --version` |
| Check npm version | `npm --version` |
| Test if running | Visit: `http://localhost:5000/api/health` |

---

## 💡 Tips

- **Keep terminal open** while server is running
- **Don't close the terminal** unless you want to stop the server
- **If you minimize it**, server still runs in background
- **Easy restart** - just close terminal and double-click START.bat again

---

## 🎉 Success Signs

✅ Terminal shows "Server running on http://localhost:5000"
✅ http://localhost:5000 loads in browser
✅ Form submissions show in server console
✅ Emails arrive in inbox
✅ WhatsApp links appear in console

---

**Your server is ready to go!** 🚀
