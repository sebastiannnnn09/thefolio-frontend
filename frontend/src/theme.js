// Function to apply the theme
function applyTheme() {
    const themeCheckbox = document.getElementById('theme-checkbox');
    const savedTheme = localStorage.getItem('theme');

    // 1. Check if the user previously picked light mode
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeCheckbox) themeCheckbox.checked = true;
    }
}

// 2. Listen for switch changes
document.addEventListener('change', (e) => {
    if (e.target.id === 'theme-checkbox') {
        document.body.classList.toggle('light-mode');
        
        // 3. Save the choice to the browser's memory
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }
});

// Run this as soon as the script loads
applyTheme();

// --- Password Match Validation ---
const registrationForm = document.getElementById("registrationForm");
const passwordField = document.getElementById("password");
const confirmField = document.getElementById("confirm_password");

if (passwordField && confirmField) {
    function checkPasswords() {
        if (passwordField.value !== confirmField.value) {
            // This creates a custom popup warning in the browser
            confirmField.setCustomValidity("Passwords do not match!");
        } else {
            // This clears the error so the form can be submitted
            confirmField.setCustomValidity("");
        }
    }

    // Run the check whenever the user types or leaves the box
    passwordField.onchange = checkPasswords;
    confirmField.onkeyup = checkPasswords;
}
const themeCheckbox = document.getElementById('theme-checkbox');
const body = document.body;

// Define your images here
const darkBG = "url('../assets/cp.png')"; // Your original dark photo
const lightBG = "url('../assets/light-city.png')"; // Your new light photo

// 1. Function to set the visual background
function updateBackground(isLight) {
    if (isLight) {
        body.style.backgroundImage = lightBG;
    } else {
        body.style.backgroundImage = darkBG;
    }
}

// 2. Initial Load Check
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (themeCheckbox) themeCheckbox.checked = true;
        updateBackground(true);
    } else {
        updateBackground(false);
    }
}

// 3. Toggle Listener
if (themeCheckbox) {
    themeCheckbox.addEventListener('change', () => {
        const isLight = themeCheckbox.checked;
        
        if (isLight) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            updateBackground(true);
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            updateBackground(false);
        }
    });
}

// Run on startup
initTheme();