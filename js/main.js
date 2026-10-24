// BEAST GYM & FITNESS - MAIN JAVASCRIPT

// ─── NAVIGATION & GLOSSY SCROLL ───
const nav = document.getElementById('main-nav');
const announcementBar = document.getElementById('announcement-bar');
const announcementClose = document.getElementById('announcement-close');
const navToggle = document.getElementById('nav-toggle');
const navDrawer = document.getElementById('nav-drawer');
const navOverlay = document.getElementById('nav-overlay');

function updateNavPosition() {
  if (!nav) return;
  if (announcementBar && announcementBar.style.display !== 'none') {
    nav.classList.add('has-announcement');
  } else {
    nav.classList.remove('has-announcement');
  }
}

window.addEventListener('scroll', () => {
  if (!nav) return;
  if (window.scrollY > 20) {
    nav.classList.add('nav--scrolled');
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
    nav.classList.remove('scrolled');
  }
}, { passive: true });

if (announcementClose) {
  announcementClose.addEventListener('click', () => {
    if (announcementBar) announcementBar.style.display = 'none';
    if (nav) nav.classList.remove('has-announcement');
  });
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navDrawer.classList.toggle('open');
    if (navOverlay) navOverlay.classList.toggle('open', isOpen);
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}

if (navOverlay) {
  navOverlay.addEventListener('click', closeDrawer);
}

function closeDrawer() {
  if (navDrawer) navDrawer.classList.remove('open');
  if (navOverlay) navOverlay.classList.remove('open');
  if (navToggle) {
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDrawer();
});

// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── MEMBERSHIP PRICING TOGGLE ───
const toggleBtns = document.querySelectorAll('.membership__toggle-btn');
const membershipPrices = document.querySelectorAll('[data-price]');

toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const period = btn.dataset.period;
    updatePrices(period);
  });
});

function updatePrices(period) {
  membershipPrices.forEach(el => {
    const price = el.dataset[period];
    if (price !== undefined) {
      el.textContent = price;
    }
  });
  document.querySelectorAll('.membership-card__period').forEach(el => {
    el.textContent = period === 'monthly' ? '/ month' : period === 'quarterly' ? '/ quarter' : '/ year';
  });
}

// ─── GALLERY LIGHTBOX ───
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item[data-src]');
let currentGalleryIndex = 0;

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentGalleryIndex = index;
    openLightbox(item.dataset.src, item.dataset.alt || '');
  });
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      currentGalleryIndex = index;
      openLightbox(item.dataset.src, item.dataset.alt || '');
    }
  });
});

function openLightbox(src, alt) {
  if (!lightbox) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lightbox.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
}
if (lightboxPrev) {
  lightboxPrev.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentGalleryIndex];
    openLightbox(item.dataset.src, item.dataset.alt || '');
  });
}
if (lightboxNext) {
  lightboxNext.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    const item = galleryItems[currentGalleryIndex];
    openLightbox(item.dataset.src, item.dataset.alt || '');
  });
}

document.addEventListener('keydown', (e) => {
  if (!lightbox || !lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
  if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
});

// ─── MAP LOAD ON CLICK ───
const mapPlaceholder = document.getElementById('map-placeholder');
const mapFrame = document.getElementById('map-frame');

if (mapPlaceholder && mapFrame) {
  mapPlaceholder.addEventListener('click', () => {
    mapPlaceholder.classList.add('hidden');
    mapFrame.style.display = 'block';
  });
}

// ─── WHATSAPP ENQUIRY FORM ───
const enquiryForm = document.getElementById('enquiry-form');

if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const goal = document.getElementById('goal').value;
    const plan = document.getElementById('plan')?.value || '';
    const time = document.getElementById('visit-time')?.value || '';
    const message = document.getElementById('message')?.value.trim() || '';

    let waMsg = `Hello Beast Gym & Fitness!\n\n` +
      `My name is: ${name}\n` +
      `My contact number is: ${phone}\n` +
      `My fitness goal is: ${goal}`;
    if (plan) waMsg += `\nMy preferred membership is: ${plan}`;
    if (time) waMsg += `\nMy preferred visit time is: ${time}`;
    if (message) waMsg += `\nAdditional notes: ${message}`;
    waMsg += `\n\nI would like to know more about memberships and available training options.\n\nThank you!`;

    const encodedMsg = encodeURIComponent(waMsg);
    const waUrl = `https://wa.me/917092030786?text=${encodedMsg}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

function validateForm() {
  let valid = true;
  const required = ['name', 'phone', 'goal'];
  required.forEach(id => {
    const field = document.getElementById(id);
    const error = document.getElementById(id + '-error');
    if (field && !field.value.trim()) {
      field.classList.add('error');
      if (error) error.classList.add('visible');
      valid = false;
    } else if (field) {
      field.classList.remove('error');
      if (error) error.classList.remove('visible');
    }
  });

  const phone = document.getElementById('phone');
  const phoneError = document.getElementById('phone-error');
  if (phone && phone.value.trim()) {
    const cleaned = phone.value.replace(/[\s\-\(\)\.]/g, '');
    if (!/^\+?[0-9]{10,15}$/.test(cleaned)) {
      phone.classList.add('error');
      if (phoneError) { phoneError.textContent = 'Please enter a valid phone number.'; phoneError.classList.add('visible'); }
      valid = false;
    }
  }
  return valid;
}

['name','phone','goal'].forEach(id => {
  const field = document.getElementById(id);
  if (field) {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const error = document.getElementById(id + '-error');
      if (error) error.classList.remove('visible');
    });
  }
});

// ─── FAQ ACCORDION ───
function setupFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.onclick = function(e) {
      e.preventDefault();
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');
      
      // Close all items
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    };
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupFaqAccordion);
} else {
  setupFaqAccordion();
}

// ─── GALLERY CATEGORY FILTER ───
window.filterGallery = function(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
};

// ─── SUPPLEMENTS CATEGORY FILTER ───
window.filterCategory = function(cat, btn) {
  const buttons = document.querySelectorAll('.cat-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.prod-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-cat');
    if (cat === 'all' || cardCat === cat) {
      card.style.display = 'flex';
      card.style.animation = 'bgm-fadeIn 0.3s ease both';
    } else {
      card.style.display = 'none';
    }
  });
};

// ─── PLAN PREFILL & MODAL LAUNCH ───
function openEnquiryWithPlan(plan) {
  if (typeof openJoinModal === 'function') {
    openJoinModal(plan);
    return;
  }
  const planSelect = document.getElementById('plan');
  if (planSelect) planSelect.value = plan;
  const enquiry = document.getElementById('enquiry');
  if (enquiry) {
    enquiry.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.location.href = 'contact.html?plan=' + encodeURIComponent(plan);
  }
}

// ─── JOIN NOW MODAL SYSTEM ───
function injectJoinModalDOM() {
  if (document.getElementById('join-modal')) return;

  const modalHtml = `
  <div id="join-modal" class="join-modal" role="dialog" aria-modal="true" aria-labelledby="join-modal-title" aria-hidden="true">
    <div class="join-modal__backdrop" id="join-modal-backdrop"></div>
    <div class="join-modal__dialog">
      <button type="button" class="join-modal__close" id="join-modal-close" aria-label="Close Join Form">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      
      <div class="join-modal__header">
        <div class="join-modal__badge">
          <span class="join-modal__badge-dot"></span>
          <span>BEAST GYM &amp; FITNESS • UNISEX</span>
        </div>
        <h2 id="join-modal-title" class="join-modal__title">START YOUR TRANSFORMATION</h2>
        <p class="join-modal__subtitle">
          Fill out your details below. Our team will instantly receive your enquiry on WhatsApp (+91 70920 30786) and confirm your membership details!
        </p>
      </div>

      <form id="join-modal-form" class="join-modal__form" novalidate>
        <div class="join-modal__field">
          <label for="jm-name" class="join-modal__label">Full Name <span class="req">*</span></label>
          <div class="join-modal__input-wrapper">
            <svg class="join-modal__input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <input type="text" id="jm-name" name="name" class="join-modal__input" placeholder="e.g. Rahul Sharma" required autocomplete="name">
          </div>
          <div id="jm-name-error" class="join-modal__error">Please enter your name.</div>
        </div>

        <div class="join-modal__field">
          <label for="jm-phone" class="join-modal__label">WhatsApp / Mobile Number <span class="req">*</span></label>
          <div class="join-modal__input-wrapper">
            <svg class="join-modal__input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <input type="tel" id="jm-phone" name="phone" class="join-modal__input" placeholder="e.g. +91 98765 43210" required autocomplete="tel">
          </div>
          <div id="jm-phone-error" class="join-modal__error">Please enter a valid 10-digit phone number.</div>
        </div>

        <div class="join-modal__row">
          <div class="join-modal__field">
            <label for="jm-goal" class="join-modal__label">Primary Goal <span class="req">*</span></label>
            <div class="join-modal__select-wrapper">
              <select id="jm-goal" name="goal" class="join-modal__select" required>
                <option value="">Select your goal</option>
                <option value="Fat Loss & Toning">Fat Loss &amp; Toning</option>
                <option value="Muscle Building & Strength">Muscle Building &amp; Strength</option>
                <option value="1-on-1 Personal Coaching">1-on-1 Personal Coaching</option>
                <option value="CrossFit / Athletic Conditioning">CrossFit Conditioning</option>
                <option value="Zumba & Dance Cardio">Zumba &amp; Group Fitness</option>
                <option value="General Longevity & Health">General Longevity &amp; Health</option>
              </select>
            </div>
            <div id="jm-goal-error" class="join-modal__error">Please select your primary goal.</div>
          </div>

          <div class="join-modal__field">
            <label for="jm-plan" class="join-modal__label">Interested Plan / Membership</label>
            <div class="join-modal__select-wrapper">
              <select id="jm-plan" name="plan" class="join-modal__select">
                <option value="Pro Beast (3 Months)" selected>Pro Beast (3 Months) — Popular</option>
                <option value="Basic Access (1 Month)">Basic Access (1 Month)</option>
                <option value="Elite Pass (6 Months)">Elite Pass (6 Months)</option>
                <option value="Annual Champion (12 Months)">Annual Champion (12 Months)</option>
                <option value="Personal Training Package">Personal Training Package</option>
              </select>
            </div>
          </div>
        </div>

        <div class="join-modal__field">
          <label for="jm-time" class="join-modal__label">Preferred Workout Timing</label>
          <div class="join-modal__select-wrapper">
            <select id="jm-time" name="time" class="join-modal__select">
              <option value="Morning (5:30 AM - 10:30 AM)" selected>Morning (5:30 AM – 10:30 AM)</option>
              <option value="Afternoon (11:00 AM - 4:00 PM)">Afternoon (11:00 AM – 4:00 PM)</option>
              <option value="Evening (4:30 PM - 10:00 PM)">Evening (4:30 PM – 10:00 PM)</option>
              <option value="Flexible / Anytime">Flexible / Anytime</option>
            </select>
          </div>
        </div>

        <div class="join-modal__field">
          <label for="jm-notes" class="join-modal__label">Any Questions / Notes (Optional)</label>
          <textarea id="jm-notes" name="notes" class="join-modal__textarea" rows="2" placeholder="e.g. Any prior injuries, questions about diet plans..."></textarea>
        </div>

        <button type="submit" id="jm-submit-btn" class="btn btn--primary btn--full btn--lg join-modal__submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span id="jm-submit-text">SEND DETAILS ON WHATSAPP &rarr;</span>
        </button>

        <div class="join-modal__footer-note">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Direct WhatsApp to Beast Gym reception: +91 70920 30786</span>
        </div>
      </form>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  attachJoinModalEvents();
}

window.openJoinModal = function(preferredPlan) {
  let modal = document.getElementById('join-modal');
  if (!modal) {
    injectJoinModalDOM();
    modal = document.getElementById('join-modal');
  }
  if (!modal) return;

  if (preferredPlan) {
    const planSelect = document.getElementById('jm-plan');
    if (planSelect) {
      let matched = false;
      for (let i = 0; i < planSelect.options.length; i++) {
        if (planSelect.options[i].text.toLowerCase().includes(preferredPlan.toLowerCase()) ||
            planSelect.options[i].value.toLowerCase().includes(preferredPlan.toLowerCase())) {
          planSelect.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched) {
        const opt = new Option(preferredPlan, preferredPlan, true, true);
        planSelect.add(opt);
      }
    }
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  closeDrawer();

  setTimeout(() => {
    const nameInput = document.getElementById('jm-name');
    if (nameInput) nameInput.focus();
  }, 100);
};

window.closeJoinModal = function() {
  const modal = document.getElementById('join-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

function attachJoinModalEvents() {
  const modal = document.getElementById('join-modal');
  const closeBtn = document.getElementById('join-modal-close');
  const backdrop = document.getElementById('join-modal-backdrop');
  const form = document.getElementById('join-modal-form');

  if (closeBtn) closeBtn.addEventListener('click', closeJoinModal);
  if (backdrop) backdrop.addEventListener('click', closeJoinModal);

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      let valid = true;
      const nameEl = document.getElementById('jm-name');
      const nameErr = document.getElementById('jm-name-error');
      const phoneEl = document.getElementById('jm-phone');
      const phoneErr = document.getElementById('jm-phone-error');
      const goalEl = document.getElementById('jm-goal');
      const goalErr = document.getElementById('jm-goal-error');
      const planEl = document.getElementById('jm-plan');
      const timeEl = document.getElementById('jm-time');
      const notesEl = document.getElementById('jm-notes');
      const submitBtn = document.getElementById('jm-submit-btn');
      const submitText = document.getElementById('jm-submit-text');

      // Validate name
      if (!nameEl.value.trim()) {
        nameEl.classList.add('error');
        if (nameErr) nameErr.classList.add('visible');
        valid = false;
      } else {
        nameEl.classList.remove('error');
        if (nameErr) nameErr.classList.remove('visible');
      }

      // Validate phone
      const phoneVal = phoneEl.value.trim();
      const cleaned = phoneVal.replace(/[\s\-\(\)\.]/g, '');
      if (!cleaned || !/^\+?[0-9]{10,15}$/.test(cleaned)) {
        phoneEl.classList.add('error');
        if (phoneErr) phoneErr.classList.add('visible');
        valid = false;
      } else {
        phoneEl.classList.remove('error');
        if (phoneErr) phoneErr.classList.remove('visible');
      }

      // Validate goal
      if (!goalEl.value) {
        goalEl.classList.add('error');
        if (goalErr) goalErr.classList.add('visible');
        valid = false;
      } else {
        goalEl.classList.remove('error');
        if (goalErr) goalErr.classList.remove('visible');
      }

      if (!valid) return;

      const name = nameEl.value.trim();
      const phone = phoneVal;
      const goal = goalEl.value;
      const plan = planEl ? planEl.value : 'General Enquiry';
      const time = timeEl ? timeEl.value : 'Anytime';
      const notes = notesEl ? notesEl.value.trim() : '';

      // Build WhatsApp message
      const waMsg =
        `🏋️‍♂️ *NEW JOIN REQUEST — BEAST GYM & FITNESS*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Name:* ${name}\n` +
        `📱 *Contact:* ${phone}\n` +
        `🎯 *Fitness Goal:* ${goal}\n` +
        `💳 *Selected Plan:* ${plan}\n` +
        `⏰ *Preferred Timing:* ${time}\n` +
        (notes ? `📝 *Notes:* ${notes}\n` : '') +
        `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📍 *Location:* Beast Gym, Pandian Salai, Neelankarai, Chennai\n` +
        `🌐 *Sent from Beast Gym Website*`;

      const encoded = encodeURIComponent(waMsg);
      const waUrl = `https://wa.me/917092030786?text=${encoded}`;

      // Visual feedback
      if (submitText) submitText.textContent = 'OPENING WHATSAPP... 🚀';
      if (submitBtn) submitBtn.style.opacity = '0.85';

      window.open(waUrl, '_blank', 'noopener,noreferrer');

      setTimeout(() => {
        if (submitText) submitText.textContent = 'SEND DETAILS ON WHATSAPP →';
        if (submitBtn) submitBtn.style.opacity = '1';
        closeJoinModal();
        form.reset();
      }, 1800);
    });

    // Clear errors on input
    ['jm-name', 'jm-phone', 'jm-goal'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          el.classList.remove('error');
          const err = document.getElementById(id + '-error');
          if (err) err.classList.remove('visible');
        });
      }
    });
  }
}

// Global click listener for all Join buttons across pages
document.addEventListener('click', function(e) {
  const trigger = e.target.closest(
    '[data-open-join-modal], #nav-join-btn, #hero-join-btn, .btn-join-modal, a[href="#join-modal"]'
  );
  if (trigger) {
    e.preventDefault();
    e.stopPropagation();
    const plan = trigger.dataset.plan || '';
    openJoinModal(plan);
    return;
  }

  // Also catch any button or link whose text explicitly says JOIN NOW, JOIN TODAY, JOIN BEAST GYM, JOIN PRO BEAST
  const btn = e.target.closest('a, button');
  if (btn && btn.classList.contains('btn')) {
    const text = btn.textContent.trim().toUpperCase();
    if (
      text === 'JOIN NOW' ||
      text === 'JOIN TODAY' ||
      text === 'JOIN BEAST GYM' ||
      text === 'JOIN PRO BEAST' ||
      text === 'JOIN PRO BEAST NOW' ||
      text === 'JOIN BASIC ON WHATSAPP' ||
      text === 'JOIN ELITE ON WHATSAPP'
    ) {
      if (text.includes('JOIN')) {
        e.preventDefault();
        e.stopPropagation();
        let plan = '';
        if (text.includes('PRO BEAST')) plan = 'Pro Beast (3 Months)';
        else if (text.includes('BASIC')) plan = 'Basic Access (1 Month)';
        else if (text.includes('ELITE')) plan = 'Elite Pass (6 Months)';
        else plan = 'Pro Beast (3 Months)';
        openJoinModal(plan);
      }
    }
  }
});

// ESC key listener for modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeJoinModal();
  }
});

// ─── STATS COUNTER ───
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      if (!isNaN(target)) animateCounter(el, target);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

// ─── INIT ───
updateNavPosition();
injectJoinModalDOM();

