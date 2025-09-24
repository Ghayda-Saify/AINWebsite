// contact.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Initialize subtle background animation
    initBackgroundAnimation();
    
    // Initialize the map
    initMap();
    
    // Form validation and submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        clearErrors();
        
        // Validate form
        if (validateForm()) {
            // Simulate form submission
            simulateSubmission();
        }
    });
    
    // Real-time validation
    document.getElementById('name').addEventListener('blur', validateName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('message').addEventListener('blur', validateMessage);
    
    // Input animations
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            animateInputIcon(this);
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
            resetInputIcon(this);
        });
        
        // Check if input has value on page load (for browser autofill)
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
        
        // Add subtle input animation on keypress
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.boxShadow = '0 0 5px rgba(52, 152, 219, 0.2)';
                setTimeout(() => {
                    this.style.boxShadow = '';
                }, 300);
            }
        });
    });
    
    // Function to initialize the map
    function initMap() {
        // Check if map container exists
        if (!document.getElementById('map')) return;

        // Set coordinates for An-Najah National University, Nablus (from the provided Google Maps link)
        const najahCoords = [32.2211004, 35.2455457];
        
        // Initialize the map with higher zoom level (17.75 as in the Google Maps link)
        const map = L.map('map').setView(najahCoords, 17);
        
        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
        }).addTo(map);
        
        // Create a custom icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<i class="fas fa-map-marker-alt"></i>',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        });
        
        // Add marker with popup
        const marker = L.marker(najahCoords, {icon: customIcon}).addTo(map);
        marker.bindPopup(`
            <div style="text-align: center;">
                <h3 style="margin: 0 0 10px 0; color: #2c3e50;">Arab Innovation Network</h3>
                <p style="margin: 0; color: #7f8c8d;">Old An-Najah University Street</p>
                <p style="margin: 5px 0 0 0; color: #7f8c8d; font-size: 0.9em;">Nablus, Palestine</p>
            </div>
        `).openPopup();
        
        // Add click event to directions button - updated with correct coordinates
        document.querySelector('.directions-btn').addEventListener('click', function() {
            const url = `https://maps.app.goo.gl/KQuyJWgHu4W3CzTJ7`;
            window.open(url, '_blank');
        });
        
        // Add smooth zoom animation when map is in view
        const mapSection = document.querySelector('.map-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        map.invalidateSize();
                        // Use the correct coordinates for smooth animation
                        map.setView(najahCoords, 17, {
                            animate: true,
                            duration: 1.5
                        });
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(mapSection);
    }
    
    // Function to initialize background animation
    function initBackgroundAnimation() {
        const shapes = document.querySelectorAll('.bg-shape');
        shapes.forEach(shape => {
            // Randomize initial position and animation
            const randomX = Math.random() * 20;
            const randomY = Math.random() * 20;
            shape.style.left = `${randomX}%`;
            shape.style.top = `${randomY}%`;
            
            // Randomize animation duration
            const duration = Math.random() * 10 + 15;
            shape.style.animationDuration = `${duration}s`;
        });
    }
    
    // Function to animate input icon
    function animateInputIcon(input) {
        const icon = input.previousElementSibling;
        if (icon && icon.tagName === 'I') {
            icon.style.transform = 'translateY(-50%) scale(1.1)';
            icon.style.color = '#3498db';
        }
    }
    
    // Function to reset input icon
    function resetInputIcon(input) {
        const icon = input.previousElementSibling;
        if (icon && icon.tagName === 'I') {
            icon.style.transform = 'translateY(-50%) scale(1)';
            icon.style.color = '#7f8c8d';
        }
    }
    
    // Function to validate the entire form
    function validateForm() {
        let isValid = true;
        
        if (!validateName()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateMessage()) isValid = false;
        
        return isValid;
    }
    
    // Function to validate name
    function validateName() {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        const nameValue = nameInput.value.trim();
        
        if (nameValue === '') {
            showError(nameError, 'Name is required');
            shakeElement(nameInput);
            return false;
        } else if (nameValue.length < 2) {
            showError(nameError, 'Name must be at least 2 characters long');
            shakeElement(nameInput);
            return false;
        } else {
            clearError(nameError);
            highlightElement(nameInput);
            return true;
        }
    }
    
    // Function to validate email
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(emailError, 'Email is required');
            shakeElement(emailInput);
            return false;
        } else if (!emailRegex.test(emailValue)) {
            showError(emailError, 'Please enter a valid email address');
            shakeElement(emailInput);
            return false;
        } else {
            clearError(emailError);
            highlightElement(emailInput);
            return true;
        }
    }
    
    // Function to validate message
    function validateMessage() {
        const messageInput = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        const messageValue = messageInput.value.trim();
        
        if (messageValue === '') {
            showError(messageError, 'Message is required');
            shakeElement(messageInput);
            return false;
        } else if (messageValue.length < 10) {
            showError(messageError, 'Message must be at least 10 characters long');
            shakeElement(messageInput);
            return false;
        } else {
            clearError(messageError);
            highlightElement(messageInput);
            return true;
        }
    }
    
    // Function to show error message
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.animation = 'fadeIn 0.3s ease forwards';
    }
    
    // Function to clear error message
    function clearError(errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    // Function to clear all errors
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(error => {
            clearError(error);
        });
    }
    
    // Function to shake element on error
    function shakeElement(element) {
        element.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
    
    // Function to highlight element on success
    function highlightElement(element) {
        element.style.boxShadow = '0 0 5px rgba(46, 204, 113, 0.3)';
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 1000);
    }
    
    // Function to simulate form submission
    function simulateSubmission() {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Show loading state with animation
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Add ripple effect to button
        createRippleEffect(submitBtn);
        
        // Simulate API call
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Add subtle success effect
            createSuccessEffect();
            
            // Reset button after 5 seconds (for demo purposes)
            setTimeout(() => {
                submitBtn.innerHTML = `<span>${originalText}</span><i class="fas fa-paper-plane"></i>`;
                submitBtn.disabled = false;
                
                // Reset form
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
                
                // Remove focused class from inputs
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
            }, 5000);
        }, 2000);
    }
    
    // Function to create ripple effect on button click
    function createRippleEffect(button) {
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        ripple.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        ripple.classList.add('ripple');
        
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Function to create subtle success effect
    function createSuccessEffect() {
        const successContainer = document.querySelector('.success-message');
        successContainer.style.animation = 'successPop 0.5s ease forwards';
        
        // Add a subtle pulse animation
        setTimeout(() => {
            successContainer.style.animation = 'pulse 1s ease';
            setTimeout(() => {
                successContainer.style.animation = '';
            }, 1000);
        }, 500);
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-3px); }
            75% { transform: translateX(3px); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add floating animation to social links on hover
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add subtle parallax effect to background on mouse move
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const shapes = document.querySelector('.background-elements');
        shapes.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
    });
    
    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                // Add specific animation for map section
                if (entry.target.classList.contains('map-section')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.info-card, .contact-form, .map-section');
    animatedElements.forEach(el => {
        // Set initial state for map section
        if (el.classList.contains('map-section')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        observer.observe(el);
    });
    
    // Map interaction enhancements
    function enhanceMapInteractions() {
        const directionsBtn = document.querySelector('.directions-btn');
        const mapContainer = document.querySelector('.map-container');
        
        if (directionsBtn) {
            directionsBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            directionsBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
        
        if (mapContainer) {
            // Add hover effect to map container
            mapContainer.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            });
            
            mapContainer.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
            });
        }
    }
    
    // Initialize map interactions
    enhanceMapInteractions();
});