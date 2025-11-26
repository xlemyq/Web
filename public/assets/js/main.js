import { initScrollEffects } from './modules/scroll-effects.js';
import { initAccordion } from './modules/accordion.js';
import { initModals } from './modules/modal.js';
import { initLazyLoad } from './modules/lazyload.js';

const GA_ID = 'G-XXXXXXXX';

function toggleMenu() {
  const menu = document.querySelector('.navbar__menu');
  if (!menu) return;
  menu.classList.toggle('is-open');
}

function handleStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  const scrolled = window.scrollY > 20;
  header.style.boxShadow = scrolled ? '0 10px 30px rgba(0,0,0,0.35)' : 'none';
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  if (toggle) toggle.addEventListener('click', toggleMenu);
}

function initCountUp() {
  const counters = document.querySelectorAll('[data-countup]');
  const options = { threshold: 0.2 };
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = Number(el.dataset.countup || 0);
      const duration = 1200;
      const start = performance.now();
      function animate(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(progress * end).toLocaleString('pl-PL');
        if (progress < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, options);
  counters.forEach((el) => obs.observe(el));
}

function initHeroVideoModal() {
  const trigger = document.querySelector('[data-modal-target="hero-video"]');
  if (!trigger) return;
  trigger.addEventListener('click', () => {
    const frame = document.querySelector('#hero-video iframe');
    if (frame) frame.src = frame.dataset.src;
  });
}

function initCookieBanner() {
  const banner = document.querySelector('#cookie-banner');
  if (!banner) return;
  const accept = banner.querySelector('[data-cookie-accept]');
  if (document.cookie.includes('up5star-consent=granted')) {
    banner.remove();
    return;
  }
  accept?.addEventListener('click', () => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `up5star-consent=granted; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    banner.remove();
  });
}

function initFormEnhancements() {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', () => form.classList.add('is-submitted'));
  });
}

function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const sparkle = document.querySelector('.hero__sparkle');
  if (!hero || !sparkle) return;
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    sparkle.style.transform = `translate(${x}px, ${y}px)`;
  });
}

function initLazy() { initLazyLoad(); }

function initFAQ() { initAccordion('.faq__item'); }

function initScrollAnimations() { initScrollEffects(); }

function initModalsWrapper() { initModals(); }

function initAll() {
  initSmoothScroll();
  initMobileNav();
  initCountUp();
  initHeroVideoModal();
  initCookieBanner();
  initFormEnhancements();
  initHeroParallax();
  initScrollAnimations();
  initFAQ();
  initModalsWrapper();
  initLazy();
  window.addEventListener('scroll', handleStickyHeader);
  handleStickyHeader();
}

document.addEventListener('DOMContentLoaded', initAll);
