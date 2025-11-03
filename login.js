// Login functionality
function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return; // Not on login page
    
    console.log('Login form found, adding event listener');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Login form submitted');
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        // Clear previous errors
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        
        // Basic validation
        if (!email) {
            document.getElementById('emailError').textContent = 'Email is required';
            return;
        }
        
        if (!password) {
            document.getElementById('passwordError').textContent = 'Password is required';
            return;
        }
        
        console.log('Validation passed, showing loading state');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // Simulate login process (replace with actual authentication)
        setTimeout(() => {
            console.log('Login simulation complete');
            
            // Hide loading state
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            
            // Show success modal
            const modalElement = document.getElementById('successModal');
            if (modalElement && typeof bootstrap !== 'undefined') {
                console.log('Showing success modal');
                const successModal = new bootstrap.Modal(modalElement);
                successModal.show();
                
                // Auto redirect after modal is shown
                setTimeout(() => {
                    console.log('Redirecting to index.html');
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                console.log('Modal or Bootstrap not found, redirecting directly');
                // Fallback: redirect directly if modal fails
                window.location.href = 'index.html';
            }
            
        }, 1000);
    });
}

// Password toggle functionality
function handlePasswordToggle() {
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (!toggleBtn || !passwordInput) return; // Not on login page
    
    toggleBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update icon
        const icon = toggleBtn.querySelector('svg');
        if (type === 'text') {
            icon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            `;
        } else {
            icon.innerHTML = `
                <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            `;
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize login functionality (only on login page)
    handleLogin();
    handlePasswordToggle();
});
