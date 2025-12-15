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
            <h2>Gaussian File Parser & MultiWFN Visualization</h2>
            <p>Upload Gaussian output files (.log, .out, .fch) to parse and visualize quantum chemistry calculation results with MultiWFN-style analysis.</p>
            
            <div class="upload-area" id="upload-area">
                <input type="file" id="gaussian-file-input" class="file-input" accept=".log,.out,.txt,.fch">
                <div>
                    <h3>📁 Upload Gaussian File</h3>
                    <p>Click here or drag and drop your file</p>
                    <p style="font-size: 0.875rem; color: #7f8c8d; margin-top: 0.5rem;">
                        Supported formats: .log, .out, .txt, .fch (checkpoint files)
                    </p>
                </div>
            </div>
            
            <div id="parsed-results" class="parsed-results" style="display: none;">
                <h3>Parsed Results</h3>
                <div id="results-content"></div>
                <button class="btn btn-success" onclick="GaussianParser.saveResults()" style="margin-top: 1rem;">Save Results</button>
            </div>
            
            <div id="multiwfn-visualization" class="result-section" style="margin-top: 2rem; display: none;">
                <h3>MultiWFN-Style Visualization</h3>
                <div id="visualization-controls" style="margin: 1rem 0;">
                    <label for="vis-type">Visualization Type:</label>
                    <select id="vis-type" style="margin: 0.5rem; padding: 0.5rem;">
                        <option value="geometry">Molecular Geometry</option>
                        <option value="orbitals">Molecular Orbitals</option>
                        <option value="density">Electron Density</option>
                        <option value="esp">Electrostatic Potential</option>
                        <option value="frequencies">Vibrational Modes</option>
                    </select>
                    <button class="btn" onclick="GaussianParser.generateVisualization()" style="margin-left: 1rem;">Generate Visualization</button>
                </div>
                <div id="visualization-container" style="width: 100%; height: 500px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9; display: flex; align-items: center; justify-content: center;">
                    <p style="color: #7f8c8d;">Visualization will appear here</p>
                </div>
            </div>
            
            <div class="result-section" style="margin-top: 2rem;">
                <h3>About Gaussian Files & MultiWFN</h3>
                <p>Gaussian output files contain results from quantum chemistry calculations including:</p>
                <ul>
                    <li>Molecular geometry and coordinates</li>
                    <li>Energy values (SCF energy, zero-point energy, etc.)</li>
                    <li>Vibrational frequencies and IR spectra</li>
                    <li>Molecular orbitals and electron densities</li>
                    <li>Thermodynamic properties</li>
                    <li>NMR chemical shifts</li>
                </ul>
                <p><strong>MultiWFN Integration:</strong> This tool integrates MultiWFN-style analysis capabilities for visualizing wavefunction data from Gaussian .fch checkpoint files. MultiWFN is a multifunctional wavefunction analyzer that can process various quantum chemistry file formats.</p>
                <p><strong>Note:</strong> Full FCH file parsing and advanced visualization features require backend processing. For complete MultiWFN functionality, consider using the standalone MultiWFN program or a backend service.</p>
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
            if (file && (file.name.endsWith('.log') || file.name.endsWith('.out') || file.name.endsWith('.txt') || file.name.endsWith('.fch'))) {
                this.handleFile(file);
            } else {
                alert('Please upload a valid Gaussian file (.log, .out, .txt, or .fch)');
            }
        });
    },
    
    handleFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const content = e.target.result;
            if (file.name.endsWith('.fch')) {
                this.handleFCHFile(file, e.target.result);
            } else {
                this.parseGaussianFile(content, file.name);
            }
        };
        
        reader.onerror = () => {
            alert('Error reading file. Please try again.');
        };
        
        // For FCH files, read as binary; for text files, read as text
        if (file.name.endsWith('.fch')) {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsText(file);
        }
    },
    
    handleFCHFile(file, arrayBuffer) {
        // FCH files are binary checkpoint files
        // Note: Full FCH parsing requires specialized libraries
        // This provides a framework for integration
        
        const results = {
            filename: file.name,
            fileType: 'fch',
            fileSize: file.size,
            geometry: [],
            hasWavefunction: true,
            message: 'FCH file detected. Advanced parsing requires backend processing or MultiWFN integration.'
        };
        
        // Try to extract basic information if possible
        // FCH files have a specific binary format that's complex to parse in JavaScript
        // For now, we'll show a message and prepare for visualization
        
        this.parsedData = results;
        this.displayFCHResults(results);
    },
    
    displayFCHResults(results) {
        const resultsDiv = document.getElementById('parsed-results');
        const contentDiv = document.getElementById('results-content');
        const visDiv = document.getElementById('multiwfn-visualization');
        
        if (!resultsDiv || !contentDiv) return;
        
        let html = '';
        
        html += '<div class="result-section">';
        html += '<h4>FCH Checkpoint File</h4>';
        html += `<p><strong>Filename:</strong> ${results.filename}</p>`;
        html += `<p><strong>File Size:</strong> ${(results.fileSize / 1024).toFixed(2)} KB</p>`;
        html += `<p><strong>File Type:</strong> Gaussian Checkpoint File</p>`;
        html += '<p style="color: #e67e22; margin-top: 1rem;"><strong>ℹ️ MultiWFN Integration:</strong></p>';
        html += '<p>FCH files contain wavefunction data including:</p>';
        html += '<ul>';
        html += '<li>Molecular orbitals</li>';
        html += '<li>Electron density</li>';
        html += '<li>Basis set information</li>';
        html += '<li>Molecular geometry</li>';
        html += '<li>Energy information</li>';
        html += '</ul>';
        html += '<p>To fully analyze FCH files, you can:</p>';
        html += '<ol>';
        html += '<li>Use the standalone MultiWFN program (Fortran-based)</li>';
        html += '<li>Convert FCH to cube files using MultiWFN and upload those</li>';
        html += '<li>Use a backend service that processes FCH files</li>';
        html += '</ol>';
        html += '<p style="margin-top: 1rem;"><strong>Visualization Options:</strong> Use the MultiWFN-style visualization panel below to visualize molecular properties if geometry data is available.</p>';
        html += '</div>';
        
        contentDiv.innerHTML = html;
        resultsDiv.style.display = 'block';
        
        if (visDiv) {
            visDiv.style.display = 'block';
        }
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
        
        // Show visualization panel if geometry is available
        const visDiv = document.getElementById('multiwfn-visualization');
        if (visDiv && results.geometry && results.geometry.length > 0) {
            visDiv.style.display = 'block';
        }
    },
    
    generateVisualization() {
        const visType = document.getElementById('vis-type')?.value || 'geometry';
        const container = document.getElementById('visualization-container');
        
        if (!container) return;
        
        if (!this.parsedData || !this.parsedData.geometry || this.parsedData.geometry.length === 0) {
            container.innerHTML = '<p style="color: #e74c3c;">No geometry data available for visualization. Please upload a file with geometry information.</p>';
            return;
        }
        
        switch(visType) {
            case 'geometry':
                this.visualizeGeometry3D(container);
                break;
            case 'orbitals':
                container.innerHTML = '<p style="color: #3498db;">Molecular orbital visualization requires wavefunction data from FCH files. This feature requires backend processing or MultiWFN integration.</p>';
                break;
            case 'density':
                container.innerHTML = '<p style="color: #3498db;">Electron density visualization requires wavefunction data from FCH files. This feature requires backend processing or MultiWFN integration.</p>';
                break;
            case 'esp':
                container.innerHTML = '<p style="color: #3498db;">Electrostatic potential visualization requires wavefunction data from FCH files. This feature requires backend processing or MultiWFN integration.</p>';
                break;
            case 'frequencies':
                if (this.parsedData.frequencies && this.parsedData.frequencies.length > 0) {
                    this.visualizeFrequencies(container);
                } else {
                    container.innerHTML = '<p style="color: #e74c3c;">No frequency data available.</p>';
                }
                break;
            default:
                container.innerHTML = '<p>Select a visualization type.</p>';
        }
    },
    
    visualizeGeometry3D(container) {
        // Use Three.js to visualize molecular geometry
        if (typeof THREE === 'undefined') {
            container.innerHTML = '<p style="color: #e74c3c;">Three.js library not loaded. Cannot generate 3D visualization.</p>';
            return;
        }
        
        container.innerHTML = '<canvas id="geometry-canvas" style="width: 100%; height: 100%;"></canvas>';
        const canvas = document.getElementById('geometry-canvas');
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // Color mapping for atoms (CPK colors)
        const atomColors = {
            'H': 0xffffff, 'C': 0x909090, 'N': 0x3050f8, 'O': 0xff0d0d,
            'F': 0x90e050, 'P': 0xff8000, 'S': 0xffff30, 'Cl': 0x1ff01f
        };
        
        const atomSizes = {
            'H': 0.3, 'C': 0.7, 'N': 0.65, 'O': 0.6,
            'F': 0.5, 'P': 1.0, 'S': 1.0, 'Cl': 1.0
        };
        
        // Add atoms
        const geometry = this.parsedData.geometry;
        const center = { x: 0, y: 0, z: 0 };
        geometry.forEach(atom => {
            center.x += atom.x;
            center.y += atom.y;
            center.z += atom.z;
        });
        center.x /= geometry.length;
        center.y /= geometry.length;
        center.z /= geometry.length;
        
        geometry.forEach(atom => {
            const color = atomColors[atom.atom] || 0x808080;
            const size = atomSizes[atom.atom] || 0.5;
            
            const sphereGeometry = new THREE.SphereGeometry(size, 32, 32);
            const sphereMaterial = new THREE.MeshPhongMaterial({ color: color });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            
            sphere.position.set(
                atom.x - center.x,
                atom.y - center.y,
                atom.z - center.z
            );
            
            scene.add(sphere);
        });
        
        // Add bonds (simple distance-based)
        geometry.forEach((atom1, i) => {
            geometry.slice(i + 1).forEach(atom2 => {
                const dx = atom2.x - atom1.x;
                const dy = atom2.y - atom1.y;
                const dz = atom2.z - atom1.z;
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                
                // Simple heuristic: bond if distance is reasonable
                const maxBondDist = 2.0; // Angstroms
                if (dist < maxBondDist && dist > 0.5) {
                    const bondGeometry = new THREE.CylinderGeometry(0.1, 0.1, dist, 8);
                    const bondMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
                    const bond = new THREE.Mesh(bondGeometry, bondMaterial);
                    
                    const midX = (atom1.x + atom2.x) / 2 - center.x;
                    const midY = (atom1.y + atom2.y) / 2 - center.y;
                    const midZ = (atom1.z + atom2.z) / 2 - center.z;
                    
                    bond.position.set(midX, midY, midZ);
                    bond.lookAt(
                        atom2.x - center.x,
                        atom2.y - center.y,
                        atom2.z - center.z
                    );
                    bond.rotateX(Math.PI / 2);
                    
                    scene.add(bond);
                }
            });
        });
        
        // Position camera
        const maxDist = Math.max(
            ...geometry.map(a => Math.sqrt(
                Math.pow(a.x - center.x, 2) +
                Math.pow(a.y - center.y, 2) +
                Math.pow(a.z - center.z, 2)
            ))
        );
        camera.position.set(maxDist * 2, maxDist * 2, maxDist * 2);
        camera.lookAt(0, 0, 0);
        
        // Add controls
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;
                
                // Rotate camera around the molecule
                const spherical = new THREE.Spherical();
                spherical.setFromVector3(camera.position);
                spherical.theta -= deltaX * 0.01;
                spherical.phi += deltaY * 0.01;
                spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
                
                camera.position.setFromSpherical(spherical);
                camera.lookAt(0, 0, 0);
            }
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });
        
        canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const scale = e.deltaY > 0 ? 1.1 : 0.9;
            camera.position.multiplyScalar(scale);
        });
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();
    },
    
    visualizeFrequencies(container) {
        if (!this.parsedData.frequencies || this.parsedData.frequencies.length === 0) {
            container.innerHTML = '<p>No frequency data available.</p>';
            return;
        }
        
        const frequencies = this.parsedData.frequencies;
        let html = '<div style="padding: 1rem;"><h4>Vibrational Frequencies</h4>';
        html += '<table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">';
        html += '<tr><th style="border: 1px solid #ddd; padding: 0.5rem;">Mode</th><th style="border: 1px solid #ddd; padding: 0.5rem;">Frequency (cm⁻¹)</th></tr>';
        
        frequencies.forEach((freq, index) => {
            html += `<tr>
                <td style="border: 1px solid #ddd; padding: 0.5rem;">${index + 1}</td>
                <td style="border: 1px solid #ddd; padding: 0.5rem;">${freq.toFixed(2)}</td>
            </tr>`;
        });
        
        html += '</table></div>';
        container.innerHTML = html;
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

