# Full-Stack Website Project

A modern full-stack web application with separated frontend and backend architecture, featuring vanilla HTML/CSS/JavaScript frontend and a Node.js/Express REST API backend.

## 📁 Project Structure

```
project/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── styles.css      # Main stylesheet with animations
│   ├── js/
│   │   └── main.js         # Frontend JavaScript with API integration
│   └── assets/             # Images, fonts, etc.
│
├── backend/
│   ├── src/
│   │   ├── server.js       # Express server configuration
│   │   ├── routes/
│   │   │   └── api.js      # API route handlers
│   │   └── middleware/
│   │       └── cors.js     # CORS configuration
│   ├── config/
│   │   └── database.js     # Database configuration (prepared for future)
│   ├── package.json        # Node.js dependencies
│   ├── .env.example        # Environment variables template
│   └── .env                # Environment variables (create from .env.example)
│
└── README.md               # This file
```

## 🎨 Frontend Features

- **Responsive Design**: Mobile-first approach with breakpoints for tablets and desktops
- **Modern UI**: Clean, professional interface with smooth animations
- **Vanilla JavaScript**: No frameworks, pure JS with async/await for API calls
- **Organized Structure**: Separate CSS and JS files for maintainability
- **Interactive Elements**: Contact form, API integration, smooth scrolling
- **Animations**: Fade-in, slide-up effects with CSS keyframes

### Frontend Sections

1. **Navigation**: Sticky navbar with smooth scroll links
2. **Hero Section**: Eye-catching welcome banner with CTA button
3. **Features**: Grid layout showcasing project features
4. **API Section**: Display live API responses
5. **Contact Form**: Functional form with validation
6. **Footer**: Footer with copyright information

## 🔧 Backend Features

- **Express.js**: Fast and minimalist web framework
- **REST API**: Complete CRUD endpoints for data management
- **CORS**: Properly configured for cross-origin requests
- **Environment Variables**: Secure configuration with dotenv
- **Error Handling**: Comprehensive error handling and validation
- **Request Logging**: Built-in request logging for debugging
- **Database Ready**: Pre-configured structure for database integration

### API Endpoints

#### Health Check
- `GET /api/health` - Check if backend is running

#### Data Endpoints
- `GET /api/data` - Get sample data
- `POST /api/data` - Create new data
- `PUT /api/data/:id` - Update data by ID
- `DELETE /api/data/:id` - Delete data by ID

#### User Endpoints
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

#### Contact
- `POST /api/contact` - Submit contact form

## 📋 Requirements

### For Frontend
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies

### For Backend
- **Node.js** 14.0.0 or higher
- **npm** 6.0.0 or higher

## 🚀 Installation

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env with your configuration (optional)
   # Default values are pre-configured and will work
   ```

4. **Verify installation**:
   ```bash
   npm list
   ```

### Frontend Setup

The frontend requires no installation. It runs directly in any modern web browser.

## ▶️ Running the Project

### Start Backend Server

```bash
cd backend

# Start the server
npm start

# Or with auto-reload (development mode)
npm run dev
```

**Expected output**:
```
╔════════════════════════════════════╗
║   FullStack Backend API Running     ║
╠════════════════════════════════════╣
║ Server: http://localhost:5000        ║
║ Environment: DEVELOPMENT             ║
║ CORS Origin: http://localhost:3000   ║
╚════════════════════════════════════╝
```

### Start Frontend

1. **Open the HTML file in your browser**:
   - Simply double-click `frontend/index.html`, or
   - Use a local server for better results

2. **Using Python's built-in server** (from project root):
   ```bash
   cd frontend
   python -m http.server 3000
   # Or Python 2:
   python -m SimpleHTTPServer 3000
   ```

3. **Using Node.js simple server**:
   ```bash
   cd frontend
   npx http-server -p 3000
   ```

4. **Access the application**:
   - Open `http://localhost:3000` in your browser

## 📡 API Usage Examples

### Using curl

```bash
# Get data from API
curl http://localhost:5000/api/data

# Get all users
curl http://localhost:5000/api/users

# Get specific user
curl http://localhost:5000/api/users/1

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }'
```

### Using JavaScript (from frontend)

```javascript
// The main.js file already includes functions:

// Fetch data from API
fetchDataFromAPI();

// Submit contact form
handleContactSubmit(formEvent);
```

## 🔧 Configuration

### Backend Environment Variables

Edit `backend/.env` to configure:

```env
# Server Configuration
PORT=5000                              # Port the server runs on
NODE_ENV=development                   # Environment mode

# CORS Configuration
CORS_ORIGIN=http://localhost:3000     # Frontend URL

# Database Configuration (for future use)
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=fullstack_db
# DB_USER=root
# DB_PASSWORD=password
```

### Frontend API Configuration

Edit `frontend/js/main.js` to change the API base URL:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 🗄️ Database Integration (Future)

The project is prepared for database integration. The `backend/config/database.js` file includes configurations for:

- **PostgreSQL**: Full configuration ready
- **MySQL**: Connection pool configuration
- **MongoDB**: Mongoose setup
- **SQLite**: In-file database setup

To integrate a database:

1. Install the appropriate package:
   ```bash
   # For PostgreSQL
   npm install pg
   
   # For MySQL
   npm install mysql2
   
   # For MongoDB
   npm install mongoose
   
   # For SQLite
   npm install better-sqlite3
   ```

2. Implement the connection in `src/server.js`
3. Use the connection in your route handlers

## 📦 Dependencies

### Frontend
- No external dependencies (vanilla JavaScript)

### Backend
- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Development
- **nodemon**: Auto-restart server on file changes

## 🎯 Development Workflow

1. **Make frontend changes**: Refresh browser to see changes
2. **Make backend changes**: Server auto-restarts with `npm run dev`
3. **Add new API endpoints**: Create new routes in `src/routes/api.js`
4. **Add new frontend pages**: Create new HTML files and link in navigation

## 🐛 Troubleshooting

### Backend won't start
- **Error**: `Port 5000 is already in use`
  - Solution: Change PORT in `.env` file or kill the process using port 5000

- **Error**: `Module not found`
  - Solution: Run `npm install` in backend directory

### Frontend can't reach API
- **Error**: CORS errors in console
  - Solution: Ensure CORS_ORIGIN in `.env` matches your frontend URL
  - Solution: Check that backend is running on port 5000

- **Error**: API calls failing
  - Solution: Check browser console for specific errors
  - Solution: Verify API_BASE_URL in `js/main.js` matches backend URL

### Port issues
- Backend default port: 5000
- Frontend default port: 3000 (when using http-server)
- Change ports in `.env` (backend) or command line (frontend)

## 📚 Project Scalability

### To add more pages:
1. Create new HTML files in `frontend/`
2. Update navigation links in `index.html`
3. Reuse CSS from `css/styles.css`

### To add more API endpoints:
1. Create new route files in `backend/src/routes/`
2. Import and use in `server.js`
3. Add CORS if needed (already configured)

### To add database:
1. Install database package
2. Configure connection in `config/database.js`
3. Implement connection in `server.js`
4. Use connection in route handlers

## 🔒 Security Notes

- Never commit `.env` file with real credentials
- Always use HTTPS in production
- Validate and sanitize all user inputs
- Keep dependencies updated: `npm update`
- Use environment-specific configurations

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes

## 🤝 Contributing

To improve this project:
1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check browser console for errors
4. Review server logs for backend issues

---

**Happy Coding!** 🚀

Built with ❤️ for full-stack development