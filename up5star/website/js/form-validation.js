const validators = {
  name: value => value.trim().length >= 2,
  email: value => /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value),
  phone: value => /^\+?[0-9\s-]{7,15}$/.test(value),
  message: value => value.trim().length >= 10,
  consent: checked => checked === true
};

function validateField(field) {
  const { name, type } = field;
  const value = type === 'checkbox' ? field.checked : field.value;
  const isValid = validators[name] ? validators[name](value) : !!value;
  const feedback = field.parentElement.querySelector('.error-message');

  field.classList.toggle('is-valid', isValid);
  field.classList.toggle('is-invalid', !isValid);
  if (feedback) {
    feedback.textContent = isValid ? '' : field.dataset.error || 'Uzupełnij to pole';
  }
  return isValid;
}

function attachValidation(form) {
  const fields = form.querySelectorAll('input, textarea, select');
  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => validateField(field));
  });

  form.addEventListener('submit', e => {
    let firstInvalid = null;
    const allValid = Array.from(fields).every(field => {
      const ok = validateField(field);
      if (!ok && !firstInvalid) firstInvalid = field;
      return ok;
    });
    if (!allValid) {
      e.preventDefault();
      firstInvalid?.focus();
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-validate]')?.forEach(form => attachValidation(form));
});
