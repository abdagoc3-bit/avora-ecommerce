let selectedColors = {};

productsData.forEach(p => {
    selectedColors[p.id] = p.colors.length > 0 ? p.colors[0] : "Standard";
});

function renderSidebarCheckboxes() {
    const container = document.getElementById('category-checkboxes');
    if (!container) return;
    container.innerHTML = '';

    categoriesData.forEach((cat, idx) => {
        const count = productsData.filter(p => p.category === cat).length;
        container.innerHTML += `
            <label for="cat-${idx}" class="checkbox-item">
                <span class="checkbox-left">
                    <input type="checkbox" id="cat-${idx}" name="cat-filter" value="${cat}" onchange="renderShop()">
                    <span>${cat.toUpperCase()}</span>
                </span>
                <span class="item-count">(${count})</span>
            </label>
        `;
    });
}

function getCartQty(productId, variantLabel) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId && i.color === variantLabel);
    return item ? item.qty : 0;
}

function updateProductQty(productId, variantLabel, change) {
    const cart = getCart();
    const product = productsData.find(p => p.id === productId);
    const existingIndex = cart.findIndex(i => i.id === productId && i.color === variantLabel);

    if (existingIndex > -1) {
        cart[existingIndex].qty += change;
        if (cart[existingIndex].qty <= 0) {
            cart.splice(existingIndex, 1);
        }
    } else if (change > 0) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            color: variantLabel,
            qty: 1,
            img: product.img
        });
    }

    saveCart(cart);
    renderShop();
}

function selectColor(productId, color) {
    selectedColors[productId] = color;
    renderShop();
}

function resetFilters() {
    document.querySelectorAll('input[name="cat-filter"]').forEach(cb => cb.checked = false);
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('sort-select').value = 'default';
    renderShop();
}

function buildProductCardHTML(product, hasColors) {
    const activeVariant = selectedColors[product.id];
    const qty = getCartQty(product.id, activeVariant);

    const colorMap = {
        Black: '#111111',
        Blue: '#3b3bff',
        Red: '#e63946',
        Yellow: '#ffbe0b',
        Pink: '#ff006e',
        Green: '#06d6a0',
        White: '#f5f5f5'
    };

    let colorSectionHTML = '';
    if (hasColors && product.colors.length > 0) {
        const dotsHTML = product.colors.map(color => `
            <span class="color-dot ${activeVariant === color ? 'selected' : ''}" 
                  style="background-color: ${colorMap[color] || '#333'};"
                  onclick="selectColor(${product.id}, '${color}')"></span>
        `).join('');

        colorSectionHTML = `
            <div class="color-row">
                ${dotsHTML}
                <span>${activeVariant}</span>
            </div>
        `;
    }

return `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}" class="card-img">
            <div>
                <p class="type-tag">${product.brand || product.type}</p>
                <div class="product-header">
                    <h3>${product.name}</h3>
                    <span class="price-badge">₱${product.price}</span>
                </div>
                ${colorSectionHTML}
            </div>
            <div class="qty-row">
                <span>Quantity</span>
                <div class="qty-controls">
                    <button class="qty-btn qty-minus" onclick="updateProductQty(${product.id}, '${activeVariant}', -1)">-</button>
                    <span>${qty}</span>
                    <button class="qty-btn qty-plus" onclick="updateProductQty(${product.id}, '${activeVariant}', 1)">+</button>
                </div>
            </div>
        </div>
    `;
}

function renderShop() {
    const sectionsContainer = document.getElementById('products-sections');
    sectionsContainer.innerHTML = '';

    const checkedCats = Array.from(document.querySelectorAll('input[name="cat-filter"]:checked')).map(cb => cb.value);
    const activeCategories = checkedCats.length > 0 ? checkedCats : categoriesData;

    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const sortValue = document.getElementById('sort-select').value;

    let renderedCategoriesCount = 0;

    activeCategories.forEach(cat => {
        let items = productsData.filter(p => p.category === cat && p.price >= minPrice && p.price <= maxPrice);

        if (sortValue === 'low-high') {
            items.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'high-low') {
            items.sort((a, b) => b.price - a.price);
        }

        if (items.length === 0) return;

        if (renderedCategoriesCount > 0) {
            sectionsContainer.innerHTML += `<hr class="category-hr">`;
        }
        renderedCategoriesCount++;

        const hasColors = (cat === "Pens" || cat === "Markers");
        const uniqueTypes = [...new Set(items.map(item => item.type))];

        let typesHTML = uniqueTypes.map((typeName, typeIdx) => {
            const typeItems = items.filter(i => i.type === typeName);
            const cardsHTML = typeItems.map(prod => buildProductCardHTML(prod, hasColors)).join('');
            const dividerBefore = typeIdx > 0 ? `<hr class="type-hr">` : '';

            return `
                ${dividerBefore}
                <div class="type-group">
                    <h3 class="type-subheading">${typeName}</h3>
                    <div class="cards-row">${cardsHTML}</div>
                </div>
            `;
        }).join('');

        sectionsContainer.innerHTML += `
            <div class="category-block">
                <h2 class="category-section-title">${cat}</h2>
                ${typesHTML}
            </div>
        `;
    });

    if (renderedCategoriesCount === 0) {
        sectionsContainer.innerHTML = `<p>No items matched your selected filters.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderSidebarCheckboxes();
    renderShop();
});