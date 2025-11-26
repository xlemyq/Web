export function initAccordion(selector = '.faq__item') {
  const items = document.querySelectorAll(selector);
  items.forEach((item) => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    if (!question || !answer) return;
    question.addEventListener('click', () => toggle(item, answer));
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(item, answer);
      }
    });
  });
}

function toggle(item, answer) {
  const expanded = item.classList.toggle('is-open');
  answer.style.maxHeight = expanded ? `${answer.scrollHeight}px` : '0';
  answer.setAttribute('aria-hidden', (!expanded).toString());
}
