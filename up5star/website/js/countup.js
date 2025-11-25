class CountUpWrapper {
  constructor(element) {
    const endVal = parseInt(element.dataset.countup, 10);
    this.counter = new CountUp(element, endVal, { duration: 2.2, separator: ' ' });
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.counter.start();
          this.observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    this.observer.observe(element);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-countup]').forEach(el => new CountUpWrapper(el));
});
