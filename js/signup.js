async function handleSignup(event) {
    event.preventDefault();

    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const confirmInput = document.getElementById('confirm-password');

    const fullnameError = document.getElementById('fullname-error');
    const emailError = document.getElementById('signup-email-error');
    const passwordError = document.getElementById('signup-password-error');
    const confirmError = document.getElementById('confirm-password-error');

    const fullnameValue = fullnameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;
    const confirmValue = confirmInput.value;

    [fullnameError, emailError, passwordError, confirmError].forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });

    let isValid = true;

    if (fullnameValue === '') {
        fullnameError.textContent = 'Please enter your full name.';
        fullnameError.classList.add('show');
        isValid = false;
    }

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

    if (confirmValue !== passwordValue || confirmValue === '') {
        confirmError.textContent = 'Passwords do not match.';
        confirmError.classList.add('show');
        isValid = false;
    }

    if (isValid) {
        const emailPrefix = emailValue.split('@')[0] || fullnameValue;
        const cleanHandle = '@' + emailPrefix.toLowerCase().replace(/[^a-z0-9._]/g, '');

        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullname: fullnameValue,
                    email: emailValue,
                    password: passwordValue
                })
            });

            const result = await response.json();

            if (!response.ok) {
                emailError.textContent = result.message || 'Unable to create account.';
                emailError.classList.add('show');
                return;
            }

            localStorage.setItem('avora_user', JSON.stringify({
                fullname: fullnameValue,
                handle: cleanHandle,
                email: emailValue,
                avatar: ''
            }));

            alert('Account created successfully! Redirecting to Sign In.');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Signup error:', error);
            alert('Hindi makakonekta sa server. Siguraduhing naka-run ang node server.js.');
        }
    }
}

function toggleSignupPassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}