// Music Toggle
const musicToggle = document.querySelector('.music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
    } else {
        bgMusic.play();
    }
    isPlaying = !isPlaying;
});

// Scroll Animations
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

animateElements.forEach(element => {
    observer.observe(element);
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Carousel Functionality
const carouselInner = document.querySelector('.carousel-inner');
const gameCards = document.querySelectorAll('.game-card');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let currentIndex = 0;

function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    gameCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentIndex);
    });
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % gameCards.length;
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + gameCards.length) % gameCards.length;
    updateCarousel();
});

updateCarousel();
