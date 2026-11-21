function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;

    emailError.textContent = '';
    passwordError.textContent = '';
    emailError.classList.remove('show');
    passwordError.classList.remove('show');

    let isValid = true;

    if (!emailValue.includes('@') || emailValue.startsWith('@') || emailValue.endsWith('@')) {
        emailError.textContent = 'Please enter a valid email with "@".';
        emailError.classList.add('show');
        isValid = false;
    }

    if (passwordValue.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters.';
        passwordError.classList.add('show');
        isValid = false;
    }

    if (isValid) {
        window.location.href = 'categories.html';
    }
}

function togglePassword() {
    const pwd = document.getElementById('password');
    pwd.type = pwd.type === 'password' ? 'text' : 'password';
}