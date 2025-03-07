document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.reports-carousel');
    const cards = carousel.querySelectorAll('.report-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 24; // Include gap
    const visibleCards = 3;
    const maxIndex = cards.length - visibleCards;

    // Create dots
    cards.forEach((_, index) => {
        if (index <= maxIndex) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function updateDots(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function scrollToIndex(index) {
        if (index < 0) {
            index = maxIndex;
        } else if (index > maxIndex) {
            index = 0;
        }
        currentIndex = index;
        carousel.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
        updateDots(currentIndex);
    }

    prevBtn.addEventListener('click', () => {
        scrollToIndex(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        scrollToIndex(currentIndex + 1);
    });

    // Optional: Auto-scroll
    let autoScrollInterval = setInterval(() => {
        scrollToIndex(currentIndex + 1);
    }, 5000);

    // Pause auto-scroll on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            scrollToIndex(currentIndex + 1);
        }, 5000);
    });
}); 