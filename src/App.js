import './App.css';
import React, { useState } from 'react';
import { Home } from './Home';
import { DataEntry } from './DataEntry';
import { DatabaseView } from './DatabaseView';
import { EditCandidate } from './EditCandidate'; // ← NEW
import { DashboardView } from './DashboardView';


function App() {
    const [view, setView] = useState('home');
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const handleNavigation = (targetView, candidate = null) => {
        setView(targetView);
        setSelectedCandidate(candidate);
    };

    return (
        <div className="container mx-auto p-4">
            {view === 'home' && <Home onNavigate={handleNavigation} />}
            {view === 'dataEntry' && <DataEntry onNavigate={handleNavigation} />}
            {view === 'databaseView' && <DatabaseView onNavigate={handleNavigation} />}
            {view === 'edit' && <EditCandidate onNavigate={handleNavigation} candidate={selectedCandidate} />}
            {view === 'dashboard' && <DashboardView onNavigate={handleNavigation} />}
        </div>
    );
}

export default App;
