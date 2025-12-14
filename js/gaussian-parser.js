// Gaussian File Parser module
const GaussianParser = {
    parsedData: null,
    
    init() {
        // Module initialized
    },
    
    render() {
        const contentBody = document.getElementById('content-body');
        contentBody.innerHTML = `
            ${Navigation.getBackButton()}
            <h2>Gaussian File Parser</h2>
            <p>Upload Gaussian output files (.log or .out) to parse and visualize quantum chemistry calculation results.</p>
            
            <div class="upload-area" id="upload-area">
                <input type="file" id="gaussian-file-input" class="file-input" accept=".log,.out,.txt">
                <div>
                    <h3>📁 Upload Gaussian Output File</h3>
                    <p>Click here or drag and drop your file</p>
                    <p style="font-size: 0.875rem; color: #7f8c8d; margin-top: 0.5rem;">
                        Supported formats: .log, .out, .txt
                    </p>
                </div>
            </div>
            
            <div id="parsed-results" class="parsed-results" style="display: none;">
                <h3>Parsed Results</h3>
                <div id="results-content"></div>
                <button class="btn btn-success" onclick="GaussianParser.saveResults()" style="margin-top: 1rem;">Save Results</button>
            </div>
            
            <div class="result-section" style="margin-top: 2rem;">
                <h3>About Gaussian Files</h3>
                <p>Gaussian output files contain results from quantum chemistry calculations including:</p>
                <ul>
                    <li>Molecular geometry and coordinates</li>
                    <li>Energy values (SCF energy, zero-point energy, etc.)</li>
                    <li>Vibrational frequencies and IR spectra</li>
                    <li>Molecular orbitals and electron densities</li>
                    <li>Thermodynamic properties</li>
                    <li>NMR chemical shifts</li>
                </ul>
                <p><strong>Note:</strong> Full parsing requires a backend service or JavaScript library. This interface provides the foundation for integration.</p>
            </div>
        `;
        
        this.setupFileUpload();
    },
    
    setupFileUpload() {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('gaussian-file-input');
        
        if (!uploadArea || !fileInput) return;
        
        // Click to upload
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        // File input change
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFile(file);
            }
        });
        
        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && (file.name.endsWith('.log') || file.name.endsWith('.out') || file.name.endsWith('.txt'))) {
                this.handleFile(file);
            } else {
                alert('Please upload a valid Gaussian output file (.log, .out, or .txt)');
            }
        });
    },
    
    handleFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const content = e.target.result;
            this.parseGaussianFile(content, file.name);
        };
        
        reader.onerror = () => {
            alert('Error reading file. Please try again.');
        };
        
        reader.readAsText(file);
    },
    
    parseGaussianFile(content, filename) {
        // Basic parsing - extract key information
        // Note: Full Gaussian parsing is complex and typically requires specialized libraries
        // This is a simplified parser that extracts common information
        
        const results = {
            filename: filename,
            scfEnergy: null,
            zeroPointEnergy: null,
            geometry: [],
            frequencies: [],
            dipoleMoment: null,
            hfEnergy: null,
            thermochemistry: null
        };
        
        const lines = content.split('\n');
        
        // Extract SCF energy
        const scfMatch = content.match(/SCF Done:\s+E\([^)]+\)\s*=\s*(-?\d+\.\d+)/);
        if (scfMatch) {
            results.scfEnergy = parseFloat(scfMatch[1]);
        }
        
        // Extract HF energy
        const hfMatch = content.match(/HF=\s*(-?\d+\.\d+)/);
        if (hfMatch) {
            results.hfEnergy = parseFloat(hfMatch[1]);
        }
        
        // Extract zero-point energy
        const zpeMatch = content.match(/Zero-point correction=\s*(-?\d+\.\d+)/);
        if (zpeMatch) {
            results.zeroPointEnergy = parseFloat(zpeMatch[1]);
        }
        
        // Extract dipole moment
        const dipoleMatch = content.match(/Dipole moment \(field-independent basis, Debye\):\s+X=\s*(-?\d+\.\d+)\s+Y=\s*(-?\d+\.\d+)\s+Z=\s*(-?\d+\.\d+)/);
        if (dipoleMatch) {
            const x = parseFloat(dipoleMatch[1]);
            const y = parseFloat(dipoleMatch[2]);
            const z = parseFloat(dipoleMatch[3]);
            results.dipoleMoment = Math.sqrt(x*x + y*y + z*z).toFixed(4);
        }
        
        // Extract geometry (Standard orientation)
        let inGeometry = false;
        let geometryStart = false;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('Standard orientation:')) {
                inGeometry = true;
                geometryStart = true;
                results.geometry = [];
                continue;
            }
            if (inGeometry && geometryStart) {
                if (lines[i].includes('---')) {
                    if (results.geometry.length > 0) {
                        geometryStart = false;
                    }
                    continue;
                }
                if (geometryStart && lines[i].trim() && !isNaN(parseInt(lines[i].trim().split(/\s+/)[0]))) {
                    const parts = lines[i].trim().split(/\s+/);
                    if (parts.length >= 5) {
                        results.geometry.push({
                            atom: this.getAtomSymbol(parseInt(parts[1])),
                            x: parseFloat(parts[3]),
                            y: parseFloat(parts[4]),
                            z: parseFloat(parts[5])
                        });
                    }
                }
            }
            if (inGeometry && lines[i].includes('Rotational constants')) {
                inGeometry = false;
            }
        }
        
        // Extract vibrational frequencies
        const freqMatch = content.match(/Frequencies --\s+(-?\d+\.\d+(?:\s+-?\d+\.\d+)*)/g);
        if (freqMatch) {
            freqMatch.forEach(match => {
                const freqs = match.replace('Frequencies --', '').trim().split(/\s+/);
                freqs.forEach(f => {
                    const freq = parseFloat(f);
                    if (!isNaN(freq) && freq > 0) {
                        results.frequencies.push(freq);
                    }
                });
            });
        }
        
        // Extract thermochemistry
        const thermoMatch = content.match(/Sum of electronic and thermal Free Energies=\s*(-?\d+\.\d+)/);
        if (thermoMatch) {
            results.thermochemistry = {
                freeEnergy: parseFloat(thermoMatch[1])
            };
        }
        
        this.parsedData = results;
        this.displayResults(results);
    },
    
    getAtomSymbol(atomicNumber) {
        const elements = [
            '', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
            'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca',
            'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn'
        ];
        return elements[atomicNumber] || 'X';
    },
    
    displayResults(results) {
        const resultsDiv = document.getElementById('parsed-results');
        const contentDiv = document.getElementById('results-content');
        
        if (!resultsDiv || !contentDiv) return;
        
        let html = '';
        
        // Energy section
        html += '<div class="result-section">';
        html += '<h4>Energy Values</h4>';
        if (results.scfEnergy !== null) {
            html += `<p><strong>SCF Energy:</strong> ${results.scfEnergy.toFixed(6)} Hartree</p>`;
        }
        if (results.hfEnergy !== null) {
            html += `<p><strong>HF Energy:</strong> ${results.hfEnergy.toFixed(6)} Hartree</p>`;
        }
        if (results.zeroPointEnergy !== null) {
            html += `<p><strong>Zero-Point Energy:</strong> ${results.zeroPointEnergy.toFixed(6)} Hartree</p>`;
        }
        if (results.thermochemistry) {
            html += `<p><strong>Free Energy:</strong> ${results.thermochemistry.freeEnergy.toFixed(6)} Hartree</p>`;
        }
        html += '</div>';
        
        // Dipole moment
        if (results.dipoleMoment !== null) {
            html += '<div class="result-section">';
            html += '<h4>Dipole Moment</h4>';
            html += `<p><strong>Dipole Moment:</strong> ${results.dipoleMoment} Debye</p>`;
            html += '</div>';
        }
        
        // Geometry
        if (results.geometry.length > 0) {
            html += '<div class="result-section">';
            html += '<h4>Molecular Geometry</h4>';
            html += '<table style="width: 100%; border-collapse: collapse;">';
            html += '<tr><th>Atom</th><th>X (Å)</th><th>Y (Å)</th><th>Z (Å)</th></tr>';
            results.geometry.forEach(atom => {
                html += `<tr>
                    <td>${atom.atom}</td>
                    <td>${atom.x.toFixed(4)}</td>
                    <td>${atom.y.toFixed(4)}</td>
                    <td>${atom.z.toFixed(4)}</td>
                </tr>`;
            });
            html += '</table>';
            html += '<button class="btn" onclick="GaussianParser.visualizeGeometry()" style="margin-top: 1rem;">Visualize in 3D</button>';
            html += '</div>';
        }
        
        // Frequencies
        if (results.frequencies.length > 0) {
            html += '<div class="result-section">';
            html += '<h4>Vibrational Frequencies</h4>';
            html += `<p><strong>Number of frequencies:</strong> ${results.frequencies.length}</p>`;
            html += '<p><strong>Frequencies (cm⁻¹):</strong> ' + results.frequencies.slice(0, 10).map(f => f.toFixed(2)).join(', ') + 
                    (results.frequencies.length > 10 ? '...' : '') + '</p>';
            html += '</div>';
        }
        
        contentDiv.innerHTML = html;
        resultsDiv.style.display = 'block';
    },
    
    visualizeGeometry() {
        if (!this.parsedData || !this.parsedData.geometry || this.parsedData.geometry.length === 0) {
            alert('No geometry data available');
            return;
        }
        
        // Navigate to molecular viewer and load the geometry
        Navigation.navigateTo('molecular-viewer');
        setTimeout(() => {
            alert('3D visualization from Gaussian geometry coming soon! This will load the parsed coordinates into the molecular viewer.');
        }, 100);
    },
    
    saveResults() {
        if (!this.parsedData) {
            alert('No results to save');
            return;
        }
        
        const dataToSave = {
            type: 'gaussian',
            timestamp: new Date().toISOString(),
            data: this.parsedData
        };
        
        DataManager.saveData(dataToSave);
        alert('Results saved successfully!');
    }
};

