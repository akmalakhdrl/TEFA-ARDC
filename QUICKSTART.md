## 🚀 Quick Start Guide

This is a quick reference guide for getting the Full-Stack Website project up and running.

### ⚡ 5-Minute Setup

#### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

#### Step 2: Start Backend Server
```bash
npm start
```

**You should see:**
```
╔════════════════════════════════════╗
║   FullStack Backend API Running     ║
╠════════════════════════════════════╣
║ Server: http://localhost:5000        ║
║ Environment: DEVELOPMENT             ║
║ CORS Origin: http://localhost:3000   ║
╚════════════════════════════════════╝
```

#### Step 3: Start Frontend (in a new terminal)
```bash
cd frontend
npx http-server -p 3000
```

Or if you have Python installed:
```bash
cd frontend
python -m http.server 3000
```

#### Step 4: Open Browser
Navigate to **http://localhost:3000**

### 📁 Project Layout

```
website ardc/
├── frontend/              ← HTML, CSS, JS files
│   ├── index.html
│   ├── css/styles.css
│   ├── js/main.js
│   └── assets/
└── backend/               ← Node.js API server
    ├── package.json
    ├── .env
    └── src/
```

### ✅ Verify Everything Works

1. **Frontend loads**: Can you see the website at http://localhost:3000?
2. **API responds**: Click "Get Data from API" button - should display JSON response
3. **Contact form**: Try submitting a message - should show success message

### 🔗 Key URLs

| Resource | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |
| API | http://localhost:5000/api |
| Health Check | http://localhost:5000/api/health |

### 📝 API Endpoints

```
GET  /api/health           - Check if API is running
GET  /api/data             - Get sample data
GET  /api/users            - Get all users
GET  /api/users/:id        - Get user by ID
POST /api/contact          - Submit contact form
```

### 🛠️ Development Commands

**Backend:**
```bash
npm start              # Start server
npm run dev            # Start with auto-reload
npm install            # Install dependencies
```

**Frontend:**
```bash
npx http-server -p 3000    # Start server
python -m http.server 3000 # Alternative (Python)
```

### ❌ Troubleshooting

**Backend won't start?**
- Port 5000 might be in use. Change PORT in `backend/.env`
- Check you ran `npm install` in the backend folder

**Frontend can't reach API?**
- Make sure backend is running on port 5000
- Check browser console for CORS errors
- Verify API_BASE_URL in `frontend/js/main.js` is correct

**Can't find npx or npm?**
- Install Node.js from https://nodejs.org/

### 📚 Learn More

See the main [README.md](./README.md) for:
- Complete feature list
- API documentation
- Database integration guide
- Production deployment guide

---

**💡 Tip**: Keep two terminal windows open - one for backend, one for frontend operations.
