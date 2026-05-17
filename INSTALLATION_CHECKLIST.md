## ✅ Installation & Setup Checklist

Use this checklist to ensure everything is properly installed and configured.

### 📋 Pre-Installation Requirements

- [ ] Node.js 14.0.0 or higher installed
  - Verify: `node --version`
  - Download from: https://nodejs.org/
- [ ] npm 6.0.0 or higher installed
  - Verify: `npm --version`
- [ ] Modern web browser (Chrome, Firefox, Safari, or Edge)
- [ ] Text editor or IDE (VS Code recommended)

### 🔧 Backend Installation

**Location**: `website ardc/backend/`

#### Step 1: Navigate to Backend
- [ ] Open terminal/command prompt
- [ ] Navigate: `cd "path/to/website ardc/backend"`

#### Step 2: Install Dependencies
```bash
npm install
```
- [ ] Installation completes without errors
- [ ] Check: `node_modules` folder created
- [ ] Check: `package-lock.json` created

#### Step 3: Verify Installation
```bash
npm list
```
- [ ] Shows: express, cors, dotenv installed
- [ ] No error messages

#### Step 4: Configure Environment
- [ ] `.env` file exists (already created)
- [ ] `.env` contains PORT=5000
- [ ] `.env` contains CORS_ORIGIN=http://localhost:3000

#### Step 5: Test Backend
```bash
npm start
```
- [ ] Server starts without errors
- [ ] See message: "FullStack Backend API Running"
- [ ] See: "Server: http://localhost:5000"
- [ ] Terminal shows ready status

### 🌐 Frontend Setup

**Location**: `website ardc/frontend/`

No dependencies to install! Frontend works immediately.

#### Step 1: Verify Files
Navigate to `website ardc/frontend/` and check:
- [ ] `index.html` exists
- [ ] `css/` folder exists with `styles.css`
- [ ] `js/` folder exists with `main.js`
- [ ] `assets/` folder exists

#### Step 2: Choose Frontend Server

**Option A: Node.js (Recommended)**
```bash
cd frontend
npx http-server -p 3000
```
- [ ] Server starts
- [ ] See: "Hit CTRL-C to stop the server"
- [ ] Shows: "http://localhost:3000"

**Option B: Python (if installed)**
```bash
cd frontend
python -m http.server 3000
```
- [ ] Server starts
- [ ] See: "Serving HTTP on 0.0.0.0 port 3000"

**Option C: Direct File (simplest but limited)**
- [ ] Double-click `frontend/index.html`
- [ ] Opens in default browser
- ⚠️ Note: API calls may not work due to CORS

### 🧪 Testing & Verification

#### Backend Health Check
```bash
curl http://localhost:5000/api/health
```
Or use browser: `http://localhost:5000/api/health`
- [ ] Returns JSON with "status": "ok"

#### Frontend Access
- [ ] Open browser
- [ ] Navigate to `http://localhost:3000`
- [ ] Page loads without errors

#### Functionality Tests
In browser at `http://localhost:3000`:

1. **Navigation**
   - [ ] Click navbar links (Home, Features, API, Contact)
   - [ ] Page smoothly scrolls to sections

2. **API Integration**
   - [ ] Click "Get Data from API" button
   - [ ] JSON response displays successfully
   - [ ] Data shows from backend

3. **Contact Form**
   - [ ] Fill in Name, Email, Message
   - [ ] Click "Send Message"
   - [ ] See success message
   - [ ] Form clears
   - [ ] Backend logs the submission

4. **Browser Console**
   - [ ] Open DevTools (F12)
   - [ ] Check Console tab
   - [ ] No red errors
   - [ ] Should see: "✓ Backend API is running"

### 🚀 Deployment Checklist

**Before deploying to production:**

- [ ] Update `CORS_ORIGIN` in `.env` to production domain
- [ ] Update `API_BASE_URL` in `frontend/js/main.js`
- [ ] Change `NODE_ENV` to "production"
- [ ] Test all API endpoints work
- [ ] Test contact form submission
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Test on different browsers

### 📝 Configuration Checklist

#### Backend `.env` File
- [ ] PORT=5000
- [ ] NODE_ENV=development
- [ ] CORS_ORIGIN=http://localhost:3000
- [ ] Commented-out database variables for future use

#### Frontend `js/main.js`
- [ ] API_BASE_URL = 'http://localhost:5000/api'

### 🆘 Troubleshooting Checklist

**If something doesn't work:**

- [ ] Verified both servers are running
- [ ] Checked port numbers (Backend: 5000, Frontend: 3000)
- [ ] Cleared browser cache (Ctrl+Shift+Delete)
- [ ] Checked browser console for errors (F12)
- [ ] Checked backend terminal for error messages
- [ ] Verified API_BASE_URL in main.js
- [ ] Verified CORS_ORIGIN in .env
- [ ] Restarted both servers
- [ ] Checked Windows Firewall is not blocking
- [ ] Reinstalled node_modules: `rm -rf node_modules && npm install`

### ✨ Final Checks

Before considering setup complete:

- [ ] Can access frontend at http://localhost:3000
- [ ] Can access API at http://localhost:5000/api/data
- [ ] Health check returns success
- [ ] "Get Data" button works and shows data
- [ ] Contact form can be submitted
- [ ] No console errors in browser
- [ ] All navigation links work
- [ ] Page is responsive (resize browser to test)
- [ ] Backend logs are visible in terminal

### 📚 Next Steps After Setup

1. **Explore the Code**
   - [ ] Review `frontend/index.html` structure
   - [ ] Review `frontend/css/styles.css` styling
   - [ ] Review `frontend/js/main.js` functionality
   - [ ] Review `backend/src/server.js` server setup
   - [ ] Review `backend/src/routes/api.js` endpoints

2. **Customize**
   - [ ] Change colors in CSS variables
   - [ ] Update content in HTML
   - [ ] Add your own API endpoints
   - [ ] Create new frontend pages

3. **Learn & Develop**
   - [ ] Add database integration (see README.md)
   - [ ] Create more API routes
   - [ ] Add authentication
   - [ ] Deploy to hosting

---

**🎉 Setup Complete!** You now have a fully functional full-stack application ready for development.
