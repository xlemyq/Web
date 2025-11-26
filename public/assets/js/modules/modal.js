export function initModals() {
  document.querySelectorAll('[data-modal-target]').forEach((trigger) => {
    trigger.addEventListener('click', () => open(trigger.dataset.modalTarget));
  });
  document.querySelectorAll('.modal__close').forEach((btn) => btn.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function open(targetId) {
  const modal = document.getElementById(targetId);
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function close() {
  document.querySelectorAll('.modal.is-open').forEach((modal) => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  });
}
