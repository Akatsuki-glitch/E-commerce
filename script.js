// replace static products with localStorage-backed products
const defaultProducts = [
    { id: 1, name: "MacBook Pro 16-inch", price: 2499.99, desc: "Apple's most powerful laptop with M3 Pro chip", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop" },
    { id: 2, name: "iPhone 15 Pro Max", price: 1199.99, desc: "Latest iPhone with titanium design and A17 Pro chip", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop" },
    { id: 3, name: "Samsung Galaxy S24 Ultra", price: 1299.99, desc: "Premium Android smartphone with S Pen", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop" },
    { id: 4, name: "Sony WH-1000XM5", price: 399.99, desc: "Industry-leading noise canceling headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" },
    { id: 5, name: "Apple Watch Series 9", price: 429.99, desc: "Advanced smartwatch with health monitoring", image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop" },
    { id: 6, name: "iPad Pro 12.9-inch", price: 1099.99, desc: "Professional tablet with M2 chip", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop" },
    { id: 7, name: "Dell XPS 15", price: 1899.99, desc: "Premium Windows laptop with stunning display", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop" },
    { id: 8, name: "Google Pixel 8 Pro", price: 899.99, desc: "AI-powered smartphone with advanced camera", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop" },
    { id: 9, name: "Microsoft Surface Pro 9", price: 1299.99, desc: "Versatile 2-in-1 tablet and laptop", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop" },
    { id: 10, name: "Bose QuietComfort 45", price: 329.99, desc: "Comfortable noise canceling headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" },
    { id: 11, name: "AirPods Pro 2nd Gen", price: 249.99, desc: "Wireless earbuds with active noise cancellation", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop" },
    { id: 12, name: "Lenovo ThinkPad X1 Carbon", price: 1599.99, desc: "Business laptop with exceptional durability", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop" },
    { id: 13, name: "Samsung Galaxy Tab S9", price: 799.99, desc: "Premium Android tablet with S Pen", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop" },
    { id: 14, name: "MacBook Air M2", price: 1199.99, desc: "Lightweight laptop with M2 chip", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop" },
    { id: 15, name: "Sony PlayStation 5", price: 499.99, desc: "Next-generation gaming console", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop" },
    { id: 16, name: "Xbox Series X", price: 499.99, desc: "Microsoft's flagship gaming console", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop" },
    { id: 17, name: "Nintendo Switch OLED", price: 349.99, desc: "Portable gaming console with OLED display", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop" },
    { id: 18, name: "DJI Mini 3 Pro", price: 759.99, desc: "Compact drone with 4K video recording", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop" },
    { id: 19, name: "Canon EOS R6 Mark II", price: 2499.99, desc: "Professional mirrorless camera", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop" },
    { id: 20, name: "Garmin Fenix 7", price: 699.99, desc: "Premium multisport GPS smartwatch", image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop" },
    { id: 21, name: "Oculus Quest 3", price: 499.99, desc: "Advanced VR headset with mixed reality", image: "https://images.unsplash.com/photo-1592478411213-6153e4c4a8b4?w=400&h=300&fit=crop" },
    { id: 22, name: "Tesla Model 3", price: 38990.00, desc: "Electric vehicle with autopilot", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop" },
    { id: 23, name: "Dyson V15 Detect", price: 749.99, desc: "Cordless vacuum with laser dust detection", image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop" },
    { id: 24, name: "KitchenAid Stand Mixer", price: 399.99, desc: "Professional-grade kitchen mixer", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" },
    { id: 25, name: "Instant Pot Duo", price: 99.99, desc: "7-in-1 electric pressure cooker", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" }
];

function loadProducts() {
    const stored = localStorage.getItem('products');
    if (stored) {
        try { return JSON.parse(stored); } catch (e) { console.warn('Failed to parse stored products, using defaults'); }
    }
    // initialize storage with defaults
    localStorage.setItem('products', JSON.stringify(defaultProducts));
    return defaultProducts.slice();
}

function saveProducts(list) {
    localStorage.setItem('products', JSON.stringify(list));
}

let products = loadProducts();

const productListEl = document.getElementById('product-list');
const cartEl = document.getElementById('cart');
const totalEl = document.getElementById('total');
const cartCountEl = document.getElementById('cart-count');
const checkoutFormEl = document.getElementById('checkout-form');
const cartBtn = document.getElementById('cart-btn');

let cart = JSON.parse(localStorage.getItem('cart') || '[]');

// keep a single hide timeout and a longer delay
let hideCartTimeout = null;
const CART_HIDE_DELAY = 4000; // milliseconds

function showFloatingCartToggle() {
    const cartSection = document.getElementById('cart-section');
    if (!cartSection) return;

    // clear any previously scheduled hide so repeated adds extend visibility
    if (hideCartTimeout) {
        clearTimeout(hideCartTimeout);
        hideCartTimeout = null;
    }

    // always show on the right
    cartSection.classList.remove('cart-left','cart-right','cart-hidden');
    cartSection.classList.add('cart-right');

    // attach hover listeners once so hovering keeps it visible
    if (!cartSection.dataset.floatingInit) {
        cartSection.addEventListener('mouseenter', () => {
            if (hideCartTimeout) {
                clearTimeout(hideCartTimeout);
                hideCartTimeout = null;
            }
            cartSection.classList.remove('cart-hidden');
        });
        cartSection.addEventListener('mouseleave', () => {
            if (hideCartTimeout) clearTimeout(hideCartTimeout);
            hideCartTimeout = setTimeout(() => cartSection.classList.add('cart-hidden'), CART_HIDE_DELAY);
        });
        cartSection.dataset.floatingInit = '1';
    }

    // schedule auto-hide
    hideCartTimeout = setTimeout(() => {
        cartSection.classList.add('cart-hidden');
        hideCartTimeout = null;
    }, CART_HIDE_DELAY);
}

function renderProducts() {
    productListEl.innerHTML = '';
    products.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
        col.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="${p.image}" class="card-img-top" alt="${p.name}" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column"> 
                <h5 class="card-title">${p.name}</h5>
                <p class="card-text flex-grow-1">${p.desc}</p>
                <div class="mt-auto">
                    <p class="card-text"><strong class="text-primary fs-4">$${p.price.toFixed(2)}</strong></p>
                    <button class="btn btn-primary w-100" data-id="${p.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-2">
                            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
        `;
        productListEl.appendChild(col);
    });

    // attach handlers
    productListEl.querySelectorAll('button[data-id]').forEach(btn => {
        btn.addEventListener('click', () => addToCart(Number(btn.dataset.id)));
    });
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id) {
    const prod = products.find(p => p.id === id);
    let item = cart.find(it => it.id === id);
    if (item) item.qty++;
    else cart.push({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });
    saveCart();
    renderCart();
    // show floating cart and toggle side
    showFloatingCartToggle();
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(id);
    else saveCart();
    renderCart();
}

function renderCart() {
    cartEl.innerHTML = ""; 
    let total = 0;
    
    if (cart.length === 0) {
        cartEl.innerHTML = '<li class="list-group-item text-center text-muted">Your cart is empty</li>';
        totalEl.innerText = '0.00';
        cartCountEl.innerText = '0';
        checkoutFormEl.style.display = 'none';
        return;
    }
    
    cart.forEach(item => { 
        total += item.price * item.qty;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
        <div class="text-white">
            <strong>${item.name}</strong><br>
            $${item.price.toFixed(2)} x ${item.qty}
        </div>
        <div class="btn-group" role="group" aria-label="qty controls">
            <button class="btn btn-sm btn-warning" data-action="dec" data-id="${item.id}">-</button>
            <button class="btn btn-sm btn-success" data-action="inc" data-id="${item.id}">+</button>
            <button class="btn btn-sm btn-danger" data-action="rem" data-id="${item.id}">Remove</button>
        </div>  
        `;
        cartEl.appendChild(li);
    });
    totalEl.innerText = total.toFixed(2);
    cartCountEl.innerText = cart.reduce((s, i) => s + i.qty, 0);

    cartEl.querySelectorAll('button[data-action]').forEach(btn => {
        const id = Number(btn.dataset.id);
        if (btn.dataset.action === 'dec') btn.addEventListener('click', () => updateQty(id, -1));
        if (btn.dataset.action === 'inc') btn.addEventListener('click', () => updateQty(id, +1));
        if (btn.dataset.action === 'rem') btn.addEventListener('click', () => removeFromCart(id));
    });
    
    // toggle checkout form
    checkoutFormEl.style.display = 'block';
}

// Cart button handler
cartBtn.addEventListener('click', () => {
    const cartSection = document.getElementById('cart-section');
    cartSection.scrollIntoView({ behavior: 'smooth' });
});

// Checkout handler
document.getElementById('confirm-checkout').addEventListener('click', () => {
    const name = document.getElementById('customer-name').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    
    if (!name || !email || !address) {
        alert('Please fill in all checkout fields.');
        return;
    }
    
    // Validate Gmail email
    if (!email.includes('@gmail.com')) {
        alert('Please use a valid Gmail address (@gmail.com)');
        return;
    }
    
    if (!cart.length) {
        alert('Cart is empty.');
        return;
    }
    
    // Create order
    const order = {
        customer: { name, email, address },
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
        date: new Date().toISOString()
    };
    
    console.log('Order placed:', order);
    alert(`Thank you for your order, ${name}! Your order total is $${order.total.toFixed(2)}`);
    
    // Clear cart
    cart = [];
    saveCart();
    
    // Clear form
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-email').value = '';
    document.getElementById('customer-address').value = '';
    
    renderCart();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize e-commerce functionality (only on index page)
    if (document.getElementById('product-list')) {
        renderProducts();
        renderCart();
    }
});
        // Logout handler: remove user object and redirect to login
        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                try {
                    localStorage.removeItem('user');
                    window.location.href = 'index.html';
                } catch (e) { window.location.href = 'index.html'; }    
            });
        }
