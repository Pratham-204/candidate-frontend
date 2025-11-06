import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function EditCandidate({ onNavigate, candidate }) {
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        location: '',
        years_experience: '',
        remark: '',
        employee_referral: false,
        employee_id: '',
        consultancy_referral: false,
        consultancy_name: ''
    });

    useEffect(() => {
        if (candidate) {
            setFormData({
                name: candidate.name || '',
                specialization: candidate.specialization || '',
                location: candidate.location || '',
                years_experience: candidate.years_experience || '',
                remark: candidate.remark || '',
                employee_referral: candidate.employee_referral || false,
                employee_id: candidate.employee_id || '',
                consultancy_referral: candidate.consultancy_referral || false,
                consultancy_name: candidate.consultancy_name || ''
            });
        }
    }, [candidate]);

    const validateForm = () => {
        if (!formData.name || !/^[a-zA-Z\s]+$/.test(formData.name)) return false;
        if (!formData.specialization) return false;
        if (!formData.location || !/^[a-zA-Z\s]+$/.test(formData.location)) return false;
        if (!formData.years_experience) return false;
        if (formData.employee_referral && !formData.employee_id) return false;
        if (formData.consultancy_referral && !formData.consultancy_name) return false;
        if (formData.employee_referral && formData.consultancy_referral) return false;
        return true;
    };

    const handleReferralChange = (type) => {
        if (type === 'employee') {
            setFormData({
                ...formData,
                employee_referral: true,
                consultancy_referral: false,
                consultancy_name: ''
            });
        } else if (type === 'consultancy') {
            setFormData({
                ...formData,
                consultancy_referral: true,
                employee_referral: false,
                employee_id: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert('Please fill out the form correctly.');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/candidates/${candidate.id}`, formData);
            alert('Candidate updated successfully!');
            onNavigate('databaseView');
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update candidate.');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Edit Candidate</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="bg-black text-matrixGreen border border-matrixGreen p-2 focus:outline-none focus:ring-1 focus:ring-matrixGreen placeholder-green-400"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <select
                        name="specialization"
                        className="bg-black text-matrixGreen border border-matrixGreen p-2 focus:outline-none focus:ring-1 focus:ring-matrixGreen placeholder-green-400"
                        value={formData.specialization}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    >
                        <option value="">Select Specialization</option>
                        <option value="Fresher">Fresher</option>
                        <option value="AR">AR</option>
                    </select>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        className="bg-black text-matrixGreen border border-matrixGreen p-2 focus:outline-none focus:ring-1 focus:ring-matrixGreen placeholder-green-400"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                    <select
                        name="years_experience"
                        className="bg-black text-matrixGreen border border-matrixGreen p-2 focus:outline-none focus:ring-1 focus:ring-matrixGreen placeholder-green-400"
                        value={formData.years_experience}
                        onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
                    >
                        <option value="">Select Experience</option>
                        <option value="0-2 years">0-2 years</option>
                        <option value="2-5 years">2-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10-20 years">10-20 years</option>
                        <option value=">20 years">20+ years</option>
                    </select>
                    <textarea
                        name="remark"
                        placeholder="Remark"
                        className="bg-black text-matrixGreen border border-matrixGreen p-2 focus:outline-none focus:ring-1 focus:ring-matrixGreen placeholder-green-400"
                        value={formData.remark}
                        onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                    ></textarea>
                    <label className="text-matrixGreen">
                        <input
                            type="checkbox"
                            name="employee_referral"
                            className="mr-2 accent-matrixGreen"
                            checked={formData.employee_referral}
                            onChange={() => handleReferralChange('employee')}
                        />
                        Employee Referral
                    </label>
                    {formData.employee_referral && (
                        <input
                            type="text"
                            name="employee_id"
                            placeholder="Employee ID"
                            className="bg-black text-matrixGreen border border-matrixGreen p-2 focus:outline-none focus:ring-1 focus:ring-matrixGreen placeholder-green-400"
                            value={formData.employee_id}
                            onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                        />
                    )}
                    <label className="text-matrixGreen">
                        <input
                            type="checkbox"
                            name="consultancy_referral"
                            className="mr-2 accent-matrixGreen"
                            checked={formData.consultancy_referral}
                            onChange={() => handleReferralChange('consultancy')}
                        />
                        Consultancy Referral
                    </label>
                    {formData.consultancy_referral && (
                        <input
                            type="text"
                            name="consultancy_name"
                            placeholder="Consultancy Name"
                            className="border p-2"
                            value={formData.consultancy_name}
                            onChange={(e) => setFormData({ ...formData, consultancy_name: e.target.value })}
                        />
                    )}
                </div>
                <button type="submit" className="border border-matrixGreen text-matrixGreen px-4 py-2 mt-4 rounded hover:bg-matrixGreen hover:text-black transition">
                    Update
                </button>
            </form>
            <button
                className="border border-matrixGreen text-matrixGreen px-4 py-2 mt-4 rounded hover:bg-matrixGreen hover:text-black transition"
                onClick={() => onNavigate('databaseView')}
            >
                Cancel
            </button>
        </div>
    );
}
