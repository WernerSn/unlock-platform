document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const settingsSections = document.querySelectorAll('.settings-section');
    const changePlanBtn = document.querySelector('.change-plan-btn');
    const planModal = document.getElementById('planModal');
    const closeModalBtn = document.querySelector('.close-modal');

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            settingsSections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            settingsSections[index].classList.add('active');
        });
    });

    // Modal handling
    changePlanBtn.addEventListener('click', () => {
        planModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        planModal.classList.remove('active');
    });

    // Close modal when clicking outside
    planModal.addEventListener('click', (e) => {
        if (e.target === planModal) {
            planModal.classList.remove('active');
        }
    });
}); 