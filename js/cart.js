function updateCartItemQty(productId, color, change) {
    const cart = getCart();
    const existingIndex = cart.findIndex(i => i.id === productId && i.color === color);

    if (existingIndex > -1) {
        cart[existingIndex].qty += change;
        if (cart[existingIndex].qty <= 0) {
            cart.splice(existingIndex, 1);
        }
    }

    saveCart(cart);
    renderCart();
}

function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-items-container');
    const breakdown = document.getElementById('summary-breakdown');
    container.innerHTML = '';
    breakdown.innerHTML = '';

    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is currently empty.</p>';
    }

    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        totalItems += item.qty;
        totalPrice += subtotal;

        const variantText = item.color && item.color !== "Standard" ? `${item.color} x ${item.qty}` : `Qty: ${item.qty}`;

        container.innerHTML += `
            <div class="cart-item-card">
                <div class="cart-item-left">
                    <img src="${item.img}" alt="${item.name}" class="cart-thumb">
                    <div>
                        <h3>${item.name}</h3>
                        <p style="font-size:13px; color:#555555;">${variantText}</p>
                        <div class="qty-controls">
                            <button class="qty-btn qty-minus" onclick="updateCartItemQty(${item.id}, '${item.color}', -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn qty-plus" onclick="updateCartItemQty(${item.id}, '${item.color}', 1)">+</button>
                        </div>
                    </div>
                </div>
                <h3>₱${subtotal}</h3>
            </div>
        `;

        breakdown.innerHTML += `
            <div class="summary-list-item">
                <span>• ${item.name} (${item.color}) <br> <small style="color:#666666;">₱${item.price} x ${item.qty}</small></span>
                <span>₱${subtotal}</span>
            </div>
        `;
    });

    document.getElementById('summary-total-items').innerText = totalItems;
    document.getElementById('summary-total-price').innerText = `₱${totalPrice}`;
}

function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items first.");
        return;
    }

    const paymentMethod = document.getElementById('payment-method').value;
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const now = new Date();

    const newOrder = {
        orderId: "AVR-" + Math.floor(100000 + Math.random() * 900000),
        date: now.toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' }),
        time: now.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
        paymentMethod: paymentMethod,
        totalItems: totalItems,
        totalPrice: totalPrice,
        items: cart
    };

    saveOrder(newOrder);
    saveCart([]);
    alert("Order placed successfully! You can view it in your Profile.");
    window.location.href = 'profile.html';
}

document.addEventListener('DOMContentLoaded', renderCart);