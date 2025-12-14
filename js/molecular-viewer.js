// Molecular Viewer module using Three.js
const MolecularViewer = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    currentMolecule: null,
    animationId: null,
    
    init() {
        // Module initialized
    },
    
    render() {
        const contentBody = document.getElementById('content-body');
        contentBody.innerHTML = `
            ${Navigation.getBackButton()}
            <h2>Molecular Viewer</h2>
            <p>Visualize 3D molecular structures and orbitals</p>
            
            <div class="calculator-card" style="max-width: 100%; margin-bottom: 2rem;">
                <h3>Load Molecule</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; align-items: end;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>Select a molecule:</label>
                        <select id="molecule-select">
                            <option value="water">Water (H₂O)</option>
                            <option value="methane">Methane (CH₄)</option>
                            <option value="ammonia">Ammonia (NH₃)</option>
                            <option value="carbon-dioxide">Carbon Dioxide (CO₂)</option>
                            <option value="benzene">Benzene (C₆H₆)</option>
                            <option value="ethene">Ethene (C₂H₄)</option>
                            <option value="ammonium">Ammonium Ion (NH₄⁺)</option>
                            <option value="sulfate">Sulfate Ion (SO₄²⁻)</option>
                        </select>
                    </div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button class="btn" onclick="MolecularViewer.loadMolecule()">Load Molecule</button>
                        <button class="btn btn-secondary" onclick="MolecularViewer.resetView()">Reset View</button>
                        <button class="btn btn-secondary" onclick="MolecularViewer.toggleAnimation()">Toggle Rotation</button>
                    </div>
                </div>
            </div>
            
            <div class="viewer-container" id="viewer-container" style="position: relative; width: 100%; height: 600px; background-color: #1a1a1a; border-radius: 8px; overflow: hidden; margin-bottom: 2rem;"></div>
            
            <div class="molecule-info" id="molecule-info" style="padding: 1.5rem; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h3>Molecule Information</h3>
                <p>Select and load a molecule to view its structure and properties.</p>
            </div>
        `;
        
        // Initialize viewer after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.initViewer();
        }, 100);
    },
    
    initViewer() {
        const container = document.getElementById('viewer-container');
        if (!container) {
            setTimeout(() => this.initViewer(), 100);
            return;
        }
        
        // Check if Three.js is loaded
        if (typeof THREE === 'undefined') {
            console.error('Three.js is not loaded');
            container.innerHTML = '<p style="color: white; padding: 2rem; text-align: center;">Error: Three.js library failed to load. Please refresh the page.</p>';
            return;
        }
        
        // Clear previous viewer
        if (this.renderer) {
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
            this.renderer.dispose();
        }
        
        // Clear container
        container.innerHTML = '';
        
        // Ensure container has dimensions
        const width = Math.max(container.clientWidth || 800, 800);
        const height = Math.max(container.clientHeight || 600, 600);
        
        if (width === 0 || height === 0) {
            setTimeout(() => this.initViewer(), 100);
            return;
        }
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 5);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.renderer.domElement.style.display = 'block';
        container.appendChild(this.renderer.domElement);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        // Simple orbit controls (manual implementation)
        this.setupControls();
        
        // Initial render
        this.animate();
        
        // Handle window resize
        const resizeHandler = () => this.onWindowResize();
        window.removeEventListener('resize', resizeHandler);
        window.addEventListener('resize', resizeHandler);
    },
    
    setupControls() {
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        
        // Wait for renderer to be created
        const setupMouseControls = () => {
            if (!this.renderer || !this.renderer.domElement) {
                setTimeout(setupMouseControls, 100);
                return;
            }
            
            const canvas = this.renderer.domElement;
            const container = document.getElementById('viewer-container');
            
            if (!canvas || !container) return;
            
            // Remove old listeners if any
            canvas.removeEventListener('mousedown', this._mouseDownHandler);
            canvas.removeEventListener('mousemove', this._mouseMoveHandler);
            canvas.removeEventListener('mouseup', this._mouseUpHandler);
            canvas.removeEventListener('wheel', this._wheelHandler);
            
            // Create handler functions
            this._mouseDownHandler = (e) => {
                isDragging = true;
                previousMousePosition = { x: e.clientX, y: e.clientY };
                canvas.style.cursor = 'grabbing';
            };
            
            this._mouseMoveHandler = (e) => {
                if (!isDragging || !this.camera) return;
                
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;
                
                // Rotate camera around the molecule
                const spherical = new THREE.Spherical();
                spherical.setFromVector3(this.camera.position);
                spherical.theta -= deltaX * 0.01;
                spherical.phi += deltaY * 0.01;
                spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
                
                this.camera.position.setFromSpherical(spherical);
                this.camera.lookAt(0, 0, 0);
                
                previousMousePosition = { x: e.clientX, y: e.clientY };
            };
            
            this._mouseUpHandler = () => {
                isDragging = false;
                canvas.style.cursor = 'grab';
            };
            
            this._wheelHandler = (e) => {
                e.preventDefault();
                if (!this.camera) return;
                const scale = e.deltaY > 0 ? 1.1 : 0.9;
                this.camera.position.multiplyScalar(scale);
            };
            
            // Add event listeners
            canvas.addEventListener('mousedown', this._mouseDownHandler);
            canvas.addEventListener('mousemove', this._mouseMoveHandler);
            canvas.addEventListener('mouseup', this._mouseUpHandler);
            canvas.addEventListener('wheel', this._wheelHandler);
            canvas.style.cursor = 'grab';
        };
        
        setupMouseControls();
    },
    
    loadMolecule() {
        const select = document.getElementById('molecule-select');
        const moleculeType = select.value;
        
        // Clear previous molecule
        if (this.currentMolecule) {
            this.scene.remove(this.currentMolecule);
        }
        
        // Molecule data (simplified - positions in Angstroms)
        const molecules = {
            'water': {
                atoms: [
                    { element: 'O', x: 0, y: 0, z: 0 },
                    { element: 'H', x: 0.757, y: 0.587, z: 0 },
                    { element: 'H', x: -0.757, y: 0.587, z: 0 }
                ],
                bonds: [[0, 1], [0, 2]],
                info: 'Water (H₂O) - Bent geometry, 104.5° bond angle'
            },
            'methane': {
                atoms: [
                    { element: 'C', x: 0, y: 0, z: 0 },
                    { element: 'H', x: 0.629, y: 0.629, z: 0.629 },
                    { element: 'H', x: -0.629, y: -0.629, z: 0.629 },
                    { element: 'H', x: 0.629, y: -0.629, z: -0.629 },
                    { element: 'H', x: -0.629, y: 0.629, z: -0.629 }
                ],
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
                info: 'Methane (CH₄) - Tetrahedral geometry, 109.5° bond angles'
            },
            'ammonia': {
                atoms: [
                    { element: 'N', x: 0, y: 0, z: 0 },
                    { element: 'H', x: 0.602, y: 0.602, z: 0.602 },
                    { element: 'H', x: -0.602, y: -0.602, z: 0.602 },
                    { element: 'H', x: 0.602, y: -0.602, z: -0.602 }
                ],
                bonds: [[0, 1], [0, 2], [0, 3]],
                info: 'Ammonia (NH₃) - Trigonal pyramidal geometry, 107° bond angles'
            },
            'carbon-dioxide': {
                atoms: [
                    { element: 'C', x: 0, y: 0, z: 0 },
                    { element: 'O', x: 1.16, y: 0, z: 0 },
                    { element: 'O', x: -1.16, y: 0, z: 0 }
                ],
                bonds: [[0, 1], [0, 2]],
                info: 'Carbon Dioxide (CO₂) - Linear geometry, 180° bond angle'
            },
            'benzene': {
                atoms: [
                    { element: 'C', x: 1.4, y: 0, z: 0 },
                    { element: 'C', x: 0.7, y: 1.212, z: 0 },
                    { element: 'C', x: -0.7, y: 1.212, z: 0 },
                    { element: 'C', x: -1.4, y: 0, z: 0 },
                    { element: 'C', x: -0.7, y: -1.212, z: 0 },
                    { element: 'C', x: 0.7, y: -1.212, z: 0 },
                    { element: 'H', x: 2.5, y: 0, z: 0 },
                    { element: 'H', x: 1.25, y: 2.165, z: 0 },
                    { element: 'H', x: -1.25, y: 2.165, z: 0 },
                    { element: 'H', x: -2.5, y: 0, z: 0 },
                    { element: 'H', x: -1.25, y: -2.165, z: 0 },
                    { element: 'H', x: 1.25, y: -2.165, z: 0 }
                ],
                bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]],
                info: 'Benzene (C₆H₆) - Planar hexagonal ring with delocalized π electrons'
            },
            'ethene': {
                atoms: [
                    { element: 'C', x: -0.67, y: 0, z: 0 },
                    { element: 'C', x: 0.67, y: 0, z: 0 },
                    { element: 'H', x: -1.24, y: 0.93, z: 0 },
                    { element: 'H', x: -1.24, y: -0.93, z: 0 },
                    { element: 'H', x: 1.24, y: 0.93, z: 0 },
                    { element: 'H', x: 1.24, y: -0.93, z: 0 }
                ],
                bonds: [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5]],
                info: 'Ethene (C₂H₄) - Planar geometry with double bond, 120° bond angles'
            },
            'ammonium': {
                atoms: [
                    { element: 'N', x: 0, y: 0, z: 0 },
                    { element: 'H', x: 0.626, y: 0.626, z: 0.626 },
                    { element: 'H', x: -0.626, y: -0.626, z: 0.626 },
                    { element: 'H', x: 0.626, y: -0.626, z: -0.626 },
                    { element: 'H', x: -0.626, y: 0.626, z: -0.626 }
                ],
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
                info: 'Ammonium Ion (NH₄⁺) - Tetrahedral geometry, positive charge'
            },
            'sulfate': {
                atoms: [
                    { element: 'S', x: 0, y: 0, z: 0 },
                    { element: 'O', x: 1.49, y: 0, z: 0 },
                    { element: 'O', x: -1.49, y: 0, z: 0 },
                    { element: 'O', x: 0, y: 1.49, z: 0 },
                    { element: 'O', x: 0, y: -1.49, z: 0 }
                ],
                bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
                info: 'Sulfate Ion (SO₄²⁻) - Tetrahedral geometry, negative charge'
            }
        };
        
        const molData = molecules[moleculeType];
        if (!molData) return;
        
        // Create molecule group
        const moleculeGroup = new THREE.Group();
        
        // Atom colors (CPK coloring)
        const atomColors = {
            'H': 0xffffff,
            'C': 0x909090,
            'N': 0x3050f8,
            'O': 0xff0d0d,
            'S': 0xffff30,
            'P': 0xff8000,
            'F': 0x90e050,
            'Cl': 0x1ff01f,
            'Br': 0xa62929,
            'I': 0x940094
        };
        
        // Atom sizes (van der Waals radii in Angstroms, scaled)
        const atomSizes = {
            'H': 0.3,
            'C': 0.7,
            'N': 0.65,
            'O': 0.6,
            'S': 1.0,
            'P': 1.0,
            'F': 0.5,
            'Cl': 0.9,
            'Br': 1.0,
            'I': 1.15
        };
        
        // Create atoms
        molData.atoms.forEach(atom => {
            const geometry = new THREE.SphereGeometry(atomSizes[atom.element] || 0.5, 32, 32);
            const material = new THREE.MeshPhongMaterial({ 
                color: atomColors[atom.element] || 0x808080 
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(atom.x, atom.y, atom.z);
            moleculeGroup.add(sphere);
        });
        
        // Create bonds
        molData.bonds.forEach(bond => {
            const atom1 = molData.atoms[bond[0]];
            const atom2 = molData.atoms[bond[1]];
            
            const start = new THREE.Vector3(atom1.x, atom1.y, atom1.z);
            const end = new THREE.Vector3(atom2.x, atom2.y, atom2.z);
            const distance = start.distanceTo(end);
            
            const geometry = new THREE.CylinderGeometry(0.1, 0.1, distance, 16);
            const material = new THREE.MeshPhongMaterial({ color: 0xcccccc });
            const cylinder = new THREE.Mesh(geometry, material);
            
            // Position and orient cylinder
            const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
            cylinder.position.copy(midpoint);
            cylinder.lookAt(end);
            cylinder.rotateX(Math.PI / 2);
            
            moleculeGroup.add(cylinder);
        });
        
        this.scene.add(moleculeGroup);
        this.currentMolecule = moleculeGroup;
        
        // Update info
        document.getElementById('molecule-info').innerHTML = `
            <h3>Molecule Information</h3>
            <p><strong>${molData.info}</strong></p>
            <p>Atoms: ${molData.atoms.length} | Bonds: ${molData.bonds.length}</p>
        `;
        
        // Reset camera
        this.camera.position.set(0, 0, 5);
        this.camera.lookAt(0, 0, 0);
    },
    
    resetView() {
        if (this.camera) {
            this.camera.position.set(0, 0, 5);
            this.camera.lookAt(0, 0, 0);
        }
    },
    
    toggleAnimation() {
        // Simple rotation animation toggle
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        } else {
            if (this.renderer && this.scene && this.camera) {
                this.animate();
            }
        }
    },
    
    animate() {
        if (!this.renderer || !this.scene || !this.camera) {
            return;
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Rotate molecule slowly
        if (this.currentMolecule) {
            this.currentMolecule.rotation.y += 0.005;
        }
        
        this.renderer.render(this.scene, this.camera);
    },
    
    onWindowResize() {
        const container = document.getElementById('viewer-container');
        if (!container || !this.camera || !this.renderer) return;
        
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
    },
    
    showElectronConfig() {
        Navigation.navigateTo('molecular-viewer');
        setTimeout(() => {
            alert('Electron configuration visualization coming soon! This will show orbital diagrams and electron distributions.');
        }, 100);
    }
};

