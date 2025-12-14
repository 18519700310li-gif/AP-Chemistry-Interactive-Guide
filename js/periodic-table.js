// Periodic Table module
const PeriodicTable = {
    selectedElement: null,
    elements: [
        // Period 1
        { symbol: 'H', name: 'Hydrogen', number: 1, mass: 1.008, group: 1, period: 1, category: 'nonmetal' },
        { symbol: 'He', name: 'Helium', number: 2, mass: 4.003, group: 18, period: 1, category: 'noble' },
        // Period 2
        { symbol: 'Li', name: 'Lithium', number: 3, mass: 6.941, group: 1, period: 2, category: 'alkali' },
        { symbol: 'Be', name: 'Beryllium', number: 4, mass: 9.012, group: 2, period: 2, category: 'alkaline' },
        { symbol: 'B', name: 'Boron', number: 5, mass: 10.81, group: 13, period: 2, category: 'metalloid' },
        { symbol: 'C', name: 'Carbon', number: 6, mass: 12.01, group: 14, period: 2, category: 'nonmetal' },
        { symbol: 'N', name: 'Nitrogen', number: 7, mass: 14.01, group: 15, period: 2, category: 'nonmetal' },
        { symbol: 'O', name: 'Oxygen', number: 8, mass: 16.00, group: 16, period: 2, category: 'nonmetal' },
        { symbol: 'F', name: 'Fluorine', number: 9, mass: 19.00, group: 17, period: 2, category: 'halogen' },
        { symbol: 'Ne', name: 'Neon', number: 10, mass: 20.18, group: 18, period: 2, category: 'noble' },
        // Period 3
        { symbol: 'Na', name: 'Sodium', number: 11, mass: 22.99, group: 1, period: 3, category: 'alkali' },
        { symbol: 'Mg', name: 'Magnesium', number: 12, mass: 24.31, group: 2, period: 3, category: 'alkaline' },
        { symbol: 'Al', name: 'Aluminum', number: 13, mass: 26.98, group: 13, period: 3, category: 'metal' },
        { symbol: 'Si', name: 'Silicon', number: 14, mass: 28.09, group: 14, period: 3, category: 'metalloid' },
        { symbol: 'P', name: 'Phosphorus', number: 15, mass: 30.97, group: 15, period: 3, category: 'nonmetal' },
        { symbol: 'S', name: 'Sulfur', number: 16, mass: 32.07, group: 16, period: 3, category: 'nonmetal' },
        { symbol: 'Cl', name: 'Chlorine', number: 17, mass: 35.45, group: 17, period: 3, category: 'halogen' },
        { symbol: 'Ar', name: 'Argon', number: 18, mass: 39.95, group: 18, period: 3, category: 'noble' },
        // Period 4
        { symbol: 'K', name: 'Potassium', number: 19, mass: 39.10, group: 1, period: 4, category: 'alkali' },
        { symbol: 'Ca', name: 'Calcium', number: 20, mass: 40.08, group: 2, period: 4, category: 'alkaline' },
        { symbol: 'Sc', name: 'Scandium', number: 21, mass: 44.96, group: 3, period: 4, category: 'transition' },
        { symbol: 'Ti', name: 'Titanium', number: 22, mass: 47.87, group: 4, period: 4, category: 'transition' },
        { symbol: 'V', name: 'Vanadium', number: 23, mass: 50.94, group: 5, period: 4, category: 'transition' },
        { symbol: 'Cr', name: 'Chromium', number: 24, mass: 52.00, group: 6, period: 4, category: 'transition' },
        { symbol: 'Mn', name: 'Manganese', number: 25, mass: 54.94, group: 7, period: 4, category: 'transition' },
        { symbol: 'Fe', name: 'Iron', number: 26, mass: 55.85, group: 8, period: 4, category: 'transition' },
        { symbol: 'Co', name: 'Cobalt', number: 27, mass: 58.93, group: 9, period: 4, category: 'transition' },
        { symbol: 'Ni', name: 'Nickel', number: 28, mass: 58.69, group: 10, period: 4, category: 'transition' },
        { symbol: 'Cu', name: 'Copper', number: 29, mass: 63.55, group: 11, period: 4, category: 'transition' },
        { symbol: 'Zn', name: 'Zinc', number: 30, mass: 65.38, group: 12, period: 4, category: 'transition' },
        { symbol: 'Ga', name: 'Gallium', number: 31, mass: 69.72, group: 13, period: 4, category: 'metal' },
        { symbol: 'Ge', name: 'Germanium', number: 32, mass: 72.64, group: 14, period: 4, category: 'metalloid' },
        { symbol: 'As', name: 'Arsenic', number: 33, mass: 74.92, group: 15, period: 4, category: 'metalloid' },
        { symbol: 'Se', name: 'Selenium', number: 34, mass: 78.96, group: 16, period: 4, category: 'nonmetal' },
        { symbol: 'Br', name: 'Bromine', number: 35, mass: 79.90, group: 17, period: 4, category: 'halogen' },
        { symbol: 'Kr', name: 'Krypton', number: 36, mass: 83.80, group: 18, period: 4, category: 'noble' },
        // Period 5
        { symbol: 'Rb', name: 'Rubidium', number: 37, mass: 85.47, group: 1, period: 5, category: 'alkali' },
        { symbol: 'Sr', name: 'Strontium', number: 38, mass: 87.62, group: 2, period: 5, category: 'alkaline' },
        { symbol: 'Y', name: 'Yttrium', number: 39, mass: 88.91, group: 3, period: 5, category: 'transition' },
        { symbol: 'Zr', name: 'Zirconium', number: 40, mass: 91.22, group: 4, period: 5, category: 'transition' },
        { symbol: 'Nb', name: 'Niobium', number: 41, mass: 92.91, group: 5, period: 5, category: 'transition' },
        { symbol: 'Mo', name: 'Molybdenum', number: 42, mass: 95.96, group: 6, period: 5, category: 'transition' },
        { symbol: 'Tc', name: 'Technetium', number: 43, mass: 98, group: 7, period: 5, category: 'transition' },
        { symbol: 'Ru', name: 'Ruthenium', number: 44, mass: 101.07, group: 8, period: 5, category: 'transition' },
        { symbol: 'Rh', name: 'Rhodium', number: 45, mass: 102.91, group: 9, period: 5, category: 'transition' },
        { symbol: 'Pd', name: 'Palladium', number: 46, mass: 106.42, group: 10, period: 5, category: 'transition' },
        { symbol: 'Ag', name: 'Silver', number: 47, mass: 107.87, group: 11, period: 5, category: 'transition' },
        { symbol: 'Cd', name: 'Cadmium', number: 48, mass: 112.41, group: 12, period: 5, category: 'transition' },
        { symbol: 'In', name: 'Indium', number: 49, mass: 114.82, group: 13, period: 5, category: 'metal' },
        { symbol: 'Sn', name: 'Tin', number: 50, mass: 118.71, group: 14, period: 5, category: 'metal' },
        { symbol: 'Sb', name: 'Antimony', number: 51, mass: 121.76, group: 15, period: 5, category: 'metalloid' },
        { symbol: 'Te', name: 'Tellurium', number: 52, mass: 127.60, group: 16, period: 5, category: 'metalloid' },
        { symbol: 'I', name: 'Iodine', number: 53, mass: 126.90, group: 17, period: 5, category: 'halogen' },
        { symbol: 'Xe', name: 'Xenon', number: 54, mass: 131.29, group: 18, period: 5, category: 'noble' },
        // Period 6
        { symbol: 'Cs', name: 'Cesium', number: 55, mass: 132.91, group: 1, period: 6, category: 'alkali' },
        { symbol: 'Ba', name: 'Barium', number: 56, mass: 137.33, group: 2, period: 6, category: 'alkaline' },
        { symbol: 'La', name: 'Lanthanum', number: 57, mass: 138.91, group: 3, period: 6, category: 'lanthanide' },
        { symbol: 'Hf', name: 'Hafnium', number: 72, mass: 178.49, group: 4, period: 6, category: 'transition' },
        { symbol: 'Ta', name: 'Tantalum', number: 73, mass: 180.95, group: 5, period: 6, category: 'transition' },
        { symbol: 'W', name: 'Tungsten', number: 74, mass: 183.84, group: 6, period: 6, category: 'transition' },
        { symbol: 'Re', name: 'Rhenium', number: 75, mass: 186.21, group: 7, period: 6, category: 'transition' },
        { symbol: 'Os', name: 'Osmium', number: 76, mass: 190.23, group: 8, period: 6, category: 'transition' },
        { symbol: 'Ir', name: 'Iridium', number: 77, mass: 192.22, group: 9, period: 6, category: 'transition' },
        { symbol: 'Pt', name: 'Platinum', number: 78, mass: 195.08, group: 10, period: 6, category: 'transition' },
        { symbol: 'Au', name: 'Gold', number: 79, mass: 196.97, group: 11, period: 6, category: 'transition' },
        { symbol: 'Hg', name: 'Mercury', number: 80, mass: 200.59, group: 12, period: 6, category: 'transition' },
        { symbol: 'Tl', name: 'Thallium', number: 81, mass: 204.38, group: 13, period: 6, category: 'metal' },
        { symbol: 'Pb', name: 'Lead', number: 82, mass: 207.2, group: 14, period: 6, category: 'metal' },
        { symbol: 'Bi', name: 'Bismuth', number: 83, mass: 208.98, group: 15, period: 6, category: 'metal' },
        { symbol: 'Po', name: 'Polonium', number: 84, mass: 209, group: 16, period: 6, category: 'metalloid' },
        { symbol: 'At', name: 'Astatine', number: 85, mass: 210, group: 17, period: 6, category: 'halogen' },
        { symbol: 'Rn', name: 'Radon', number: 86, mass: 222, group: 18, period: 6, category: 'noble' },
        // Period 7
        { symbol: 'Fr', name: 'Francium', number: 87, mass: 223, group: 1, period: 7, category: 'alkali' },
        { symbol: 'Ra', name: 'Radium', number: 88, mass: 226, group: 2, period: 7, category: 'alkaline' },
        { symbol: 'Ac', name: 'Actinium', number: 89, mass: 227, group: 3, period: 7, category: 'actinide' },
        { symbol: 'Rf', name: 'Rutherfordium', number: 104, mass: 267, group: 4, period: 7, category: 'transition' },
        { symbol: 'Db', name: 'Dubnium', number: 105, mass: 268, group: 5, period: 7, category: 'transition' },
        { symbol: 'Sg', name: 'Seaborgium', number: 106, mass: 269, group: 6, period: 7, category: 'transition' },
        { symbol: 'Bh', name: 'Bohrium', number: 107, mass: 270, group: 7, period: 7, category: 'transition' },
        { symbol: 'Hs', name: 'Hassium', number: 108, mass: 277, group: 8, period: 7, category: 'transition' },
        { symbol: 'Mt', name: 'Meitnerium', number: 109, mass: 278, group: 9, period: 7, category: 'transition' },
        { symbol: 'Ds', name: 'Darmstadtium', number: 110, mass: 281, group: 10, period: 7, category: 'transition' },
        { symbol: 'Rg', name: 'Roentgenium', number: 111, mass: 282, group: 11, period: 7, category: 'transition' },
        { symbol: 'Cn', name: 'Copernicium', number: 112, mass: 285, group: 12, period: 7, category: 'transition' },
        { symbol: 'Nh', name: 'Nihonium', number: 113, mass: 286, group: 13, period: 7, category: 'metal' },
        { symbol: 'Fl', name: 'Flerovium', number: 114, mass: 289, group: 14, period: 7, category: 'metal' },
        { symbol: 'Mc', name: 'Moscovium', number: 115, mass: 290, group: 15, period: 7, category: 'metal' },
        { symbol: 'Lv', name: 'Livermorium', number: 116, mass: 293, group: 16, period: 7, category: 'metal' },
        { symbol: 'Ts', name: 'Tennessine', number: 117, mass: 294, group: 17, period: 7, category: 'halogen' },
        { symbol: 'Og', name: 'Oganesson', number: 118, mass: 294, group: 18, period: 7, category: 'noble' }
    ],
    
    init() {
        // Module initialized
    },
    
    render() {
        const contentBody = document.getElementById('content-body');
        contentBody.innerHTML = `
            ${Navigation.getBackButton()}
            <h2>Interactive Periodic Table</h2>
            <p>Click on any element to view detailed information</p>
            
            <div class="periodic-table-container">
                <div class="periodic-table" id="periodic-table"></div>
            </div>
            
            <div class="element-info" id="element-info" style="display: none;">
                <h3 id="element-name"></h3>
                <div id="element-details"></div>
            </div>
        `;
        
        this.renderTable();
    },
    
    renderTable() {
        const table = document.getElementById('periodic-table');
        if (!table) return;
        
        // Create a grid for the periodic table layout
        // Standard periodic table has 18 groups
        const grid = Array(7).fill(null).map(() => Array(18).fill(null));
        
        // Place elements in their positions
        this.elements.forEach(element => {
            const row = element.period - 1;
            const col = element.group - 1;
            
            if (row >= 0 && row < 7 && col >= 0 && col < 18) {
                grid[row][col] = element;
            }
        });
        
        // Handle lanthanides and actinides (place them separately)
        const lanthanides = this.elements.filter(e => e.category === 'lanthanide');
        const actinides = this.elements.filter(e => e.category === 'actinide');
        
        // Render main table
        let html = '';
        for (let row = 0; row < 7; row++) {
            for (let col = 0; col < 18; col++) {
                const element = grid[row][col];
                if (element) {
                    html += this.createElementCell(element);
                } else {
                    // Empty cell
                    html += '<div class="element-cell" style="visibility: hidden;"></div>';
                }
            }
        }
        
        table.innerHTML = html;
        
        // Add event listeners
        table.querySelectorAll('.element-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const number = parseInt(e.currentTarget.dataset.number);
                const element = this.elements.find(el => el.number === number);
                if (element) {
                    this.selectElement(element);
                }
            });
        });
    },
    
    createElementCell(element) {
        const categoryColors = {
            'alkali': '#ff6b6b',
            'alkaline': '#ffa500',
            'transition': '#4ecdc4',
            'metal': '#95e1d3',
            'metalloid': '#fce38a',
            'nonmetal': '#a8e6cf',
            'halogen': '#ffd93d',
            'noble': '#c7ceea',
            'lanthanide': '#ffb3ba',
            'actinide': '#ffdfba'
        };
        
        const color = categoryColors[element.category] || '#e0e0e0';
        
        return `
            <div class="element-cell" 
                 data-number="${element.number}"
                 style="background-color: ${color};">
                <div class="element-number">${element.number}</div>
                <div class="element-symbol">${element.symbol}</div>
                <div class="element-name">${element.name}</div>
            </div>
        `;
    },
    
    selectElement(element) {
        this.selectedElement = element;
        
        const infoDiv = document.getElementById('element-info');
        const nameDiv = document.getElementById('element-name');
        const detailsDiv = document.getElementById('element-details');
        
        if (!infoDiv || !nameDiv || !detailsDiv) return;
        
        nameDiv.textContent = `${element.number}. ${element.name} (${element.symbol})`;
        
        detailsDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
                <div>
                    <p><strong>Atomic Number:</strong> ${element.number}</p>
                    <p><strong>Symbol:</strong> ${element.symbol}</p>
                    <p><strong>Atomic Mass:</strong> ${element.mass} u</p>
                </div>
                <div>
                    <p><strong>Group:</strong> ${element.group}</p>
                    <p><strong>Period:</strong> ${element.period}</p>
                    <p><strong>Category:</strong> ${this.formatCategory(element.category)}</p>
                </div>
            </div>
            <div style="margin-top: 1.5rem;">
                <h4>Properties</h4>
                <p>Additional properties and electron configuration information would be displayed here.</p>
            </div>
        `;
        
        infoDiv.style.display = 'block';
        infoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    
    formatCategory(category) {
        const categories = {
            'alkali': 'Alkali Metal',
            'alkaline': 'Alkaline Earth Metal',
            'transition': 'Transition Metal',
            'metal': 'Metal',
            'metalloid': 'Metalloid',
            'nonmetal': 'Nonmetal',
            'halogen': 'Halogen',
            'noble': 'Noble Gas',
            'lanthanide': 'Lanthanide',
            'actinide': 'Actinide'
        };
        return categories[category] || category;
    }
};

