function getUserProfile() {
    const saved = JSON.parse(localStorage.getItem('avora_user'));
    if (saved && (saved.fullname || saved.email)) {
        const name = saved.fullname || 'User';
        const baseHandle = saved.handle || ('@' + (saved.email ? saved.email.split('@')[0] : name.toLowerCase().replace(/\s+/g, '')));
        return {
            fullname: name,
            handle: baseHandle.startsWith('@') ? baseHandle : '@' + baseHandle,
            email: saved.email || '',
            avatar: saved.avatar || ''
        };
    }

    return {
        fullname: 'User',
        handle: '@user',
        email: '',
        avatar: ''
    };
}

function renderProfileInfo() {
    const user = getUserProfile();

    const nameEl = document.getElementById('profile-name');
    const handleEl = document.getElementById('profile-handle');
    const emailEl = document.getElementById('profile-email');
    const initialEl = document.getElementById('profile-initial');
    const avatarImg = document.getElementById('profile-avatar-img');

    if (nameEl) nameEl.innerText = user.fullname;
    if (handleEl) handleEl.innerText = user.handle;

    if (emailEl) {
        if (user.email) {
            emailEl.innerText = user.email;
            emailEl.style.display = 'block';
        } else {
            emailEl.style.display = 'none';
        }
    }

    if (user.avatar && avatarImg) {
        avatarImg.src = user.avatar;
        avatarImg.style.display = 'block';
        if (initialEl) initialEl.style.display = 'none';
    } else {
        if (initialEl) {
            initialEl.innerText = user.fullname.charAt(0).toUpperCase() || 'U';
            initialEl.style.display = 'block';
        }
        if (avatarImg) avatarImg.style.display = 'none';
    }
}

function handleAvatarChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const user = getUserProfile();
        user.avatar = e.target.result;
        localStorage.setItem('avora_user', JSON.stringify(user));
        renderProfileInfo();
    };
    reader.readAsDataURL(file);
}

function renderOrders() {
    const container = document.getElementById('orders-container');
    if (!container) return;

    const orders = getOrders();
    container.innerHTML = '';

    if (orders.length === 0) {
        container.innerHTML = '<p>No checked out orders yet. Start shopping in <a href="products.html" style="color:#211f30; font-weight:600;">Products</a>.</p>';
        return;
    }

    orders.forEach(order => {
        const itemsHTML = order.items.map(item => `
            <li>• ${item.name} (${item.color}) — ₱${item.price} x ${item.qty} = <strong>₱${item.price * item.qty}</strong></li>
        `).join('');

        container.innerHTML += `
            <div class="order-card">
                <div class="order-top">
                    <div>
                        <h3>Order #${order.orderId}</h3>
                        <p class="order-meta">Date: ${order.date} • ${order.time}</p>
                        <p class="order-meta">Payment Method: <strong>${order.paymentMethod}</strong></p>
                    </div>
                    <span class="order-badge">Checked Out</span>
                </div>

                <ul class="order-items-list">
                    ${itemsHTML}
                </ul>

                <div class="order-bottom">
                    <span>Total Items: <strong>${order.totalItems}</strong></span>
                    <span class="order-total">Total: ₱${order.totalPrice}</span>
                </div>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProfileInfo();
    renderOrders();
});