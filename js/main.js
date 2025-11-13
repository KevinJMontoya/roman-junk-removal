// Main initialization file

import { initNavigation } from './navigation.js';
import { initModal } from './modal.js';
import { initCarousel } from './carousel.js';
import { initForms } from './forms.js';
import { initScrollEffects, initSmoothScroll } from './scroll-effects.js';

// DOM Elements
export const elements = {
  year: document.getElementById('year'),
  bookBtn: document.getElementById('bookBtn'),
  bookBtn2: document.getElementById('bookBtn2'),
  bookingModal: document.getElementById('bookingModal'),
  modalClose: document.getElementById('modalClose'),
  bookingForm: document.getElementById('bookingForm'),
  contactForm: document.getElementById('contactForm'),
  newsletterForm: document.getElementById('newsletterForm'),
  confirmationMessage: document.getElementById('confirmationMessage'),
  slide: document.querySelector('.carousel-slide'),
  images: document.querySelectorAll('.carousel-slide img'),
  prevBtn: document.querySelector('.carousel-btn.prev'),
  nextBtn: document.querySelector('.carousel-btn.next'),
  header: document.querySelector('.site-header')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  // Set current year
  if (elements.year) {
    elements.year.textContent = new Date().getFullYear();
  }

  // Initialize components
  initNavigation();
  initModal();
  initCarousel();
  initForms();
  initScrollEffects();
  initSmoothScroll();
}

