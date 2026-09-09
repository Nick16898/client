/**
 * ==========================================================================
 * KANAIYA FOOTWEAR (કનૈયા ફૂટવેર) - MODERN CLIENT APPLICATION JAVASCRIPT
 * Vanilla JS, Zero External Frameworks, High Performance
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initNavbar();
  initHeroSneakerStage();
  initShoeAnatomy();
  initCatalogFilters();
  initCardSizeSelectors();
  initFitFinder();
  initBagDrawer();
  initReelModal();
  initFaqAccordion();
  initStoreStatus();
  initScrollAnimations();
});

/* ---------- THEME SWITCHER (LIGHT & DARK MODE) ---------- */
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('themeToggleBtn');

  // Retrieve saved preference
  const savedTheme = localStorage.getItem('kanaiya-theme');
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('kanaiya-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('kanaiya-theme', 'light');
      }
    });
  }
}

/* ---------- 1. NAVBAR & MOBILE MENU ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when clicking any nav link
    navMenu.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ---------- 2. HERO SNEAKER 3D STAGE & COLORWAY SWITCHER ---------- */
function initHeroSneakerStage() {
  const stageContainer = document.getElementById('sneakerStageContainer');
  const heroSneakerImg = document.getElementById('heroSneakerImg');
  const colorwayButtons = document.querySelectorAll('.colorway-btn');
  const heroSpotlight = document.querySelector('.hero-ambient-spotlight');

  if (!stageContainer || !heroSneakerImg) return;

  // 3D Tilt on Mouse Move
  const heroStage = document.getElementById('heroVisualStage');
  if (heroStage) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateY = (x / (rect.width / 2)) * 14;
      const rotateX = -(y / (rect.height / 2)) * 14;

      stageContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    heroStage.addEventListener('mouseleave', () => {
      stageContainer.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  }

  // Colorway Switcher
  const colorways = {
    stealth: {
      src: 'photos/hero_sneaker_black.jpg',
      alt: 'Kanaiya Velocity Stealth Edition',
      glow: 'radial-gradient(circle, rgba(255, 94, 30, 0.25) 0%, rgba(200, 255, 0, 0.08) 45%, transparent 70%)',
      title: 'Stealth Black'
    },
    orange: {
      src: 'photos/hero_sneaker_orange.jpg',
      alt: 'Kanaiya Velocity Cyber Flame Edition',
      glow: 'radial-gradient(circle, rgba(255, 110, 0, 0.35) 0%, rgba(255, 190, 0, 0.1) 50%, transparent 70%)',
      title: 'Cyber Flame'
    },
    volt: {
      src: 'photos/hero_sneaker_black.jpg',
      alt: 'Kanaiya Velocity Volt Edition',
      glow: 'radial-gradient(circle, rgba(200, 255, 0, 0.3) 0%, rgba(0, 229, 255, 0.1) 50%, transparent 70%)',
      title: 'Electric Volt'
    }
  };

  colorwayButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.dataset.color;
      if (!colorways[color]) return;

      colorwayButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Smooth swap
      heroSneakerImg.style.opacity = '0';
      heroSneakerImg.style.transform = 'scale(0.95)';

      setTimeout(() => {
        heroSneakerImg.src = colorways[color].src;
        heroSneakerImg.alt = colorways[color].alt;
        if (heroSpotlight) {
          heroSpotlight.style.background = colorways[color].glow;
        }
        heroSneakerImg.style.opacity = '1';
        heroSneakerImg.style.transform = 'scale(1)';
      }, 200);
    });
  });
}

/* ---------- 3. SHOE ANATOMY INTERACTIVE HOTSPOTS ---------- */
function initShoeAnatomy() {
  const featureItems = document.querySelectorAll('.anatomy-feature-item');
  const visualCard = document.getElementById('anatomyVisualCard');

  featureItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      featureItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/* ---------- 4. FOOTWEAR CATALOG FILTERING ---------- */
function initCatalogFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.footwear-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.dataset.filter;

      cards.forEach(card => {
        const cardCat = card.dataset.category || '';
        const isOffer = card.dataset.offer === 'true';

        if (filterCategory === 'all') {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else if (filterCategory === 'offers') {
          if (isOffer) {
            card.style.display = 'flex';
            setTimeout(() => card.style.opacity = '1', 50);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        } else if (cardCat === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
}

/* ---------- 5. IN-CARD SIZE SELECTORS & WHATSAPP ORDERS ---------- */
function initCardSizeSelectors() {
  const cards = document.querySelectorAll('.footwear-card');

  cards.forEach(card => {
    const sizePills = card.querySelectorAll('.size-pill');
    const whatsappBtn = card.querySelector('.card-btn-whatsapp');
    const shoeTitle = card.querySelector('.card-title')?.textContent.trim() || 'Footwear';
    const shoePrice = card.querySelector('.card-price-current')?.textContent.trim() || '';

    let currentSize = '8'; // Default UK size

    sizePills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        sizePills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        currentSize = pill.dataset.size;
        updateWhatsAppLink();
      });
    });

    function updateWhatsAppLink() {
      if (!whatsappBtn) return;
      const text = encodeURIComponent(`Hi Kanaiya Footwear (Manavadar), I want to order "${shoeTitle}" (Size UK ${currentSize}) at ${shoePrice}. Is it in stock?`);
      whatsappBtn.href = `https://wa.me/919313733354?text=${text}`;
    }

    // Set initial link
    updateWhatsAppLink();
  });
}

/* ---------- 6. INTERACTIVE FIT & SIZE FINDER ---------- */
function initFitFinder() {
  const slider = document.getElementById('footLengthSlider');
  const cmDisplay = document.getElementById('footLengthDisplay');
  const resultSize = document.getElementById('fitResultNumber');
  const resultTip = document.getElementById('fitResultTip');
  const brandButtons = document.querySelectorAll('.fit-brand-btn');

  if (!slider || !resultSize) return;

  function calculateSize(cm) {
    let size = 8;
    let tip = 'True to standard Indian & UK sizing with built-in cushion comfort.';

    if (cm <= 24.5) {
      size = 6;
      tip = 'Ideal for smaller feet or youth sizing. Generous toe box.';
    } else if (cm <= 25.5) {
      size = 7;
      tip = 'Snug and responsive athletic fit with heel-locking cushion.';
    } else if (cm <= 26.5) {
      size = 8;
      tip = 'Standard Indian average size. Fits perfectly true to size.';
    } else if (cm <= 27.5) {
      size = 9;
      tip = 'Optimal comfort with ergonomic arch support cushion.';
    } else if (cm <= 28.5) {
      size = 10;
      tip = 'Spacious fit with high shock absorption for all-day wear.';
    } else if (cm <= 29.5) {
      size = 11;
      tip = 'Extra room for broad feet and high instep comfort.';
    } else {
      size = 12;
      tip = 'Large comfort size with reinforced heel cup and grip.';
    }

    resultSize.innerHTML = `UK ${size} <span>/ IND</span>`;
    if (resultTip) resultTip.textContent = tip;
  }

  slider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    if (cmDisplay) cmDisplay.textContent = `${val.toFixed(1)} cm`;
    calculateSize(val);
  });

  brandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      brandButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ---------- 7. WHATSAPP BAG DRAWER SYSTEM ---------- */
let cart = [];

function initBagDrawer() {
  const openBagBtn = document.getElementById('openBagBtn');
  const closeBagBtn = document.getElementById('closeBagBtn');
  const bagDrawer = document.getElementById('bagDrawerBackdrop');
  const bagItemsList = document.getElementById('bagItemsList');
  const bagSubtotal = document.getElementById('bagSubtotal');
  const checkoutWhatsAppBtn = document.getElementById('checkoutWhatsAppBtn');
  const bagBadge = document.getElementById('bagCountBadge');

  if (!bagDrawer) return;

  function renderCart() {
    if (!bagItemsList) return;

    if (cart.length === 0) {
      bagItemsList.innerHTML = `
        <div class="bag-empty-state">
          <div class="bag-empty-icon">🛍️</div>
          <p>Your footwear order bag is empty.</p>
          <span style="font-size:13px; color:var(--text-muted); margin-top:6px;">Select any shoe and click the bag icon to add it.</span>
        </div>
      `;
      if (bagSubtotal) bagSubtotal.textContent = '₹0';
      if (bagBadge) bagBadge.textContent = '0';
      if (checkoutWhatsAppBtn) {
        checkoutWhatsAppBtn.href = '#';
        checkoutWhatsAppBtn.style.opacity = '0.5';
        checkoutWhatsAppBtn.style.pointerEvents = 'none';
      }
      return;
    }

    if (bagBadge) bagBadge.textContent = cart.length;
    if (checkoutWhatsAppBtn) {
      checkoutWhatsAppBtn.style.opacity = '1';
      checkoutWhatsAppBtn.style.pointerEvents = 'auto';
    }

    let total = 0;
    bagItemsList.innerHTML = '';

    cart.forEach((item, index) => {
      total += item.price;
      const card = document.createElement('div');
      card.className = 'bag-item-card';
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}" class="bag-item-thumb">
        <div class="bag-item-details">
          <div class="bag-item-name">${item.title}</div>
          <div class="bag-item-spec">Size: UK ${item.size} • ${item.category}</div>
          <div class="bag-item-price">₹${item.price.toLocaleString()}</div>
        </div>
        <button class="bag-item-remove" data-index="${index}" aria-label="Remove item">&times;</button>
      `;
      bagItemsList.appendChild(card);
    });

    if (bagSubtotal) bagSubtotal.textContent = `₹${total.toLocaleString()}`;

    // Format WhatsApp checkout order text
    let orderMsg = `*NEW ORDER - KANAIYA FOOTWEAR (MANAVADAR)*\n\n`;
    cart.forEach((item, idx) => {
      orderMsg += `${idx + 1}. *${item.title}*\n   Size: UK ${item.size}\n   Price: ₹${item.price}\n\n`;
    });
    orderMsg += `*TOTAL AMOUNT:* ₹${total.toLocaleString()}\n`;
    orderMsg += `*Delivery Location:* Manavadar / Gujarat\n\nPlease confirm availability and payment details!`;

    if (checkoutWhatsAppBtn) {
      checkoutWhatsAppBtn.href = `https://wa.me/919313733354?text=${encodeURIComponent(orderMsg)}`;
    }

    // Attach remove handlers
    bagItemsList.querySelectorAll('.bag-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        cart.splice(idx, 1);
        renderCart();
      });
    });
  }

  // Open & Close
  if (openBagBtn) {
    openBagBtn.addEventListener('click', () => {
      bagDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      renderCart();
    });
  }

  if (closeBagBtn) {
    closeBagBtn.addEventListener('click', () => {
      bagDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  bagDrawer.addEventListener('click', (e) => {
    if (e.target === bagDrawer) {
      bagDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Attach "Add to Bag" buttons on product cards
  document.querySelectorAll('.card-btn-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.footwear-card');
      if (!card) return;

      const title = card.querySelector('.card-title')?.textContent.trim() || 'Footwear';
      const img = card.querySelector('.card-media-box img')?.src || 'photos/hero_sneaker_black.jpg';
      const cat = card.querySelector('.card-category')?.textContent.trim() || 'Footwear';
      const priceText = card.querySelector('.card-price-current')?.textContent.replace(/[^0-9]/g, '') || '999';
      const price = parseInt(priceText) || 999;
      const sizeSelected = card.querySelector('.size-pill.selected')?.dataset.size || '8';

      cart.push({
        title,
        img,
        category: cat,
        price,
        size: sizeSelected
      });

      // Animate bag icon
      if (bagBadge) {
        bagBadge.textContent = cart.length;
        bagBadge.style.transform = 'scale(1.4)';
        setTimeout(() => bagBadge.style.transform = 'scale(1)', 200);
      }

      // Briefly open drawer to confirm
      bagDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      renderCart();
    });
  });
}

/* ---------- 8. INSTAGRAM REELS MODAL ---------- */
function initReelModal() {
  const modal = document.getElementById('reelModal');
  const iframeContainer = document.getElementById('reelModalIframe');
  const reelTitle = document.getElementById('reelModalTitle');
  const reelCaption = document.getElementById('reelModalCaption');
  const reelPrice = document.getElementById('reelModalPrice');
  const reelWhatsApp = document.getElementById('reelModalWhatsApp');
  const reelInstaLink = document.getElementById('reelModalInstaLink');
  const closeBtn = document.getElementById('reelModalClose');

  if (!modal) return;

  window.openModernReel = function(code, title, caption, price, tag) {
    if (reelTitle) reelTitle.textContent = title;
    if (reelCaption) reelCaption.textContent = caption;
    if (reelPrice) reelPrice.textContent = price ? `Price: ${price}` : 'Store Inquiries Welcome';

    if (iframeContainer) {
      iframeContainer.innerHTML = `
        <iframe 
          src="https://www.instagram.com/reel/${code}/embed/" 
          frameborder="0" 
          scrolling="no" 
          allowtransparency="true" 
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          style="width:100%;height:100%;min-height:520px;border:none;">
        </iframe>
      `;
    }

    const msg = encodeURIComponent(`Hi Kanaiya Footwear, I am watching your Instagram Reel for "${title}" (${price}) and want to order it!`);
    if (reelWhatsApp) reelWhatsApp.href = `https://wa.me/919313733354?text=${msg}`;
    if (reelInstaLink) reelInstaLink.href = `https://www.instagram.com/reel/${code}/`;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.remove('open');
    if (iframeContainer) iframeContainer.innerHTML = '';
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ---------- 9. FAQ ACCORDION ---------- */
function initFaqAccordion() {
  const cards = document.querySelectorAll('.faq-card');

  cards.forEach(card => {
    const trigger = card.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      cards.forEach(c => c.classList.remove('active'));
      if (!isActive) card.classList.add('active');
    });
  });
}

/* ---------- 10. REAL-TIME STORE HOURS STATUS ---------- */
function initStoreStatus() {
  const statusPill = document.getElementById('storeStatusPill');
  if (!statusPill) return;

  // Manavadar Time (IST = UTC + 5:30)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istDate = new Date(utc + (3600000 * 5.5));

  const day = istDate.getDay(); // 0 = Sunday
  const hour = istDate.getHours();
  const minutes = istDate.getMinutes();
  const timeInMinutes = hour * 60 + minutes;

  let isOpen = false;

  if (day === 0) {
    // Sunday: 9:30 AM (570) to 3:00 PM (900)
    isOpen = (timeInMinutes >= 570 && timeInMinutes <= 900);
  } else {
    // Mon-Sat: 9:30 AM (570) to 9:00 PM (1260)
    isOpen = (timeInMinutes >= 570 && timeInMinutes <= 1260);
  }

  if (isOpen) {
    statusPill.className = 'store-status-pill status-open';
    statusPill.innerHTML = '<span class="pulse-dot" style="background:#25D366;width:7px;height:7px;border-radius:50%;display:inline-block;"></span> Open Now in Manavadar';
  } else {
    statusPill.className = 'store-status-pill';
    statusPill.style.background = 'rgba(255,255,255,0.08)';
    statusPill.style.color = '#fff';
    statusPill.innerHTML = 'Opens 9:30 AM Tomorrow';
  }
}

/* ---------- 11. SMOOTH SCROLL REVEAL ANIMATIONS ---------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
