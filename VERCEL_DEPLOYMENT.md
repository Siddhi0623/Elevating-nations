# Vercel Deployment Guide

Complete guide for deploying Elevating Nations to Vercel with working form submissions.

---

## ✅ What's Fixed

The 404 error when clicking "Work with us" has been fixed by:
- ✅ Created `vercel.json` with proper routing rules
- ✅ Created serverless API function for form submissions
- ✅ Configured environment variables for email notifications
- ✅ Set up proper rewrites for HTML page routing

---

## 🚀 Step-by-Step Deployment

### Step 1: Push Updated Code to GitHub

```bash
cd Desktop/elevating-nations
git add -A
git commit -m "fix: Add Vercel deployment configuration with serverless functions"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
npm install -g vercel
cd Desktop/elevating-nations
vercel deploy
```

#### Option B: Using GitHub Integration (Recommended)

1. Go to: https://vercel.com
2. Click: "New Project"
3. Import: Your GitHub repository
4. Select: `Siddhi0623/Elevating-nations`
5. Click: "Import"
6. Set environment variables (see below)
7. Click: "Deploy"

### Step 3: Configure Environment Variables on Vercel

After deploying, go to your Vercel project dashboard:

1. **Navigate to:** Settings → Environment Variables

2. **Add only this variable:**

```
WHATSAPP_PHONE = 9422554886
```

3. **Click:** "Save"

4. **Redeploy** the project so environment variables take effect:
   - Go to: Deployments
   - Click the three dots on latest deployment
   - Select: "Redeploy"

**Note:** Email notifications are disabled for security. Only WhatsApp notifications are enabled.

---

## 🔗 Your Vercel Deployment

After deployment, your site will be available at:
```
https://your-project-name.vercel.app
```

---

## 📋 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Project redeployed
- [ ] Test home page loads: `https://your-domain.vercel.app/`
- [ ] Test contact page loads: `https://your-domain.vercel.app/contact`
- [ ] Test form submission works
- [ ] Check email arrives at xesiddhikale51@gmail.com

---

## 🧪 Testing After Deployment

### Test 1: Navigation Works

1. Go to: `https://your-domain.vercel.app/`
2. Click: "Work with us"
3. Should see: Contact page with form (NOT 404 error)

### Test 2: Form Submission

1. Go to: `https://your-domain.vercel.app/`
2. Scroll to form
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Message: Testing form

4. Click: "Submit enquiry"
5. Should see: Success message

### Test 3: Email Notification

1. Check email: xesiddhikale51@gmail.com
2. Should receive: Email with form details

---

## 🐛 Troubleshooting

### Issue: Still Getting 404 on /contact

**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Wait 2 minutes for Vercel to deploy
4. Check that vercel.json exists in project root

### Issue: Form Not Submitting

**Solution:**
1. Check browser console (F12) for errors
2. Verify environment variables are set on Vercel
3. Check that api/enquiry.js exists
4. Redeploy the project

### Issue: Email Not Arriving

**Solution:**
1. Verify `SMTP_PASSWORD` is correct
2. Check email spam folder
3. Go to Gmail: Allow less secure apps (if enabled)
4. Regenerate Gmail app password
5. Update environment variable
6. Redeploy

### Issue: WhatsApp Link Not Showing

**Solution:**
1. Vercel serverless logs don't show WhatsApp link
2. Instead, WhatsApp will be generated on backend
3. For now, manual WhatsApp message needed
4. For automated: Set up Twilio (see NOTIFICATIONS_SETUP.md)

---

## 📊 File Structure for Vercel

```
elevating-nations/
├── public/              ← Static files (HTML, CSS, JS, images)
│   ├── index.html
│   ├── contact.html
│   ├── css/
│   ├── js/
│   └── assets/
├── api/                 ← Serverless functions
│   └── enquiry.js       ← Form submission endpoint
├── backend/             ← (Not used in Vercel static deployment)
│   └── ...
├── vercel.json          ← Vercel configuration
├── package.json         ← Root package.json
└── .env.local           ← Local environment (not deployed)
```

---

## 🎯 How It Works

### Routing:
- `/` → `public/index.html` (Home page)
- `/contact` → `public/contact.html` (Partnerships page)
- Any other route → `public/index.html` (SPA fallback)

### Form Submission:
- Form POST to `/api/enquiry`
- Handled by serverless function: `api/enquiry.js`
- Sends email using Gmail SMTP
- Returns success response to frontend

### Environment Variables:
- Stored securely in Vercel dashboard
- Not exposed to public
- Accessible only to serverless functions

---

## 📈 Performance Tips

1. **Use Vercel Analytics:**
   - Settings → Analytics
   - Enable Web Analytics
   - Monitor performance

2. **Add Custom Domain:**
   - Settings → Domains
   - Add your domain
   - Configure DNS

3. **Enable Auto-Deployments:**
   - Push to main branch
   - Vercel automatically deploys
   - No manual deployment needed

---

## 🚀 Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set environment variables
3. ✅ Test all functionality
4. ✅ Share your Vercel URL
5. ✅ Monitor form submissions
6. ✅ Set up custom domain (optional)

---

## 📞 Support

### Common Vercel Links:
- Dashboard: https://vercel.com/dashboard
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support

### For This Project:
- GitHub: https://github.com/Siddhi0623/Elevating-nations
- Vercel config: `vercel.json`
- API endpoint: `api/enquiry.js`

---

**Your website is now ready for production on Vercel!** 🎉

Need help? Check the troubleshooting section above.
