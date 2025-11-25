const packages = {
  start: { name: 'Start', base: 1200, perKeyword: 60, support: 'E-mail & raport miesięczny' },
  pro: { name: 'Pro', base: 2400, perKeyword: 90, support: 'Stały opiekun + audyt UX' },
  premium: { name: 'Premium', base: 4200, perKeyword: 120, support: 'Strategia content + linki PR' },
  enterprise: { name: 'Enterprise', base: 6200, perKeyword: 140, support: 'Consulting C-level, analityka custom' }
};

function estimatePrice(keywords, competition, extras) {
  const multiplier = { low: 1, medium: 1.35, high: 1.65 }[competition] || 1;
  const extraValue = (extras.content ? 600 : 0) + (extras.links ? 800 : 0) + (extras.analytics ? 450 : 0);
  const bestPackage = keywords <= 10 ? 'start' : keywords <= 20 ? 'pro' : keywords <= 35 ? 'premium' : 'enterprise';
  const selected = packages[bestPackage];
  const price = (selected.base + selected.perKeyword * keywords) * multiplier + extraValue;
  return { price: Math.round(price / 10) * 10, bestPackage: selected };
}

function renderSummary({ price, bestPackage }) {
  const summary = document.querySelector('#calc-summary');
  summary.innerHTML = `
    <p><strong>Rekomendowany pakiet:</strong> ${bestPackage.name}</p>
    <p>Wsparcie: ${bestPackage.support}</p>
    <p><strong>Szacunkowy budżet miesięczny:</strong> ${price} PLN netto</p>
  `;
}

function handleCalculation(e) {
  e.preventDefault();
  const keywords = parseInt(document.querySelector('#keywords').value, 10) || 0;
  const competition = document.querySelector('input[name="competition"]:checked')?.value || 'medium';
  const extras = {
    content: document.querySelector('#extra-content').checked,
    links: document.querySelector('#extra-links').checked,
    analytics: document.querySelector('#extra-analytics').checked,
  };
  const result = estimatePrice(keywords, competition, extras);
  renderSummary(result);
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#calc-form');
  if (!form) return;
  form.addEventListener('submit', handleCalculation);

  document.querySelector('#calc-send')?.addEventListener('click', () => {
    const details = document.querySelector('#calc-summary').innerText;
    const messageField = document.querySelector('#message');
    if (messageField) {
      messageField.value = `${messageField.value}\n\n---\nWynik kalkulatora:\n${details}`;
    }
  });
});
