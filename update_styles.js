
const fs = require('fs');

let css = fs.readFileSync('css/main.css', 'utf8');

// Replace navigation and announcement bar styles with enhanced glossy styling
const oldNavRegex = /\/\* ANNOUNCEMENT BAR \*\/[\s\S]*?\/\* HERO \*\//;

const newNavCss = `/* ANNOUNCEMENT BAR */
.announcement-bar {
  background: linear-gradient(90deg, #B5080B 0%, #FC0F12 50%, #D4090C 100%);
  color: #fff;
  text-align: center;
  padding: 8px 1rem;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  position: relative;
  z-index: 501;
  box-shadow: 0 2px 12px rgba(0,0,0,0.4);
}
.announcement-close {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.15s ease, transform 0.15s ease;
  padding: 4px;
  display: flex;
  align-items: center;
}
.announcement-close:hover {
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
}

/* ============ GLOSSY GLASSMORPHISM NAVIGATION ============ */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 500;
  transition: top 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  background: rgba(14, 14, 18, 0.65);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.14);
}
.nav.has-announcement {
  top: 36px;
}
.nav--scrolled,
.nav.scrolled {
  top: 0 !important;
  background: rgba(10, 10, 13, 0.88) !important;
  backdrop-filter: blur(30px) saturate(220%) !important;
  -webkit-backdrop-filter: blur(30px) saturate(220%) !important;
  border-bottom: 1px solid rgba(252, 15, 18, 0.35) !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 0 24px rgba(252, 15, 18, 0.15) !important;
}
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 74px;
  padding: 0 2rem;
  max-width: 1440px;
  margin: 0 auto;
}
.nav__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-decoration: none;
  flex-shrink: 0;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0;
  margin: 0;
  line-height: 0;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav__logo:hover {
  transform: translateY(-1px) scale(1.02);
}
.nav__logo-img {
  height: 48px;
  width: auto;
  max-width: 185px;
  object-fit: contain;
  display: block;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45));
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease;
}
.nav__logo:hover .nav__logo-img {
  transform: scale(1.04);
  filter: drop-shadow(0 4px 16px rgba(252, 15, 18, 0.4));
}
.nav__logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.nav__logo-beast {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 800;
  color: #F5F5F5;
  letter-spacing: -0.02em;
}
.nav__logo-beast span {
  color: #FC0F12;
  text-shadow: 0 0 12px rgba(252, 15, 18, 0.4);
}
.nav__logo-sub {
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #A5A5A5;
  margin-top: 3px;
}
.nav__links {
  display: flex;
  align-items: center;
  gap: 2.2rem;
}
.nav__link {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: #B5B5B5;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 0.2s ease;
  position: relative;
  padding: 6px 0;
}
.nav__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #FC0F12;
  box-shadow: 0 0 8px #FC0F12;
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 2px;
}
.nav__link:hover,
.nav__link.active {
  color: #FFFFFF;
}
.nav__link:hover::after,
.nav__link.active::after {
  width: 100%;
}
.nav__link--supplements {
  color: #FC0F12 !important;
  font-weight: 700;
}
.nav__link--supplements:hover {
  text-shadow: 0 0 10px rgba(252, 15, 18, 0.5);
}
.nav__cta {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.nav__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem;
  cursor: pointer;
  border: none;
  background: none;
}
.nav__toggle span {
  display: block;
  width: 26px;
  height: 2.5px;
  background: #F5F5F5;
  border-radius: 2px;
  transition: all 0.25s ease;
}
.nav__toggle.open span:nth-child(1) {
  transform: translateY(7.5px) rotate(45deg);
}
.nav__toggle.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.nav__toggle.open span:nth-child(3) {
  transform: translateY(-7.5px) rotate(-45deg);
}
.nav__drawer {
  display: none;
  position: fixed;
  top: 0;
  right: -100%;
  width: min(360px, 100vw);
  height: 100vh;
  background: rgba(18, 18, 22, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-left: 1px solid #292929;
  z-index: 505;
  transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;
  padding: 6rem 1.75rem 2rem;
  flex-direction: column;
  box-shadow: -8px 0 32px rgba(0,0,0,0.8);
}
.nav__drawer.open {
  right: 0;
}
.nav__drawer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.nav__drawer-link {
  display: block;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: #B5B5B5;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.15s ease;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.nav__drawer-link:hover,
.nav__drawer-link.active {
  color: #FFFFFF;
  padding-left: 8px;
  border-bottom-color: #FC0F12;
}
.nav__drawer-link--red {
  color: #FC0F12 !important;
}
.nav__drawer-cta {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.nav__overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  z-index: 504;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.nav__overlay.open {
  display: block;
}
@media(max-width:1024px){
  .nav__links{display:none}
  .nav__toggle{display:flex}
  .nav__drawer{display:flex}
  .nav__cta .btn{display:none}
}

/* HERO */`;

if (oldNavRegex.test(css)) {
  css = css.replace(oldNavRegex, newNavCss);
}

// Add page-specific components to bottom if not already present
const additionalStyles = `

/* ============ MULTI-PAGE SHARED COMPONENTS ============ */

/* INTERIOR PAGE HERO */
.page-hero {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: center;
  padding-top: 130px;
  padding-bottom: 60px;
  overflow: hidden;
  background: #090909;
}
.page-hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.page-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: brightness(0.4) contrast(1.1);
}
.page-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(9,9,9,0.7) 0%, rgba(9,9,9,0.95) 100%);
  z-index: 1;
}
.page-hero__content {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
}
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted-grey);
  margin-bottom: 1rem;
}
.breadcrumbs a {
  color: var(--muted-grey);
  transition: color 0.15s ease;
}
.breadcrumbs a:hover {
  color: var(--beast-red);
}
.breadcrumbs span {
  color: var(--beast-red);
}

/* FILTER PILLS */
.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 2.5rem 0 1.5rem;
  justify-content: center;
}
.filter-btn {
  padding: 10px 22px;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 9999px;
  background: var(--graphite);
  border: 1px solid var(--border-grey);
  color: var(--muted-grey);
  cursor: pointer;
  transition: all 0.2s ease;
}
.filter-btn:hover,
.filter-btn.active {
  background: var(--beast-red);
  color: #fff;
  border-color: var(--beast-red);
  box-shadow: 0 4px 20px rgba(252,15,18,0.35);
}

/* PROGRAM DETAIL CARD */
.program-detail-card {
  background: var(--graphite);
  border: 1px solid var(--border-grey);
  border-radius: 12px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 2.5rem;
}
.program-detail-card:hover {
  border-color: rgba(252, 15, 18, 0.4);
  box-shadow: 0 20px 60px rgba(0,0,0,0.7);
  transform: translateY(-4px);
}
.program-detail-card__img {
  position: relative;
  min-height: 380px;
  overflow: hidden;
}
.program-detail-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.program-detail-card:hover .program-detail-card__img img {
  transform: scale(1.04);
}
.program-detail-card__img::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent 60%, rgba(24, 24, 24, 0.9) 100%);
}
.program-detail-card__body {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.program-detail-meta {
  display: flex;
  gap: 1rem;
  margin: 1.25rem 0;
  flex-wrap: wrap;
}
.program-meta-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  padding: 4px 12px;
  background: #101010;
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  color: var(--off-white);
  font-family: var(--font-display);
}
.program-meta-tag svg {
  color: var(--beast-red);
}

@media(max-width:900px){
  .program-detail-card {
    grid-template-columns: 1fr;
  }
  .program-detail-card__img {
    min-height: 260px;
  }
  .program-detail-card__img::after {
    background: linear-gradient(to bottom, transparent 60%, rgba(24, 24, 24, 0.9) 100%);
  }
  .program-detail-card__body {
    padding: 1.5rem;
  }
}

/* COMPARISON TABLE */
.comparison-wrapper {
  overflow-x: auto;
  margin-top: 3rem;
  border-radius: 12px;
  border: 1px solid var(--border-grey);
  background: var(--graphite);
}
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.comparison-table th,
.comparison-table td {
  padding: 18px 24px;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 0.875rem;
}
.comparison-table th {
  background: #101010;
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #F5F5F5;
}
.comparison-table th.highlight,
.comparison-table td.highlight {
  background: rgba(252, 15, 18, 0.05);
  border-left: 1px solid rgba(252, 15, 18, 0.3);
  border-right: 1px solid rgba(252, 15, 18, 0.3);
}
.comparison-table th.highlight {
  color: var(--beast-red);
}
.comparison-table td {
  color: var(--muted-grey);
}
.comparison-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}
.check-icon {
  color: var(--beast-red);
  display: inline-flex;
}
.cross-icon {
  color: #404040;
  display: inline-flex;
}

/* FAQ ACCORDION */
.faq-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 860px;
  margin: 3rem auto 0;
}
.faq-item {
  background: var(--graphite);
  border: 1px solid var(--border-grey);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s ease;
}
.faq-item.open {
  border-color: rgba(252, 15, 18, 0.4);
}
.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: none;
  border: none;
  color: #F5F5F5;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: color 0.15s ease;
}
.faq-question:hover {
  color: var(--beast-red);
}
.faq-icon {
  color: var(--beast-red);
  transition: transform 0.3s ease;
  flex-shrink: 0;
}
.faq-item.open .faq-icon {
  transform: rotate(180deg);
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 1.5rem;
  color: var(--muted-grey);
  line-height: 1.7;
}
.faq-item.open .faq-answer {
  max-height: 400px;
  padding: 0 1.5rem 1.5rem;
}

/* COACH CARD */
.coaches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}
.coach-card {
  background: var(--graphite);
  border: 1px solid var(--border-grey);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.25s ease;
}
.coach-card:hover {
  transform: translateY(-6px);
  border-color: rgba(252, 15, 18, 0.4);
  box-shadow: 0 16px 48px rgba(0,0,0,0.6);
}
.coach-card__img {
  aspect-ratio: 1;
  overflow: hidden;
  position: relative;
}
.coach-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.coach-card:hover .coach-card__img img {
  transform: scale(1.05);
}
.coach-card__body {
  padding: 1.5rem;
}
.coach-card__name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: #F5F5F5;
  margin-bottom: 0.25rem;
}
.coach-card__role {
  font-size: 0.8rem;
  color: var(--beast-red);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.coach-card__bio {
  font-size: 0.875rem;
  color: var(--muted-grey);
  line-height: 1.6;
  margin-bottom: 1rem;
}
.coach-cert-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.coach-cert-pill {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 4px;
  background: #111;
  border: 1px solid var(--border-subtle);
  color: #C5C5C5;
}
`;

if (!css.includes('/* ============ MULTI-PAGE SHARED COMPONENTS ============ */')) {
  css += additionalStyles;
}

fs.writeFileSync('css/main.css', css, 'utf8');
console.log('Successfully updated css/main.css with glossy navigation and multi-page styles!');
