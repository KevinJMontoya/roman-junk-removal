// Form handling

import { elements } from './main.js';

export function initForms() {
  if (elements.bookingForm) {
    elements.bookingForm.addEventListener('submit', handleBookingSubmit);
  }

  if (elements.contactForm) {
    elements.contactForm.addEventListener('submit', handleContactSubmit);
  }

  if (elements.newsletterForm) {
    elements.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
}

async function handleBookingSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  if (submitBtn) {
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    await simulateApiCall(1500);
    console.log('Booking request:', data);
    showNotification('Thanks! We received your booking request. We will contact you shortly.', 'success');
    
    if (elements.bookingModal) {
      elements.bookingModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    
    form.reset();
  } catch (error) {
    showNotification('Something went wrong. Please try again or call us directly.', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }
}

async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  if (submitBtn) {
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    await simulateApiCall(1500);
    console.log('Contact request:', data);
    showNotification('Thanks! We received your request. We will contact you shortly.', 'success');
    form.reset();
  } catch (error) {
    showNotification('Something went wrong. Please try again or call us directly.', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }
}

async function handleNewsletterSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const emailInput = form.querySelector('input[type="email"]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const email = emailInput?.value.trim();

  if (!email || !isValidEmail(email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }

  if (submitBtn) {
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
  }

  try {
    await simulateApiCall(1000);
    console.log('Newsletter subscription:', email);
    
    if (elements.confirmationMessage) {
      elements.confirmationMessage.style.display = 'block';
      form.style.display = 'none';
    }
    
    emailInput.value = '';
  } catch (error) {
    showNotification('Something went wrong. Please try again.', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function simulateApiCall(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    z-index: 3000;
    animation: slideInRight 0.3s ease;
    max-width: 400px;
    font-weight: 600;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

