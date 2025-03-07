document.addEventListener('DOMContentLoaded', function() {
    // Download popup functionality
    function initializeDownloadPopup() {
        const downloadPopup = document.querySelector('.download-popup');
        const downloadButtons = document.querySelectorAll('.download-btn');
        const closePopupButton = document.querySelector('.close-popup');
        const downloadOptions = document.querySelectorAll('.download-option');
        
        if (!downloadPopup || !closePopupButton) {
            console.error('Download popup elements not found');
            return;
        }
        
        // Open popup when download button is clicked
        downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                downloadPopup.classList.remove('hidden');
            });
        });
        
        // Close popup when close button is clicked
        closePopupButton.addEventListener('click', () => {
            downloadPopup.classList.add('hidden');
        });
        
        // Close popup when clicking outside
        downloadPopup.addEventListener('click', (e) => {
            if (e.target === downloadPopup) {
                downloadPopup.classList.add('hidden');
            }
        });
        
        // Handle download option selection
        downloadOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Add download logic here
                console.log('Download option clicked');
                downloadPopup.classList.add('hidden');
            });
        });
    }
    
    // Initialize download popup after a short delay to ensure DOM is ready
    setTimeout(initializeDownloadPopup, 100);
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside
    mainContent.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Carousel functionality
    const carousel = document.getElementById('reportsCarousel');
    const cards = carousel.querySelectorAll('.report-card');
    const dots = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Constants
    const visibleCards = 3;
    const totalCards = cards.length;
    
    // Touch handling variables
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    let startScrollLeft = 0;
    
    let currentIndex = visibleCards;
    let cardWidth = getCardWidth();
    
    function getCardWidth() {
        if (window.innerWidth <= 768) {
            // Mobile view
            return window.innerWidth <= 480 ? 
                window.innerWidth - 32 : // Small mobile
                window.innerWidth - 48;  // Regular mobile
        }
        // Desktop view
        return 324; // 300px card width + 24px gap
    }
    
    function updateCarousel(animate = true) {
        if (!animate) {
            carousel.style.transition = 'none';
        } else {
            carousel.style.transition = 'transform 0.5s ease';
        }
        
        // Update transform
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update active states
        const allCards = carousel.querySelectorAll('.report-card');
        allCards.forEach((card, index) => {
            card.classList.toggle('active', 
                index >= currentIndex && index < currentIndex + visibleCards);
        });
        
        // Update dots
        const normalizedIndex = (currentIndex - visibleCards) % totalCards;
        const activeDotIndex = Math.floor(normalizedIndex / visibleCards);
        dots.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    function handleTransitionEnd() {
        // If we're at the end of the clones
        if (currentIndex >= totalCards + visibleCards) {
            currentIndex = visibleCards;
            updateCarousel(false);
        }
        // If we're at the start of the clones
        if (currentIndex < visibleCards) {
            currentIndex = totalCards + visibleCards - visibleCards;
            updateCarousel(false);
        }
    }

    // Clone first and last cards for infinite scroll
    const firstCards = Array.from(cards).slice(0, visibleCards);
    const lastCards = Array.from(cards).slice(-visibleCards);
    
    // Remove existing clones if any
    carousel.querySelectorAll('.clone').forEach(clone => clone.remove());
    
    // Append clones
    lastCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone');
        carousel.insertBefore(clone, carousel.firstChild);
    });
    
    firstCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone');
        carousel.appendChild(clone);
    });
    
    // Adjust initial position to hide clones
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Initialize dots
    cards.forEach((_, index) => {
        if (index % visibleCards === 0) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index + visibleCards));
            dots.appendChild(dot);
        }
    });

    carousel.addEventListener('transitionend', handleTransitionEnd);

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
    });

    // Auto-play
    let autoplayInterval = setInterval(() => {
        currentIndex++;
        updateCarousel();
    }, 5000);

    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            currentIndex++;
            updateCarousel();
        }, 5000);
    });

    // Touch event handlers
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
        startScrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const touch = e.touches[0];
        const diff = touchStartX - touch.clientX;
        carousel.scrollLeft = startScrollLeft + diff;
    });

    carousel.addEventListener('touchend', (e) => {
        isDragging = false;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 100) { // Minimum swipe distance
            if (diff > 0) {
                currentIndex++;
            } else {
                currentIndex--;
            }
            updateCarousel();
        }
    });

    // Update card width on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            cardWidth = getCardWidth();
            updateCarousel(false);
        }, 250); // Debounce resize events
    });

    // Update carousel immediately on load
    window.addEventListener('load', () => {
        cardWidth = getCardWidth();
        updateCarousel(false);
    });
}); 