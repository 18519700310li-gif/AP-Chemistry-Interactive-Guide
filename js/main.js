// Main application entry point
document.addEventListener('DOMContentLoaded', () => {
    // Make sure Navigation is available
    if (typeof Navigation === 'undefined') {
        console.error('Navigation module not loaded!');
        return;
    }
    
    // Initialize navigation
    Navigation.init();
    
    // Initialize menu toggle for mobile
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (sidebar) {
                sidebar.classList.toggle('open');
            }
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar) {
            if (!sidebar.contains(e.target) && menuToggle && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
    
    // Initialize all modules
    if (typeof LearningGuide !== 'undefined') LearningGuide.init();
    if (typeof Calculators !== 'undefined') Calculators.init();
    if (typeof MolecularViewer !== 'undefined') MolecularViewer.init();
    if (typeof GaussianParser !== 'undefined') GaussianParser.init();
    if (typeof Titration !== 'undefined') Titration.init();
    if (typeof PeriodicTable !== 'undefined') PeriodicTable.init();
    if (typeof DataManager !== 'undefined') DataManager.init();
    
    // Set up initial feature card handlers
    setTimeout(() => {
        const featureCards = document.querySelectorAll('.feature-card[data-nav]');
        featureCards.forEach(card => {
            const section = card.getAttribute('data-nav');
            if (section) {
                card.addEventListener('click', () => {
                    Navigation.navigateTo(section);
                });
            }
        });
    }, 200);
    
    console.log('AP Chemistry Interactive Learning Guide initialized');
});

