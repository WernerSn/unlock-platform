document.addEventListener('DOMContentLoaded', function() {
    // Handle tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function switchTab(tabId) {
        // Hide all panes and remove active classes
        tabPanes.forEach(pane => {
            pane.style.display = 'none';
            pane.classList.remove('active');
        });
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Show selected pane and set active class
        const selectedPane = document.getElementById(`${tabId}-form`);
        const selectedBtn = document.querySelector(`[data-tab="${tabId}"]`);
        
        if (selectedPane && selectedBtn) {
            selectedPane.style.display = 'block';
            selectedPane.classList.add('active');
            selectedBtn.classList.add('active');
        }
    }

    // Add click handlers to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.dataset.tab);
        });
    });

    // Set initial tab
    switchTab('due-diligence');

    // Handle "Other" checkboxes
    const otherCheckboxes = document.querySelectorAll('input[value="other"]');
    otherCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const textarea = this.closest('.form-group').querySelector('.other-textarea');
            if (textarea) {
                textarea.style.display = this.checked ? 'block' : 'none';
            }
        });
    });

    // Update form submissions
    const forms = document.querySelectorAll('.request-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get company name from the form
            const companyName = form.querySelector('#company-name').value || 'CompanyX';
            
            // Create success message container
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-content">
                    <div class="icon-circle">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13v4h2V7h-2zm0 6v2h2v-2h-2z" fill="currentColor"/>
                        </svg>
                    </div>
                    <h2>Request Due Diligence</h2>
                    <p>Your request has been successfully submitted for ${companyName}.</p>
                    <p class="track-info">You can track the progress of your request through the <span>Track Request</span> function in the side panel.</p>
                    <p class="notification-info">You will also receive notifications as we process your request or require additional information.</p>
                    <div class="button-group">
                        <button class="submit-another-btn" onclick="window.location.href='new-request.html'">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
                            </svg>
                            Submit Another Request
                        </button>
                        <button class="back-dashboard-btn" onclick="window.location.href='dashboard.html'">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
                            </svg>
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            `;

            // Add success message styles
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                .success-message {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .success-content {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    max-width: 480px;
                }

                .icon-circle {
                    width: 48px;
                    height: 48px;
                    background: #E8F3F8;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    color: #0D8ABC;
                }

                .success-content h2 {
                    color: #1E293B;
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                }

                .success-content p {
                    color: #64748B;
                    margin: 0 0 1rem 0;
                    font-size: 0.95rem;
                    line-height: 1.5;
                }

                .track-info span {
                    color: #0D8ABC;
                    font-weight: 500;
                }

                .notification-info {
                    color: #64748B;
                    font-size: 0.9rem;
                }

                .button-group {
                    display: flex;
                    gap: 1rem;
                    margin-top: 2rem;
                    justify-content: center;
                }

                .submit-another-btn,
                .back-dashboard-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.25rem;
                    border-radius: 8px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .submit-another-btn {
                    background: white;
                    border: 1px solid #E2E8F0;
                    color: #0D8ABC;
                }

                .back-dashboard-btn {
                    background: #0D8ABC;
                    border: none;
                    color: white;
                }

                .submit-another-btn:hover,
                .back-dashboard-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
            `;
            document.head.appendChild(styleSheet);
            document.body.appendChild(successMessage);
        });
    });

    // Add click handler for Apply Filters button
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            // For now, just add a visual feedback that the button was clicked
            this.style.transform = 'translateY(1px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }

    // Check if URL has a hash
    if (window.location.hash === '#research') {
        // Find the research tab button and click it
        const researchTab = document.querySelector('.tab-btn[data-tab="research"]');
        if (researchTab) {
            researchTab.click();
        }
    }

    const viewButtons = document.querySelectorAll('.view-request-btn');
    const popup = document.getElementById('requestPopup');
    const closePopup = popup.querySelector('.close-popup');
    const body = document.body;

    // Function to load request details
    function loadRequestDetails(requestId) {
        // Here you would typically fetch the request details from your backend
        // For now, we'll just show the popup with static data
        popup.classList.add('active');
        body.classList.add('popup-open');
    }

    // Add click handlers to view buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const requestId = button.dataset.requestId;
            loadRequestDetails(requestId);
        });
    });

    // Close popup when clicking the close button
    closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
        body.classList.remove('popup-open');
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            body.classList.remove('popup-open');
        }
    });

    // Prevent popup close when clicking inside popup content
    popup.querySelector('.popup-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Add click handlers for download and print actions
    document.addEventListener('click', function(e) {
        const button = e.target.closest('button[data-action]');
        if (!button) return;
        
        const action = button.getAttribute('data-action');
        const row = button.closest('tr');
        const type = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        
        if (action === 'download') {
            openDownloadDialog(row, type);
        } else if (action === 'print') {
            openPrintDialog(row, type);
        }
    });

    // Print Dialog functionality
    function openDownloadDialog(row, type) {
        const dialog = document.getElementById(type === 'research' ? 'researchDownloadPopup' : 'dueDiligenceDownloadPopup');
        dialog.classList.add('active');
        document.body.style.overflow = 'hidden';

        const closeBtn = dialog.querySelector('.close-dialog');
        const cancelBtn = dialog.querySelector('.cancel-download');
        const confirmBtn = dialog.querySelector('.confirm-download');

        function closeDialog() {
            dialog.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeBtn.addEventListener('click', closeDialog);
        cancelBtn.addEventListener('click', closeDialog);
        
        confirmBtn.addEventListener('click', () => {
            const requestId = row.querySelector('td:first-child').textContent;
            console.log(`Downloading ${type} report ${requestId}`);
            closeDialog();
        });

        // Close on backdrop click
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                closeDialog();
            }
        });
    }

    function openPrintDialog(row, type) {
        const printDialog = document.getElementById('printPopup');
        if (!printDialog) {
            console.error('Print dialog not found!');
            return;
        }

        printDialog.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Initialize dialog controls
        const closePrintBtn = printDialog.querySelector('.cancel-print');
        const cancelPrintBtn = printDialog.querySelector('.cancel-print');
        const confirmPrintBtn = printDialog.querySelector('.confirm-print');

        // Update print options based on type
        const optionsSection = printDialog.querySelector('.print-option-group');
        optionsSection.innerHTML = `
            <label class="print-option">
                <input type="radio" name="print-type" value="snapshot" checked>
                <div class="print-option-content">
                    <span class="print-option-title">Snapshot Report</span>
                    <span class="print-option-description">A condensed overview of key findings</span>
                </div>
            </label>
            <label class="print-option">
                <input type="radio" name="print-type" value="deep-dive">
                <div class="print-option-content">
                    <span class="print-option-title">Deep Dive Report</span>
                    <span class="print-option-description">Comprehensive analysis with details</span>
                </div>
            </label>
        `;

        // Initialize preview functionality
        function updatePreview(row, type, option = 'snapshot') {
            const previewContainer = printDialog.querySelector('.preview-container');
            const requestId = row.querySelector('td:first-child').textContent;
            const company = row.querySelector('td:nth-child(2)').textContent;
            const date = row.querySelector('td:nth-child(5)').textContent;
            
            let content = '';
            
            if (type === 'research') {
                content = `
                    <div class="print-preview-content">
                        <div class="preview-header-content">
                            <h1>${requestId} - Research Report</h1>
                            <p class="company-name">${company}</p>
                            <p class="report-date">${date}</p>
                        </div>
                        <div class="preview-section">
                            <h2>Executive Summary</h2>
                            <div class="research-summary">
                                <p>Comprehensive market analysis and competitive positioning assessment for ${company}.</p>
                                <div class="key-metrics">
                                    <div class="metric">
                                        <span class="metric-label">Market Share</span>
                                        <span class="metric-value">23.5%</span>
                                    </div>
                                    <div class="metric">
                                        <span class="metric-label">Growth Rate</span>
                                        <span class="metric-value">+15.3%</span>
                                    </div>
                                    <div class="metric">
                                        <span class="metric-label">Industry Rank</span>
                                        <span class="metric-value">#3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="preview-section">
                            <h2>Market Analysis</h2>
                            <div class="market-segments">
                                <div class="segment">
                                    <h3>Core Market</h3>
                                    <div class="segment-stats">
                                        <div class="stat">
                                            <span class="stat-label">Size</span>
                                            <span class="stat-value">$12.4B</span>
                                        </div>
                                        <div class="stat">
                                            <span class="stat-label">Growth</span>
                                            <span class="stat-value trend-up">↑ 8.2%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="segment">
                                    <h3>Emerging Markets</h3>
                                    <div class="segment-stats">
                                        <div class="stat">
                                            <span class="stat-label">Size</span>
                                            <span class="stat-value">$3.8B</span>
                                        </div>
                                        <div class="stat">
                                            <span class="stat-label">Growth</span>
                                            <span class="stat-value trend-up">↑ 22.5%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="preview-section">
                            <h2>Competitive Analysis</h2>
                            <div class="competitor-analysis">
                                <div class="competitor">
                                    <span class="competitor-name">Main Competitor A</span>
                                    <div class="competitor-metrics">
                                        <span class="market-share">18.2%</span>
                                        <span class="trend trend-down">↓ 2.1%</span>
                                    </div>
                                </div>
                                <div class="competitor">
                                    <span class="competitor-name">Main Competitor B</span>
                                    <div class="competitor-metrics">
                                        <span class="market-share">15.7%</span>
                                        <span class="trend trend-up">↑ 5.3%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                content = `
                    <div class="print-preview-content">
                        <div class="preview-header-content">
                            <h1>${requestId} - Due Diligence Snapshot</h1>
                            <p class="company-name">${company}</p>
                            <p class="report-date">${date}</p>
                            <div class="overall-assessment">
                                <span class="assessment-label">Overall Assessment</span>
                                <div class="assessment-status warning">
                                    Conditional Verification
                                </div>
                            </div>
                        </div>
                        <div class="preview-section">
                            <h2>Due Diligence Summary</h2>
                            <div class="due-diligence-summary">
                                <div>
                                    <span>Company Structure</span>
                                    <span class="success">✓ No Issues Found</span>
                                </div>
                                <div>
                                    <span>Compliance Check</span>
                                    <span class="warning">⚠ Minor Concerns</span>
                                </div>
                                <div>
                                    <span>Fraud Risk Assessment</span>
                                    <span class="success">✓ Low Risk</span>
                                </div>
                                <div>
                                    <span>Financial Health</span>
                                    <span class="warning">⚠ Minor Concerns</span>
                                </div>
                                <div>
                                    <span>Management Assessment</span>
                                    <span class="success">✓ No Issues Found</span>
                                </div>
                                <div>
                                    <span>Marketing & Brand</span>
                                    <span class="success">✓ Strong Position</span>
                                </div>
                            </div>
                        </div>
                        <div class="preview-section">
                            <h2>Risk Alerts</h2>
                            <div class="risk-alerts">
                                <div class="risk-alert">
                                    <span class="warning-icon">⚠</span>
                                    <h4>Regulatory Compliance</h4>
                                    <p>Minor compliance gaps identified in international operations</p>
                                </div>
                                <div class="risk-alert">
                                    <span class="warning-icon">⚠</span>
                                    <h4>Financial Disclosure</h4>
                                    <p>Additional verification needed for Q3 revenue projections</p>
                                </div>
                            </div>
                        </div>
                        <div class="preview-section">
                            <h2>Key Findings</h2>
                            <div class="findings-details">
                                <div class="finding-detail">
                                    <h3>Corporate Structure</h3>
                                    <p>Standard corporate structure with clear ownership hierarchy. All required registrations and licenses are in place.</p>
                                </div>
                                <div class="finding-detail">
                                    <h3>Financial Position</h3>
                                    <p>Strong revenue growth but some concerns over Q3 projections. Healthy cash position with manageable debt levels.</p>
                                </div>
                                <div class="finding-detail">
                                    <h3>Market Position</h3>
                                    <p>Leading position in core markets with growing market share. Strong brand recognition among key demographics.</p>
                                </div>
                            </div>
                        </div>
                        <div class="preview-section">
                            <h2>Recommendations</h2>
                            <div class="recommendations">
                                <div class="recommendation-item">
                                    <span class="recommendation-priority high">High Priority</span>
                                    <p>Verify Q3 revenue projections and underlying assumptions</p>
                                </div>
                                <div class="recommendation-item">
                                    <span class="recommendation-priority medium">Medium Priority</span>
                                    <p>Review international compliance procedures</p>
                                </div>
                                <div class="recommendation-item">
                                    <span class="recommendation-priority low">Low Priority</span>
                                    <p>Update stakeholder communication strategy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            previewContainer.innerHTML = content;
        }

        // Set up event listeners
        function closePrintDialog() {
            printDialog.classList.remove('active');
            document.body.style.overflow = '';
            closePrintBtn.removeEventListener('click', closePrintDialog);
            cancelPrintBtn.removeEventListener('click', closePrintDialog);
            confirmPrintBtn.removeEventListener('click', handlePrint);
        }

        function handlePrint() {
            window.print();
            closePrintDialog();
        }

        closePrintBtn.addEventListener('click', closePrintDialog);
        cancelPrintBtn.addEventListener('click', closePrintDialog);
        confirmPrintBtn.addEventListener('click', handlePrint);

        // Show initial preview
        updatePreview(row, type);
        
        // Add change listener for print options
        const radioButtons = optionsSection.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => updatePreview(row, type, radio.value));
        });
    }

    // Status pill filtering
    const statusPills = document.querySelectorAll('.status-pill');
    statusPills.forEach(pill => {
        pill.addEventListener('click', () => {
            statusPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            // Add filtering logic here
        });
    });

    // Table row and checkbox selection
    const selectAllCheckbox = document.getElementById('select-all');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    const batchActionsBar = document.querySelector('.batch-actions-bar');
    const selectedCount = document.querySelector('.selected-count');

    // Select all checkbox
    selectAllCheckbox.addEventListener('change', () => {
        const isChecked = selectAllCheckbox.checked;
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
            const row = checkbox.closest('tr');
            if (row) {
                row.classList.toggle('selected', isChecked);
            }
        });
        updateBatchActionsBar();
    });

    // Individual row checkboxes
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation(); // Prevent row click event
            const row = checkbox.closest('tr');
            if (row) {
                row.classList.toggle('selected', checkbox.checked);
            }
            updateSelectAllCheckbox();
            updateBatchActionsBar();
        });
    });

    // Row click handler
    document.querySelectorAll('.requests-table tbody tr').forEach(row => {
        row.addEventListener('click', (e) => {
            if (e.target.closest('.actions') || e.target.closest('.checkbox-cell')) return;
            
            const checkbox = row.querySelector('.row-checkbox');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                row.classList.toggle('selected', checkbox.checked);
                updateSelectAllCheckbox();
                updateBatchActionsBar();
            }
        });
    });

    function updateSelectAllCheckbox() {
        const checkboxes = Array.from(rowCheckboxes);
        const allChecked = checkboxes.every(cb => cb.checked);
        const someChecked = checkboxes.some(cb => cb.checked);
        
        selectAllCheckbox.checked = allChecked;
        selectAllCheckbox.indeterminate = someChecked && !allChecked;
    }

    function updateBatchActionsBar() {
        const selectedRows = document.querySelectorAll('.row-checkbox:checked');
        if (selectedRows.length > 0) {
            batchActionsBar.classList.remove('hidden');
            selectedCount.textContent = `${selectedRows.length} items selected`;
        } else {
            batchActionsBar.classList.add('hidden');
        }
    }

    // Function to initialize action buttons based on request status
    function initializeActionButtons() {
        const rows = document.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const statusBadge = row.querySelector('.status-badge');
            const downloadBtn = row.querySelector('button[title="Download"]');
            const printBtn = row.querySelector('button[title="Print"]');
            
            if (statusBadge && downloadBtn && printBtn) {
                const isCompleted = statusBadge.classList.contains('completed');
                
                if (isCompleted) {
                    downloadBtn.setAttribute('data-action', 'download');
                    printBtn.setAttribute('data-action', 'print');
                    downloadBtn.disabled = false;
                    printBtn.disabled = false;
                } else {
                    downloadBtn.removeAttribute('data-action');
                    printBtn.removeAttribute('data-action');
                    downloadBtn.disabled = true;
                    printBtn.disabled = true;
                }
            }
        });
    }

    // Initialize action buttons
    initializeActionButtons();
});