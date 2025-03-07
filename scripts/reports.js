document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

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

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            console.log('Searching for:', e.target.value);
        });
    }

    // Filter button functionality
    const filterBtn = document.querySelector('.apply-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            console.log('Filter applied');
        });
    }

    // Panel functionality
    const viewButtons = document.querySelectorAll('.expand-btn');
    const detailPanel = document.querySelector('.report-detail-panel');
    const panelTitle = detailPanel?.querySelector('.panel-header h2');
    const closeButton = document.querySelector('.close-panel-btn');
    const body = document.body;

    // Create and append overlay
    const overlay = document.createElement('div');
    overlay.className = 'panel-overlay';
    body.appendChild(overlay);

    // Attach listeners to both available and matching due diligence report view buttons
    const dueDiligenceButtons = document.querySelectorAll('.reports-grid-section:not(:last-child) .expand-btn');
    dueDiligenceButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the report title from the clicked card
            const reportCard = button.closest('.report-card');
            const reportTitle = reportCard.querySelector('h3').textContent;
            
            // Update panel title
            panelTitle.textContent = reportTitle;
            
            // Show panel
            detailPanel.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
        });
    });

    function closePanel() {
        detailPanel.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    closeButton.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    // Detail tab functionality
    const detailTabs = document.querySelectorAll('.detail-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    detailTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            detailTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            tabContents[index].classList.add('active');
        });
    });

    // Research panel functionality
    const researchViewButtons = document.querySelectorAll('.reports-grid-section:last-child .expand-btn');
    const researchPanel = document.querySelector('.research-detail-panel');
    const researchPanelTitle = document.querySelector('.research-detail-panel .panel-header h2');
    const researchCloseButton = document.querySelector('.research-detail-panel .close-panel-btn');
    const researchPreviewButton = document.querySelector('.research-detail-panel .action-btn.preview');
    const researchDownloadButton = document.querySelector('.research-detail-panel .action-btn.download');

    researchViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const reportCard = button.closest('.report-card');
            const reportTitle = reportCard.querySelector('h3').textContent;
            const reportType = reportCard.querySelector('.status').textContent;
            
            // Update panel title and content
            researchPanelTitle.textContent = reportTitle;
            
            // Show research panel
            researchPanel.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
        });
    });

    researchCloseButton.addEventListener('click', () => {
        researchPanel.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    });

    // Add click handler for preview button in research panel
    if (researchPreviewButton) {
        researchPreviewButton.addEventListener('click', () => {
            const reportTitle = researchPanelTitle.textContent;
            previewPopup.querySelector('.preview-header h2').textContent = reportTitle;
            previewPopup.classList.add('active');
            // Keep the overlay active but hide the research panel
            researchPanel.classList.remove('active');
        });
    }

    // Add click handler for download button in research panel
    if (researchDownloadButton) {
        researchDownloadButton.addEventListener('click', () => {
            const reportTitle = researchPanelTitle.textContent;
            const researchDownloadPopup = document.querySelector('.research-download-popup');
            researchDownloadPopup.querySelector('.report-name').textContent = reportTitle;
            researchDownloadPopup.classList.add('active');
            researchPanel.classList.remove('active');
        });
    }

    // Add click handler for apply button
    document.querySelector('.apply-btn').addEventListener('click', () => {
        // For now, just log that the button was clicked
        console.log('Apply filters clicked');
    });

    // Add this after the panel functionality section
    const downloadButtons = document.querySelectorAll('.action-btn.download');
    const dueDiligenceDownloadPopup = document.querySelector('.due-diligence-download-popup');
    const cancelDueDiligenceBtn = dueDiligenceDownloadPopup.querySelector('.cancel-btn');
    const downloadDueDiligenceBtn = dueDiligenceDownloadPopup.querySelector('.download-btn');

    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const reportTitle = document.querySelector('.panel-header h2').textContent;
            dueDiligenceDownloadPopup.querySelector('.report-name').textContent = reportTitle;
            dueDiligenceDownloadPopup.classList.add('active');
            body.style.overflow = 'hidden';
        });
    });

    // Handle research download popup
    const researchDownloadPopup = document.querySelector('.research-download-popup');
    const cancelResearchBtn = researchDownloadPopup.querySelector('.cancel-btn');
    const downloadResearchBtn = researchDownloadPopup.querySelector('.download-btn');

    cancelResearchBtn.addEventListener('click', () => {
        researchDownloadPopup.classList.remove('active');
        body.style.overflow = '';
        // If we came from research panel, show it again
        if (researchPanel.classList.contains('active')) {
            researchPanel.classList.add('active');
        }
    });

    downloadResearchBtn.addEventListener('click', () => {
        // Handle actual download here
        console.log('Downloading report...');
        researchDownloadPopup.classList.remove('active');
        body.style.overflow = '';
    });

    // Handle due diligence download popup
    cancelDueDiligenceBtn.addEventListener('click', () => {
        dueDiligenceDownloadPopup.classList.remove('active');
        body.style.overflow = '';
    });

    downloadDueDiligenceBtn.addEventListener('click', () => {
        // Handle actual download here
        console.log('Downloading due diligence report...');
        dueDiligenceDownloadPopup.classList.remove('active');
        body.style.overflow = '';
    });

    // Add this with the other popup handlers
    const shareButtons = document.querySelectorAll('.action-btn.share');
    const sharePopup = document.querySelector('.share-popup');
    const cancelShareBtn = sharePopup.querySelector('.cancel-btn');
    const shareBtn = sharePopup.querySelector('.share-btn');

    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            sharePopup.classList.add('active');
            body.style.overflow = 'hidden';
        });
    });

    cancelShareBtn.addEventListener('click', () => {
        sharePopup.classList.remove('active');
        body.style.overflow = '';
    });

    shareBtn.addEventListener('click', () => {
        // Handle actual sharing here
        console.log('Sharing report...');
        sharePopup.classList.remove('active');
        body.style.overflow = '';
    });

    // Add this with the other popup handlers
    const previewButtons = document.querySelectorAll('.action-btn.preview');
    const previewPopup = document.querySelector('.preview-popup');
    const closePreviewBtn = previewPopup.querySelector('.close-preview-btn');
    const downloadPreviewBtn = previewPopup.querySelector('.download-preview-btn');

    previewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const reportCard = button.closest('.report-card');
            const reportTitle = reportCard.querySelector('h3').textContent;
            previewPopup.querySelector('.preview-header h2').textContent = reportTitle;
            previewPopup.classList.add('active');
            body.style.overflow = 'hidden';
        });
    });

    closePreviewBtn.addEventListener('click', () => {
        previewPopup.classList.remove('active');
        body.style.overflow = '';
    });

    downloadPreviewBtn.addEventListener('click', () => {
        // Show download popup
        const reportTitle = previewPopup.querySelector('.preview-header h2').textContent;
        downloadPopup.querySelector('.report-name').textContent = reportTitle;
        downloadPopup.classList.add('active');
        previewPopup.classList.remove('active');
    });
}); 