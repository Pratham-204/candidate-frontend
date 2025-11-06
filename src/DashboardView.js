import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function DashboardView({ onNavigate }) {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard-stats`);
            setStats(res.data);
        } catch (err) {
            console.error('Failed to load stats:', err);
        }
    };

    if (!stats) return <p className="p-4">Loading dashboard...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <Card title="Total Candidates" value={stats.total_candidates} />
                <Card title="Freshers" value={stats.freshers} />
                <Card title="Experienced" value={stats.experienced} />
                <Card title="Employee Referrals" value={stats.employee_referrals} />
                <Card title="Consultancy Referrals" value={stats.consultancy_referrals} />
            </div>

            {/* Candidates by Location */}
            <h2 className="text-xl font-semibold mb-2">🌍 Candidates by Location</h2>
            <ul className="mb-6">
                {stats.candidates_by_location.map(loc => (
                    <li key={loc.location} className="text-gray-700">
                        {loc.location}: <span className="font-semibold">{loc.count}</span>
                    </li>
                ))}
            </ul>

            {/* Candidates by Experience */}
            <h2 className="text-xl font-semibold mb-2">📌 Candidates by Experience</h2>
            <ul>
                {stats.candidates_by_experience.map(exp => (
                    <li key={exp.years_experience} className="text-gray-700">
                        {exp.years_experience}: <span className="font-semibold">{exp.count}</span>
                    </li>
                ))}
            </ul>

            <button
                className="bg-gray-500 text-white px-4 py-2 mt-8 rounded"
                onClick={() => onNavigate('home')}
            >
                Back to Home
            </button>
        </div>
    );
}

function Card({ title, value }) {
    return (
        <div className="bg-white shadow-md rounded p-4 text-center border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
            <p className="text-2xl font-bold text-blue-600">{value}</p>
        </div>
    );
}
