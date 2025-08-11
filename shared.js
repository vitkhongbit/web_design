// Shared product data and common utilities for the site

// Product catalog
const productsData = {
  'Dame': {
    name: 'Dame',
    price: 899,
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: ['Grey Ash', 'Mustard', 'Metal Rhapsody']
  },
  'Mono': {
    name: 'Mono',
    price: 799,
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: ['Amazonian Blue', 'Dusty Rose']
  },
  'Framesets': {
    name: 'Framesets',
    price: 399,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: ['Grey Ash', 'Metal Rhapsody', 'Mustard']
  },
  'Trail Master': {
    name: 'Trail Master',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: ['Midnight Black', 'Racing Red']
  },
  'Speed Demon': {
    name: 'Speed Demon',
    price: 950,
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: ['Ocean Blue', 'Sunset Orange']
  },
  'Adventure Pro': {
    name: 'Adventure Pro',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: ['Forest Green', 'Royal Purple']
  }
};

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch (_) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCountDom() {
  const cartCountEl = document.querySelector('.cart-count');
  if (!cartCountEl) return;
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  cartCountEl.textContent = totalItems;
}

function addToCart(productName, selectedColor) {
  const cart = getCart();
  const product = productsData[productName];
  const defaultColor = (product && product.colors && product.colors[0]) ? product.colors[0] : 'Default';
  const color = selectedColor || defaultColor;

  const existingItem = cart.find(item => item.name === productName && item.color === color);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, color, quantity: 1 });
  }

  saveCart(cart);
  updateCartCountDom();
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  } catch (_) {
    return [];
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function isInWishlist(productName) {
  const wishlist = getWishlist();
  return wishlist.includes(productName);
}

function toggleWishlist(productName) {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productName);
  if (index >= 0) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productName);
  }
  saveWishlist(wishlist);
}

function checkAuthAndSetAccountButton() {
  const user = localStorage.getItem('user');
  const accountBtn = document.querySelector('.account-btn');
  if (!accountBtn) return;

  if (user) {
    accountBtn.onclick = function () {
      window.location.href = 'profile.html';
    };
    accountBtn.innerHTML = '<i class="fas fa-user"></i>';
  } else {
    accountBtn.onclick = function () {
      window.location.href = 'login.html';
    };
    accountBtn.innerHTML = '<i class="fas fa-user"></i>';
  }
}

function initHeaderScrollEffect() {
  const header = document.querySelector('.main-header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      header.style.backgroundColor = 'rgba(255,255,255,0.95)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.backgroundColor = '#fff';
      header.style.backdropFilter = 'none';
    }
  });
}

function initSearchButtonRouting() {
  const searchBtn = document.querySelector('.search-btn');
  if (!searchBtn) return;
  searchBtn.addEventListener('click', function () {
    if (window.location.pathname.endsWith('products.html')) {
      const searchInput = document.getElementById('productSearchInput');
      if (searchInput) {
        searchInput.focus();
        return;
      }
    }
    window.location.href = 'products.html#search';
  });
}

function initCommonHeader() {
  checkAuthAndSetAccountButton();
  updateCartCountDom();
  initHeaderScrollEffect();
  initSearchButtonRouting();
}

// Expose some functions for inline handlers if needed
window.productsData = productsData;
window.addToCart = addToCart;
window.updateCartCountDom = updateCartCountDom;
window.initCommonHeader = initCommonHeader;
window.getWishlist = getWishlist;
window.saveWishlist = saveWishlist;
window.toggleWishlist = toggleWishlist;
window.isInWishlist = isInWishlist;