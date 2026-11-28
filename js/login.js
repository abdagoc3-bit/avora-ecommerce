async function handleLogin(event) {
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
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue
                })
            });

            const result = await response.json();

            if (!response.ok) {
                passwordError.textContent = result.message || 'Invalid email or password.';
                passwordError.classList.add('show');
                return;
            }

            const existingProfile = JSON.parse(localStorage.getItem('avora_user')) || {};
            const resolvedName = (result.user && result.user.fullname) || existingProfile.fullname || emailValue.split('@')[0] || 'shopper';
            const emailPrefix = emailValue.split('@')[0] || 'shopper';
            const cleanHandle = '@' + emailPrefix.toLowerCase().replace(/[^a-z0-9._]/g, '');

            localStorage.setItem('avora_user', JSON.stringify({
                fullname: resolvedName,
                handle: existingProfile.handle || cleanHandle,
                email: (result.user && result.user.email) || emailValue,
                avatar: existingProfile.avatar || '',
                token: result.token || ''
            }));

            window.location.href = 'products.html';
        } catch (error) {
            console.error('Login error:', error);
            passwordError.textContent = 'Hindi makakonekta sa server. Siguraduhing naka-run ang node server.js.';
            passwordError.classList.add('show');
        }
    }
}

function togglePassword() {
    const pwd = document.getElementById('password');
    pwd.type = pwd.type === 'password' ? 'text' : 'password';
}