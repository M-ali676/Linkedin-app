document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const toggleButton = document.getElementById('toggle-button');
    const toggleText = document.getElementById('toggle-text');

    // Local Storage Key
    const USERS_STORAGE_KEY = 'linkedInUsers';
    const LOGGED_IN_KEY = 'isLoggedIn';

    // --- Form Toggling Logic ---
    toggleButton.addEventListener('click', () => {
        const isLogin = loginForm.style.display !== 'none';
        
        if (isLogin) {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            toggleText.textContent = 'Already on LinkedIn?';
            toggleButton.textContent = 'Sign In';
        } else {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            toggleText.textContent = 'New to LinkedIn?';
            toggleButton.textContent = 'Join now';
        }
    });
    
    // --- Sign Up Logic ---
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        
        let users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || [];
        
        // Check if user already exists
        if (users.find(user => user.email === email)) {
            alert('This email is already registered. Please sign in.');
            return;
        }

        // Add new user to array
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

        alert('Registration successful! You can now sign in.');
        
        // Switch back to login form
        toggleButton.click(); 
        document.getElementById('login-email').value = email;
    });

    // --- Login Logic ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || [];
        
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            if (user) {
    // Yehi woh line hai jise correct karna hai
    alert('Welcome back, ${user.name}!'); // <<< BACKTICKS (`) ka istemal karen

    // Set login status and current user data in Local Storage
    localStorage.setItem(LOGGED_IN_KEY, 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Redirect to the main feed page
    window.location.href = 'index.html'; 
} else {
    // ...
}
        } else {
            alert('Invalid email or password. Please try again or sign up.');
        }
    });

    // --- Check Auth Status on Load (Optional but Recommended) ---
    // Agar user pehle se logged in hai, to usay index.html pe bhej do.
    const checkAuthStatus = () => {
        if (localStorage.getItem(LOGGED_IN_KEY) === 'true' && window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        }
    };
    // checkAuthStatus(); // Uncomment if you want immediate redirect
});
