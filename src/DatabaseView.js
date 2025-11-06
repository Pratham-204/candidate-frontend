import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function DatabaseView({ onNavigate }) {
    const [candidates, setCandidates] = useState([]);
    const [filters, setFilters] = useState({
        searchText: '',
        years_experience: '',
        specialization: '',
        employee_referral: '',
        consultancy_referral: ''
    });

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/candidates`);
            setCandidates(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this candidate?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/candidates/${id}`);
            setCandidates(candidates.filter(candidate => candidate.id !== id));
        } catch (error) {
            console.error('Error deleting candidate:', error);
            alert('Failed to delete candidate.');
        }
    };

    const handleEdit = (candidate) => {
        onNavigate('edit', candidate);
    };

    const filteredCandidates = candidates.filter(candidate => {
        const searchMatch = candidate.name.toLowerCase().includes(filters.searchText.toLowerCase()) ||
                            candidate.location.toLowerCase().includes(filters.searchText.toLowerCase());

        return (
            searchMatch &&
            (filters.years_experience === '' || candidate.years_experience === filters.years_experience) &&
            (filters.specialization === '' || candidate.specialization === filters.specialization) &&
            (filters.employee_referral === '' || String(candidate.employee_referral) === filters.employee_referral) &&
            (filters.consultancy_referral === '' || String(candidate.consultancy_referral) === filters.consultancy_referral)
        );
    });

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Database View</h1>

            {/* 🔍 Search & Filters */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or location"
                    className="border p-2"
                    value={filters.searchText}
                    onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
                />

                <select
                    className="border p-2"
                    value={filters.years_experience}
                    onChange={(e) => setFilters({ ...filters, years_experience: e.target.value })}
                >
                    <option value="">All Experience</option>
                    <option value="0-2 years">0-2 years</option>
                    <option value="2-5 years">2-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10-20 years">10-20 years</option>
                    <option value=">20 years">&gt;20 years</option>
                </select>

                <select
                    className="border p-2"
                    value={filters.specialization}
                    onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
                >
                    <option value="">All Specializations</option>
                    <option value="Fresher">Fresher</option>
                    <option value="AR">AR</option>
                </select>

                <select
                    className="border p-2"
                    value={filters.employee_referral}
                    onChange={(e) => setFilters({ ...filters, employee_referral: e.target.value })}
                >
                    <option value="">Employee Referral</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>

                <select
                    className="border p-2"
                    value={filters.consultancy_referral}
                    onChange={(e) => setFilters({ ...filters, consultancy_referral: e.target.value })}
                >
                    <option value="">Consultancy Referral</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </div>

            {/* 📊 Data Table */}
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Specialization</th>
                        <th className="border px-4 py-2">Location</th>
                        <th className="border px-4 py-2">Experience</th>
                        <th className="border px-4 py-2">Employee Referral</th>
                        <th className="border px-4 py-2">Employee ID</th>
                        <th className="border px-4 py-2">Consultancy Referral</th>
                        <th className="border px-4 py-2">Consultancy Name</th>
                        <th className="border px-4 py-2">Resume</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCandidates.map((candidate, index) => (
                        <tr key={candidate.id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{candidate.name}</td>
                            <td className="border px-4 py-2">{candidate.specialization}</td>
                            <td className="border px-4 py-2">{candidate.location}</td>
                            <td className="border px-4 py-2">{candidate.years_experience}</td>
                            <td className="border px-4 py-2">{candidate.employee_referral ? 'True' : 'False'}</td>
                            <td className="border px-4 py-2">{candidate.employee_referral ? candidate.employee_id : ''}</td>
                            <td className="border px-4 py-2">{candidate.consultancy_referral ? 'True' : 'False'}</td>
                            <td className="border px-4 py-2">{candidate.consultancy_referral ? candidate.consultancy_name : ''}</td>
                            <td className="border px-4 py-2 text-center">
                                {candidate.resume_url ? (
                                    <a
                                        href={`${process.env.REACT_APP_API_BASE_URL}${candidate.resume_url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        View PDF
                                    </a>
                                ) : (
                                    <span className="text-gray-400 italic">No file</span>
                                )}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => handleEdit(candidate)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(candidate.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                className="bg-gray-500 text-white px-4 py-2 mt-4 rounded"
                onClick={() => onNavigate('home')}
            >
                Back to Home
            </button>
        </div>
    );
}
