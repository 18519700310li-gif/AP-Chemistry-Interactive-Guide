// Learning Guide module
const LearningGuide = {
    units: {
        unit1: {
            title: "Atomic Structure",
            content: `
                <h3>Unit 1: Atomic Structure</h3>
                <h4>1.1 Atomic Theory and Structure</h4>
                <p>The atomic theory has evolved over time. Modern atomic theory states that:</p>
                <ul>
                    <li>Atoms are composed of protons, neutrons, and electrons</li>
                    <li>Protons and neutrons are in the nucleus</li>
                    <li>Electrons orbit the nucleus in energy levels</li>
                </ul>
                
                <h4>1.2 Electron Configuration</h4>
                <p>Electron configuration describes how electrons are distributed in atomic orbitals. The Aufbau principle states that electrons fill orbitals from lowest to highest energy.</p>
                <p>Example: Carbon (C) has electron configuration $1s^2 2s^2 2p^2$</p>
                
                <h4>1.3 Periodic Trends</h4>
                <p>Key periodic trends include:</p>
                <ul>
                    <li><strong>Atomic radius:</strong> Decreases across a period, increases down a group</li>
                    <li><strong>Ionization energy:</strong> Increases across a period, decreases down a group</li>
                    <li><strong>Electronegativity:</strong> Increases across a period, decreases down a group</li>
                </ul>
                
                <div class="interactive-section">
                    <h4>Interactive: Electron Configuration Builder</h4>
                    <p>Click the button below to visualize electron configurations for different elements.</p>
                    <button class="btn" onclick="MolecularViewer.showElectronConfig()">View Electron Configuration</button>
                </div>
            `
        },
        unit2: {
            title: "Molecular Structure",
            content: `
                <h3>Unit 2: Molecular Structure</h3>
                <h4>2.1 Lewis Structures</h4>
                <p>Lewis structures show the bonding between atoms and lone pairs of electrons. Rules:</p>
                <ul>
                    <li>Count total valence electrons</li>
                    <li>Place least electronegative atom in center</li>
                    <li>Connect atoms with single bonds</li>
                    <li>Distribute remaining electrons as lone pairs</li>
                </ul>
                
                <h4>2.2 VSEPR Theory</h4>
                <p>Valence Shell Electron Pair Repulsion (VSEPR) theory predicts molecular geometry based on electron pair repulsion.</p>
                <p>Common geometries: linear, trigonal planar, tetrahedral, trigonal bipyramidal, octahedral</p>
                
                <h4>2.3 Hybridization</h4>
                <p>Hybridization explains how atomic orbitals combine to form hybrid orbitals for bonding.</p>
                <p>Examples: $sp$ (linear), $sp^2$ (trigonal planar), $sp^3$ (tetrahedral)</p>
                
                <div class="interactive-section">
                    <h4>Interactive: Molecular Geometry Viewer</h4>
                    <p>Visualize 3D molecular structures and their geometries.</p>
                    <button class="btn" onclick="Navigation.navigateTo('molecular-viewer')">Open Molecular Viewer</button>
                </div>
            `
        },
        unit3: {
            title: "Intermolecular Forces",
            content: `
                <h3>Unit 3: Intermolecular Forces</h3>
                <h4>3.1 Types of Intermolecular Forces</h4>
                <ul>
                    <li><strong>London dispersion forces:</strong> Weakest, present in all molecules</li>
                    <li><strong>Dipole-dipole forces:</strong> Between polar molecules</li>
                    <li><strong>Hydrogen bonding:</strong> Strong dipole-dipole interaction (H with N, O, F)</li>
                </ul>
                
                <h4>3.2 Effects on Properties</h4>
                <p>Intermolecular forces affect:</p>
                <ul>
                    <li>Boiling and melting points</li>
                    <li>Vapor pressure</li>
                    <li>Surface tension</li>
                    <li>Viscosity</li>
                </ul>
                
                <h4>3.3 Solubility</h4>
                <p>"Like dissolves like" - polar solvents dissolve polar solutes, nonpolar solvents dissolve nonpolar solutes.</p>
            `
        },
        unit4: {
            title: "Chemical Reactions",
            content: `
                <h3>Unit 4: Chemical Reactions</h3>
                <h4>4.1 Types of Reactions</h4>
                <ul>
                    <li>Synthesis: $A + B \\rightarrow AB$</li>
                    <li>Decomposition: $AB \\rightarrow A + B$</li>
                    <li>Single replacement: $A + BC \\rightarrow AC + B$</li>
                    <li>Double replacement: $AB + CD \\rightarrow AD + CB$</li>
                    <li>Combustion: $C_xH_y + O_2 \\rightarrow CO_2 + H_2O$</li>
                </ul>
                
                <h4>4.2 Stoichiometry</h4>
                <p>Stoichiometry uses balanced chemical equations to calculate quantities of reactants and products.</p>
                <p>Key concept: The mole ratio from balanced equations</p>
                
                <h4>4.3 Limiting Reactants</h4>
                <p>The limiting reactant determines the maximum amount of product that can be formed.</p>
                
                <div class="interactive-section">
                    <h4>Interactive: Stoichiometry Calculator</h4>
                    <p>Use the calculators section to perform stoichiometric calculations.</p>
                    <button class="btn" onclick="Navigation.navigateTo('calculators')">Open Calculators</button>
                </div>
            `
        },
        unit5: {
            title: "Kinetics",
            content: `
                <h3>Unit 5: Kinetics</h3>
                <h4>5.1 Reaction Rates</h4>
                <p>Reaction rate is the change in concentration per unit time: $rate = -\\frac{\\Delta[A]}{\\Delta t}$</p>
                
                <h4>5.2 Rate Laws</h4>
                <p>Rate law: $rate = k[A]^m[B]^n$ where $k$ is the rate constant and $m$, $n$ are reaction orders.</p>
                
                <h4>5.3 Collision Theory</h4>
                <p>Reactions occur when particles collide with sufficient energy and proper orientation.</p>
                
                <h4>5.4 Factors Affecting Rate</h4>
                <ul>
                    <li>Temperature (Arrhenius equation)</li>
                    <li>Concentration</li>
                    <li>Surface area</li>
                    <li>Catalysts</li>
                </ul>
            `
        },
        unit6: {
            title: "Thermodynamics",
            content: `
                <h3>Unit 6: Thermodynamics</h3>
                <h4>6.1 Energy Changes</h4>
                <p>Enthalpy ($\\Delta H$): Heat change at constant pressure</p>
                <p>Entropy ($\\Delta S$): Measure of disorder</p>
                <p>Gibbs Free Energy: $\\Delta G = \\Delta H - T\\Delta S$</p>
                
                <h4>6.2 Hess's Law</h4>
                <p>The total enthalpy change is independent of the pathway: $\\Delta H_{total} = \\sum \\Delta H_{steps}$</p>
                
                <h4>6.3 Spontaneity</h4>
                <p>A reaction is spontaneous if $\\Delta G < 0$</p>
                
                <div class="interactive-section">
                    <h4>Interactive: Thermodynamics Calculator</h4>
                    <p>Calculate $\\Delta G$, $\\Delta H$, and $\\Delta S$ for reactions.</p>
                    <button class="btn" onclick="Navigation.navigateTo('calculators')">Open Calculators</button>
                </div>
            `
        },
        unit7: {
            title: "Equilibrium",
            content: `
                <h3>Unit 7: Equilibrium</h3>
                <h4>7.1 Equilibrium Constant</h4>
                <p>For $aA + bB \\rightleftharpoons cC + dD$:</p>
                <p>$K_c = \\frac{[C]^c[D]^d}{[A]^a[B]^b}$</p>
                
                <h4>7.2 Le Chatelier's Principle</h4>
                <p>A system at equilibrium will shift to counteract any change:</p>
                <ul>
                    <li>Concentration changes</li>
                    <li>Pressure/volume changes</li>
                    <li>Temperature changes</li>
                </ul>
                
                <h4>7.3 Reaction Quotient</h4>
                <p>$Q = K$: At equilibrium</p>
                <p>$Q > K$: Reaction shifts left</p>
                <p>$Q < K$: Reaction shifts right</p>
            `
        },
        unit8: {
            title: "Acids and Bases",
            content: `
                <h3>Unit 8: Acids and Bases</h3>
                <h4>8.1 Definitions</h4>
                <ul>
                    <li><strong>Arrhenius:</strong> Acids produce $H^+$, bases produce $OH^-$</li>
                    <li><strong>Brønsted-Lowry:</strong> Acids donate $H^+$, bases accept $H^+$</li>
                    <li><strong>Lewis:</strong> Acids accept electron pairs, bases donate electron pairs</li>
                </ul>
                
                <h4>8.2 pH and pOH</h4>
                <p>$pH = -\\log[H^+]$ and $pOH = -\\log[OH^-]$</p>
                <p>$pH + pOH = 14$ at 25°C</p>
                
                <h4>8.3 Buffers</h4>
                <p>Buffers resist pH changes. Henderson-Hasselbalch equation:</p>
                <p>$pH = pK_a + \\log\\frac{[A^-]}{[HA]}$</p>
                
                <div class="interactive-section">
                    <h4>Interactive: Titration Simulation</h4>
                    <p>Explore acid-base titrations interactively.</p>
                    <button class="btn" onclick="Navigation.navigateTo('titration')">Open Titration Simulator</button>
                </div>
            `
        },
        unit9: {
            title: "Applications",
            content: `
                <h3>Unit 9: Applications</h3>
                <h4>9.1 Electrochemistry</h4>
                <p>Redox reactions and electrochemical cells. Standard cell potential:</p>
                <p>$E°_{cell} = E°_{cathode} - E°_{anode}$</p>
                
                <h4>9.2 Nuclear Chemistry</h4>
                <p>Radioactive decay, half-life, and nuclear reactions.</p>
                
                <h4>9.3 Organic Chemistry</h4>
                <p>Introduction to organic compounds, functional groups, and reactions.</p>
                
                <h4>9.4 Environmental Chemistry</h4>
                <p>Applications of chemistry to environmental issues and sustainability.</p>
                
                <div class="interactive-section">
                    <h4>Interactive: Quantum Chemistry Calculations</h4>
                    <p>Upload Gaussian output files to analyze molecular properties and orbitals.</p>
                    <button class="btn" onclick="Navigation.navigateTo('gaussian-parser')">Open Gaussian Parser</button>
                </div>
            `
        }
    },
    
    init() {
        // Module initialized
    },
    
    loadUnit(unitId) {
        const contentBody = document.getElementById('content-body');
        const unit = this.units[unitId];
        
        if (unit) {
            contentBody.innerHTML = `<div class="unit-content">${unit.content}</div>`;
            // Re-render MathJax
            if (window.MathJax) {
                MathJax.typesetPromise([contentBody]).catch((err) => console.error(err));
            }
        } else {
            contentBody.innerHTML = '<p>Unit not found.</p>';
        }
    }
};

