/**
 * NexaStore Application Logic
 * Full client-side E-Commerce State Management & Interactions
 */

// Application State
const state = {
  products: PRODUCTS_DATA,
  filteredProducts: [...PRODUCTS_DATA],
  cart: JSON.parse(localStorage.getItem('nexastore_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('nexastore_wishlist')) || [],
  user: JSON.parse(localStorage.getItem('nexastore_user')) || null,
  orders: JSON.parse(localStorage.getItem('nexastore_orders')) || [],
  currentCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  activeCoupon: null,
  theme: localStorage.getItem('nexastore_theme') || 'dark',
};

// Available Coupons
const COUPONS = {
  'WELCOME10': { discount: 0.10, label: '10% Welcome Discount' },
  'SAVE20': { discount: 0.20, label: '20% Mega Savings' },
  'FREESHIP': { discount: 0, freeShipping: true, label: 'Free Shipping' }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
  renderProducts();
  updateBadges();
  checkAuthUI();
});

// Theme Management
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.innerHTML = state.theme === 'light' ? '🌙' : '☀️';
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('nexastore_theme', state.theme);
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.innerHTML = state.theme === 'light' ? '🌙' : '☀️';
  }
  showToast(`Switched to ${state.theme} mode`, 'info');
}

// Event Listeners
function setupEventListeners() {
  // Theme Toggle
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Search Input
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClearBtn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      if (searchClear) {
        searchClear.style.display = state.searchQuery ? 'block' : 'none';
      }
      filterAndSortProducts();
    });
  }
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      searchClear.style.display = 'none';
      filterAndSortProducts();
    });
  }

  // Category Tabs
  const categoryTabs = document.querySelectorAll('.category-tab');
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.currentCategory = tab.dataset.category;
      filterAndSortProducts();
    });
  });

  // Sort Select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      filterAndSortProducts();
    });
  }

  // Drawer Buttons
  document.getElementById('cartBtn')?.addEventListener('click', () => openDrawer('cartDrawer'));
  document.getElementById('wishlistBtn')?.addEventListener('click', () => openDrawer('wishlistDrawer'));
  document.getElementById('drawerBackdrop')?.addEventListener('click', closeAllDrawersAndModals);

  // Close buttons
  document.querySelectorAll('.drawer-close').forEach(btn => {
    btn.addEventListener('click', closeAllDrawersAndModals);
  });
  document.querySelectorAll('.modal-close-corner').forEach(btn => {
    btn.addEventListener('click', closeAllDrawersAndModals);
  });

  // User Button
  document.getElementById('userBtn')?.addEventListener('click', handleUserBtnClick);

  // Coupon form
  document.getElementById('couponForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('couponInput');
    applyCoupon(input.value.trim().toUpperCase());
  });

  // Checkout Form
  document.getElementById('checkoutForm')?.addEventListener('submit', handleCheckoutSubmit);

  // Auth Forms
  document.getElementById('loginForm')?.addEventListener('submit', handleLoginSubmit);
  document.getElementById('registerForm')?.addEventListener('submit', handleRegisterSubmit);
}

// Filtering & Sorting
function filterAndSortProducts() {
  let list = state.products.filter(item => {
    // Category match
    const categoryMatch = state.currentCategory === 'all' || item.category === state.currentCategory;
    // Search match
    const searchMatch = !state.searchQuery || 
      item.name.toLowerCase().includes(state.searchQuery) ||
      item.description.toLowerCase().includes(state.searchQuery) ||
      item.categoryLabel.toLowerCase().includes(state.searchQuery);
    return categoryMatch && searchMatch;
  });

  // Sort
  if (state.sortBy === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  state.filteredProducts = list;
  renderProducts();
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('resultsCount');
  
  if (countEl) {
    countEl.textContent = `Showing ${state.filteredProducts.length} ${state.filteredProducts.length === 1 ? 'product' : 'products'}`;
  }

  if (!grid) return;

  if (state.filteredProducts.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
        <div style="font-size: 3.5rem; margin-bottom: 1rem;">🔍</div>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">No products found</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Try adjusting your search or category filters.</p>
        <button class="btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = state.filteredProducts.map(p => {
    const isWishlisted = state.wishlist.includes(p.id);
    const badgeClass = `badge-${p.badgeType || 'hot'}`;
    const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');

    return `
      <div class="product-card" data-id="${p.id}">
        <div class="card-media-wrapper">
          <img 
            class="product-card-img" 
            src="${p.image}" 
            alt="${p.name}" 
            loading="lazy"
            onerror="this.onerror=null; this.src=getProductFallbackSvg('${p.name.replace(/'/g, '')}', '${p.category}');"
          />
          <span class="card-badge ${badgeClass}">${p.badge}</span>
          <button 
            class="wishlist-btn-corner ${isWishlisted ? 'active' : ''}" 
            onclick="toggleWishlist(${p.id})" 
            title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
          >
            ${isWishlisted ? '♥' : '♡'}
          </button>
        </div>
        
        <div class="card-body">
          <div class="card-category">${p.categoryLabel}</div>
          <h3 class="card-title">${p.name}</h3>
          
          <div class="card-rating">
            <span class="stars">${stars}</span>
            <span style="font-weight: 700; color: var(--text-primary);">${p.rating}</span>
            <span class="reviews-count">(${p.reviewsCount})</span>
          </div>

          <p class="card-desc">${p.description}</p>

          <div class="card-footer">
            <div class="price-box">
              <span class="current-price">$${p.price.toFixed(2)}</span>
              ${p.originalPrice ? `<span class="original-price">$${p.originalPrice.toFixed(2)}</span>` : ''}
            </div>

            <div class="card-actions">
              <button class="btn-card-quickview" onclick="openQuickView(${p.id})" title="Quick View">
                👁️
              </button>
              <button class="btn-add-cart" onclick="addToCart(${p.id})">
                + Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function resetFilters() {
  state.currentCategory = 'all';
  state.searchQuery = '';
  state.sortBy = 'featured';

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.category-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.category === 'all');
  });

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'featured';

  filterAndSortProducts();
}

// Cart Functionality
function addToCart(productId, qty = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    state.cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: qty
    });
  }

  saveCart();
  updateBadges();
  showToast(`Added ${product.name} to cart!`, 'success');
  renderCartDrawer();
}

function updateCartQty(productId, delta) {
  const itemIndex = state.cart.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    state.cart[itemIndex].quantity += delta;
    if (state.cart[itemIndex].quantity <= 0) {
      state.cart.splice(itemIndex, 1);
      showToast('Item removed from cart', 'info');
    }
  }
  saveCart();
  updateBadges();
  renderCartDrawer();
}

function removeCartItem(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
  updateBadges();
  renderCartDrawer();
  showToast('Item removed from cart', 'info');
}

function saveCart() {
  localStorage.setItem('nexastore_cart', JSON.stringify(state.cart));
}

// Wishlist Functionality
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const product = state.products.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed from Wishlist`, 'info');
  } else {
    state.wishlist.push(productId);
    showToast(`Added ${product?.name || 'item'} to Wishlist!`, 'success');
  }

  localStorage.setItem('nexastore_wishlist', JSON.stringify(state.wishlist));
  updateBadges();
  renderProducts();
  renderWishlistDrawer();
}

// Update Header Badges
function updateBadges() {
  const cartTotalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartBadge = document.getElementById('cartBadge');
  if (cartBadge) {
    cartBadge.textContent = cartTotalCount;
    cartBadge.style.display = cartTotalCount > 0 ? 'flex' : 'none';
  }

  const wishlistCount = state.wishlist.length;
  const wishlistBadge = document.getElementById('wishlistBadge');
  if (wishlistBadge) {
    wishlistBadge.textContent = wishlistCount;
    wishlistBadge.style.display = wishlistCount > 0 ? 'flex' : 'none';
  }
}

// Drawer Rendering
function renderCartDrawer() {
  const container = document.getElementById('cartItemsList');
  const footer = document.getElementById('cartDrawerFooter');
  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <h3>Your shopping cart is empty</h3>
        <p>Explore our trending gear and add your favorite items!</p>
        <button class="btn-primary" style="margin-top: 1.5rem;" onclick="closeAllDrawersAndModals()">Start Shopping</button>
      </div>
    `;
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';

  container.innerHTML = `
    <div class="drawer-items-list">
      ${state.cart.map(item => `
        <div class="cart-item">
          <img 
            class="cart-item-img" 
            src="${item.image}" 
            alt="${item.name}"
            onerror="this.onerror=null; this.src=getProductFallbackSvg('${item.name.replace(/'/g, '')}', '${item.category}');"
          />
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="qty-control">
              <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
              <span class="qty-display">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="removeCartItem(${item.id})" title="Remove">✕</button>
        </div>
      `).join('')}
    </div>
  `;

  // Calculate Totals
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discountAmount = 0;
  let shipping = subtotal > 50 ? 0 : 9.99;

  if (state.activeCoupon) {
    const couponInfo = COUPONS[state.activeCoupon];
    if (couponInfo) {
      if (couponInfo.discount) discountAmount = subtotal * couponInfo.discount;
      if (couponInfo.freeShipping) shipping = 0;
    }
  }

  const tax = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping + tax);

  document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('cartShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('cartGrandTotal').textContent = `$${grandTotal.toFixed(2)}`;

  const discountRow = document.getElementById('cartDiscountRow');
  if (discountRow) {
    if (discountAmount > 0) {
      discountRow.style.display = 'flex';
      document.getElementById('cartDiscount').textContent = `-$${discountAmount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }
}

function renderWishlistDrawer() {
  const container = document.getElementById('wishlistItemsList');
  if (!container) return;

  const wishlistProducts = state.products.filter(p => state.wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">♥</div>
        <h3>Your wishlist is empty</h3>
        <p>Save items you love here to easily purchase them later!</p>
        <button class="btn-primary" style="margin-top: 1.5rem;" onclick="closeAllDrawersAndModals()">Explore Catalog</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="drawer-items-list">
      ${wishlistProducts.map(p => `
        <div class="cart-item">
          <img 
            class="cart-item-img" 
            src="${p.image}" 
            alt="${p.name}"
            onerror="this.onerror=null; this.src=getProductFallbackSvg('${p.name.replace(/'/g, '')}', '${p.category}');"
          />
          <div class="cart-item-details">
            <h4 class="cart-item-name">${p.name}</h4>
            <div class="cart-item-price">$${p.price.toFixed(2)}</div>
            <button class="btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem; align-self: flex-start; margin-top: 0.5rem;" onclick="addToCart(${p.id}); toggleWishlist(${p.id});">
              Move to Cart
            </button>
          </div>
          <button class="cart-item-remove" onclick="toggleWishlist(${p.id})" title="Remove">✕</button>
        </div>
      `).join('')}
    </div>
  `;
}

// Coupons
function applyCoupon(code) {
  if (COUPONS[code]) {
    state.activeCoupon = code;
    showToast(`Coupon "${code}" applied: ${COUPONS[code].label}!`, 'success');
    renderCartDrawer();
  } else {
    showToast(`Invalid coupon code. Try WELCOME10 or SAVE20`, 'error');
  }
}

// Quick View Modal
function openQuickView(productId) {
  const p = state.products.find(item => item.id === productId);
  if (!p) return;

  const content = document.getElementById('quickViewContent');
  if (!content) return;

  const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');

  content.innerHTML = `
    <div class="quickview-container">
      <div>
        <img 
          class="quickview-img" 
          src="${p.image}" 
          alt="${p.name}"
          onerror="this.onerror=null; this.src=getProductFallbackSvg('${p.name.replace(/'/g, '')}', '${p.category}');"
        />
        <div style="margin-top: 0.75rem; font-size: 0.8rem; color: var(--text-secondary); text-align: center;">
          ⚡ In Stock (${p.stock} units available) • Free Express Shipping
        </div>
      </div>
      
      <div class="quickview-details">
        <div class="card-category">${p.categoryLabel}</div>
        <h2 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.5rem;">${p.name}</h2>
        
        <div class="card-rating">
          <span class="stars">${stars}</span>
          <span style="font-weight: 700;">${p.rating}</span>
          <span class="reviews-count">(${p.reviewsCount} customer reviews)</span>
        </div>

        <div style="font-size: 1.6rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem;">
          $${p.price.toFixed(2)}
          ${p.originalPrice ? `<span style="font-size: 1rem; color: var(--text-muted); text-decoration: line-through; margin-left: 0.5rem;">$${p.originalPrice.toFixed(2)}</span>` : ''}
        </div>

        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">${p.description}</p>

        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.4rem;">Key Highlights:</h4>
        <ul class="specs-list">
          ${p.specs.map(spec => `<li>${spec}</li>`).join('')}
        </ul>

        <div style="display: flex; gap: 0.75rem; margin-top: auto; padding-top: 1.5rem;">
          <button class="btn-primary" style="flex: 1;" onclick="addToCart(${p.id}); closeAllDrawersAndModals();">
            Add to Cart
          </button>
          <button class="btn-secondary" onclick="toggleWishlist(${p.id})">
            ${state.wishlist.includes(p.id) ? '♥ Saved' : '♡ Wishlist'}
          </button>
        </div>
      </div>
    </div>
  `;

  openModal('quickViewModal');
}

// Checkout Modal
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty! Add items first.', 'info');
    return;
  }
  closeAllDrawersAndModals();

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discountAmount = 0;
  let shipping = subtotal > 50 ? 0 : 9.99;
  if (state.activeCoupon && COUPONS[state.activeCoupon]) {
    if (COUPONS[state.activeCoupon].discount) discountAmount = subtotal * COUPONS[state.activeCoupon].discount;
    if (COUPONS[state.activeCoupon].freeShipping) shipping = 0;
  }
  const tax = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping + tax);

  document.getElementById('checkoutTotalDisplay').textContent = `$${grandTotal.toFixed(2)}`;
  
  // Pre-fill user if logged in
  if (state.user) {
    const nameInput = document.getElementById('checkoutName');
    const emailInput = document.getElementById('checkoutEmail');
    if (nameInput) nameInput.value = state.user.name || '';
    if (emailInput) emailInput.value = state.user.email || '';
  }

  openModal('checkoutModal');
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('checkoutName').value;
  const email = document.getElementById('checkoutEmail').value;
  const address = document.getElementById('checkoutAddress').value;
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'card';

  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const totalAmount = document.getElementById('checkoutTotalDisplay').textContent;

  const orderData = {
    orderId,
    customer: { name, email, address },
    items: [...state.cart],
    total: totalAmount,
    paymentMethod,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  };

  state.orders.unshift(orderData);
  localStorage.setItem('nexastore_orders', JSON.stringify(state.orders));

  // Clear cart
  state.cart = [];
  saveCart();
  updateBadges();

  closeAllDrawersAndModals();

  // Show order success modal
  const successModalContent = document.getElementById('orderSuccessContent');
  if (successModalContent) {
    successModalContent.innerHTML = `
      <div class="order-success-box">
        <div class="success-check-icon">✓</div>
        <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.5rem;">Thank You for Your Order!</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
          Order confirmation has been sent to <strong>${email}</strong>.
        </p>

        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; text-align: left; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="color: var(--text-secondary);">Order Number:</span>
            <strong style="color: var(--primary);">${orderId}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="color: var(--text-secondary);">Estimated Delivery:</span>
            <span>3 - 5 Business Days</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span style="color: var(--text-secondary);">Payment Method:</span>
            <span style="text-transform: capitalize;">${paymentMethod}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 1.1rem; border-top: 1px dashed var(--border-color); padding-top: 0.75rem; margin-top: 0.75rem;">
            <strong>Amount Paid:</strong>
            <strong style="color: var(--success);">${totalAmount}</strong>
          </div>
        </div>

        <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="closeAllDrawersAndModals()">
          Continue Shopping
        </button>
      </div>
    `;
    openModal('orderSuccessModal');
  }

  showToast(`Order placed successfully! (#${orderId})`, 'success');
}

// Auth Handlers
function handleUserBtnClick() {
  if (state.user) {
    openModal('profileModal');
    renderProfileModal();
  } else {
    openModal('authModal');
  }
}

function checkAuthUI() {
  const userBtnText = document.getElementById('userBtnText');
  if (userBtnText) {
    userBtnText.textContent = state.user ? state.user.name.split(' ')[0] : 'Sign In';
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (password.length < 6) {
    showToast('Password must be at least 6 characters', 'error');
    return;
  }

  const name = email.split('@')[0].replace('.', ' ');
  state.user = {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    email,
    token: 'jwt-mock-token-' + Date.now()
  };

  localStorage.setItem('nexastore_user', JSON.stringify(state.user));
  checkAuthUI();
  closeAllDrawersAndModals();
  showToast(`Welcome back, ${state.user.name}!`, 'success');
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  if (password.length < 6) {
    showToast('Password must be at least 6 characters', 'error');
    return;
  }

  state.user = {
    name,
    email,
    token: 'jwt-mock-token-' + Date.now()
  };

  localStorage.setItem('nexastore_user', JSON.stringify(state.user));
  checkAuthUI();
  closeAllDrawersAndModals();
  showToast(`Account created! Welcome, ${name}!`, 'success');
}

function logoutUser() {
  state.user = null;
  localStorage.removeItem('nexastore_user');
  checkAuthUI();
  closeAllDrawersAndModals();
  showToast('Logged out successfully', 'info');
}

function renderProfileModal() {
  const container = document.getElementById('profileModalContent');
  if (!container || !state.user) return;

  container.innerHTML = `
    <div style="padding: 2rem;">
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="width: 72px; height: 72px; border-radius: 50%; background: var(--primary); color: #fff; font-size: 2rem; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem;">
          ${state.user.name.charAt(0)}
        </div>
        <h3 style="font-size: 1.3rem; font-weight: 700;">${state.user.name}</h3>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">${state.user.email}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
          Your Order History (${state.orders.length})
        </h4>
        
        ${state.orders.length === 0 ? `
          <p style="color: var(--text-secondary); font-size: 0.85rem; text-align: center; padding: 1rem;">No orders placed yet.</p>
        ` : `
          <div style="max-height: 200px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem;">
            ${state.orders.map(o => `
              <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem; display: flex; justify-content: space-between;">
                <div>
                  <strong>${o.orderId}</strong>
                  <div style="color: var(--text-muted); font-size: 0.75rem;">${o.date} • ${o.items.length} items</div>
                </div>
                <strong style="color: var(--success);">${o.total}</strong>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <button class="btn-secondary" style="width: 100%; justify-content: center; color: var(--danger); border-color: rgba(239, 68, 68, 0.3);" onclick="logoutUser()">
        Log Out
      </button>
    </div>
  `;
}

// Drawer and Modal Controls
function openDrawer(drawerId) {
  closeAllDrawersAndModals();
  const drawer = document.getElementById(drawerId);
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer && backdrop) {
    if (drawerId === 'cartDrawer') renderCartDrawer();
    if (drawerId === 'wishlistDrawer') renderWishlistDrawer();
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function openModal(modalId) {
  closeAllDrawersAndModals();
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllDrawersAndModals() {
  document.querySelectorAll('.drawer').forEach(d => d.classList.remove('active'));
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  const backdrop = document.getElementById('drawerBackdrop');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

// Tab switcher for Login / Register modal
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tab}`)?.classList.add('active');
  
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  if (loginForm && registerForm) {
    loginForm.style.display = tab === 'login' ? 'block' : 'none';
    registerForm.style.display = tab === 'register' ? 'block' : 'none';
  }
}

// Toasts
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  };

  toast.innerHTML = `
    <span>${icons[type] || '•'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
