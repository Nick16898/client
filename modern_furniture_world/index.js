/**
 * MODERN FURNITURE WORLD: INTERACTIVE SCRIPT
 * Native Vanilla ES6+ with Spring Physics Animations and Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. DATA REPOSITORY: 7 FLOORS OF FURNITURE PARADISE
  // ==========================================================================
  const FLOORS_DATA = {
    1: {
      category: 'Living & Grand Recliners',
      heading: 'High-Density Foam Sofas and Smart Motorized Recliners',
      desc: 'Step onto our main floor to test velvet L-shaped sectionals, high-resilience foam sofas, marble center tables, and motorized recliners that tilt smoothly with touch controls.',
      badge: 'Floor 1 • Ground',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      chips: ['L-Shape Sectionals', 'Smart Recliners', 'Nesting Coffee Tables', 'Console Desks', 'Accent Armchairs'],
      whatsappText: 'Hello Modern Furniture World, I would like to inquire about Floor 1 Living Room furniture.'
    },
    2: {
      category: 'Royal Dining & Banquets',
      heading: 'Italian Marble and Solid Teak Dining Collections',
      desc: 'Explore 6-seater and 8-seater dining suites, solid teakwood chairs with stain-resistant velvet cushions, compact 2-seater breakfast sets, and glass-door crockery displays.',
      badge: 'Floor 2 • Dining',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
      chips: ['Italian Marble Tables', '6-Seater Teak Suites', '8-Seater Luxury Sets', '2-Seater Coffee Nooks', 'Crockery Cabinets'],
      whatsappText: 'Hello Modern Furniture World, I would like to inquire about Floor 2 Dining Collections.'
    },
    3: {
      category: 'Sleepwell Authorized Gallery',
      heading: 'Orthopedic Mattresses and Master Bedroom Suites',
      desc: 'Our certified sleep lab lets you test doctor-recommended orthopedic memory foam mattresses, dual-comfort reversible beds, hydraulic storage king beds, and luxury padded headboards.',
      badge: 'Floor 3 • Sleep Lab',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      chips: ['Sleepwell Pro Nexa', 'Ortho Pro Mattresses', 'Hydraulic Storage Beds', 'Dual-Comfort Sets', 'Padded Headboards'],
      whatsappText: 'Hello Modern Furniture World, I would like to consult with your Sleepwell mattress specialist on Floor 3.'
    },
    4: {
      category: 'Traditional Jhulas & Heritage',
      heading: 'Handcrafted Solid Wood Swings and Royal Diwans',
      desc: 'Carved teakwood Gujarati jhulas with heavy brass chains, royal diwans, antique carved centerpieces, and traditional temple units built to last for generations.',
      badge: 'Floor 4 • Heritage',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      chips: ['Solid Teak Jhulas', 'Heavy Brass Chains', 'Royal Diwans', 'Antique Console Pieces', 'Temple Furniture'],
      whatsappText: 'Hello Modern Furniture World, I would like to know more about Handcrafted Teakwood Jhulas on Floor 4.'
    },
    5: {
      category: 'Smart Space-Saving & Studio Living',
      heading: 'Multi-Functional Problem-Solving Furniture for Modern Flats',
      desc: 'Clever furniture built for everyday convenience: hydraulic sofa-cum-beds, nesting tables, foldable wall-mounted work desks, and modular wardrobes with sliding mirrors.',
      badge: 'Floor 5 • Modular',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
      chips: ['Sofa-Cum-Beds', '3-in-1 Nesting Sets', 'Wall-Mounted Desks', 'Sliding Wardrobes', 'Compact Studio Units'],
      whatsappText: 'Hello Modern Furniture World, I want to explore Floor 5 Space-Saving Modular furniture.'
    },
    6: {
      category: 'Executive Office & Commercial',
      heading: 'Boss Desks, Ergonomic Mesh Chairs, and Conference Suites',
      desc: 'Complete commercial workspace solutions: high-back lumbar mesh chairs, executive mahogany boss desks, conference tables, reception stations, and lockable storage credenzas.',
      badge: 'Floor 6 • Commercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      chips: ['Ergonomic Mesh Chairs', 'Executive Boss Desks', 'Conference Tables', 'Storage Credenzas', 'Reception Desks'],
      whatsappText: 'Hello Modern Furniture World, I need a quotation for Floor 6 Commercial Office furniture.'
    },
    7: {
      category: 'Custom Design Studio & Workshop',
      heading: '100% Tailored Sizing, Fabric Library, and Factory Consult',
      desc: 'Sit with our senior designers. Browse 500+ fabric, velvet, and leatherette swatches, choose wood finishes, and have your dream furniture built to your exact room blueprint.',
      badge: 'Floor 7 • Design Studio',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      chips: ['500+ Fabric Swatches', 'Custom Wood Cuts', 'Blueprint Sizing', '3D Room Planning', 'Direct Factory Price'],
      whatsappText: 'Hello Modern Furniture World, I want to book a custom design consultation on Floor 7.'
    }
  };

  // ==========================================================================
  // 2. STICKY GLASSMORPHISM HEADER
  // ==========================================================================
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // ==========================================================================
  // 3. MOBILE NAVIGATION DRAWER
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const closeDrawer = document.getElementById('closeDrawer');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const toggleDrawer = (open) => {
    if (open) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleDrawer(true));
  }
  if (closeDrawer) {
    closeDrawer.addEventListener('click', () => toggleDrawer(false));
  }
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) toggleDrawer(false);
    });
  }
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  // ==========================================================================
  // 4. INTERACTIVE 7-FLOOR PARADISE EXPLORER
  // ==========================================================================
  const floorTabBtns = document.querySelectorAll('.floor-tab-btn');
  const floorImage = document.getElementById('floorImage');
  const floorBadge = document.getElementById('floorBadge');
  const floorCategory = document.getElementById('floorCategory');
  const floorHeading = document.getElementById('floorHeading');
  const floorDesc = document.getElementById('floorDesc');
  const floorChips = document.getElementById('floorChips');
  const floorInquireBtn = document.querySelector('.floor-action .btn-primary');

  floorTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const floorNum = btn.getAttribute('data-floor');
      const data = FLOORS_DATA[floorNum];
      if (!data) return;

      // Update active tab button
      floorTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Animate card content transition
      if (floorImage) {
        floorImage.style.opacity = '0.3';
        setTimeout(() => {
          floorImage.src = data.image;
          floorImage.alt = `${data.badge} - ${data.heading}`;
          floorImage.style.opacity = '1';
        }, 180);
      }

      if (floorBadge) floorBadge.textContent = data.badge;
      if (floorCategory) floorCategory.textContent = data.category;
      if (floorHeading) floorHeading.textContent = data.heading;
      if (floorDesc) floorDesc.textContent = data.desc;

      // Update chips
      if (floorChips) {
        floorChips.innerHTML = data.chips.map(chip => `<span class="chip">${chip}</span>`).join('');
      }

      // Update WhatsApp action link
      if (floorInquireBtn) {
        floorInquireBtn.href = `https://wa.me/918128232032?text=${encodeURIComponent(data.whatsappText)}`;
        floorInquireBtn.querySelector('span').textContent = `Inquire About Floor ${floorNum}`;
      }
    });
  });

  // Connect "Shop By Room" cards directly to 7-Floor Explorer
  const roomCards = document.querySelectorAll('.room-card[data-floor-target]');
  roomCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetFloor = card.getAttribute('data-floor-target');
      const targetBtn = document.querySelector(`.floor-tab-btn[data-floor="${targetFloor}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    });
  });

  // ==========================================================================
  // 5. PRODUCT SPOTLIGHT: INTERACTIVE FABRIC SWATCH PICKER
  // ==========================================================================
  const swatchBtns = document.querySelectorAll('.swatch-btn');
  const selectedColorName = document.getElementById('selectedColorName');
  const spotlightProductImg = document.getElementById('spotlightProductImg');
  const swatchWhatsappLink = document.getElementById('swatchWhatsappLink');

  swatchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const colorName = btn.getAttribute('data-color');
      const newImgSrc = btn.getAttribute('data-img');

      if (selectedColorName) {
        selectedColorName.textContent = colorName;
      }

      if (spotlightProductImg && newImgSrc) {
        spotlightProductImg.style.opacity = '0.3';
        spotlightProductImg.style.transform = 'scale(0.98)';
        
        // Preload image before fading in for seamless transition
        const preloader = new Image();
        preloader.src = newImgSrc;
        preloader.onload = () => {
          spotlightProductImg.src = newImgSrc;
          spotlightProductImg.alt = `The Royal Motorized Recliner in ${colorName}`;
          spotlightProductImg.style.opacity = '1';
          spotlightProductImg.style.transform = 'scale(1)';
        };

        // Fallback timer in case image is already cached
        setTimeout(() => {
          if (spotlightProductImg.style.opacity !== '1') {
            spotlightProductImg.src = newImgSrc;
            spotlightProductImg.style.opacity = '1';
            spotlightProductImg.style.transform = 'scale(1)';
          }
        }, 220);
      }

      if (swatchWhatsappLink) {
        const msg = `Hello Modern Furniture World, I am interested in The Royal Motorized Recliner in ${colorName}.`;
        swatchWhatsappLink.href = `https://wa.me/918128232032?text=${encodeURIComponent(msg)}`;
      }
    });
  });

  // ==========================================================================
  // 6. INTERACTIVE ROOM HOTSPOT SYSTEM
  // ==========================================================================
  const hotspotPins = document.querySelectorAll('.hotspot-pin');

  hotspotPins.forEach(pin => {
    const pulseBtn = pin.querySelector('.pin-pulse-btn');
    const closeBtn = pin.querySelector('.pop-close');

    if (pulseBtn) {
      pulseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = pin.classList.contains('active');
        hotspotPins.forEach(p => p.classList.remove('active'));
        if (!isActive) {
          pin.classList.add('active');
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        pin.classList.remove('active');
      });
    }
  });

  // Close hotspots when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.hotspot-pin')) {
      hotspotPins.forEach(p => p.classList.remove('active'));
    }
  });

  // ==========================================================================
  // 7. VERIFIED CUSTOMER REVIEWS CAROUSEL
  // ==========================================================================
  const reviewsTrack = document.getElementById('reviewsTrack');
  const prevReviewBtn = document.getElementById('prevReviewBtn');
  const nextReviewBtn = document.getElementById('nextReviewBtn');

  if (reviewsTrack && prevReviewBtn && nextReviewBtn) {
    const scrollCard = (direction) => {
      const firstCard = reviewsTrack.querySelector('.review-card');
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 380;
      const gap = 24; // 1.5rem gap
      reviewsTrack.scrollBy({
        left: direction * (cardWidth + gap),
        behavior: 'smooth'
      });
    };

    prevReviewBtn.addEventListener('click', () => scrollCard(-1));
    nextReviewBtn.addEventListener('click', () => scrollCard(1));
  }

  // ==========================================================================
  // 8. ACCESSIBLE MODALS: BOOKING & VIDEO TOUR
  // ==========================================================================
  const consultModal = document.getElementById('consultModal');
  const openConsultModalBtn = document.getElementById('openConsultModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');

  const videoModal = document.getElementById('videoModal');
  const playHeroVideoBtn = document.getElementById('playHeroVideoBtn');
  const closeVideoModalBtn = document.getElementById('closeVideoModalBtn');
  const videoModalBackdrop = document.getElementById('videoModalBackdrop');
  const showroomVideo = document.getElementById('showroomVideo');

  // Helper to open/close modal
  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Consultation Modal Triggers
  if (openConsultModalBtn) {
    openConsultModalBtn.addEventListener('click', () => openModal(consultModal));
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => closeModal(consultModal));
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', () => closeModal(consultModal));
  }

  // Video Modal Triggers
  if (playHeroVideoBtn) {
    playHeroVideoBtn.addEventListener('click', () => {
      openModal(videoModal);
      if (showroomVideo) {
        showroomVideo.currentTime = 0;
        showroomVideo.play().catch(() => {});
      }
    });
  }

  const closeVideo = () => {
    closeModal(videoModal);
    if (showroomVideo) {
      showroomVideo.pause();
    }
  };

  if (closeVideoModalBtn) closeVideoModalBtn.addEventListener('click', closeVideo);
  if (videoModalBackdrop) videoModalBackdrop.addEventListener('click', closeVideo);

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(consultModal);
      closeVideo();
      toggleDrawer(false);
    }
  });

  // ==========================================================================
  // 9. FORM SUBMISSIONS: DIRECT WHATSAPP APPOINTMENT
  // ==========================================================================
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('visitorName').value.trim();
      const phone = document.getElementById('visitorPhone').value.trim();
      const date = document.getElementById('visitDate').value;
      const category = document.getElementById('primaryCategory').value;
      const notes = document.getElementById('visitorNotes').value.trim();

      const message = `Hello Modern Furniture World,\n\nI would like to book a showroom walkthrough:\n- Name: ${name}\n- Phone: ${phone}\n- Date: ${date}\n- Primary Interest: ${category}${notes ? `\n- Notes: ${notes}` : ''}`;

      const waUrl = `https://wa.me/918128232032?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
      closeModal(consultModal);
      bookingForm.reset();
    });
  }

  const consultQuickForm = document.getElementById('consultQuickForm');
  if (consultQuickForm) {
    consultQuickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('quickPhone').value.trim();
      const message = `Hello Modern Furniture World, I would like to request a callback about home furniture for my number: ${phone}`;
      window.open(`https://wa.me/918128232032?text=${encodeURIComponent(message)}`, '_blank');
      consultQuickForm.reset();
    });
  }

  // ==========================================================================
  // 10. SCROLL REVEAL (FRAMER MOTION FEEL VIA INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

});
