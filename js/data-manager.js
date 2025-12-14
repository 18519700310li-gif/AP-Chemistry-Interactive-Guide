// Data Manager module for saving and managing calculation results
const DataManager = {
    storageKey: 'ap_chemistry_data',
    
    init() {
        // Module initialized
    },
    
    render() {
        const contentBody = document.getElementById('content-body');
        const savedData = this.loadAllData();
        
        let html = Navigation.getBackButton() + `
            <h2>Saved Data</h2>
            <p>View and manage your saved calculation results and data</p>
        `;
        
        if (savedData.length === 0) {
            html += `
                <div class="result-section" style="text-align: center; padding: 3rem;">
                    <p>No saved data yet.</p>
                    <p style="color: #7f8c8d; margin-top: 0.5rem;">
                        Calculation results from calculators, Gaussian parser, and other tools will appear here when saved.
                    </p>
                </div>
            `;
        } else {
            html += '<div class="data-list">';
            savedData.forEach((item, index) => {
                html += `
                    <div class="data-item">
                        <div class="data-item-info">
                            <h4>${item.name || 'Untitled'}</h4>
                            <p>Type: ${item.type} | Saved: ${new Date(item.timestamp).toLocaleString()}</p>
                        </div>
                        <div class="data-item-actions">
                            <button class="btn btn-secondary" onclick="DataManager.viewData(${index})">View</button>
                            <button class="btn btn-secondary" onclick="DataManager.exportData(${index})">Export</button>
                            <button class="btn" style="background-color: #e74c3c;" onclick="DataManager.deleteData(${index})">Delete</button>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            
            html += `
                <div style="margin-top: 2rem;">
                    <button class="btn btn-secondary" onclick="DataManager.exportAll()">Export All Data</button>
                    <button class="btn" style="background-color: #e74c3c;" onclick="DataManager.clearAll()">Clear All Data</button>
                </div>
            `;
        }
        
        contentBody.innerHTML = html;
    },
    
    saveData(data) {
        const savedData = this.loadAllData();
        const dataItem = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            name: this.generateName(data),
            ...data
        };
        
        savedData.push(dataItem);
        localStorage.setItem(this.storageKey, JSON.stringify(savedData));
    },
    
    generateName(data) {
        if (data.type === 'gaussian') {
            return `Gaussian: ${data.data.filename || 'Calculation'}`;
        } else if (data.type === 'calculator') {
            return `Calculator: ${data.calculatorName || 'Calculation'}`;
        } else if (data.type === 'titration') {
            return `Titration: ${data.acidType} acid with ${data.baseType} base`;
        }
        return `Data ${new Date().toLocaleString()}`;
    },
    
    loadAllData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error loading data:', e);
            return [];
        }
    },
    
    viewData(index) {
        const savedData = this.loadAllData();
        const item = savedData[index];
        
        if (!item) {
            alert('Data not found');
            return;
        }
        
        let content = `
            <h3>${item.name}</h3>
            <p><strong>Type:</strong> ${item.type}</p>
            <p><strong>Saved:</strong> ${new Date(item.timestamp).toLocaleString()}</p>
            <hr style="margin: 1.5rem 0;">
        `;
        
        if (item.type === 'gaussian') {
            content += '<h4>Gaussian Calculation Results</h4>';
            content += '<pre style="background-color: #f8f9fa; padding: 1rem; border-radius: 6px; overflow-x: auto;">';
            content += JSON.stringify(item.data, null, 2);
            content += '</pre>';
        } else if (item.type === 'calculator') {
            content += '<h4>Calculation Results</h4>';
            content += '<pre style="background-color: #f8f9fa; padding: 1rem; border-radius: 6px; overflow-x: auto;">';
            content += JSON.stringify(item, null, 2);
            content += '</pre>';
        } else {
            content += '<pre style="background-color: #f8f9fa; padding: 1rem; border-radius: 6px; overflow-x: auto;">';
            content += JSON.stringify(item, null, 2);
            content += '</pre>';
        }
        
        content += '<button class="btn" onclick="DataManager.render()" style="margin-top: 1rem;">← Back</button>';
        
        document.getElementById('content-body').innerHTML = content;
    },
    
    exportData(index) {
        const savedData = this.loadAllData();
        const item = savedData[index];
        
        if (!item) {
            alert('Data not found');
            return;
        }
        
        const dataStr = JSON.stringify(item, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${item.name.replace(/[^a-z0-9]/gi, '_')}.json`;
        link.click();
        URL.revokeObjectURL(url);
    },
    
    exportAll() {
        const savedData = this.loadAllData();
        if (savedData.length === 0) {
            alert('No data to export');
            return;
        }
        
        const dataStr = JSON.stringify(savedData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ap_chemistry_data_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    },
    
    deleteData(index) {
        if (!confirm('Are you sure you want to delete this data?')) {
            return;
        }
        
        const savedData = this.loadAllData();
        savedData.splice(index, 1);
        localStorage.setItem(this.storageKey, JSON.stringify(savedData));
        this.render();
    },
    
    clearAll() {
        if (!confirm('Are you sure you want to delete ALL saved data? This cannot be undone.')) {
            return;
        }
        
        localStorage.removeItem(this.storageKey);
        this.render();
    }
};

