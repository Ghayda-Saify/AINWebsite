// contact.js - Professional Email Verification System

class ContactForm {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.successMessage = document.getElementById('successMessage');
        this.submitBtn = document.getElementById('submitBtn');
        this.emailVerificationModal = document.getElementById('emailVerificationModal');
        this.errorModal = document.getElementById('errorModal');
        
        // Allowed email domains
        this.allowedDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'aol.com', 'icloud.com', 'protonmail.com', 'live.com',
            'arabinnovation.net', 'najah.edu'
        ];
        
        // Blocked temporary email domains
        this.blockedDomains = [
            'tempmail.com', '10minutemail.com', 'guerrillamail.com',
            'mailinator.com', 'throwawaymail.com', 'fakeinbox.com'
        ];
        
        this.currentEmail = '';
        this.init();
    }

    init() {
        this.initBackgroundAnimation();
        this.initMap();
        this.setupEventListeners();
        this.setupEmailHint();
    }

    setupEventListeners() {
        this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        document.getElementById('retryVerification').addEventListener('click', () => {
            this.hideErrorModal();
            const currentEmail = document.getElementById('email').value.trim();
            this.verifyEmail(currentEmail);
        });
        
        document.getElementById('editEmail').addEventListener('click', () => {
            this.hideErrorModal();
            document.getElementById('email').focus();
        });
        
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('input', () => {
            this.clearError('emailError');
            this.updateEmailHint();
        });
        
        this.setupInputAnimations();
    }

    setupEmailHint() {
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('focus', () => {
            emailInput.parentElement.querySelector('.email-hint').style.opacity = '0';
        });
        
        emailInput.addEventListener('blur', () => {
            if (!emailInput.value) {
                emailInput.parentElement.querySelector('.email-hint').style.opacity = '1';
            }
        });
    }

    updateEmailHint() {
        const emailInput = document.getElementById('email');
        const hint = emailInput.parentElement.querySelector('.email-hint');
        hint.style.opacity = emailInput.value ? '0' : '1';
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.clearErrors();
        
        if (!this.validateForm()) return;

        const email = document.getElementById('email').value.trim();
        this.currentEmail = email;
        await this.verifyEmail(email);
    }

    async verifyEmail(email) {
        this.showVerificationModal();
        
        try {
            // Step 1: Check email format
            await this.simulateVerificationStep(0, 1000);
            if (!this.isValidEmailFormat(email)) {
                throw { 
                    type: 'format', 
                    message: `The email address format for "${email}" is invalid.` 
                };
            }

            // Step 2: Check if domain is allowed
            await this.simulateVerificationStep(1, 1500);
            if (!this.isDomainAllowed(email)) {
                throw { 
                    type: 'domain', 
                    message: `The email domain for "${email}" is not currently accepted.` 
                };
            }

            // Step 3: Check if domain is blocked
            await this.simulateVerificationStep(2, 1500);
            if (this.isDomainBlocked(email)) {
                throw { 
                    type: 'temporary', 
                    message: `Temporary email addresses like "${email}" are not accepted for security reasons.` 
                };
            }

            this.hideVerificationModal();
            this.sendEmail();

        } catch (error) {
            this.hideVerificationModal();
            this.showErrorModal(error.type, error.message, email);
        }
    }

    simulateVerificationStep(stepIndex, duration) {
        return new Promise((resolve) => {
            this.updateProgressBar((stepIndex + 1) * 33.33);
            this.updateVerificationSteps(stepIndex);
            setTimeout(resolve, duration);
        });
    }

    updateProgressBar(percentage) {
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = `${percentage}%`;
    }

    updateVerificationSteps(currentStep) {
        const steps = document.querySelectorAll('.step');
        const details = document.querySelectorAll('.detail-item');
        
        steps.forEach((step, index) => {
            step.classList.toggle('active', index <= currentStep);
        });

        details.forEach((detail, index) => {
            const icon = detail.querySelector('i');
            if (index <= currentStep) {
                if (index < currentStep) {
                    icon.className = 'fas fa-check-circle valid';
                    detail.classList.add('valid');
                } else {
                    icon.className = 'fas fa-spinner fa-spin checking';
                    detail.classList.add('checking');
                }
            } else {
                icon.className = 'fas fa-clock waiting';
                detail.classList.remove('valid', 'checking');
            }
        });
    }

    isValidEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isDomainAllowed(email) {
        const domain = email.split('@')[1]?.toLowerCase();
        return this.allowedDomains.includes(domain);
    }

    isDomainBlocked(email) {
        const domain = email.split('@')[1]?.toLowerCase();
        return this.blockedDomains.includes(domain);
    }

    showVerificationModal() {
        document.body.classList.add('modal-active');
        this.emailVerificationModal.classList.add('active');
        this.updateProgressBar(0);
        this.updateVerificationSteps(-1);
    }

    hideVerificationModal() {
        document.body.classList.remove('modal-active');
        this.emailVerificationModal.classList.remove('active');
    }

    showErrorModal(errorType, errorMessage, email) {
    document.body.classList.add('modal-active');
    this.errorModal.classList.add('active');
    
    // Update email display
    document.getElementById('enteredEmail').textContent = email;
    
    // Update error message text
    document.getElementById('errorMessageText').textContent = errorMessage;
    
    // Control domains list visibility
    const allowedDomainsSection = document.getElementById('allowedDomainsSection');
    allowedDomainsSection.style.display = errorType === 'format' ? 'none' : 'block';
    
    // Add mobile-specific class for scrollable domains
    if (window.innerWidth <= 768 && errorType !== 'format') {
        allowedDomainsSection.classList.add('mobile-domains-scroll');
    } else {
        allowedDomainsSection.classList.remove('mobile-domains-scroll');
    }
}

    hideErrorModal() {
        document.body.classList.remove('modal-active');
        this.errorModal.classList.remove('active');
        
        // Reset to default message for next use
        document.getElementById('errorMessageText').innerHTML = 
            'The email address <strong id="enteredEmail"></strong> could not be verified.';
    }

    validateForm() {
        let isValid = true;
        
        const name = document.getElementById('name').value.trim();
        if (name.length < 2) {
            this.showError('nameError', 'Please enter your full name (minimum 2 characters)');
            isValid = false;
        }
        
        const email = document.getElementById('email').value.trim();
        if (!email) {
            this.showError('emailError', 'Email address is required');
            isValid = false;
        }
        
        const subject = document.getElementById('subject').value.trim();
        if (subject.length < 3) {
            this.showError('subjectError', 'Please provide a meaningful subject (minimum 3 characters)');
            isValid = false;
        }
        
        const message = document.getElementById('message').value.trim();
        if (message.length < 10) {
            this.showError('messageError', 'Please provide a detailed message (minimum 10 characters)');
            isValid = false;
        }
        
        return isValid;
    }

    sendEmail() {
        const submitBtn = this.submitBtn;
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
        submitBtn.disabled = true;

        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value,
        };

        emailjs.send("service_1y554gi", "template_rksas38", params)
            .then(() => this.showSuccess())
            .catch((error) => {
                console.error('Email sending failed:', error);
                this.showError('', 'Failed to send message. Please try again in a moment.');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    }

    showSuccess() {
        this.contactForm.style.display = 'none';
        this.successMessage.style.display = 'block';
        
        setTimeout(() => {
            this.contactForm.reset();
            this.contactForm.style.display = 'block';
            this.successMessage.style.display = 'none';
            this.resetInputStyles();
            this.updateEmailHint();
        }, 5000);
    }

    showError(elementId, message) {
        if (!elementId) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message global-error';
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
                background: #e74c3c;
                color: white;
                padding: 15px;
                border-radius: 8px;
                margin: 15px 0;
                text-align: center;
                animation: slideDown 0.3s ease;
            `;
            
            this.contactForm.parentNode.insertBefore(errorDiv, this.contactForm);
            setTimeout(() => errorDiv.remove(), 5000);
        } else {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    clearErrors() {
        document.querySelectorAll('.error-message').forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }

    setupInputAnimations() {
        document.querySelectorAll('input, textarea').forEach(input => {
            if (input.value) input.parentElement.classList.add('focused');
            
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) this.parentElement.classList.remove('focused');
            });
        });
    }

    resetInputStyles() {
        document.querySelectorAll('.input-with-icon').forEach(input => {
            input.classList.remove('focused');
        });
    }

    initMap() {
        if (!document.getElementById('map')) return;

        const najahCoords = [32.2211004, 35.2455457];
        const map = L.map('map').setView(najahCoords, 17);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);
        
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<i class="fas fa-map-marker-alt"></i>',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        });
        
        const marker = L.marker(najahCoords, {icon: customIcon}).addTo(map);
        marker.bindPopup(`
            <div style="text-align: center;">
                <h3 style="margin: 0 0 10px 0; color: #2c3e50;">Arab Innovation Network</h3>
                <p style="margin: 0; color: #7f8c8d;">Old An-Najah University Street</p>
                <p style="margin: 5px 0 0 0; color: #7f8c8d;">Nablus, Palestine</p>
            </div>
        `).openPopup();
        
        document.querySelector('.directions-btn').addEventListener('click', () => {
            window.open('https://maps.app.goo.gl/KQuyJWgHu4W3CzTJ7', '_blank');
        });
    }

    initBackgroundAnimation() {
        document.querySelectorAll('.bg-shape').forEach(shape => {
            const randomX = Math.random() * 20;
            const randomY = Math.random() * 20;
            shape.style.left = `${randomX}%`;
            shape.style.top = `${randomY}%`;
            shape.style.animationDuration = `${Math.random() * 10 + 15}s`;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});