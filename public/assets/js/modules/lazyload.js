export function initLazyLoad() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (!('IntersectionObserver' in window)) {
    lazyImages.forEach((img) => (img.src = img.dataset.src));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    });
  }, { rootMargin: '0px 0px 200px 0px' });
  lazyImages.forEach((img) => observer.observe(img));
}
