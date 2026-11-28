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
    if (handleEl) {
        handleEl.style.display = 'none';
    }

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

async function renderOrders() {
    const container = document.getElementById('orders-container');
    if (!container) return;

    const user = getUserProfile();
    container.innerHTML = '<p>Loading orders...</p>';

    try {
        const query = user.fullname && user.fullname !== 'User'
            ? `?customerName=${encodeURIComponent(user.fullname)}`
            : '';
        const response = await fetch(`http://localhost:3000/api/orders${query}`);
        const result = await response.json();
        const orders = Array.isArray(result) ? result : (result.data || []);

        container.innerHTML = '';

        if (orders.length === 0) {
            container.innerHTML = '<p>No checked out orders yet. Start shopping in <a href="products.html" style="color:#211f30; font-weight:600;">Products</a>.</p>';
            return;
        }

        orders.forEach(order => {
            const items = order.items || [];
            const totalItems = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);
            const createdDate = order.createdAt ? new Date(order.createdAt) : new Date();
            const dateStr = createdDate.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
            const timeStr = createdDate.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
            const status = order.status || 'Checked Out';

            const itemsHTML = items.map(item => {
                const colorText = item.color && item.color !== 'Standard' ? ` (${item.color})` : '';
                return `<li>• ${item.name}${colorText} — ₱${item.price} x ${item.qty} = <strong>₱${item.price * item.qty}</strong></li>`;
            }).join('');

            const nonCancellableStatuses = ['Checked Out', 'Approved', 'Processing', 'Shipped'];
            const cancelBtnHTML = !nonCancellableStatuses.includes(status)
                ? `<button onclick="cancelOrder('${order.orderId}')" style="margin-top: 10px; padding: 6px 12px; background: #fff; color: #b91c1c; border: 1px solid #b91c1c; border-radius: 6px; cursor: pointer; font-size: 13px;">Cancel Order</button>`
                : '';

            container.innerHTML += `
                <div class="order-card">
                    <div class="order-top">
                        <div>
                            <h3>Order #${order.orderId}</h3>
                            <p class="order-meta">Date: ${dateStr} • ${timeStr}</p>
                            <p class="order-meta">Payment Method: <strong>${order.paymentMethod}</strong></p>
                        </div>
                        <span class="order-badge">${status}</span>
                    </div>

                    <ul class="order-items-list">
                        ${itemsHTML}
                    </ul>

                    <div class="order-bottom">
                        <span>Total Items: <strong>${totalItems}</strong></span>
                        <span class="order-total">Total: ₱${order.totalPrice}</span>
                    </div>
                    ${cancelBtnHTML}
                </div>
            `;
        });
    } catch (error) {
        console.error('Error loading orders:', error);
        container.innerHTML = '<p>Unable to load orders from the server. Please make sure the backend is running.</p>';
    }
}

async function cancelOrder(orderId) {
    if (!confirm(`Are you sure you want to cancel Order #${orderId}?`)) return;

    try {
        const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            alert('Failed to cancel order.');
            return;
        }

        alert(`Order #${orderId} cancelled.`);
        renderOrders();
    } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Unable to connect to the server.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProfileInfo();
    renderOrders();
});