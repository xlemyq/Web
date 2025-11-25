const COOKIE_KEY = 'up5star-consent-v1';
const scriptsMap = {
  analytics: () => loadScript('https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX', { async: true }),
  chat: () => loadScript('https://embed.tawk.to/xxxx/default'),
};

function loadScript(src, attrs = {}) {
  const script = document.createElement('script');
  script.src = src;
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
  document.head.appendChild(script);
  return script;
}

function saveConsent(state) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(state));
}

function getConsent() {
  const saved = localStorage.getItem(COOKIE_KEY);
  return saved ? JSON.parse(saved) : null;
}

function applyConsent(consent) {
  if (consent.analytics) {
    scriptsMap.analytics();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'consent_update', analytics_storage: 'granted' });
  }
  if (consent.chat) {
    scriptsMap.chat();
  }
}

function renderBanner() {
  const banner = document.querySelector('#cookie-banner');
  if (!banner) return;
  banner.classList.remove('hidden');

  banner.querySelector('#cookie-accept').addEventListener('click', () => {
    const consent = { necessary: true, analytics: true, chat: true };
    saveConsent(consent);
    banner.remove();
    applyConsent(consent);
  });

  banner.querySelector('#cookie-decline').addEventListener('click', () => {
    const consent = { necessary: true, analytics: false, chat: false };
    saveConsent(consent);
    banner.remove();
  });

  banner.querySelector('#cookie-customize').addEventListener('click', () => {
    const analytics = banner.querySelector('#consent-analytics').checked;
    const chat = banner.querySelector('#consent-chat').checked;
    const consent = { necessary: true, analytics, chat };
    saveConsent(consent);
    banner.remove();
    applyConsent(consent);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const consent = getConsent();
  if (consent) {
    applyConsent(consent);
  } else {
    renderBanner();
  }
});
