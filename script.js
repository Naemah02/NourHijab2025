// Offset for header height
const headerOffset = 80;

const carousel = {
    currentSlide: 0,
    slides: document.querySelectorAll('.carousel-slide'),
    dots: document.querySelectorAll('.carousel-dot'),
    prevButton: document.querySelector('.carousel-arrow.prev'),
    nextButton: document.querySelector('.carousel-arrow.next'),

    init() {
        this.showSlide(this.currentSlide);
        this.setupEventListeners();
        this.startAutoPlay();
    },

    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentSlide = index;
    },

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    },

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    },

    setupEventListeners() {
        this.prevButton.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoPlay();
        });

        this.nextButton.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoPlay();
        });

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.showSlide(index);
                this.resetAutoPlay();
            });
        });
    },

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);  // Change slide every 5 seconds
    },

    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    }
};

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const targetPosition = targetElement.offsetTop - headerOffset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect for navigation
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(232, 228, 223, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.backgroundColor = 'rgba(232, 228, 223, 0.9)';
        nav.style.boxShadow = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
});