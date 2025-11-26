export function initCookieConsent() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  const accept = banner.querySelector('[data-cookie-accept]');
  const decline = banner.querySelector('[data-cookie-decline]');
  if (document.cookie.includes('up5star-consent=')) {
    banner.remove();
    return;
  }
  accept?.addEventListener('click', () => setConsent('granted', banner));
  decline?.addEventListener('click', () => setConsent('denied', banner));
}

function setConsent(value, banner) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `up5star-consent=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  banner.remove();
}
