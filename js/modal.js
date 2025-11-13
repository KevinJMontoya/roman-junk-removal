// Modal functionality

import { elements } from './main.js';

export function initModal() {
  if (!elements.bookingModal) return;

  const openModal = () => {
    elements.bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstInput = elements.bookingForm?.querySelector('input');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  };

  const closeModal = () => {
    elements.bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  [elements.bookBtn, elements.bookBtn2].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', openModal);
    }
  });

  if (elements.modalClose) {
    elements.modalClose.addEventListener('click', closeModal);
  }

  elements.bookingModal.addEventListener('click', (e) => {
    if (e.target === elements.bookingModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.bookingModal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
}

