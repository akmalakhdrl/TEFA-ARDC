// ===========================
// API Configuration
// ===========================

const API_BASE_URL = 'http://localhost:5000/api';

// ===========================
// DOM Elements
// ===========================

const getDataBtn = document.getElementById('getDataBtn');
const apiResponse = document.getElementById('apiResponse');
const contactForm = document.getElementById('contactForm');

// ===========================
// Event Listeners
// ===========================

// Get data from API
getDataBtn.addEventListener('click', fetchDataFromAPI);

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===========================
// API Functions
// ===========================

/**
 * Fetch data from the backend API
 */
async function fetchDataFromAPI() {
    showLoading();

    try {
        const response = await fetch(`${API_BASE_URL}/data`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayAPIResponse(data);
    } catch (error) {
        displayError(`Failed to fetch data: ${error.message}`);
        console.error('API Error:', error);
    }
}

/**
 * Display API response in the UI
 * @param {Object} data - The data from the API
 */
function displayAPIResponse(data) {
    const formattedData = JSON.stringify(data, null, 2);
    apiResponse.innerHTML = `
        <p class="success">✓ Data received successfully</p>
        <pre>${formattedData}</pre>
    `;
}

/**
 * Display error message
 * @param {string} message - The error message
 */
function displayError(message) {
    apiResponse.innerHTML = `
        <p class="error">✗ ${message}</p>
    `;
}

/**
 * Show loading state
 */
function showLoading() {
    apiResponse.innerHTML = `
        <p class="loading">Loading data...</p>
    `;
}

// ===========================
// Form Functions
// ===========================

/**
 * Handle contact form submission
 * @param {Event} e - The form submit event
 */
async function handleContactSubmit(e) {
    e.preventDefault();

    const formData = {
        name: e.target[0].value,
        email: e.target[1].value,
        message: e.target[2].value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Show success message
        showFormSuccess('Message sent successfully!');
        
        // Reset form
        contactForm.reset();
        
        // Clear message after 3 seconds
        setTimeout(() => {
            clearFormMessage();
        }, 3000);

    } catch (error) {
        showFormError(`Failed to send message: ${error.message}`);
        console.error('Form Error:', error);
    }
}

/**
 * Show form success message
 * @param {string} message - The success message
 */
function showFormSuccess(message) {
    const successElement = document.createElement('div');
    successElement.className = 'form-message success-message';
    successElement.textContent = message;
    contactForm.insertAdjacentElement('beforebegin', successElement);
}

/**
 * Show form error message
 * @param {string} message - The error message
 */
function showFormError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'form-message error-message';
    errorElement.textContent = message;
    contactForm.insertAdjacentElement('beforebegin', errorElement);
}

/**
 * Clear form messages
 */
function clearFormMessage() {
    const messages = document.querySelectorAll('.form-message');
    messages.forEach(msg => msg.remove());
}

// ===========================
// Utility Functions
// ===========================

/**
 * Check API connectivity
 */
async function checkAPIConnectivity() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            console.log('✓ Backend API is running');
        }
    } catch (error) {
        console.warn('⚠ Backend API is not running. Make sure to start the backend server.');
    }
}

// Check API connectivity on page load
document.addEventListener('DOMContentLoaded', checkAPIConnectivity);

// Add some interactive animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .contact-form').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});
