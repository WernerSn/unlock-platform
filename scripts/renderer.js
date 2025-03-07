// This file will handle all the UI interactions
console.log('Renderer script loaded'); 

// Handle navigation between screens
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all nav items and screens
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.classList.remove('active');
        });
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Add active class to clicked nav item and corresponding screen
        item.classList.add('active');
        const screenId = item.getAttribute('data-screen');
        document.getElementById(screenId).classList.add('active');
    });
});

// Handle auth button clicks
document.getElementById('signIn').addEventListener('click', () => {
    document.querySelector('.launch-container').classList.add('hidden');
    document.querySelector('.login-container').classList.remove('hidden');
});

document.getElementById('signUp').addEventListener('click', () => {
    document.querySelector('.launch-container').classList.add('hidden');
    document.querySelector('.signup-container').classList.remove('hidden');
});

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // For demo purposes, we'll just log the values and redirect
    console.log('Login attempted with:', email);
    
    // Simulate loading
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Navigate to dashboard (you'll need to create this page)
        window.location.href = 'dashboard.html';
    }, 1500);
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('.submit-btn');
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    // Simulate account creation
    setTimeout(() => {
        document.querySelector('.signup-container').classList.add('hidden');
        document.querySelector('.onboarding-container').classList.remove('hidden');
    }, 1500);
});

// Toggle password visibility
document.querySelector('.toggle-password').addEventListener('click', () => {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

// Handle password visibility for signup form
document.querySelectorAll('.signup-container .toggle-password').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        input.type = input.type === 'password' ? 'text' : 'password';
    });
});

// Log that the app is ready
console.log('Unlock Platform Demo is ready'); 

// Add these event listeners for social login buttons
document.querySelector('.social-btn.google').addEventListener('click', () => {
    document.querySelector('.login-container').classList.add('hidden');
    document.querySelector('.google-auth').classList.remove('hidden');
});

document.querySelector('.social-btn.facebook').addEventListener('click', () => {
    document.querySelector('.login-container').classList.add('hidden');
    document.querySelector('.facebook-auth').classList.remove('hidden');
});

document.querySelector('.social-btn.twitter').addEventListener('click', () => {
    document.querySelector('.login-container').classList.add('hidden');
    document.querySelector('.twitter-auth').classList.remove('hidden');
});

// Close social auth modals when clicking outside
document.querySelectorAll('.social-auth-container').forEach(container => {
    container.addEventListener('click', (e) => {
        if (e.target === container) {
            container.classList.add('hidden');
            document.querySelector('.login-container').classList.remove('hidden');
        }
    });
});

// Handle mock social login submissions
document.querySelector('.google-account').addEventListener('click', simulateLogin);
document.querySelector('.facebook-login-form').addEventListener('submit', handleSocialLogin);
document.querySelector('.twitter-login-form').addEventListener('submit', handleSocialLogin);

function handleSocialLogin(e) {
    e.preventDefault();
    simulateLogin();
}

function simulateLogin() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Update onboarding flow handling
let currentStep = 1; // Start at 1 since "Let's get to know you" is step 1
const totalSteps = 8;

document.getElementById('beginOnboarding').addEventListener('click', () => {
    currentStep = 2; // Move to step 2 when clicking Begin
    showOnboardingStep(currentStep);
});

document.getElementById('skipOnboarding').addEventListener('click', () => {
    window.location.href = 'dashboard.html';
});

function showOnboardingStep(step) {
    // Hide all content except progress bar
    document.querySelector('.onboarding-welcome').classList.add('hidden');
    document.querySelectorAll('.onboarding-question').forEach(div => {
        div.classList.add('hidden');
    });

    if (step === 1) {
        // Show welcome screen
        document.querySelector('.onboarding-welcome').classList.remove('hidden');
    } else {
        // Show question screen - now using the correct step number
        const stepContent = document.querySelector(`[data-step="${step - 1}"]`);
        if (stepContent) {
            stepContent.classList.remove('hidden');
        }
    }
    
    // Update progress bar and step number
    updateProgress(step);
}

function updateProgress(step) {
    // Update step number
    document.querySelector('.step-number').textContent = step;
    
    // Update progress bar - 8 total steps
    const progress = (step / totalSteps) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

// Handle option selection
document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
        // Deselect other options in the same group
        card.closest('.option-grid').querySelectorAll('.option-card').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Select clicked option
        card.classList.add('selected');
        
        // Enable continue button
        card.closest('.onboarding-question')
            .querySelector('[data-action="next"]')
            .disabled = false;
    });
});

// Handle navigation
document.querySelectorAll('.onboarding-nav button').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        
        if (action === 'back') {
            if (currentStep > 1) {
                currentStep--;
                showOnboardingStep(currentStep);
            }
        } else if (action === 'next') {
            if (currentStep < totalSteps) {
                currentStep++;
                showOnboardingStep(currentStep);
            } else {
                // Show completion screen
                showCompletionScreen();
            }
        }
    });
});

function showCompletionScreen() {
    // Hide all other screens
    document.querySelectorAll('.onboarding-container > div').forEach(div => {
        div.classList.add('hidden');
    });
    
    // Show completion screen
    document.querySelector('.onboarding-completion').classList.remove('hidden');
    
    // Update progress to 100%
    document.querySelector('.progress').style.width = '100%';
}

// Handle dashboard navigation
document.getElementById('gotoDashboard').addEventListener('click', () => {
    window.location.href = 'dashboard.html';
}); 