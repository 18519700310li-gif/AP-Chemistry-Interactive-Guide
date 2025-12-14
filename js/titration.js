// Titration Simulation module
const Titration = {
    chart: null,
    currentData: null,
    
    init() {
        // Module initialized
    },
    
    render() {
        const contentBody = document.getElementById('content-body');
        contentBody.innerHTML = `
            ${Navigation.getBackButton()}
            <h2>Titration Simulation</h2>
            <p>Interactive acid-base titration simulation with real-time pH curve</p>
            
            <div class="titration-container">
                <div class="titration-controls">
                    <h3>Simulation Parameters</h3>
                    
                    <div class="form-group">
                        <label>Acid Type:</label>
                        <select id="acid-type">
                            <option value="strong">Strong Acid (HCl)</option>
                            <option value="weak">Weak Acid (CH₃COOH, Kₐ = 1.8×10⁻⁵)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Base Type:</label>
                        <select id="base-type">
                            <option value="strong">Strong Base (NaOH)</option>
                            <option value="weak">Weak Base (NH₃, Kᵦ = 1.8×10⁻⁵)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Initial Acid Volume (mL):</label>
                        <input type="number" id="acid-volume" value="50" min="10" max="200" step="5">
                    </div>
                    
                    <div class="form-group">
                        <label>Acid Concentration (M):</label>
                        <input type="number" id="acid-conc" value="0.1" min="0.01" max="1" step="0.01">
                    </div>
                    
                    <div class="form-group">
                        <label>Base Concentration (M):</label>
                        <input type="number" id="base-conc" value="0.1" min="0.01" max="1" step="0.01">
                    </div>
                    
                    <div class="form-group">
                        <label>Equivalence Point Volume (mL):</label>
                        <input type="number" id="equiv-volume" readonly style="background-color: #f0f0f0;">
                    </div>
                    
                    <button class="btn" onclick="Titration.calculateEquivalence()">Calculate Equivalence Point</button>
                    <button class="btn btn-success" onclick="Titration.runTitration()">Run Titration</button>
                    <button class="btn btn-secondary" onclick="Titration.resetTitration()">Reset</button>
                </div>
                
                <div class="titration-chart">
                    <h3>Titration Curve</h3>
                    <div class="chart-container" style="width: 100%; height: 400px;">
                        <canvas id="titration-chart"></canvas>
                    </div>
                    <div id="titration-info" style="margin-top: 1rem; padding: 1rem; background-color: #f8f9fa; border-radius: 6px;">
                        <p>Adjust parameters and click "Run Titration" to generate the curve.</p>
                    </div>
                </div>
            </div>
            
            <div class="result-section" style="margin-top: 2rem;">
                <h3>Titration Information</h3>
                <div id="titration-details"></div>
            </div>
        `;
        
        this.updateEquivalencePoint();
        
        // Set up input listeners
        setTimeout(() => {
            const inputs = ['acid-volume', 'acid-conc', 'base-conc'];
            inputs.forEach(id => {
                const input = document.getElementById(id);
                if (input) {
                    input.addEventListener('input', () => this.updateEquivalencePoint());
                }
            });
        }, 100);
    },
    
    updateEquivalencePoint() {
        const acidVol = parseFloat(document.getElementById('acid-volume').value);
        const acidConc = parseFloat(document.getElementById('acid-conc').value);
        const baseConc = parseFloat(document.getElementById('base-conc').value);
        
        const equivVol = (acidVol * acidConc) / baseConc;
        document.getElementById('equiv-volume').value = equivVol.toFixed(2);
    },
    
    calculateEquivalence() {
        this.updateEquivalencePoint();
        const equivVol = parseFloat(document.getElementById('equiv-volume').value);
        alert(`Equivalence point occurs at ${equivVol.toFixed(2)} mL of base added.`);
    },
    
    runTitration() {
        const acidType = document.getElementById('acid-type').value;
        const baseType = document.getElementById('base-type').value;
        const acidVol = parseFloat(document.getElementById('acid-volume').value);
        const acidConc = parseFloat(document.getElementById('acid-conc').value);
        const baseConc = parseFloat(document.getElementById('base-conc').value);
        const equivVol = parseFloat(document.getElementById('equiv-volume').value);
        
        // Generate titration data
        const data = [];
        const maxVol = equivVol * 2;
        const steps = 100;
        
        for (let i = 0; i <= steps; i++) {
            const volBase = (i / steps) * maxVol;
            const pH = this.calculatePH(volBase, acidVol, acidConc, baseConc, equivVol, acidType, baseType);
            data.push({ volume: volBase, pH: pH });
        }
        
        this.currentData = data;
        this.plotTitrationCurve(data, equivVol);
        this.updateTitrationInfo(acidType, baseType, equivVol);
    },
    
    calculatePH(volBase, acidVol, acidConc, baseConc, equivVol, acidType, baseType) {
        const totalVol = acidVol + volBase;
        
        if (totalVol <= 0) return 7.0;
        
        if (volBase === 0) {
            // Initial pH
            if (acidType === 'strong') {
                const pH = -Math.log10(Math.max(acidConc, 1e-14));
                return Math.max(0, Math.min(14, pH));
            } else {
                // Weak acid: pH = -log(√(Kₐ × C))
                const Ka = 1.8e-5;
                const H = Math.sqrt(Ka * acidConc);
                const pH = -Math.log10(Math.max(H, 1e-14));
                return Math.max(0, Math.min(14, pH));
            }
        } else if (volBase < equivVol - 0.01) {
            // Before equivalence point
            const molesAcid = acidVol * acidConc;
            const molesBase = volBase * baseConc;
            const excessAcid = molesAcid - molesBase;
            
            if (acidType === 'strong') {
                const H = Math.max(excessAcid / totalVol, 1e-14);
                const pH = -Math.log10(H);
                return Math.max(0, Math.min(14, pH));
            } else {
                // Weak acid buffer region
                const Ka = 1.8e-5;
                const HA = Math.max(excessAcid / totalVol, 1e-10);
                const A = Math.max(molesBase / totalVol, 1e-10);
                const pH = -Math.log10(Ka) + Math.log10(A / HA);
                return Math.max(0, Math.min(14, pH));
            }
        } else if (Math.abs(volBase - equivVol) < 0.01) {
            // At equivalence point
            if (acidType === 'strong' && baseType === 'strong') {
                return 7.0;
            } else if (acidType === 'weak' && baseType === 'strong') {
                // Weak acid + strong base: pH > 7
                const Ka = 1.8e-5;
                const Kw = 1e-14;
                const Kb = Kw / Ka;
                const saltConc = Math.max((acidVol * acidConc) / totalVol, 1e-10);
                const OH = Math.sqrt(Kb * saltConc);
                const pH = 14 + Math.log10(Math.max(OH, 1e-14));
                return Math.max(0, Math.min(14, pH));
            } else {
                return 7.0;
            }
        } else {
            // After equivalence point
            const excessBase = (volBase - equivVol) * baseConc;
            const OH = Math.max(excessBase / totalVol, 1e-14);
            const pH = 14 + Math.log10(OH);
            return Math.max(0, Math.min(14, pH));
        }
    },
    
    plotTitrationCurve(data, equivVol) {
        const canvas = document.getElementById('titration-chart');
        if (!canvas) return;
        
        // Set canvas size based on container
        const container = canvas.parentElement;
        const width = container.clientWidth || 500;
        const height = container.clientHeight || 400;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        
        const ctx = canvas.getContext('2d');
        const padding = 50;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Find min/max values
        const maxVol = Math.max(...data.map(d => d.volume));
        const minPH = Math.max(0, Math.min(...data.map(d => d.pH)) - 1);
        const maxPH = Math.min(14, Math.max(...data.map(d => d.pH)) + 1);
        
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // Draw labels
        ctx.fillStyle = '#333';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Volume of Base Added (mL)', width / 2, height - 10);
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('pH', 0, 0);
        ctx.restore();
        
        // Draw grid
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const y = padding + (i / 10) * (height - 2 * padding);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
            
            const pH = maxPH - (i / 10) * (maxPH - minPH);
            ctx.fillStyle = '#666';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(pH.toFixed(1), padding - 5, y + 4);
        }
        
        // Draw equivalence point line
        const equivX = padding + (equivVol / maxVol) * (width - 2 * padding);
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(equivX, padding);
        ctx.lineTo(equivX, height - padding);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw curve
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((point, i) => {
            const x = padding + (point.volume / maxVol) * (width - 2 * padding);
            const y = height - padding - ((point.pH - minPH) / (maxPH - minPH)) * (height - 2 * padding);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Mark equivalence point
        const equivPH = data.find(d => Math.abs(d.volume - equivVol) < 0.1)?.pH || 7;
        const equivY = height - padding - ((equivPH - minPH) / (maxPH - minPH)) * (height - 2 * padding);
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(equivX, equivY, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Labels
        ctx.fillStyle = '#e74c3c';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Equivalence Point', equivX, equivY - 10);
    },
    
    updateTitrationInfo(acidType, baseType, equivVol) {
        const infoDiv = document.getElementById('titration-info');
        const detailsDiv = document.getElementById('titration-details');
        
        if (!infoDiv || !detailsDiv) return;
        
        const acidName = acidType === 'strong' ? 'Strong Acid (HCl)' : 'Weak Acid (CH₃COOH)';
        const baseName = baseType === 'strong' ? 'Strong Base (NaOH)' : 'Weak Base (NH₃)';
        
        infoDiv.innerHTML = `
            <p><strong>Titration Type:</strong> ${acidName} with ${baseName}</p>
            <p><strong>Equivalence Point:</strong> ${equivVol.toFixed(2)} mL</p>
        `;
        
        detailsDiv.innerHTML = `
            <h4>Key Points on the Titration Curve:</h4>
            <ul>
                <li><strong>Initial pH:</strong> Depends on acid strength and concentration</li>
                <li><strong>Buffer Region:</strong> Gradual pH change before equivalence point (especially for weak acids)</li>
                <li><strong>Equivalence Point:</strong> pH = 7 for strong acid-strong base, pH > 7 for weak acid-strong base</li>
                <li><strong>After Equivalence:</strong> pH increases rapidly with excess base</li>
            </ul>
        `;
    },
    
    resetTitration() {
        const acidVolInput = document.getElementById('acid-volume');
        const acidConcInput = document.getElementById('acid-conc');
        const baseConcInput = document.getElementById('base-conc');
        
        if (acidVolInput) acidVolInput.value = 50;
        if (acidConcInput) acidConcInput.value = 0.1;
        if (baseConcInput) baseConcInput.value = 0.1;
        
        this.updateEquivalencePoint();
        
        const canvas = document.getElementById('titration-chart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        const infoDiv = document.getElementById('titration-info');
        const detailsDiv = document.getElementById('titration-details');
        if (infoDiv) {
            infoDiv.innerHTML = '<p>Adjust parameters and click "Run Titration" to generate the curve.</p>';
        }
        if (detailsDiv) {
            detailsDiv.innerHTML = '';
        }
    }
};

// Update equivalence point when inputs change - will be set up when titration is rendered

