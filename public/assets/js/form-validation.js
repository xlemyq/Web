export function validateForm(form) {
  const errors = [];
  const name = form.querySelector('input[name="name"]');
  const email = form.querySelector('input[name="email"]');
  const message = form.querySelector('textarea[name="message"]');
  if (name && name.value.trim().length < 2) errors.push('Imię i nazwisko jest wymagane.');
  if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email.value.trim())) errors.push('Podaj poprawny adres e-mail.');
  if (message && message.value.trim().length < 20) errors.push('Wiadomość musi mieć min. 20 znaków.');
  return errors;
}

export function attachValidation(selector = 'form[data-validate]') {
  document.querySelectorAll(selector).forEach((form) => {
    form.addEventListener('submit', (e) => {
      const errors = validateForm(form);
      const feedback = form.querySelector('.form__feedback');
      if (errors.length) {
        e.preventDefault();
        if (feedback) {
          feedback.textContent = errors.join(' ');
          feedback.classList.remove('alert--success');
          feedback.classList.add('alert', 'alert--error');
        }
      }
    });
  });
}
