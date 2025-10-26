// Countdown Timer Functionality
function updateCountdown() {
    const hackathonDate = new Date('2025-04-15T09:00:00').getTime();
    const now = new Date().getTime();
    const distance = hackathonDate - now;

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
            countdownTitle.textContent = 'HACKATHON IN PROGRESS!';
        }
    }
}

// Toggle Details Panel Functionality
function toggleDetails(eventType) {
    const panel = document.getElementById(eventType + '-details');
    const button = document.querySelector(`button[onclick="toggleDetails('${eventType}')"]`);
    
    if (!panel) return;
    
    const isActive = panel.classList.contains('active');
    
    // Close all other detail panels
    document.querySelectorAll('.detail-panel.active').forEach(activePanel => {
        if (activePanel !== panel) {
            activePanel.classList.remove('active');
            // Reset button icons for other panels
            const otherButton = document.querySelector(`button[onclick="toggleDetails('${activePanel.id.replace('-details', '')}')"]`);
            if (otherButton) {
                const icon = otherButton.querySelector('svg:last-child');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        }
    });
    
    if (!isActive) {
        panel.classList.add('active');
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
        panel.classList.remove('active');
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
    const team = formData.get('team');
    
    if (!name || !email) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // In a real application, you would send this data to a server
    console.log('Registration data:', {
        name,
        email,
        team: team || 'Individual'
    });
    
    // Show success message
    alert('Thank you for registering! We will contact you with more details soon.');
    form.reset();
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

// Mobile menu functionality (if needed in the future)
function initMobileMenu() {
    // This can be expanded if a mobile menu is added
    console.log('Mobile menu initialization placeholder');
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timer
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Initialize other functionality
    initSmoothScrolling();
    initMobileMenu();
    initScrollAnimations();
    
    // Add registration form handler if form exists
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }
    
    // Add hover effects to cards
    document.querySelectorAll('.card-shadow').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
    });
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateCountdown,
        toggleDetails,
        handleRegistration,
        initSmoothScrolling,
        initMobileMenu,
        initScrollAnimations
    };
}