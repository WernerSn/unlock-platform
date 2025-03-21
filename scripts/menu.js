document.addEventListener('DOMContentLoaded', function() {
    // Get current page from URL
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'dashboard';

    // Function to set active states
    function setActiveStates() {
        document.querySelectorAll('[data-page]').forEach(item => {
            if (item.dataset.page === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Set initial active states
    setActiveStates();

    // Set up observer to handle dynamic menu loading
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                setActiveStates();
                // Re-initialize mobile menu handlers after menu is loaded
                initializeMobileMenu();
                initializeSettingsDropdown();
            }
        });
    });

    // Start observing the menu container
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        observer.observe(menuContainer, { childList: true, subtree: true });
    }

    // Function to initialize mobile menu
    function initializeMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const body = document.body;

        if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
            // Remove existing event listeners if any
            mobileMenuBtn.removeEventListener('click', toggleMenu);
            mobileMenuClose.removeEventListener('click', closeMenu);

            // Toggle menu function
            function toggleMenu() {
                mobileMenu.classList.add('active');
                body.classList.add('menu-open');
            }

            // Close menu function
            function closeMenu() {
                mobileMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }

            // Add event listeners
            mobileMenuBtn.addEventListener('click', toggleMenu);
            mobileMenuClose.addEventListener('click', closeMenu);

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (mobileMenu.classList.contains('active') && 
                    !mobileMenu.contains(e.target) && 
                    !mobileMenuBtn.contains(e.target)) {
                    closeMenu();
                }
            });
        }
    }

    // Initialize mobile menu
    initializeMobileMenu();

    // Simplified settings dropdown functionality
    const settingsBtn = document.querySelector('.settings-btn');
    const settingsDropdown = document.querySelector('.settings-dropdown');
    const signoutBtn = document.querySelector('.signout-btn');
    
    if (settingsBtn && settingsDropdown && signoutBtn) {
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            settingsDropdown.classList.toggle('hidden');
            console.log('Settings clicked');  // Debug line
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!settingsDropdown.contains(e.target) && !settingsBtn.contains(e.target)) {
                settingsDropdown.classList.add('hidden');
            }
        });

        // Add sign out functionality
        signoutBtn.addEventListener('click', function() {
            window.location.href = 'index.html';  // Changed from ../index.html to index.html
        });
    }
}); 