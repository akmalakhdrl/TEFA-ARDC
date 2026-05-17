/**
 * CORS Middleware Configuration
 * This file contains custom CORS handling for the backend API
 */

/**
 * CORS whitelist configuration
 * Add allowed origins here
 */
const corsWhitelist = [
    'http://localhost:3000',
    'http://localhost:5173', // Vite dev server
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    process.env.CORS_ORIGIN || 'http://localhost:3000'
];

/**
 * CORS options for the Express cors middleware
 * @type {Object}
 */
export const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || corsWhitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin'
    ],
    maxAge: 86400 // 24 hours
};

/**
 * Custom error handler for CORS errors
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 */
export const corsErrorHandler = (err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        res.status(403).json({
            status: 'error',
            message: 'CORS: Origin not allowed',
            origin: req.get('origin')
        });
    } else {
        next(err);
    }
};

export default corsOptions;
