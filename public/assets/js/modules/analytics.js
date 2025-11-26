// Lightweight analytics bootstrap (placeholder for GA4, anonymized IP, consent-aware)
export function initAnalytics(config) {
  if (!config?.gaId || !hasConsent()) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${config.gaId}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', config.gaId, { anonymize_ip: true, transport_type: 'beacon' });
}

function hasConsent() {
  return document.cookie.includes('up5star-consent=granted');
}
