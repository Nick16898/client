/* ============================================
   KANAIYA FOOTWEAR - WEBSITE SCRIPTS
   Vanilla JS, no dependencies
   ============================================ */

// ---------- NAVBAR SCROLL EFFECT ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---------- MOBILE MENU ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

function toggleMenu() {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
}

function closeMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
}

// Close menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeMenu();
});

// ---------- FAQ ACCORDION ----------
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isActive = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('active');
  });

  // Open clicked (if it wasn't already open)
  if (!isActive) {
    item.classList.add('active');
  }
}

// ---------- SCROLL ANIMATIONS ----------
function setupScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || '0');
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

// ---------- FLOATING CTA ----------
function setupFloatingCta() {
  const cta = document.getElementById('floatingCta');
  let shown = false;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400 && !shown) {
      cta.classList.add('visible');
      shown = true;
    }
  });

  // Also show after 3 seconds regardless
  setTimeout(() => {
    if (!shown) {
      cta.classList.add('visible');
      shown = true;
    }
  }, 3000);
}

// ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---------- REEL MODAL ----------
const reelModal = document.getElementById('reelModal');
const reelModalFrameContainer = document.getElementById('reelModalFrameContainer');
const reelModalTitle = document.getElementById('reelModalTitle');
const reelModalCaption = document.getElementById('reelModalCaption');
const reelModalPrice = document.getElementById('reelModalPrice');
const reelModalBadge = document.getElementById('reelModalBadge');
const reelModalWhatsApp = document.getElementById('reelModalWhatsApp');
const reelModalInstaLink = document.getElementById('reelModalInstaLink');

function openReelModal(code, title, caption, price, badge) {
  if (!reelModal) return;
  
  if (reelModalTitle) reelModalTitle.textContent = title || 'Instagram Reel';
  if (reelModalCaption) reelModalCaption.textContent = caption || '';
  if (reelModalPrice) reelModalPrice.textContent = price ? `Price / Offer: ${price}` : '';
  if (reelModalBadge) reelModalBadge.textContent = badge || 'INSTAGRAM REEL';

  if (reelModalFrameContainer) {
    reelModalFrameContainer.innerHTML = `
      <iframe 
        src="https://www.instagram.com/reel/${code}/embed/" 
        frameborder="0" 
        scrolling="no" 
        allowtransparency="true" 
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        style="width:100%;height:100%;border:none;">
      </iframe>
    `;
  }

  const encodedMsg = encodeURIComponent(`Hi Kanaiya Footwear, I am watching your Instagram Reel for "${title}" (${price || ''}) and want to order/inquire!`);
  if (reelModalWhatsApp) {
    reelModalWhatsApp.href = `https://wa.me/919313733354?text=${encodedMsg}`;
  }
  if (reelModalInstaLink) {
    reelModalInstaLink.href = `https://www.instagram.com/reel/${code}/`;
  }

  reelModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReelModal(e) {
  if (!reelModal) return;
  reelModal.classList.remove('open');
  if (reelModalFrameContainer) {
    reelModalFrameContainer.innerHTML = '';
  }
  document.body.style.overflow = '';
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && reelModal && reelModal.classList.contains('open')) {
    closeReelModal();
  }
});

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  setupScrollAnimations();
  setupFloatingCta();
});

