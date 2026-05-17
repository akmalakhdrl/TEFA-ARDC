import express from 'express';

const router = express.Router();

// ===========================
// Sample Data
// ===========================

const sampleData = {
    id: 1,
    title: 'Welcome to FullStack API',
    message: 'This is sample data from the backend API',
    timestamp: new Date().toISOString(),
    features: [
        'Responsive Frontend',
        'Modern UI Design',
        'REST API Backend',
        'Easy Configuration',
        'Database Ready'
    ]
};

// ===========================
// Routes
// ===========================

/**
 * GET /api/data
 * Return sample data
 */
router.get('/data', (req, res) => {
    try {
        res.json({
            status: 'success',
            data: sampleData
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

/**
 * GET /api/users
 * Return list of sample users (for future implementation)
 */
router.get('/users', (req, res) => {
    try {
        const users = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
        ];

        res.json({
            status: 'success',
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

/**
 * GET /api/users/:id
 * Return a specific user by ID
 */
router.get('/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        
        // Sample user data
        const users = {
            1: { id: 1, name: 'John Doe', email: 'john@example.com' },
            2: { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            3: { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
        };

        const user = users[userId];

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

/**
 * POST /api/contact
 * Handle contact form submissions
 */
router.post('/contact', (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                status: 'error',
                message: 'Name, email, and message are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid email format'
            });
        }

        // Here you would typically save to a database
        // For now, we'll just acknowledge receipt
        console.log(`📧 Contact form submission: ${name} (${email})`);

        res.json({
            status: 'success',
            message: 'Contact form received successfully',
            data: {
                name,
                email,
                messageLength: message.length,
                receivedAt: new Date().toISOString()
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

/**
 * POST /api/data
 * Create new data (template for future implementation)
 */
router.post('/data', (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                status: 'error',
                message: 'Title and content are required'
            });
        }

        const newData = {
            id: Math.floor(Math.random() * 1000),
            title,
            content,
            createdAt: new Date().toISOString()
        };

        res.status(201).json({
            status: 'success',
            message: 'Data created successfully',
            data: newData
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

/**
 * PUT /api/data/:id
 * Update data (template for future implementation)
 */
router.put('/data/:id', (req, res) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                status: 'error',
                message: 'Title and content are required'
            });
        }

        const updatedData = {
            id: parseInt(id),
            title,
            content,
            updatedAt: new Date().toISOString()
        };

        res.json({
            status: 'success',
            message: 'Data updated successfully',
            data: updatedData
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

/**
 * DELETE /api/data/:id
 * Delete data (template for future implementation)
 */
router.delete('/data/:id', (req, res) => {
    try {
        const id = req.params.id;

        res.json({
            status: 'success',
            message: `Data with id ${id} deleted successfully`,
            id: parseInt(id)
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

export default router;
