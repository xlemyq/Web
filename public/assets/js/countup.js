export function countUp(el, endValue, duration = 1200) {
  const start = performance.now();
  function animate(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(progress * endValue).toLocaleString('pl-PL');
    if (progress < 1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
