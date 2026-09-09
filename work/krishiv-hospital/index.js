/**
 * Krishiv Hospital and I.C.U - Interactive Script
 * Features: Live ECG canvas monitor, consultation booking modal with WhatsApp integration,
 * mobile drawer, FAQ accordion, smooth scroll, and vital metrics counter.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveEcg();
  initHeaderScroll();
  initMobileDrawer();
  initFaqAccordion();
  initAppointmentModal();
  initMetricsCounter();
  initCardMicroInteractions();
});

/**
 * 1. Live ECG Monitor Canvas
 * Simulates a continuous hospital ICU cardiac rhythm waveform
 */
function initLiveEcg() {
  const canvas = document.getElementById('heroEcgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const midY = height / 2;

  let x = 0;
  let history = [];

  // Waveform generation parameters
  let step = 0;
  const cycleLength = 70;

  function getEcgY(t) {
    const progress = t % cycleLength;
    if (progress < 20) {
      // Baseline
      return midY;
    } else if (progress >= 20 && progress < 25) {
      // P wave (slight bump)
      return midY - 3;
    } else if (progress >= 25 && progress < 30) {
      // PR interval
      return midY;
    } else if (progress >= 30 && progress < 32) {
      // Q drop
      return midY + 4;
    } else if (progress >= 32 && progress < 36) {
      // R spike (tall upward spike)
      return midY - 10;
    } else if (progress >= 36 && progress < 39) {
      // S drop (downward spike)
      return midY + 6;
    } else if (progress >= 39 && progress < 46) {
      // ST segment
      return midY;
    } else if (progress >= 46 && progress < 54) {
      // T wave (rounded recovery wave)
      return midY - 4;
    } else {
      // Baseline return
      return midY;
    }
  }

  function renderEcg() {
    step += 1.5;
    const currentY = getEcgY(step);

    history.push({ x: x, y: currentY });
    if (history.length > width) {
      history.shift();
    }

    ctx.clearRect(0, 0, width, height);

    // Draw the ECG line
    ctx.beginPath();
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = '#0284c7';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < history.length; i++) {
      const point = history[i];
      const screenX = i;
      if (i === 0) {
        ctx.moveTo(screenX, point.y);
      } else {
        ctx.lineTo(screenX, point.y);
      }
    }
    ctx.stroke();

    // Pulse head glow
    if (history.length > 0) {
      const lastPoint = history[history.length - 1];
      ctx.beginPath();
      ctx.arc(history.length - 1, lastPoint.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(renderEcg);
  }

  renderEcg();
}

/**
 * 2. Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * 3. Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * 4. FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other open items for a neat accordion experience
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/**
 * 5. Appointment & Consultation Modal with WhatsApp Dispatch
 */
function initAppointmentModal() {
  const modal = document.getElementById('appointmentModal');
  const openBtns = [
    document.getElementById('openAppointmentBtn'),
    document.getElementById('heroBookBtn'),
    document.getElementById('aboutConsultBtn')
  ].filter(Boolean);

  const closeBtn = document.getElementById('closeModalBtn');
  const form = document.getElementById('appointmentForm');
  const successBox = document.getElementById('formSuccessMessage');
  const resetBtn = document.getElementById('resetModalBtn');

  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close when clicking background outside the card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Handle form submission and WhatsApp routing
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('patientName').value.trim();
      const phone = document.getElementById('patientPhone').value.trim();
      const type = document.getElementById('visitType').value;
      const date = document.getElementById('preferredDate').value || 'Immediate / Next Available';
      const symptoms = document.getElementById('symptomsDesc').value.trim() || 'No specific notes provided';

      // Build WhatsApp message
      const textLines = [
        '*NEW PATIENT APPOINTMENT REQUEST*',
        'Hospital: Krishiv Hospital and I.C.U, Junagadh',
        'Doctor: Dr. Pinank Mer (M.D. Physician)',
        '-------------------------------',
        '*Patient Name:* ' + name,
        '*Contact Phone:* ' + phone,
        '*Requirement:* ' + type,
        '*Preferred Date:* ' + date,
        '*Symptoms / Reason:* ' + symptoms,
        '-------------------------------',
        'Sent via krishivhospital.in website booking'
      ];

      const encodedText = encodeURIComponent(textLines.join('\n'));
      const whatsappUrl = 'https://wa.me/919328823775?text=' + encodedText;

      // Show success in modal
      form.style.display = 'none';
      if (successBox) successBox.classList.add('show');

      // Open WhatsApp in new tab after a brief pause
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 700);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (form) {
        form.reset();
        form.style.display = 'flex';
      }
      if (successBox) successBox.classList.remove('show');
    });
  }
}

/**
 * 6. Animated Metrics Counter
 */
function initMetricsCounter() {
  const metricCards = document.querySelectorAll('.metric-card');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  metricCards.forEach(card => observer.observe(card));
}

/**
 * 7. Subtle Card Micro-Interactions
 * Gentle 3D perspective tilt on hover for desktop devices
 */
function initCardMicroInteractions() {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const tiltCards = document.querySelectorAll('.tech-box, .spec-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        const rotateX = deltaY * -3;
        const rotateY = deltaX * 3;

        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}
