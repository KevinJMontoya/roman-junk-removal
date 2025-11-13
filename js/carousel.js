// Carousel functionality
import { elements } from './main.js';

let carouselCounter = 0;
let carouselInterval = null;

export function initCarousel() {
  if (!elements.slide || !elements.images || elements.images.length === 0) return;

  const totalImages = elements.images.length;

  const updateCarousel = () => {
    elements.slide.style.transform = `translateX(-${carouselCounter * 100}%)`;
  };

  const nextSlide = (fromUser = false) => {
    carouselCounter = (carouselCounter + 1) % totalImages;
    updateCarousel();
    if (fromUser) resetAutoPlay();
  };

  const prevSlide = (fromUser = false) => {
    carouselCounter = (carouselCounter - 1 + totalImages) % totalImages;
    updateCarousel();
    if (fromUser) resetAutoPlay();
  };

  // Buttons
  if (elements.nextBtn) {
    elements.nextBtn.addEventListener('click', () => nextSlide(true));
  }

  if (elements.prevBtn) {
    elements.prevBtn.addEventListener('click', () => prevSlide(true));
  }

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide(true);
    if (e.key === 'ArrowRight') nextSlide(true);
  });

  // Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  elements.slide.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  elements.slide.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide(true);
      } else {
        prevSlide(true);
      }
    }
  }

  // Autoplay
  const startAutoPlay = () => {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => nextSlide(false), 5000);
  };

  const resetAutoPlay = () => {
    clearInterval(carouselInterval);
    startAutoPlay();
  };

  // Pause on hover
  const carouselContainer = elements.slide.closest('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}
