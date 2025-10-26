

// Countdown Timer Functionality
function updateCountdown() {
    const bootcampDate = new Date('2025-06-10T09:00:00').getTime();
    const now = new Date().getTime();
    const distance = bootcampDate - now;

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the DOM elements
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // If the countdown is over
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Update the message
        const countdownTitle = document.querySelector('.countdown-box h3');
        if (countdownTitle) {
            countdownTitle.textContent = 'BOOTCAMP IN PROGRESS!';
        }
    }
}

// Toggle Details Panel Functionality
function toggleDetails(eventType) {
    const panel = document.getElementById(eventType + '-details');
    const button = document.querySelector(`button[onclick="toggleDetails('${eventType}')"]`);
    
    if (!panel) return;
    
    const isActive = panel.style.maxHeight !== '0px' && panel.style.maxHeight !== '';
    
    if (!isActive) {
        // Expand the panel
        panel.style.maxHeight = '4000px';
        panel.style.padding = '2rem';
        
        // Rotate the button icon
        if (button) {
            const icon = button.querySelector('svg:last-child');
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
            }
        }
        
        // Smooth scroll to the panel
        setTimeout(() => {
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        // Collapse the panel
        panel.style.maxHeight = '0px';
        panel.style.padding = '0';
        
        // Reset the button icon
        if (button) {
            const icon = button.querySelector('svg:last-child');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        }
    }
}

// Registration Form Handling
function handleRegistration(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Basic validation
    const name = formData.get('name');
    const email = formData.get('email');
    const background = formData.get('background');
    
    if (!name || !email) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // In a real application, you would send this data to a server
    console.log('Registration data:', {
        name,
        email,
        background: background || 'Not specified'
    });
    
    // Show success message
    showNotification('Thank you for registering! We will contact you with more details soon.', 'success');
    form.reset();
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm ${
        type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' :
        type === 'error' ? 'bg-red-100 text-red-800 border border-red-300' :
        'bg-blue-100 text-blue-800 border border-blue-300'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
                    type === 'success' ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"' :
                    type === 'error' ? 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"' :
                    'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                }"></path>
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation on scroll functionality
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.card-shadow, .countdown-box, .feature-icon').forEach(el => {
        observer.observe(el);
    });
}

// Add hover effects to interactive elements
function initHoverEffects() {
    // Add hover effects to cards
    document.querySelectorAll('.card-shadow').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
    });
    
    // Add click effects to buttons
    document.querySelectorAll('button, a[href="#"]').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Typing animation for the subtitle
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        // Reset animation by cloning and replacing the element
        const newElement = typingElement.cloneNode(true);
        typingElement.parentNode.replaceChild(newElement, typingElement);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timer
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Initialize other functionality
    initSmoothScrolling();
    initScrollAnimations();
    initHoverEffects();
    initTypingAnimation();
    
    // Add registration form handler if form exists
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }
    
    // Add click handler for the register button
    const registerButton = document.querySelector('a[href="#"][class*="gradient-turquoise"]');
    if (registerButton) {
        registerButton.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Registration will open soon! Please check back later.', 'info');
        });
    }
});

// Export functions for potential module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateCountdown,
        toggleDetails,
        handleRegistration,
        showNotification,
        initSmoothScrolling,
        initScrollAnimations,
        initHoverEffects,
        initTypingAnimation
    };
}