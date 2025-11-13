// Scroll effects and parallax

import { elements } from './main.js';

export function initScrollEffects() {
  if (!elements.header) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  const parallaxElements = document.querySelectorAll('.parallax-bg');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > scrollThreshold) {
      elements.header.classList.add('scrolled');
    } else {
      elements.header.classList.remove('scrolled');
    }

    parallaxElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const speed = 0.3;
      const elementTop = rect.top + currentScroll;
      
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const scrolled = currentScroll - (elementTop - window.innerHeight);
        const yPos = scrolled * speed;
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    });

    lastScroll = currentScroll;
  }, { passive: true });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
          entry.target.classList.add('animate-in');
        }, index * 100);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(section);
  });

  const cards = document.querySelectorAll('.service-item, .review-card, .step-card, .item-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });

  const serviceIcons = document.querySelectorAll('.service-icon');
  serviceIcons.forEach((icon, index) => {
    setInterval(() => {
      icon.style.animation = 'float 3s ease-in-out infinite';
    }, index * 200);
  });
}

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-10px) rotate(2deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.9;
    }
  }

  .animate-in {
    animation: pulse 0.6s ease;
  }

  .item-card,
  .service-item,
  .review-card,
  .step-card {
    will-change: transform, opacity;
  }
`;
document.head.appendChild(style);

