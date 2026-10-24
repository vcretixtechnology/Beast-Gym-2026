/* ============================================================
   BEAST GYM & FITNESS — PREMIUM ANIMATIONS ENGINE
   ============================================================
   Sections:
   1. Initialization & utilities
   2. Page transition system (inter-page fades)
   3. Scroll progress bar
   4. Hero entrance sequence
   5. Scroll-reveal (IntersectionObserver, replaces old .reveal)
   6. Staggered card groups
   7. Animated accent lines
   8. Lightbox fix (visibility-based)
   9. Parallax (desktop hero image)
  10. Stats counter
  11. Mobile nav polish
  12. Boot sequence
   ============================================================ */

'use strict';

// ─── 1. UTILITIES ────────────────────────────────────────────

const isMobile = () => window.innerWidth <= 768;
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

// ─── 2. PAGE TRANSITIONS ─────────────────────────────────────

function injectPageTransitionDOM() {
  if (document.getElementById('page-transition')) return;
  const overlay = document.createElement('div');
  overlay.id = 'page-transition';
  document.body.insertAdjacentElement('afterbegin', overlay);
}

function injectScrollProgress() {
  if (document.getElementById('scroll-progress')) return;
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.insertAdjacentElement('afterbegin', bar);
}

/**
 * Hook all internal navigation links to trigger the transition overlay.
 * Excludes: external links, tel:, mailto:, whatsapp:, anchors (#),
 *           target="_blank", and the medical sub-app boundary.
 */
function initPageTransitions() {
  const currentPath = window.location.pathname;

  document.addEventListener('click', function(e) {
    const anchor = e.target.closest('a[href]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    // Skip special hrefs and modal triggers
    if (
      href.startsWith('#') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('whatsapp:') ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      anchor.target === '_blank' ||
      anchor.hasAttribute('download') ||
      anchor.hasAttribute('data-open-join-modal') ||
      anchor.hasAttribute('data-open-modal') ||
      anchor.id === 'nav-join-btn' ||
      anchor.id === 'hero-join-btn' ||
      anchor.classList.contains('btn-join-modal')
    ) return;

    // Resolve absolute path for comparison
    const resolvedHref = new URL(href, window.location.href).pathname;

    // Skip if same page
    if (resolvedHref === currentPath) return;

    // Skip if crossing into /medical/ from outside (treat as external boundary)
    const isCurrentlyInMedical = currentPath.includes('/medical/');
    const isTargetMedical = resolvedHref.includes('/medical/');
    if (!isCurrentlyInMedical && isTargetMedical) return; // let it navigate normally
    if (isCurrentlyInMedical && !isTargetMedical) return;  // same – medical links out naturally

    if (prefersReducedMotion()) return;

    e.preventDefault();

    // Trigger leaving animation
    document.body.classList.add('page-leaving');

    setTimeout(() => {
      window.location.href = href;
    }, 380);
  }, true);
}

/**
 * On page load, animate the overlay away (entering state).
 */
function enterPage() {
  if (prefersReducedMotion()) {
    document.body.classList.add('page-loaded');
    return;
  }

  document.body.classList.add('page-entering');

  requestAnimationFrame(() => {
    // Small frame gap to ensure browser paints entering state first
    requestAnimationFrame(() => {
      document.body.classList.remove('page-entering');
      document.body.classList.add('page-loaded');
    });
  });
}

// ─── 3. SCROLL PROGRESS BAR ──────────────────────────────────

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function updateBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();
}

// ─── 4. HERO ENTRANCE SEQUENCE ───────────────────────────────

/**
 * Wraps hero title text in mask-reveal spans and fires the animation class.
 * Targets .hero__title on the homepage.
 */
function initHeroSequence() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const title = hero.querySelector('.hero__title');
  if (title && !isMobile()) {
    // Wrap existing content into .hero__title-line > span
    // The title has: "STRONGER<br><em>THAN YESTERDAY.</em>"
    // We need to split around the <br> carefully
    const html = title.innerHTML;
    // Split on <br> to get two line groups
    const parts = html.split(/<br\s*\/?>/i);

    if (parts.length >= 2) {
      title.innerHTML = parts.map((part, i) =>
        `<span class="hero__title-line" style="display:block;overflow:hidden;"><span style="display:block;">${part}</span></span>`
      ).join('');
    }
  }

  // Fire animation class after a very short delay
  requestAnimationFrame(() => {
    setTimeout(() => {
      hero.classList.add('hero--animated');
    }, prefersReducedMotion() ? 0 : 80);
  });
}

// ─── 5. SCROLL-REVEAL SYSTEM ─────────────────────────────────

/**
 * Observes all [data-reveal] elements and adds .is-visible
 * when they enter the viewport. Once visible, unobserves.
 * Also handles legacy .reveal class for backwards compat.
 */
function initScrollReveal() {
  if (prefersReducedMotion()) {
    // Make everything visible immediately
    document.querySelectorAll('[data-reveal], .reveal').forEach(el => {
      el.classList.add('is-visible', 'visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Also add legacy class for backwards compat
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe new data-reveal elements
  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

  // Maintain backwards compat: also observe legacy .reveal elements
  // that don't already have data-reveal
  document.querySelectorAll('.reveal:not([data-reveal])').forEach(el => {
    observer.observe(el);
  });
}

// ─── 6. STAGGERED CARD GROUPS ────────────────────────────────

/**
 * For each element with data-stagger-group, auto-assign
 * data-stagger-index to its direct children that have [data-reveal].
 */
function initStaggerGroups() {
  document.querySelectorAll('[data-stagger-group]').forEach(group => {
    const children = group.querySelectorAll('[data-reveal]');
    children.forEach((child, i) => {
      if (!child.hasAttribute('data-stagger-index')) {
        child.setAttribute('data-stagger-index', Math.min(i, 9));
      }
    });
  });
}

// ─── 7. ANIMATED ACCENT LINES ────────────────────────────────

/**
 * Converts all .accent-line elements to animated versions.
 * Observes them and expands their width on reveal.
 */
function initAccentLines() {
  if (prefersReducedMotion()) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-expanded');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.accent-line').forEach(line => {
    line.classList.add('accent-line--anim');
    observer.observe(line);
  });
}

// ─── 8. LIGHTBOX FIX ─────────────────────────────────────────

/**
 * The animation CSS switches lightbox from display:none
 * to opacity/visibility approach. This patches the JS to match.
 */
function patchLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  // The CSS now handles display:flex always — just toggle opacity via .open class.
  // The existing JS openLightbox/closeLightbox already toggles .open, so no change needed.
  // But we need to ensure body overflow is locked/unlocked correctly — already done in main.js.

  // Extra: close on background click (already in main.js, but ensure z-index layering works)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ─── 9. HERO PARALLAX (DESKTOP ONLY) ─────────────────────────

function initHeroParallax() {
  if (isMobile() || prefersReducedMotion()) return;

  const heroBg = document.querySelector('.hero__bg img');
  if (!heroBg) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    // Subtle downward offset as user scrolls — creates depth
    const offset = scrollY * 0.3;
    heroBg.style.transform = `translateY(${offset}px)`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

// ─── 10. STATS COUNTER ───────────────────────────────────────

/**
 * Enhanced counter that uses requestAnimationFrame for smooth ticks
 * and respects reduced motion.
 */
function initStatsCounter() {
  if (prefersReducedMotion()) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;

      observer.unobserve(el);

      const duration = 1800;
      const start = performance.now();
      const suffix = el.dataset.suffix || '';
      const startVal = 0;

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target + suffix;
          el.classList.remove('counting');
        }
      }

      el.classList.add('counting');
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}

// ─── 11. MOBILE NAV POLISH ────────────────────────────────────

/**
 * Smooth mobile menu toggle animation — we enhance the existing
 * toggle behavior in main.js by re-triggering drawer link animations.
 */
function initMobileNavPolish() {
  const navToggle = document.getElementById('nav-toggle');
  const navDrawer = document.getElementById('nav-drawer');
  if (!navToggle || !navDrawer) return;

  // When drawer opens, reset and replay link animations
  const originalToggleFn = navToggle.onclick;

  // We use a MutationObserver to detect when .open is added to drawer
  const mutationObs = new MutationObserver(() => {
    if (navDrawer.classList.contains('open')) {
      // Force re-trigger animations by briefly toggling a class
      const links = navDrawer.querySelectorAll('.nav__drawer-link');
      links.forEach(link => {
        link.style.animation = 'none';
        link.offsetHeight; // reflow
        link.style.animation = '';
      });
      const cta = navDrawer.querySelector('.nav__drawer-cta');
      if (cta) {
        cta.style.animation = 'none';
        cta.offsetHeight;
        cta.style.animation = '';
      }
    }
  });

  mutationObs.observe(navDrawer, { attributes: true, attributeFilter: ['class'] });
}

// ─── 12. SMOOTH ANCHOR SCROLL OFFSET ──────────────────────────

/**
 * Override anchor-click scrolling to account for sticky nav height.
 */
function initAnchorScrollOffset() {
  const nav = document.getElementById('main-nav');

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href').slice(1);
    if (!targetId) return;

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    e.preventDefault();

    const navHeight = nav ? nav.offsetHeight : 74;
    const elementTop = targetEl.getBoundingClientRect().top + window.scrollY;
    const offset = elementTop - navHeight - 20;

    window.scrollTo({
      top: offset,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  });
}

// ─── 13. ADD DATA-REVEAL TO EXISTING SECTIONS ─────────────────

/**
 * Automatically adds data-reveal attributes to common sections
 * that don't have them yet — so the new system picks them up.
 * Preserves existing .reveal classes as fallback.
 */
function autoRevealSections() {
  const selectors = [
    // Section headings
    '.section-label:not([data-reveal])',
    'h2:not([data-reveal]):not(.hero__title):not(.brand-intro__quote)',
    '.brand-intro__quote:not([data-reveal])',

    // Program cards
    '.program-card:not([data-reveal])',
    '.program-detail-card:not([data-reveal])',

    // Why-beast items
    '.why-item:not([data-reveal])',

    // Membership cards
    '.membership-card:not([data-reveal])',

    // Personal training features
    '.pt__feature:not([data-reveal])',

    // Gallery items
    '.gallery-item:not([data-reveal])',

    // Review cards
    '.review-card:not([data-reveal])',

    // Coach cards
    '.coach-card:not([data-reveal])',

    // Testimonial cards
    '.testimonial-card:not([data-reveal])',

    // Stat blocks
    '.stat-block:not([data-reveal])',
    '.why-beast__stat:not([data-reveal])',

    // Location items
    '.location-item:not([data-reveal])',

    // FAQ items
    '.faq-item:not([data-reveal])',

    // Footer columns
    '.footer__grid > div:not([data-reveal])',
    '.footer__grid > section:not([data-reveal])',
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      // Don't override explicitly set reveals
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', 'up');
      }
    });
  });

  // Specific override: brand intro image gets clip-path reveal
  const brandImg = document.querySelector('.brand-intro__image');
  if (brandImg && !brandImg.hasAttribute('data-reveal')) {
    brandImg.setAttribute('data-reveal', 'clip');
  }

  // Stagger siblings in grids
  const staggerGroups = [
    '.programs__grid',
    '.why-beast__items',
    '.membership__grid',
    '.coaches-grid',
    '.testimonials__grid',
    '.reviews__grid',
    '.gallery__grid',
    '#full-gallery',
    '.why-beast__stats',
  ];

  staggerGroups.forEach(sel => {
    const group = document.querySelector(sel);
    if (!group) return;

    // Mark the group for stagger
    group.setAttribute('data-stagger-group', '');

    const children = group.children;
    Array.from(children).forEach((child, i) => {
      if (!child.hasAttribute('data-stagger-index')) {
        child.setAttribute('data-stagger-index', Math.min(i, 9));
      }
    });
  });

  // Page hero elements
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    const breadcrumbs = pageHero.querySelector('.breadcrumbs');
    const h1 = pageHero.querySelector('h1');
    const subtitle = pageHero.querySelector('p');

    if (breadcrumbs) breadcrumbs.setAttribute('data-reveal', 'up');
    if (h1) { h1.setAttribute('data-reveal', 'up'); h1.setAttribute('data-delay', '100'); }
    if (subtitle) { subtitle.setAttribute('data-reveal', 'up'); subtitle.setAttribute('data-delay', '200'); }
  }
}

// ─── 14. BOOT SEQUENCE ────────────────────────────────────────

ready(function() {
  // Inject DOM nodes
  injectPageTransitionDOM();
  injectScrollProgress();

  // Set up page transitions
  initPageTransitions();
  enterPage();

  // Scroll progress bar
  initScrollProgress();

  // Auto-reveal sections (must run before initScrollReveal)
  autoRevealSections();

  // Stagger groups
  initStaggerGroups();

  // Hero sequence (homepage only)
  initHeroSequence();

  // Scroll reveal system
  initScrollReveal();

  // Animated accent lines
  initAccentLines();

  // Lightbox fix
  patchLightbox();

  // Parallax
  initHeroParallax();

  // Stats counter (enhanced — overrides main.js counter)
  initStatsCounter();

  // Mobile nav polish
  initMobileNavPolish();

  // Anchor scroll offset
  initAnchorScrollOffset();
});
