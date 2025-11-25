document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('#nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('is-open'));
    });
  }

  const header = document.querySelector('.header');
  const toggleSticky = () => {
    if (window.scrollY > 60) {
      header.classList.add('is-sticky');
    } else {
      header.classList.remove('is-sticky');
    }
  };
  window.addEventListener('scroll', toggleSticky);
  toggleSticky();

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (window.CountUp) {
    document.querySelectorAll('[data-countup]')?.forEach(el => {
      const endVal = parseInt(el.dataset.countup, 10);
      const counter = new window.CountUp(el, endVal, { duration: 2, separator: ' ' });
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            counter.start();
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.4 });
      observer.observe(el);
    });
  }

  if (window.AOS) {
    AOS.init({ duration: 700, once: true });
  }

  if (window.Rellax) {
    new Rellax('.rellax');
  }

  const trackedButtons = document.querySelectorAll('[data-cta]');
  trackedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.dataset.cta;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'cta_click', cta_label: label });
    });
  });
});
