const categoriesData = [
    "Glue",
    "Highlighters",
    "Markers",
    "Papers",
    "Pens"
];

const productsData = [
    // GLUE
    { id: 1, category: "Glue", type: "Stick", brand: "ELMER'S", name: "Glue Stick", price: 35, colors: [], img: "../images/glue/stick/elmers.png" },
    { id: 2, category: "Glue", type: "Stick", brand: "GENERIC", name: "Hot Melt Glue Stick", price: 15, colors: [], img: "../images/glue/stick/hotmelt.png" },
    { id: 3, category: "Glue", type: "Stick", brand: "UHU", name: "UHU Stic", price: 45, colors: [], img: "../images/glue/stick/uhu.png" },
    { id: 4, category: "Glue", type: "White", brand: "ELMER'S", name: "School Glue", price: 55, colors: [], img: "../images/glue/white/elmers.png" },
    { id: 5, category: "Glue", type: "White", brand: "HBW", name: "White Glue", price: 25, colors: [], img: "../images/glue/white/hbw.png" },
    { id: 6, category: "Glue", type: "White", brand: "TIANYA", name: "White Glue", price: 20, colors: [], img: "../images/glue/white/tianya.png" },

    // HIGHLIGHTERS
    { id: 7, category: "Highlighters", type: "Dual", brand: "INTEGRA", name: "Dual Tip Highlighters", price: 30, colors: [], img: "../images/highlighters/dual/integra.png" },
    { id: 8, category: "Highlighters", type: "Dual", brand: "MERAYO", name: "Dual Highlighters | MeRaYo", price: 28, colors: [], img: "../images/highlighters/dual/merayo.png" },
    { id: 9, category: "Highlighters", type: "Dual", brand: "SHARPIE", name: "Clear View Dual Highlighters", price: 55, colors: [], img: "../images/highlighters/dual/sharpie.png" },
    { id: 10, category: "Highlighters", type: "Liquid", brand: "INTEGRA", name: "Liquid Highlighters", price: 32, colors: [], img: "../images/highlighters/liquid/integra.png" },
    { id: 11, category: "Highlighters", type: "Liquid", brand: "MERAYO", name: "Liquid Highlighters | MeRaYo", price: 30, colors: [], img: "../images/highlighters/liquid/merayo.png" },
    { id: 12, category: "Highlighters", type: "Liquid", brand: "SHARPIE", name: "Liquid Highlighters", price: 50, colors: [], img: "../images/highlighters/liquid/sharpie.png" },
    { id: 13, category: "Highlighters", type: "Pastel", brand: "DATAGLO", name: "Pastel Highlighter", price: 25, colors: [], img: "../images/highlighters/pastel/dataglo.png" },
    { id: 14, category: "Highlighters", type: "Pastel", brand: "MERAYO", name: "Merayo Pastel Highlighter | MeRaYo", price: 28, colors: [], img: "../images/highlighters/pastel/merayo.png" },
    { id: 15, category: "Highlighters", type: "Pastel", brand: "SHARPIE", name: "S-Note Pastel", price: 52, colors: [], img: "../images/highlighters/pastel/sharpie.png" },

    // MARKERS
    { id: 16, category: "Markers", type: "Alcohol", brand: "ARRTX", name: "Alcohol Marker", price: 65, colors: ["Black", "Red", "Blue"], img: "../images/markers/alcohol/arrtx.png" },
    { id: 17, category: "Markers", type: "Alcohol", brand: "COPIC", name: "Sketch Marker", price: 180, colors: ["Black", "Red", "Blue"], img: "../images/markers/alcohol/copic.png" },
    { id: 18, category: "Markers", type: "Alcohol", brand: "CRAYOLA", name: "Alcohol Marker", price: 45, colors: ["Black", "Red", "Blue"], img: "../images/markers/alcohol/crayola.png" },
    { id: 19, category: "Markers", type: "Paint", brand: "ARRTX", name: "Acrylic Paint Marker", price: 70, colors: ["White", "Black", "Red"], img: "../images/markers/paint/arrtx.png" },
    { id: 20, category: "Markers", type: "Paint", brand: "REALZEVA", name: "Paint Marker", price: 55, colors: ["White", "Black", "Yellow"], img: "../images/markers/paint/realzeva.png" },
    { id: 21, category: "Markers", type: "Paint", brand: "UNI", name: "Posca Paint Marker", price: 120, colors: ["White", "Black", "Red"], img: "../images/markers/paint/uni.png" },
    { id: 22, category: "Markers", type: "Water-based | Washable", brand: "CHUHU", name: "Washable Marker", price: 30, colors: ["Blue", "Red", "Green"], img: "../images/markers/water_washable/chuhu.png" },
    { id: 23, category: "Markers", type: "Water-based | Washable", brand: "CRAYOLA", name: "Crayola Washable Marker", price: 40, colors: ["Blue", "Red", "Green"], img: "../images/markers/water_washable/crayola.png" },
    { id: 24, category: "Markers", type: "Water-based | Washable", brand: "JARMELO", name: "Jarmelo Washable Marker", price: 48, colors: ["Blue", "Red", "Yellow"], img: "../images/markers/water_washable/jarmelo.png" },

    // PAPERS
    { id: 25, category: "Papers", type: "Bondpapers", brand: "HARD COPY", name: "A4 Bond Paper (20 Sheets)", price: 35, colors: [], img: "../images/papers/bondpapers/a4.png" },
    { id: 26, category: "Papers", type: "Bondpapers", brand: "HARD COPY", name: "Long Bond Paper (20 Sheets)", price: 40, colors: [], img: "../images/papers/bondpapers/long.png" },
    { id: 27, category: "Papers", type: "Bondpapers", brand: "HARD COPY", name: "Short Bond Paper (20 Sheets)", price: 30, colors: [], img: "../images/papers/bondpapers/short.png" },
    { id: 28, category: "Papers", type: "Memo", brand: "FOCUS", name: "Filler Notebook", price: 22, colors: [], img: "../images/papers/memo/filler.png" },
    { id: 29, category: "Papers", type: "Memo", brand: "MEAD", name: "Spiral Notebook", price: 45, colors: [], img: "../images/papers/memo/spiral.png" },
    { id: 30, category: "Papers", type: "Memo", brand: "GENERIC", name: "Stitch Notebook", price: 38, colors: [], img: "../images/papers/memo/stitch.png" },

    // PENS
    { id: 31, category: "Pens", type: "Ballpoint", brand: "BIC", name: "Ballpoint Pen", price: 12, colors: ["Black", "Blue", "Red"], img: "../images/pens/ballpoint/bic.png" },
    { id: 32, category: "Pens", type: "Ballpoint", brand: "PILOT", name: "BP-S Ballpoint", price: 25, colors: ["Black", "Blue", "Red"], img: "../images/pens/ballpoint/pilot.png" },
    { id: 33, category: "Pens", type: "Ballpoint", brand: "SHEAFFER", name: "Sheaffer Ballpoint Pen", price: 95, colors: ["Black", "Blue"], img: "../images/pens/ballpoint/sheaffer.png" },
    { id: 34, category: "Pens", type: "Fountain", brand: "CROSS", name: "Fountain Pen", price: 250, colors: ["Black", "Blue"], img: "../images/pens/fountain/bailey.png" },
    { id: 35, category: "Pens", type: "Fountain", brand: "BEILUNER", name: "Beiluner | Fountain Pen", price: 220, colors: ["Black", "Blue"], img: "../images/pens/fountain/beiluner.png" },
    { id: 36, category: "Pens", type: "Fountain", brand: "PARKER", name: "Parker Fountain Pen", price: 280, colors: ["Black", "Blue"], img: "../images/pens/fountain/parker.png" },
    { id: 37, category: "Pens", type: "Gel", brand: "AMAZER", name: "Gel Pen", price: 18, colors: ["Black", "Blue", "Red"], img: "../images/pens/gel/amazer.png" },
    { id: 38, category: "Pens", type: "Gel", brand: "HBW", name: "Gel Pen", price: 15, colors: ["Black", "Blue", "Red"], img: "../images/pens/gel/hbw.png" },
    { id: 39, category: "Pens", type: "Gel", brand: "M&G", name: "M&G Gel Pen", price: 22, colors: ["Black", "Blue", "Red"], img: "../images/pens/gel/m&g.png" }
];


function getCart() {
    return JSON.parse(localStorage.getItem('avora_cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('avora_cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);

    const navBadge = document.getElementById('nav-cart-count');
    if (navBadge) navBadge.innerText = total;

    const stickyBadge = document.getElementById('sticky-cart-count');
    if (stickyBadge) stickyBadge.innerText = total;
}

function getOrders() {
    return JSON.parse(localStorage.getItem('avora_orders')) || [];
}

function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order);
    localStorage.setItem('avora_orders', JSON.stringify(orders));
}

function openLogoutModal() {
    const modal = document.getElementById('logout-modal');
    if (modal) modal.classList.add('show');
}

function closeLogoutModal() {
    const modal = document.getElementById('logout-modal');
    if (modal) modal.classList.remove('show');
}

function confirmLogout() {
    localStorage.removeItem('avora_cart');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', updateCartBadge);