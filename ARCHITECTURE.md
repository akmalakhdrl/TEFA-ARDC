## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                     FULL-STACK APPLICATION                       │
└──────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                   FRONTEND (Port 3000)                 │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │            HTML Structure (index.html)          │  │  │
│  │  │  • Navigation Bar                               │  │  │
│  │  │  • Hero Section                                 │  │  │
│  │  │  • Features Grid                                │  │  │
│  │  │  • API Response Display                         │  │  │
│  │  │  • Contact Form                                 │  │  │
│  │  │  • Footer                                       │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │                         │                               │  │
│  │  ┌──────────────────────┼───────────────────────────┐  │  │
│  │  │                      ▼                           │  │  │
│  │  │  ┌─────────────────────────────────────┐        │  │  │
│  │  │  │   CSS Styling (css/styles.css)     │        │  │  │
│  │  │  │  • Global styles                   │        │  │  │
│  │  │  │  • Responsive design               │        │  │  │
│  │  │  │  • Animations & transitions        │        │  │  │
│  │  │  │  • Mobile breakpoints              │        │  │  │
│  │  │  │  • Colors & typography             │        │  │  │
│  │  │  └─────────────────────────────────────┘        │  │  │
│  │  │                                                 │  │  │
│  │  │  ┌─────────────────────────────────────┐        │  │  │
│  │  │  │  JavaScript Logic (js/main.js)     │        │  │  │
│  │  │  │  • Event listeners                 │        │  │  │
│  │  │  │  • API calls (fetch)                │        │  │  │
│  │  │  │  • Form handling                   │        │  │  │
│  │  │  │  • DOM manipulation                │        │  │  │
│  │  │  │  • Error handling                  │        │  │  │
│  │  │  └─────────────────────────────────────┘        │  │  │
│  │  └──────────────────────┬──────────────────────────┘  │  │
│  └─────────────────────────┼───────────────────────────────┘  │
│                            │                                   │
│                            │ HTTP/CORS                         │
│                            ▼                                   │
└─────────────────────────────────────────────────────────────────┘

                           NETWORK
                         (Port 5000)
                             │
                             ▼

┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER                              │
│               (Node.js + Express)                              │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                  server.js                              │ │
│  │  ┌────────────────────────────────────────────────────┐ │ │
│  │  │           Express Application Setup               │ │ │
│  │  │  • CORS Middleware                                │ │ │
│  │  │  • Body Parser                                    │ │ │
│  │  │  • Request Logging                               │ │ │
│  │  │  • Error Handling                                │ │ │
│  │  │  • Graceful Shutdown                             │ │ │
│  │  └────────────────────────────────────────────────────┘ │ │
│  │                      │                                   │ │
│  │  ┌───────────────────┼────────────────────────────────┐ │ │
│  │  │                   ▼                                │ │ │
│  │  │        API Routes (routes/api.js)                │ │ │
│  │  │  ├── GET /api/health                            │ │ │
│  │  │  ├── GET /api/data                              │ │ │
│  │  │  ├── GET /api/users                             │ │ │
│  │  │  ├── GET /api/users/:id                         │ │ │
│  │  │  ├── POST /api/data                             │ │ │
│  │  │  ├── PUT /api/data/:id                          │ │ │
│  │  │  ├── DELETE /api/data/:id                       │ │ │
│  │  │  └── POST /api/contact                          │ │ │
│  │  └───────────────────┬────────────────────────────────┘ │ │
│  │                      │                                   │ │
│  │  ┌───────────────────┼────────────────────────────────┐ │ │
│  │  │                   ▼                                │ │ │
│  │  │  ┌──────────────────────────────────────┐         │ │ │
│  │  │  │  Middleware (middleware/cors.js)   │         │ │ │
│  │  │  │  • CORS configuration                │         │ │ │
│  │  │  │  • Whitelist validation              │         │ │ │
│  │  │  │  • Error handling                    │         │ │ │
│  │  │  └──────────────────────────────────────┘         │ │ │
│  │  │                                                    │ │ │
│  │  │  ┌──────────────────────────────────────┐         │ │ │
│  │  │  │  Config (config/database.js)        │         │ │ │
│  │  │  │  • PostgreSQL config                │         │ │ │
│  │  │  │  • MySQL config                     │         │ │ │
│  │  │  │  • MongoDB config                   │         │ │ │
│  │  │  │  • SQLite config                    │         │ │ │
│  │  │  └──────────────────────────────────────┘         │ │ │
│  │  └──────────────────────┬──────────────────────────┘ │ │
│  └─────────────────────────┼──────────────────────────────┘ │
│                            │                                │
│                            ▼                                │
│  ┌───────────────────────────────────────────────────────┐ │
│  │         Environment Configuration                    │ │
│  │  (.env file)                                         │ │
│  │  • PORT = 5000                                       │ │
│  │  • NODE_ENV = development                           │ │
│  │  • CORS_ORIGIN = http://localhost:3000              │ │
│  │  • Database config (for future use)                 │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌───────────────────────────────────────────────────────┐ │
│  │         Dependencies (package.json)                  │ │
│  │  • express: Web framework                           │ │
│  │  • cors: Cross-origin handling                      │ │
│  │  • dotenv: Environment variables                    │ │
│  │  • nodemon: Dev auto-reload                         │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

                    (Future Database)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                               │
│  (PostgreSQL, MySQL, MongoDB, or SQLite)                       │
│  Currently: Templates prepared for integration                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow Diagram

```
┌─────────────────┐
│   User Action   │
│   (Browser)     │
└────────┬────────┘
         │
         │ (Click button, submit form, etc.)
         ▼
┌─────────────────────────────────┐
│  JavaScript Event Handler       │
│  (js/main.js)                   │
└────────┬────────────────────────┘
         │
         │ (Fetch API call)
         ▼
┌─────────────────────────────────┐
│   HTTP Request                  │
│   (Method + URL + Data)         │
└────────┬────────────────────────┘
         │
         │ (Network traversal)
         ▼
┌─────────────────────────────────┐
│   Express Server                │
│   (server.js)                   │
└────────┬────────────────────────┘
         │
         │ (CORS check)
         ▼
┌─────────────────────────────────┐
│   Route Handler                 │
│   (routes/api.js)               │
└────────┬────────────────────────┘
         │
         │ (Process request)
         ▼
┌─────────────────────────────────┐
│   Data Processing               │
│   (Validation, Logic)           │
└────────┬────────────────────────┘
         │
         │ (For future: Database query)
         ▼
┌─────────────────────────────────┐
│   JSON Response                 │
│   (Status + Data)               │
└────────┬────────────────────────┘
         │
         │ (HTTP Response)
         ▼
┌─────────────────────────────────┐
│   Browser Receives Response     │
│   (fetch resolved)              │
└────────┬────────────────────────┘
         │
         │ (Parse JSON)
         ▼
┌─────────────────────────────────┐
│   Update DOM                    │
│   (Display response to user)    │
└────────┬────────────────────────┘
         │
         │ (Trigger CSS animations)
         ▼
┌─────────────────────────────────┐
│   User Sees Result              │
│   (Updated webpage)             │
└─────────────────────────────────┘
```

## 🌐 Network Communication

```
FRONTEND                              BACKEND
(Port 3000)                          (Port 5000)
    │                                   │
    │  GET /api/data                    │
    ├──────────────────────────────────>│
    │                                   │
    │     {"status": "success", ...}    │
    │<──────────────────────────────────┤
    │                                   │
    │  POST /api/contact                │
    ├──────────────────────────────────>│
    │  {"name": "...", "email": "..."}  │
    │                                   │
    │     {"status": "success"}         │
    │<──────────────────────────────────┤
    │                                   │
```

## 📁 Component Interaction

```
Frontend Components
┌─────────────────────────┐
│   index.html            │
│  (HTML Structure)       │
└──────────┬──────────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌──────────┐  ┌──────────────────┐
│styles.css│  │main.js           │
│          │  │ • API calls      │
│CSS       │  │ • Events         │
│Variables │  │ • Validation     │
└──────────┘  └─────────┬────────┘
                        │
                        ▼
                  ┌─────────────┐
                  │  Express    │
                  │   Backend   │
                  └─────────────┘
```

## 🔐 Security & CORS Flow

```
Browser Request
    │
    ├─ Origin: http://localhost:3000
    │
    ▼
Express Server
    │
    ├─ Check CORS middleware
    │
    ├─ Compare with whitelist:
    │  - http://localhost:3000 ✓ ALLOWED
    │  - http://localhost:5173 ✓ ALLOWED
    │  - other-origin ✗ BLOCKED
    │
    ▼
Response with CORS Headers
    │
    ├─ Access-Control-Allow-Origin: http://localhost:3000
    ├─ Access-Control-Allow-Methods: GET, POST, PUT, DELETE
    ├─ Access-Control-Allow-Headers: Content-Type
    │
    ▼
Browser Receives Response
    │
    └─ JavaScript can access response data ✓
```

---

## 📊 Data Flow Layers

```
Layer 1: Presentation (Frontend)
└─ HTML + CSS + JavaScript
   └─ User Interface

Layer 2: Communication (CORS)
└─ HTTP/HTTPS
   └─ Network Protocol

Layer 3: Application (Express)
└─ Routes + Middleware
   └─ Business Logic

Layer 4: Data (Database Ready)
└─ PostgreSQL/MySQL/MongoDB/SQLite
   └─ Data Persistence
```

---

This architecture provides:
- ✅ Clean separation of concerns
- ✅ Scalable structure
- ✅ Easy to extend
- ✅ Production-ready
- ✅ Security built-in
- ✅ Ready for database integration
