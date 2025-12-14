// Navigation module
const Navigation = {
    currentSection: null,
    
    init() {
        // Set up navigation links
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                if (section) {
                    this.navigateTo(section);
                    
                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Close sidebar on mobile
                    if (window.innerWidth <= 768) {
                        const sidebar = document.querySelector('.sidebar');
                        if (sidebar) {
                            sidebar.classList.remove('open');
                        }
                    }
                }
            });
        });
        
        // Set up click handlers for feature cards on initial page load
        setTimeout(() => {
            const featureCards = document.querySelectorAll('.feature-card[data-nav]');
            featureCards.forEach(card => {
                const section = card.getAttribute('data-nav');
                if (section) {
                    card.addEventListener('click', () => {
                        this.navigateTo(section);
                    });
                }
            });
        }, 100);
    },
    
    navigateTo(section) {
        this.currentSection = section;
        const contentBody = document.getElementById('content-body');
        const pageTitle = document.getElementById('page-title');
        
        if (!contentBody || !pageTitle) {
            console.error('Content body or page title not found');
            return;
        }
        
        // Show loading
        contentBody.innerHTML = '<div class="spinner"></div>';
        
        // Load appropriate content
        setTimeout(() => {
            if (section && section.startsWith('unit')) {
                this.loadUnit(section);
            } else if (section === 'home' || section === null || section === undefined) {
                this.loadHome();
            } else {
                this.loadTool(section);
            }
        }, 100);
    },
    
    loadHome() {
        const contentBody = document.getElementById('content-body');
        const pageTitle = document.getElementById('page-title');
        
        if (!contentBody || !pageTitle) return;
        
        pageTitle.textContent = 'Welcome to AP Chemistry Interactive Learning Guide';
        
        contentBody.innerHTML = `
            <div class="welcome-screen">
                <h2>Welcome!</h2>
                <p>Select a unit from the sidebar to begin learning, or explore the interactive tools.</p>
                <div class="feature-grid">
                    <div class="feature-card" data-nav="unit1" style="cursor: pointer;">
                        <h3>📚 Study Guide</h3>
                        <p>9 comprehensive units covering all AP Chemistry topics</p>
                    </div>
                    <div class="feature-card" data-nav="calculators" style="cursor: pointer;">
                        <h3>🧮 Calculators</h3>
                        <p>15+ chemistry calculation tools</p>
                    </div>
                    <div class="feature-card" data-nav="molecular-viewer" style="cursor: pointer;">
                        <h3>🔬 Molecular Viewer</h3>
                        <p>3D visualization of molecular structures</p>
                    </div>
                    <div class="feature-card" data-nav="gaussian-parser" style="cursor: pointer;">
                        <h3>⚛️ Gaussian Parser</h3>
                        <p>Upload and analyze quantum chemistry results</p>
                    </div>
                    <div class="feature-card" data-nav="titration" style="cursor: pointer;">
                        <h3>🧪 Titration</h3>
                        <p>Interactive acid-base titration simulation</p>
                    </div>
                    <div class="feature-card" data-nav="periodic-table" style="cursor: pointer;">
                        <h3>📊 Periodic Table</h3>
                        <p>Interactive element information lookup</p>
                    </div>
                </div>
            </div>
        `;
        
        // Set up click handlers for feature cards
        setTimeout(() => {
            const featureCards = contentBody.querySelectorAll('.feature-card[data-nav]');
            featureCards.forEach(card => {
                const section = card.getAttribute('data-nav');
                if (section) {
                    card.addEventListener('click', () => {
                        this.navigateTo(section);
                    });
                }
            });
        }, 50);
    },
    
    loadUnit(unitId) {
        const pageTitle = document.getElementById('page-title');
        const unitNumber = unitId.replace('unit', '');
        const unitNames = {
            '1': 'Atomic Structure',
            '2': 'Molecular Structure',
            '3': 'Intermolecular Forces',
            '4': 'Chemical Reactions',
            '5': 'Kinetics',
            '6': 'Thermodynamics',
            '7': 'Equilibrium',
            '8': 'Acids and Bases',
            '9': 'Applications'
        };
        
        if (pageTitle) {
            pageTitle.textContent = `Unit ${unitNumber}: ${unitNames[unitNumber]}`;
        }
        
        // Update active state in sidebar
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(l => l.classList.remove('active'));
        const unitLink = document.querySelector(`[data-section="${unitId}"]`);
        if (unitLink) unitLink.classList.add('active');
        
        if (typeof LearningGuide !== 'undefined' && LearningGuide.loadUnit) {
            LearningGuide.loadUnit(unitId);
            setTimeout(setupBackButtons, 100);
        } else {
            console.error('LearningGuide module not found');
        }
    },
    
    loadTool(toolId) {
        const toolNames = {
            'calculators': 'Chemistry Calculators',
            'molecular-viewer': 'Molecular Viewer',
            'gaussian-parser': 'Gaussian File Parser',
            'titration': 'Titration Simulation',
            'periodic-table': 'Interactive Periodic Table',
            'saved-data': 'Saved Data'
        };
        
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = toolNames[toolId] || toolId;
        }
        
        // Update active state in sidebar
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(l => l.classList.remove('active'));
        const toolLink = document.querySelector(`[data-section="${toolId}"]`);
        if (toolLink) toolLink.classList.add('active');
        
        const contentBody = document.getElementById('content-body');
        if (!contentBody) return;
        
        switch(toolId) {
            case 'calculators':
                if (typeof Calculators !== 'undefined' && Calculators.render) {
                    Calculators.render();
                    setTimeout(setupBackButtons, 100);
                } else {
                    contentBody.innerHTML = '<p>Calculators module not loaded.</p>';
                }
                break;
            case 'molecular-viewer':
                if (typeof MolecularViewer !== 'undefined' && MolecularViewer.render) {
                    MolecularViewer.render();
                    setTimeout(setupBackButtons, 100);
                } else {
                    contentBody.innerHTML = '<p>Molecular Viewer module not loaded.</p>';
                }
                break;
            case 'gaussian-parser':
                if (typeof GaussianParser !== 'undefined' && GaussianParser.render) {
                    GaussianParser.render();
                    setTimeout(setupBackButtons, 100);
                } else {
                    contentBody.innerHTML = '<p>Gaussian Parser module not loaded.</p>';
                }
                break;
            case 'titration':
                if (typeof Titration !== 'undefined' && Titration.render) {
                    Titration.render();
                    setTimeout(setupBackButtons, 100);
                } else {
                    contentBody.innerHTML = '<p>Titration module not loaded.</p>';
                }
                break;
            case 'periodic-table':
                if (typeof PeriodicTable !== 'undefined' && PeriodicTable.render) {
                    PeriodicTable.render();
                    setTimeout(setupBackButtons, 100);
                } else {
                    contentBody.innerHTML = '<p>Periodic Table module not loaded.</p>';
                }
                break;
            case 'saved-data':
                if (typeof DataManager !== 'undefined' && DataManager.render) {
                    DataManager.render();
                    setTimeout(setupBackButtons, 100);
                } else {
                    contentBody.innerHTML = '<p>Data Manager module not loaded.</p>';
                }
                break;
            default:
                contentBody.innerHTML = '<p>Tool not found.</p>';
        }
    },
    
    getBackButton() {
        return '<button class="btn btn-secondary" id="back-to-home-btn" style="margin-bottom: 1.5rem;">← Back to Home</button>';
    }
};

// Set up back button handlers after DOM updates
const setupBackButtons = () => {
    const backButtons = document.querySelectorAll('#back-to-home-btn');
    backButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            Navigation.navigateTo('home');
        });
    });
};

// Make Navigation globally available
window.Navigation = Navigation;

