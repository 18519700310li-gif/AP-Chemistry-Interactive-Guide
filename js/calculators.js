// Chemistry Calculators module
const Calculators = {
    calculators: [
        {
            id: 'molar-mass',
            name: 'Molar Mass Calculator',
            description: 'Calculate the molar mass of a compound'
        },
        {
            id: 'ph-calculator',
            name: 'pH Calculator',
            description: 'Calculate pH from concentration or vice versa'
        },
        {
            id: 'stoichiometry',
            name: 'Stoichiometry Calculator',
            description: 'Calculate moles, mass, and volume relationships'
        },
        {
            id: 'dilution',
            name: 'Dilution Calculator',
            description: 'Calculate dilution using M₁V₁ = M₂V₂'
        },
        {
            id: 'ideal-gas',
            name: 'Ideal Gas Law',
            description: 'PV = nRT calculations'
        },
        {
            id: 'enthalpy',
            name: 'Enthalpy Calculator',
            description: 'Calculate ΔH for reactions'
        },
        {
            id: 'gibbs-free',
            name: 'Gibbs Free Energy',
            description: 'Calculate ΔG = ΔH - TΔS'
        },
        {
            id: 'equilibrium-constant',
            name: 'Equilibrium Constant',
            description: 'Calculate K from concentrations'
        },
        {
            id: 'rate-law',
            name: 'Rate Law Calculator',
            description: 'Calculate reaction rates'
        },
        {
            id: 'half-life',
            name: 'Half-Life Calculator',
            description: 'Calculate half-life for first-order reactions'
        },
        {
            id: 'buffer-ph',
            name: 'Buffer pH Calculator',
            description: 'Henderson-Hasselbalch equation'
        },
        {
            id: 'cell-potential',
            name: 'Cell Potential Calculator',
            description: 'Calculate E°cell for electrochemical cells'
        },
        {
            id: 'percent-yield',
            name: 'Percent Yield Calculator',
            description: 'Calculate percent yield of reactions'
        },
        {
            id: 'empirical-formula',
            name: 'Empirical Formula',
            description: 'Calculate empirical formula from composition'
        },
        {
            id: 'limiting-reactant',
            name: 'Limiting Reactant',
            description: 'Determine limiting reactant and theoretical yield'
        }
    ],
    
    init() {
        // Module initialized
    },
    
    render() {
        const contentBody = document.getElementById('content-body');
        let html = Navigation.getBackButton() + '<h2>Chemistry Calculators</h2><p>Select a calculator from the list below:</p><div class="calculator-grid">';
        
        this.calculators.forEach(calc => {
            html += `
                <div class="calculator-card">
                    <h3>${calc.name}</h3>
                    <p>${calc.description}</p>
                    <button class="btn" onclick="Calculators.showCalculator('${calc.id}')">Use Calculator</button>
                </div>
            `;
        });
        
        html += '</div>';
        contentBody.innerHTML = html;
    },
    
    showCalculator(calcId) {
        const contentBody = document.getElementById('content-body');
        let html = Navigation.getBackButton() + `<h2>${this.calculators.find(c => c.id === calcId).name}</h2>`;
        html += '<button class="btn btn-secondary" onclick="Calculators.render()" style="margin-bottom: 1rem;">← Back to Calculators</button>';
        
        switch(calcId) {
            case 'molar-mass':
                html += this.renderMolarMass();
                break;
            case 'ph-calculator':
                html += this.renderPH();
                break;
            case 'stoichiometry':
                html += this.renderStoichiometry();
                break;
            case 'dilution':
                html += this.renderDilution();
                break;
            case 'ideal-gas':
                html += this.renderIdealGas();
                break;
            case 'enthalpy':
                html += this.renderEnthalpy();
                break;
            case 'gibbs-free':
                html += this.renderGibbsFree();
                break;
            case 'equilibrium-constant':
                html += this.renderEquilibrium();
                break;
            case 'rate-law':
                html += this.renderRateLaw();
                break;
            case 'half-life':
                html += this.renderHalfLife();
                break;
            case 'buffer-ph':
                html += this.renderBufferPH();
                break;
            case 'cell-potential':
                html += this.renderCellPotential();
                break;
            case 'percent-yield':
                html += this.renderPercentYield();
                break;
            case 'empirical-formula':
                html += this.renderEmpiricalFormula();
                break;
            case 'limiting-reactant':
                html += this.renderLimitingReactant();
                break;
        }
        
        contentBody.innerHTML = html;
        if (window.MathJax) {
            MathJax.typesetPromise([contentBody]).catch((err) => console.error(err));
        }
    },
    
    renderMolarMass() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <div class="form-group">
                    <label>Chemical Formula (e.g., H2O, CaCO3):</label>
                    <input type="text" id="formula-input" placeholder="Enter formula">
                </div>
                <button class="btn" onclick="Calculators.calculateMolarMass()">Calculate</button>
                <div id="molar-mass-result"></div>
            </div>
        `;
    },
    
    calculateMolarMass() {
        const formula = document.getElementById('formula-input').value.trim();
        if (!formula) {
            alert('Please enter a chemical formula');
            return;
        }
        
        // Simple molar mass calculation (would need a proper parser for complex formulas)
        const atomicMasses = {
            'H': 1.008, 'He': 4.003, 'Li': 6.941, 'Be': 9.012, 'B': 10.81,
            'C': 12.01, 'N': 14.01, 'O': 16.00, 'F': 19.00, 'Ne': 20.18,
            'Na': 22.99, 'Mg': 24.31, 'Al': 26.98, 'Si': 28.09, 'P': 30.97,
            'S': 32.07, 'Cl': 35.45, 'Ar': 39.95, 'K': 39.10, 'Ca': 40.08,
            'Fe': 55.85, 'Cu': 63.55, 'Zn': 65.38, 'Br': 79.90, 'I': 126.90
        };
        
        // Basic parsing (simplified - would need more robust parser)
        let total = 0;
        const regex = /([A-Z][a-z]?)(\d*)/g;
        let match;
        
        while ((match = regex.exec(formula)) !== null) {
            const element = match[1];
            const count = match[2] ? parseInt(match[2]) : 1;
            if (atomicMasses[element]) {
                total += atomicMasses[element] * count;
            } else {
                document.getElementById('molar-mass-result').innerHTML = 
                    '<div class="result-box" style="background-color: #ffebee; border-color: #e74c3c; color: #e74c3c;">Unknown element: ' + element + '</div>';
                return;
            }
        }
        
        document.getElementById('molar-mass-result').innerHTML = 
            `<div class="result-box">Molar Mass: ${total.toFixed(2)} g/mol</div>`;
    },
    
    renderPH() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <div class="form-group">
                    <label>Calculate:</label>
                    <select id="ph-calc-type">
                        <option value="ph-from-conc">pH from [H⁺]</option>
                        <option value="conc-from-ph">[H⁺] from pH</option>
                        <option value="poh">pOH</option>
                    </select>
                </div>
                <div class="form-group">
                    <label id="ph-input-label">[H⁺] (M):</label>
                    <input type="number" id="ph-input" step="0.0001" placeholder="Enter value">
                </div>
                <button class="btn" onclick="Calculators.calculatePH()">Calculate</button>
                <div id="ph-result"></div>
            </div>
        `;
    },
    
    calculatePH() {
        const type = document.getElementById('ph-calc-type').value;
        const input = parseFloat(document.getElementById('ph-input').value);
        
        if (isNaN(input) || input <= 0) {
            alert('Please enter a valid positive number');
            return;
        }
        
        let result = '';
        if (type === 'ph-from-conc') {
            const ph = -Math.log10(input);
            result = `pH = ${ph.toFixed(2)}`;
        } else if (type === 'conc-from-ph') {
            const conc = Math.pow(10, -input);
            result = `[H⁺] = ${conc.toExponential(2)} M`;
        } else if (type === 'poh') {
            const poh = -Math.log10(input);
            result = `pOH = ${poh.toFixed(2)}`;
        }
        
        document.getElementById('ph-result').innerHTML = `<div class="result-box">${result}</div>`;
    },
    
    renderStoichiometry() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Stoichiometry Calculator</h3>
                <p>Convert between moles, mass, and volume using balanced equations</p>
                <div class="form-group">
                    <label>Given Value:</label>
                    <input type="number" id="stoich-given" step="0.001" placeholder="Enter value">
                </div>
                <div class="form-group">
                    <label>Given Unit:</label>
                    <select id="stoich-given-unit">
                        <option value="moles">Moles (mol)</option>
                        <option value="grams">Mass (g)</option>
                        <option value="liters">Volume (L) - for gases at STP</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Molar Mass (g/mol) - if converting to/from grams:</label>
                    <input type="number" id="stoich-molar-mass" step="0.01" placeholder="g/mol">
                </div>
                <div class="form-group">
                    <label>Convert To:</label>
                    <select id="stoich-to-unit">
                        <option value="moles">Moles (mol)</option>
                        <option value="grams">Mass (g)</option>
                        <option value="liters">Volume (L) - for gases at STP</option>
                    </select>
                </div>
                <button class="btn" onclick="Calculators.calculateStoichiometry()">Calculate</button>
                <div id="stoich-result"></div>
            </div>
        `;
    },
    
    calculateStoichiometry() {
        const given = parseFloat(document.getElementById('stoich-given').value);
        const givenUnit = document.getElementById('stoich-given-unit').value;
        const toUnit = document.getElementById('stoich-to-unit').value;
        const molarMass = parseFloat(document.getElementById('stoich-molar-mass').value);
        
        if (isNaN(given) || given <= 0) {
            alert('Please enter a valid positive value');
            return;
        }
        
        if ((givenUnit === 'grams' || toUnit === 'grams') && (isNaN(molarMass) || molarMass <= 0)) {
            alert('Please enter molar mass for gram conversions');
            return;
        }
        
        let result = '';
        let moles = 0;
        
        // Convert given to moles
        if (givenUnit === 'moles') {
            moles = given;
        } else if (givenUnit === 'grams') {
            moles = given / molarMass;
        } else if (givenUnit === 'liters') {
            moles = given / 22.4; // STP: 1 mol = 22.4 L
        }
        
        // Convert moles to desired unit
        if (toUnit === 'moles') {
            result = `${moles.toFixed(4)} mol`;
        } else if (toUnit === 'grams') {
            const grams = moles * molarMass;
            result = `${grams.toFixed(4)} g`;
        } else if (toUnit === 'liters') {
            const liters = moles * 22.4;
            result = `${liters.toFixed(4)} L (at STP)`;
        }
        
        document.getElementById('stoich-result').innerHTML = 
            `<div class="result-box">Result: ${result}</div>`;
    },
    
    renderDilution() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Dilution: M₁V₁ = M₂V₂</h3>
                <div class="form-group">
                    <label>Initial Concentration (M₁):</label>
                    <input type="number" id="m1" step="0.001" placeholder="M">
                </div>
                <div class="form-group">
                    <label>Initial Volume (V₁):</label>
                    <input type="number" id="v1" step="0.1" placeholder="mL">
                </div>
                <div class="form-group">
                    <label>Final Concentration (M₂):</label>
                    <input type="number" id="m2" step="0.001" placeholder="M">
                </div>
                <div class="form-group">
                    <label>Final Volume (V₂):</label>
                    <input type="number" id="v2" step="0.1" placeholder="mL">
                </div>
                <button class="btn" onclick="Calculators.calculateDilution()">Calculate Missing Value</button>
                <div id="dilution-result"></div>
            </div>
        `;
    },
    
    calculateDilution() {
        const m1 = parseFloat(document.getElementById('m1').value);
        const v1 = parseFloat(document.getElementById('v1').value);
        const m2 = parseFloat(document.getElementById('m2').value);
        const v2 = parseFloat(document.getElementById('v2').value);
        
        let result = '';
        if (!isNaN(m1) && !isNaN(v1) && !isNaN(m2) && isNaN(v2)) {
            const calculated = (m1 * v1) / m2;
            result = `V₂ = ${calculated.toFixed(2)} mL`;
        } else if (!isNaN(m1) && !isNaN(v1) && isNaN(m2) && !isNaN(v2)) {
            const calculated = (m1 * v1) / v2;
            result = `M₂ = ${calculated.toFixed(3)} M`;
        } else if (isNaN(m1) && !isNaN(v1) && !isNaN(m2) && !isNaN(v2)) {
            const calculated = (m2 * v2) / v1;
            result = `M₁ = ${calculated.toFixed(3)} M`;
        } else if (!isNaN(m1) && isNaN(v1) && !isNaN(m2) && !isNaN(v2)) {
            const calculated = (m2 * v2) / m1;
            result = `V₁ = ${calculated.toFixed(2)} mL`;
        } else {
            result = 'Please leave one field empty to calculate';
        }
        
        document.getElementById('dilution-result').innerHTML = `<div class="result-box">${result}</div>`;
    },
    
    renderIdealGas() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Ideal Gas Law: PV = nRT</h3>
                <p>R = 0.0821 L·atm/(mol·K) or 8.314 J/(mol·K)</p>
                <div class="form-group">
                    <label>Pressure (P) in atm:</label>
                    <input type="number" id="gas-p" step="0.01" placeholder="atm">
                </div>
                <div class="form-group">
                    <label>Volume (V) in L:</label>
                    <input type="number" id="gas-v" step="0.01" placeholder="L">
                </div>
                <div class="form-group">
                    <label>Moles (n):</label>
                    <input type="number" id="gas-n" step="0.001" placeholder="mol">
                </div>
                <div class="form-group">
                    <label>Temperature (T) in K:</label>
                    <input type="number" id="gas-t" step="0.1" placeholder="K">
                </div>
                <button class="btn" onclick="Calculators.calculateIdealGas()">Calculate Missing Value</button>
                <div id="gas-result"></div>
            </div>
        `;
    },
    
    calculateIdealGas() {
        const R = 0.0821; // L·atm/(mol·K)
        const P = parseFloat(document.getElementById('gas-p').value);
        const V = parseFloat(document.getElementById('gas-v').value);
        const n = parseFloat(document.getElementById('gas-n').value);
        const T = parseFloat(document.getElementById('gas-t').value);
        
        let result = '';
        if (isNaN(P) && !isNaN(V) && !isNaN(n) && !isNaN(T)) {
            const calculated = (n * R * T) / V;
            result = `P = ${calculated.toFixed(3)} atm`;
        } else if (!isNaN(P) && isNaN(V) && !isNaN(n) && !isNaN(T)) {
            const calculated = (n * R * T) / P;
            result = `V = ${calculated.toFixed(3)} L`;
        } else if (!isNaN(P) && !isNaN(V) && isNaN(n) && !isNaN(T)) {
            const calculated = (P * V) / (R * T);
            result = `n = ${calculated.toFixed(3)} mol`;
        } else if (!isNaN(P) && !isNaN(V) && !isNaN(n) && isNaN(T)) {
            const calculated = (P * V) / (n * R);
            result = `T = ${calculated.toFixed(2)} K`;
        } else {
            result = 'Please leave one field empty to calculate';
        }
        
        document.getElementById('gas-result').innerHTML = `<div class="result-box">${result}</div>`;
    },
    
    renderEnthalpy() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Enthalpy Calculator</h3>
                <p>Calculate ΔH using Hess's Law or standard enthalpies</p>
                <div class="form-group">
                    <label>Calculation Type:</label>
                    <select id="enthalpy-type">
                        <option value="hess">Hess's Law (Sum of steps)</option>
                        <option value="formation">From Standard Enthalpies of Formation</option>
                    </select>
                </div>
                <div id="enthalpy-inputs">
                    <div class="form-group">
                        <label>ΔH₁ (kJ/mol):</label>
                        <input type="number" id="enthalpy-h1" step="0.1" placeholder="kJ/mol">
                    </div>
                    <div class="form-group">
                        <label>ΔH₂ (kJ/mol):</label>
                        <input type="number" id="enthalpy-h2" step="0.1" placeholder="kJ/mol">
                    </div>
                    <div class="form-group">
                        <label>ΔH₃ (kJ/mol) - optional:</label>
                        <input type="number" id="enthalpy-h3" step="0.1" placeholder="kJ/mol (optional)">
                    </div>
                </div>
                <button class="btn" onclick="Calculators.calculateEnthalpy()">Calculate ΔH</button>
                <div id="enthalpy-result"></div>
            </div>
        `;
    },
    
    calculateEnthalpy() {
        const type = document.getElementById('enthalpy-type').value;
        const h1 = parseFloat(document.getElementById('enthalpy-h1').value) || 0;
        const h2 = parseFloat(document.getElementById('enthalpy-h2').value) || 0;
        const h3 = parseFloat(document.getElementById('enthalpy-h3').value) || 0;
        
        if (isNaN(h1) || isNaN(h2)) {
            alert('Please enter at least two enthalpy values');
            return;
        }
        
        const deltaH = h1 + h2 + h3;
        document.getElementById('enthalpy-result').innerHTML = 
            `<div class="result-box">ΔH = ${deltaH.toFixed(2)} kJ/mol</div>`;
    },
    
    renderGibbsFree() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Gibbs Free Energy: ΔG = ΔH - TΔS</h3>
                <div class="form-group">
                    <label>Enthalpy (ΔH) in kJ/mol:</label>
                    <input type="number" id="gibbs-h" step="0.1" placeholder="kJ/mol">
                </div>
                <div class="form-group">
                    <label>Temperature (T) in K:</label>
                    <input type="number" id="gibbs-t" step="0.1" placeholder="K">
                </div>
                <div class="form-group">
                    <label>Entropy (ΔS) in J/(mol·K):</label>
                    <input type="number" id="gibbs-s" step="0.1" placeholder="J/(mol·K)">
                </div>
                <button class="btn" onclick="Calculators.calculateGibbs()">Calculate ΔG</button>
                <div id="gibbs-result"></div>
            </div>
        `;
    },
    
    calculateGibbs() {
        const H = parseFloat(document.getElementById('gibbs-h').value);
        const T = parseFloat(document.getElementById('gibbs-t').value);
        const S = parseFloat(document.getElementById('gibbs-s').value);
        
        if (isNaN(H) || isNaN(T) || isNaN(S)) {
            alert('Please fill in all fields');
            return;
        }
        
        const G = H - (T * S / 1000); // Convert S from J to kJ
        const spontaneity = G < 0 ? 'Spontaneous' : 'Non-spontaneous';
        
        document.getElementById('gibbs-result').innerHTML = 
            `<div class="result-box">ΔG = ${G.toFixed(2)} kJ/mol<br>${spontaneity}</div>`;
    },
    
    renderEquilibrium() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Equilibrium Constant Calculator</h3>
                <p>For reaction: aA + bB ⇌ cC + dD</p>
                <p>K = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ</p>
                <div class="form-group">
                    <label>Concentration of A [A] (M):</label>
                    <input type="number" id="eq-a" step="0.001" placeholder="M">
                </div>
                <div class="form-group">
                    <label>Stoichiometric coefficient a:</label>
                    <input type="number" id="eq-coeff-a" value="1" min="1" step="1">
                </div>
                <div class="form-group">
                    <label>Concentration of B [B] (M):</label>
                    <input type="number" id="eq-b" step="0.001" placeholder="M">
                </div>
                <div class="form-group">
                    <label>Stoichiometric coefficient b:</label>
                    <input type="number" id="eq-coeff-b" value="1" min="1" step="1">
                </div>
                <div class="form-group">
                    <label>Concentration of C [C] (M):</label>
                    <input type="number" id="eq-c" step="0.001" placeholder="M">
                </div>
                <div class="form-group">
                    <label>Stoichiometric coefficient c:</label>
                    <input type="number" id="eq-coeff-c" value="1" min="1" step="1">
                </div>
                <div class="form-group">
                    <label>Concentration of D [D] (M):</label>
                    <input type="number" id="eq-d" step="0.001" placeholder="M">
                </div>
                <div class="form-group">
                    <label>Stoichiometric coefficient d:</label>
                    <input type="number" id="eq-coeff-d" value="1" min="1" step="1">
                </div>
                <button class="btn" onclick="Calculators.calculateEquilibrium()">Calculate K</button>
                <div id="equilibrium-result"></div>
            </div>
        `;
    },
    
    calculateEquilibrium() {
        const a = parseFloat(document.getElementById('eq-a').value) || 0;
        const b = parseFloat(document.getElementById('eq-b').value) || 0;
        const c = parseFloat(document.getElementById('eq-c').value) || 0;
        const d = parseFloat(document.getElementById('eq-d').value) || 0;
        const coeffA = parseInt(document.getElementById('eq-coeff-a').value) || 1;
        const coeffB = parseInt(document.getElementById('eq-coeff-b').value) || 1;
        const coeffC = parseInt(document.getElementById('eq-coeff-c').value) || 1;
        const coeffD = parseInt(document.getElementById('eq-coeff-d').value) || 1;
        
        if (a <= 0 || b <= 0) {
            alert('Please enter positive concentrations for reactants');
            return;
        }
        
        const numerator = Math.pow(c, coeffC) * Math.pow(d, coeffD);
        const denominator = Math.pow(a, coeffA) * Math.pow(b, coeffB);
        const K = numerator / denominator;
        
        document.getElementById('equilibrium-result').innerHTML = 
            `<div class="result-box">K = ${K.toExponential(4)}</div>`;
    },
    
    renderRateLaw() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Rate Law Calculator</h3>
                <p>Calculate reaction rate using: rate = k[A]ᵐ[B]ⁿ</p>
                <div class="form-group">
                    <label>Rate Constant (k):</label>
                    <input type="number" id="rate-k" step="0.0001" placeholder="units vary">
                </div>
                <div class="form-group">
                    <label>Concentration of A [A] (M):</label>
                    <input type="number" id="rate-a" step="0.001" placeholder="M">
                </div>
                <div class="form-group">
                    <label>Order with respect to A (m):</label>
                    <input type="number" id="rate-order-a" value="1" min="0" step="1">
                </div>
                <div class="form-group">
                    <label>Concentration of B [B] (M) - optional:</label>
                    <input type="number" id="rate-b" step="0.001" placeholder="M (optional)">
                </div>
                <div class="form-group">
                    <label>Order with respect to B (n) - optional:</label>
                    <input type="number" id="rate-order-b" value="0" min="0" step="1">
                </div>
                <button class="btn" onclick="Calculators.calculateRateLaw()">Calculate Rate</button>
                <div id="rate-law-result"></div>
            </div>
        `;
    },
    
    calculateRateLaw() {
        const k = parseFloat(document.getElementById('rate-k').value);
        const a = parseFloat(document.getElementById('rate-a').value) || 0;
        const b = parseFloat(document.getElementById('rate-b').value) || 0;
        const orderA = parseInt(document.getElementById('rate-order-a').value) || 0;
        const orderB = parseInt(document.getElementById('rate-order-b').value) || 0;
        
        if (isNaN(k) || k <= 0) {
            alert('Please enter a valid positive rate constant');
            return;
        }
        
        if (a <= 0) {
            alert('Please enter a positive concentration for A');
            return;
        }
        
        const rate = k * Math.pow(a, orderA) * Math.pow(b, orderB);
        document.getElementById('rate-law-result').innerHTML = 
            `<div class="result-box">Rate = ${rate.toExponential(4)} M/s</div>`;
    },
    
    renderHalfLife() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Half-Life Calculator (First-Order)</h3>
                <p>For first-order reactions: t₁/₂ = ln(2) / k</p>
                <div class="form-group">
                    <label>Rate Constant (k) in s⁻¹:</label>
                    <input type="number" id="k-value" step="0.0001" placeholder="s⁻¹">
                </div>
                <button class="btn" onclick="Calculators.calculateHalfLife()">Calculate Half-Life</button>
                <div id="half-life-result"></div>
            </div>
        `;
    },
    
    calculateHalfLife() {
        const k = parseFloat(document.getElementById('k-value').value);
        if (isNaN(k) || k <= 0) {
            alert('Please enter a valid positive rate constant');
            return;
        }
        
        const halfLife = Math.log(2) / k;
        document.getElementById('half-life-result').innerHTML = 
            `<div class="result-box">t₁/₂ = ${halfLife.toFixed(4)} s</div>`;
    },
    
    renderBufferPH() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Buffer pH: Henderson-Hasselbalch</h3>
                <p>pH = pKₐ + log([A⁻]/[HA])</p>
                <div class="form-group">
                    <label>pKₐ:</label>
                    <input type="number" id="buffer-pka" step="0.01" placeholder="pKₐ">
                </div>
                <div class="form-group">
                    <label>[A⁻] (conjugate base):</label>
                    <input type="number" id="buffer-a" step="0.001" placeholder="M">
                </div>
                <div class="form-group">
                    <label>[HA] (weak acid):</label>
                    <input type="number" id="buffer-ha" step="0.001" placeholder="M">
                </div>
                <button class="btn" onclick="Calculators.calculateBufferPH()">Calculate pH</button>
                <div id="buffer-result"></div>
            </div>
        `;
    },
    
    calculateBufferPH() {
        const pKa = parseFloat(document.getElementById('buffer-pka').value);
        const A = parseFloat(document.getElementById('buffer-a').value);
        const HA = parseFloat(document.getElementById('buffer-ha').value);
        
        if (isNaN(pKa) || isNaN(A) || isNaN(HA) || A <= 0 || HA <= 0) {
            alert('Please enter valid positive values');
            return;
        }
        
        const pH = pKa + Math.log10(A / HA);
        document.getElementById('buffer-result').innerHTML = 
            `<div class="result-box">pH = ${pH.toFixed(2)}</div>`;
    },
    
    renderCellPotential() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Cell Potential Calculator</h3>
                <p>Calculate E°cell = E°cathode - E°anode</p>
                <div class="form-group">
                    <label>Standard Reduction Potential of Cathode (E°cathode) in V:</label>
                    <input type="number" id="cell-cathode" step="0.01" placeholder="V">
                </div>
                <div class="form-group">
                    <label>Standard Reduction Potential of Anode (E°anode) in V:</label>
                    <input type="number" id="cell-anode" step="0.01" placeholder="V">
                </div>
                <button class="btn" onclick="Calculators.calculateCellPotential()">Calculate E°cell</button>
                <div id="cell-potential-result"></div>
            </div>
        `;
    },
    
    calculateCellPotential() {
        const cathode = parseFloat(document.getElementById('cell-cathode').value);
        const anode = parseFloat(document.getElementById('cell-anode').value);
        
        if (isNaN(cathode) || isNaN(anode)) {
            alert('Please enter both reduction potentials');
            return;
        }
        
        const Ecell = cathode - anode;
        const spontaneity = Ecell > 0 ? 'Spontaneous' : 'Non-spontaneous';
        
        document.getElementById('cell-potential-result').innerHTML = 
            `<div class="result-box">E°cell = ${Ecell.toFixed(3)} V<br>${spontaneity}</div>`;
    },
    
    renderPercentYield() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Percent Yield</h3>
                <div class="form-group">
                    <label>Actual Yield (g):</label>
                    <input type="number" id="actual-yield" step="0.01" placeholder="g">
                </div>
                <div class="form-group">
                    <label>Theoretical Yield (g):</label>
                    <input type="number" id="theoretical-yield" step="0.01" placeholder="g">
                </div>
                <button class="btn" onclick="Calculators.calculatePercentYield()">Calculate</button>
                <div id="yield-result"></div>
            </div>
        `;
    },
    
    calculatePercentYield() {
        const actual = parseFloat(document.getElementById('actual-yield').value);
        const theoretical = parseFloat(document.getElementById('theoretical-yield').value);
        
        if (isNaN(actual) || isNaN(theoretical) || theoretical <= 0) {
            alert('Please enter valid values');
            return;
        }
        
        const percent = (actual / theoretical) * 100;
        document.getElementById('yield-result').innerHTML = 
            `<div class="result-box">Percent Yield = ${percent.toFixed(2)}%</div>`;
    },
    
    renderEmpiricalFormula() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Empirical Formula Calculator</h3>
                <p>Calculate empirical formula from percent composition or mass</p>
                <div class="form-group">
                    <label>Element 1 Symbol:</label>
                    <input type="text" id="emp-elem1" placeholder="e.g., C" maxlength="2">
                </div>
                <div class="form-group">
                    <label>Element 1 Mass or %:</label>
                    <input type="number" id="emp-mass1" step="0.01" placeholder="g or %">
                </div>
                <div class="form-group">
                    <label>Element 2 Symbol:</label>
                    <input type="text" id="emp-elem2" placeholder="e.g., H" maxlength="2">
                </div>
                <div class="form-group">
                    <label>Element 2 Mass or %:</label>
                    <input type="number" id="emp-mass2" step="0.01" placeholder="g or %">
                </div>
                <div class="form-group">
                    <label>Element 3 Symbol (optional):</label>
                    <input type="text" id="emp-elem3" placeholder="e.g., O" maxlength="2">
                </div>
                <div class="form-group">
                    <label>Element 3 Mass or % (optional):</label>
                    <input type="number" id="emp-mass3" step="0.01" placeholder="g or %">
                </div>
                <div class="form-group">
                    <label>Total Mass (g) - if using masses:</label>
                    <input type="number" id="emp-total" step="0.01" placeholder="g (optional)">
                </div>
                <button class="btn" onclick="Calculators.calculateEmpiricalFormula()">Calculate</button>
                <div id="empirical-result"></div>
            </div>
        `;
    },
    
    calculateEmpiricalFormula() {
        const elem1 = document.getElementById('emp-elem1').value.trim();
        const mass1 = parseFloat(document.getElementById('emp-mass1').value);
        const elem2 = document.getElementById('emp-elem2').value.trim();
        const mass2 = parseFloat(document.getElementById('emp-mass2').value);
        const elem3 = document.getElementById('emp-elem3').value.trim();
        const mass3 = parseFloat(document.getElementById('emp-mass3').value) || 0;
        const total = parseFloat(document.getElementById('emp-total').value);
        
        if (!elem1 || !elem2 || isNaN(mass1) || isNaN(mass2) || mass1 <= 0 || mass2 <= 0) {
            alert('Please enter at least two elements with valid masses');
            return;
        }
        
        // Atomic masses
        const atomicMasses = {
            'H': 1.008, 'C': 12.01, 'N': 14.01, 'O': 16.00, 'F': 19.00,
            'Na': 22.99, 'Mg': 24.31, 'Al': 26.98, 'Si': 28.09, 'P': 30.97,
            'S': 32.07, 'Cl': 35.45, 'K': 39.10, 'Ca': 40.08, 'Fe': 55.85
        };
        
        // Convert to moles
        const moles1 = mass1 / (atomicMasses[elem1] || 1);
        const moles2 = mass2 / (atomicMasses[elem2] || 1);
        const moles3 = mass3 > 0 ? mass3 / (atomicMasses[elem3] || 1) : 0;
        
        // Find smallest number of moles
        const minMoles = Math.min(moles1, moles2, moles3 || Infinity);
        
        // Calculate ratios
        let ratio1 = Math.round(moles1 / minMoles * 100) / 100;
        let ratio2 = Math.round(moles2 / minMoles * 100) / 100;
        let ratio3 = moles3 > 0 ? Math.round(moles3 / minMoles * 100) / 100 : 0;
        
        // Simplify ratios
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const simplify = (arr) => {
            let g = arr[0];
            for (let i = 1; i < arr.length; i++) {
                g = gcd(g, arr[i]);
            }
            return arr.map(x => x / g);
        };
        
        const ratios = simplify([ratio1, ratio2, ratio3 || 0].map(r => Math.round(r * 100)));
        ratio1 = ratios[0];
        ratio2 = ratios[1];
        ratio3 = ratios[2];
        
        let formula = elem1;
        if (ratio1 > 1) formula += ratio1;
        formula += elem2;
        if (ratio2 > 1) formula += ratio2;
        if (elem3 && ratio3 > 0) {
            formula += elem3;
            if (ratio3 > 1) formula += ratio3;
        }
        
        document.getElementById('empirical-result').innerHTML = 
            `<div class="result-box">Empirical Formula: ${formula}</div>`;
    },
    
    renderLimitingReactant() {
        return `
            <div class="calculator-card" style="max-width: 600px; margin-top: 2rem;">
                <h3>Limiting Reactant Calculator</h3>
                <p>For reaction: aA + bB → Products</p>
                <div class="form-group">
                    <label>Mass of Reactant A (g):</label>
                    <input type="number" id="limit-mass-a" step="0.01" placeholder="g">
                </div>
                <div class="form-group">
                    <label>Molar Mass of A (g/mol):</label>
                    <input type="number" id="limit-mm-a" step="0.01" placeholder="g/mol">
                </div>
                <div class="form-group">
                    <label>Stoichiometric coefficient of A (a):</label>
                    <input type="number" id="limit-coeff-a" value="1" min="1" step="1">
                </div>
                <div class="form-group">
                    <label>Mass of Reactant B (g):</label>
                    <input type="number" id="limit-mass-b" step="0.01" placeholder="g">
                </div>
                <div class="form-group">
                    <label>Molar Mass of B (g/mol):</label>
                    <input type="number" id="limit-mm-b" step="0.01" placeholder="g/mol">
                </div>
                <div class="form-group">
                    <label>Stoichiometric coefficient of B (b):</label>
                    <input type="number" id="limit-coeff-b" value="1" min="1" step="1">
                </div>
                <div class="form-group">
                    <label>Molar Mass of Product (g/mol) - for theoretical yield:</label>
                    <input type="number" id="limit-mm-product" step="0.01" placeholder="g/mol">
                </div>
                <button class="btn" onclick="Calculators.calculateLimitingReactant()">Calculate</button>
                <div id="limiting-result"></div>
            </div>
        `;
    },
    
    calculateLimitingReactant() {
        const massA = parseFloat(document.getElementById('limit-mass-a').value);
        const mmA = parseFloat(document.getElementById('limit-mm-a').value);
        const coeffA = parseInt(document.getElementById('limit-coeff-a').value) || 1;
        const massB = parseFloat(document.getElementById('limit-mass-b').value);
        const mmB = parseFloat(document.getElementById('limit-mm-b').value);
        const coeffB = parseInt(document.getElementById('limit-coeff-b').value) || 1;
        const mmProduct = parseFloat(document.getElementById('limit-mm-product').value);
        
        if (isNaN(massA) || isNaN(mmA) || isNaN(massB) || isNaN(mmB) || 
            massA <= 0 || mmA <= 0 || massB <= 0 || mmB <= 0) {
            alert('Please enter valid positive values for all required fields');
            return;
        }
        
        // Calculate moles
        const molesA = massA / mmA;
        const molesB = massB / mmB;
        
        // Calculate how much each reactant can produce
        const productFromA = (molesA / coeffA) * coeffB;
        const productFromB = (molesB / coeffB) * coeffA;
        
        let limiting = '';
        let theoreticalYield = 0;
        
        if (productFromA < productFromB) {
            limiting = 'A';
            theoreticalYield = (molesA / coeffA) * (mmProduct || 1);
        } else {
            limiting = 'B';
            theoreticalYield = (molesB / coeffB) * (mmProduct || 1);
        }
        
        let result = `<strong>Limiting Reactant: ${limiting}</strong><br>`;
        result += `Moles of A: ${molesA.toFixed(4)} mol<br>`;
        result += `Moles of B: ${molesB.toFixed(4)} mol<br>`;
        if (mmProduct > 0) {
            result += `Theoretical Yield: ${theoreticalYield.toFixed(4)} g`;
        }
        
        document.getElementById('limiting-result').innerHTML = 
            `<div class="result-box">${result}</div>`;
    }
};

