document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const body = document.body;

    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.reports-grid-section');

    console.log('Found tabs:', tabs.length);
    console.log('Found sections:', sections.length);

    // Set initial state - show first section
    if (sections.length > 0) {
        sections[0].style.display = 'block';
        sections[0].classList.add('active');
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            console.log('Tab clicked:', index);
            
            // Remove active class from all tabs and sections
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => {
                s.style.display = 'none';
                s.classList.remove('active');
            });

            // Add active class to clicked tab and show corresponding section
            tab.classList.add('active');
            if (sections[index]) {
                sections[index].style.display = 'block';
                sections[index].classList.add('active');
            }
        });
    });

    // Search and filter functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            console.log('Searching for:', e.target.value);
        });
    }

    const filterBtn = document.querySelector('.apply-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            console.log('Filter applied');
        });
    }

    // Panel functionality
    const dueDiligencePanel = document.querySelector('.report-detail-panel');
    const researchPanel = document.querySelector('.research-detail-panel');
    const panelTitle = dueDiligencePanel?.querySelector('.panel-header h2');
    const researchPanelTitle = researchPanel?.querySelector('.panel-header h2');
    const closeButtons = document.querySelectorAll('.close-panel-btn');

    // Create and append overlay
    const overlay = document.createElement('div');
    overlay.className = 'panel-overlay';
    body.appendChild(overlay);

    // Due Diligence buttons
    const dueDiligenceButtons = document.querySelectorAll('.reports-grid-section:not(:last-child) .expand-btn');
    dueDiligenceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const reportCard = button.closest('.report-card');
            const reportTitle = reportCard.querySelector('h3').textContent;
            
            if (panelTitle) {
                panelTitle.textContent = reportTitle;
            }
            if (dueDiligencePanel) {
                dueDiligencePanel.classList.add('active');
                overlay.classList.add('active');
                body.style.overflow = 'hidden';
            }
        });
    });

    // Research buttons
    const researchButtons = document.querySelectorAll('.reports-grid-section:last-child .expand-btn');
    researchButtons.forEach(button => {
        button.addEventListener('click', () => {
            const reportCard = button.closest('.report-card');
            const reportTitle = reportCard.querySelector('h3').textContent;
            
            if (researchPanelTitle) {
                researchPanelTitle.textContent = reportTitle;
            }
            if (researchPanel) {
                researchPanel.classList.add('active');
                overlay.classList.add('active');
                body.style.overflow = 'hidden';
            }
        });
    });

    function closePanel() {
        dueDiligencePanel?.classList.remove('active');
        researchPanel?.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closePanel);
    });
    
    overlay.addEventListener('click', closePanel);

    // Detail tab functionality
    const detailTabs = document.querySelectorAll('.detail-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    detailTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            detailTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            tabContents[index].classList.add('active');
        });
    });

    // Dialog functionality
    const printDialog = document.querySelector('.due-diligence-download-popup');
    const shareDialog = document.querySelector('.share-popup');
    const printButtons = document.querySelectorAll('.action-btn.download');
    const shareButtons = document.querySelectorAll('.action-btn.share');
    
    function hideAllDialogs() {
        printDialog?.classList.add('hidden');
        shareDialog?.classList.add('hidden');
        body.style.overflow = '';
    }

    // Print dialog handlers
    printButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllDialogs();
            printDialog?.classList.remove('hidden');
            body.style.overflow = 'hidden';
        });
    });

    // Share dialog handlers
    shareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllDialogs();
            shareDialog?.classList.remove('hidden');
            body.style.overflow = 'hidden';
        });
    });

    // Close buttons
    document.querySelectorAll('.cancel-btn, .download-btn').forEach(btn => {
        btn.addEventListener('click', hideAllDialogs);
    });
}); 