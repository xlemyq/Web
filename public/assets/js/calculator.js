export function initCalculator() {
  const form = document.querySelector('#calc-form');
  const output = document.querySelector('#calc-result');
  if (!form || !output) return;

  form.addEventListener('input', () => compute(form, output));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    compute(form, output);
  });
}

function compute(form, output) {
  const pages = Number(form.querySelector('[name="pages"]').value || 0);
  const keywords = Number(form.querySelector('[name="keywords"]').value || 0);
  const speed = form.querySelector('[name="speed"]:checked')?.value || 'standard';
  const local = form.querySelector('[name="local"]')?.checked;

  let base = 1800 + pages * 25 + keywords * 40;
  if (speed === 'express') base *= 1.22;
  if (local) base += 600;

  const min = Math.round(base * 0.9);
  const max = Math.round(base * 1.25);
  output.textContent = `Szacowany budżet: ${min.toLocaleString('pl-PL')} zł – ${max.toLocaleString('pl-PL')} zł netto / mies.`;
}
