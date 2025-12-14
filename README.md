# AP Chemistry Interactive Learning Guide

An interactive web application for learning AP Chemistry with comprehensive content, calculation tools, and visualization features.

## Features

### 📚 Learning Guide
- **9 Comprehensive Units** covering all AP Chemistry topics:
  1. Atomic Structure
  2. Molecular Structure
  3. Intermolecular Forces
  4. Chemical Reactions
  5. Kinetics
  6. Thermodynamics
  7. Equilibrium
  8. Acids and Bases
  9. Applications

### 🧮 Chemistry Calculators (15+ Tools)
- Molar Mass Calculator
- pH Calculator
- Stoichiometry Calculator
- Dilution Calculator (M₁V₁ = M₂V₂)
- Ideal Gas Law (PV = nRT)
- Enthalpy Calculator
- Gibbs Free Energy (ΔG = ΔH - TΔS)
- Equilibrium Constant
- Rate Law Calculator
- Half-Life Calculator
- Buffer pH Calculator (Henderson-Hasselbalch)
- Cell Potential Calculator
- Percent Yield Calculator
- Empirical Formula Calculator
- Limiting Reactant Calculator

### 🔬 Molecular Viewer
- 3D visualization of molecular structures using Three.js
- Interactive rotation and zoom controls
- Pre-loaded molecules: Water, Methane, Ammonia, CO₂, Benzene, Ethene, and more
- CPK color coding for atoms
- Bond visualization

### ⚛️ Gaussian File Parser
- Upload and parse Gaussian output files (.log, .out, .txt)
- Extract key information:
  - SCF Energy
  - Zero-Point Energy
  - Molecular Geometry
  - Vibrational Frequencies
  - Dipole Moment
  - Thermodynamic Properties
- Save parsed results for later reference

### 🧪 Titration Simulation
- Interactive acid-base titration simulation
- Real-time pH curve generation
- Support for:
  - Strong/Weak Acids
  - Strong/Weak Bases
  - Customizable concentrations and volumes
- Visual titration curve with equivalence point marking

### 📊 Interactive Periodic Table
- Complete periodic table with all 118 elements
- Color-coded by element category
- Detailed element information:
  - Atomic number and mass
  - Group and period
  - Element category
  - Properties

### 💾 Data Management
- Save calculation results
- Export data as JSON
- View and manage saved data
- Local storage for persistence

## Technologies Used

- **HTML5/CSS3** - Structure and styling
- **JavaScript (ES6+)** - Application logic
- **Three.js** - 3D molecular visualization
- **MathJax** - Mathematical formula rendering
- **LocalStorage API** - Data persistence

## Getting Started

1. **Open the Application**
   - Simply open `index.html` in a modern web browser
   - No build process or server required (works as a static site)

2. **Navigate the Application**
   - Use the sidebar to navigate between units and tools
   - Click on any unit to view learning content
   - Access calculators and tools from the Tools section

3. **Use Calculators**
   - Select a calculator from the Calculators page
   - Enter values and click "Calculate"
   - Results are displayed instantly

4. **View Molecules**
   - Go to Molecular Viewer
   - Select a molecule from the dropdown
   - Click "Load Molecule" to visualize in 3D
   - Use mouse to rotate and zoom

5. **Parse Gaussian Files**
   - Go to Gaussian Parser
   - Upload a Gaussian output file
   - View parsed results
   - Save results for later

6. **Run Titration Simulation**
   - Go to Titration Simulation
   - Set parameters (acid/base types, concentrations, volumes)
   - Click "Run Titration" to generate the curve
   - View equivalence point and pH curve

## File Structure

```
AP Chemistry Interactive/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # Main stylesheet
├── js/
│   ├── main.js            # Application entry point
│   ├── navigation.js      # Navigation and routing
│   ├── learning-guide.js  # Learning content
│   ├── calculators.js     # Calculator tools
│   ├── molecular-viewer.js # 3D molecular visualization
│   ├── gaussian-parser.js # Gaussian file parsing
│   ├── titration.js       # Titration simulation
│   ├── periodic-table.js  # Periodic table
│   └── data-manager.js    # Data management
└── README.md              # This file
```

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

Requires modern browser with ES6+ support and WebGL for 3D visualization.

## Future Enhancements

- Enhanced Gaussian file parsing with full orbital visualization
- More molecular structures and orbital diagrams
- Additional calculator tools
- Export functionality for calculations
- User accounts and cloud storage
- Interactive quizzes and practice problems
- Integration with quantum chemistry calculation backends

## Notes

- **Gaussian Parsing**: The current implementation provides basic parsing. Full Gaussian file parsing typically requires specialized libraries or backend services for complete orbital data and advanced properties.
- **Molecular Viewer**: The viewer uses simplified molecular geometries. For accurate structures, consider integrating with molecular structure databases or calculation results.
- **Data Storage**: All data is stored locally in the browser using LocalStorage. Data is not synced across devices.

## License

This project is created for educational purposes.

## Contributing

Feel free to extend this application with additional features, calculators, or learning content!

