// auth middleware: redirect to login if not authenticated
(function requireAuth() {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || !user.loggedIn) {
      // remember where to go back after login
      try { localStorage.setItem('returnTo', window.location.pathname + window.location.search); } catch (e) { /* ignore */ }
      window.location.href = 'login.html';
      return;
    }
  } catch (e) {
    window.location.href = 'login.html';
  }
})();

// Simple admin UI to manage products stored in localStorage
function loadProducts() {
  const stored = localStorage.getItem('products');
  if (stored) return JSON.parse(stored);
  return [];
}
function saveProducts(list) { localStorage.setItem('products', JSON.stringify(list)); }

const adminList = document.getElementById('admin-list');
const form = document.getElementById('adminForm');
const idInput = document.getElementById('prod-id');
const nameInput = document.getElementById('prod-name');
const priceInput = document.getElementById('prod-price');
const imageInput = document.getElementById('prod-image');
const descInput = document.getElementById('prod-desc');

function renderAdmin() {
  const products = loadProducts();
  adminList.innerHTML = '';
  if (!products.length) { adminList.innerHTML = '<p class="text-muted">No products</p>'; return; }
  products.forEach(p => {
    const el = document.createElement('div');
    el.className = 'd-flex align-items-center justify-content-between mb-2';
    el.innerHTML = `
      <div>
        <strong>${p.name}</strong><br>
        <small>$${Number(p.price).toFixed(2)}</small>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-primary me-1" data-id="${p.id}" data-action="edit">Edit</button>
        <button class="btn btn-sm btn-outline-danger" data-id="${p.id}" data-action="del">Delete</button>
      </div>
    `;
    adminList.appendChild(el);
  });
}

function resetForm() { idInput.value = ''; nameInput.value=''; priceInput.value=''; imageInput.value=''; descInput.value=''; }

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const products = loadProducts();
  const id = idInput.value ? Number(idInput.value) : Date.now();

  // If a file was selected, read it as data URL before saving
  const file = imageInput.files && imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      const imgData = evt.target.result;
      const item = {
        id,
        name: nameInput.value.trim(),
        price: Number(priceInput.value),
        image: imgData,
        desc: descInput.value.trim()
      };
      const idx = products.findIndex(p => p.id === id);
      if (idx >= 0) products[idx] = item; else products.push(item);
      saveProducts(products);
      renderAdmin();
      resetForm();
      alert('Saved');
    };
    reader.readAsDataURL(file);
    return;
  }

  // No file selected — keep existing image or placeholder
  const existing = products.find(p => p.id === id);
  const item = {
    id,
    name: nameInput.value.trim(),
    price: Number(priceInput.value),
    image: imageInput.value.trim() || (existing ? existing.image : 'https://via.placeholder.com/400x300?text=No+Image'),
    desc: descInput.value.trim()
  };
  const idx = products.findIndex(p => p.id === id);
  if (idx >= 0) products[idx] = item; else products.push(item);
  saveProducts(products);
  renderAdmin();
  resetForm();
  alert('Saved');
});

adminList.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const action = btn.dataset.action;
  let products = loadProducts();
  if (action === 'del') {
    products = products.filter(p => p.id !== id);
    saveProducts(products);
    renderAdmin();
    return;
  }
  if (action === 'edit') {
    const p = products.find(x => x.id === id);
    idInput.value = p.id; nameInput.value = p.name; priceInput.value = p.price; imageInput.value = p.image; descInput.value = p.desc;
  }
});

document.getElementById('resetForm').addEventListener('click', resetForm);

// default list used when restoring defaults (should match script.js defaultProducts)
const RESTORE_DEFAULTS = [
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

// restore defaults handler
document.getElementById('restoreDefaults').addEventListener('click', () => {
  if (!confirm('Restore default product list? This will overwrite current products.')) return;
  saveProducts(RESTORE_DEFAULTS);
  renderAdmin();
  alert('Defaults restored. Reload index.html to see changes.');
});

renderAdmin();

// show preview when selecting a file
imageInput.addEventListener('change', () => {
  const file = imageInput.files && imageInput.files[0];
  const preview = document.getElementById('prod-image-preview');
  if (!file) { preview.style.display = 'none'; preview.src = ''; return; }
  const reader = new FileReader();
  reader.onload = (e) => { preview.src = e.target.result; preview.style.display = 'block'; };
  reader.readAsDataURL(file);
});
