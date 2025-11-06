import React, { useEffect, useState } from 'react';

export function Home({ onNavigate }) {
    const [progress, setProgress] = useState(0);
    const [bootComplete, setBootComplete] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) return prev + 2; // adjust speed here
                clearInterval(interval);
                setTimeout(() => setBootComplete(true), 800);
                return 100;
            });
        }, 80);
        return () => clearInterval(interval);
    }, []);

    if (!bootComplete) {
        return (
            <div className="bg-black text-green-400 h-screen flex items-center justify-center font-mono text-sm p-6">
                <div className="w-full max-w-md">
                    <div className="mb-2">Booting ACN Infotech Portal...</div>
                    <div className="mb-2">Loading Modules...</div>
                    <div className="w-full bg-gray-700 h-4 rounded overflow-hidden mb-2">
                        <div
                            className="bg-green-500 h-4 transition-all duration-200 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div>Progress: {progress}%</div>
                    <div className="animate-pulse mt-2">|</div>
                </div>
            </div>
        );
    }

    // Main content after boot
    return (
    <div className="h-screen bg-black text-matrixGreen font-mono flex items-center justify-center">
        <div className="border border-matrixGreen p-8 rounded-xl shadow-lg text-center w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 tracking-widest">ACN Infotech</h1>
                <button
                    className="border border-matrixGreen text-matrixGreen px-6 py-2 mb-4 rounded hover:bg-matrixGreen hover:text-black transition"
                    onClick={() => onNavigate('dataEntry')}
                >
                    Enter Data
                </button>
                <br />
                <button
                    className="border border-matrixGreen text-matrixGreen px-6 py-2 mb-4 rounded hover:bg-matrixGreen hover:text-black transition"
                    onClick={() => onNavigate('databaseView')}
                >
                    View Database
                </button>
                <br />
                <button
                    className="border border-matrixGreen text-matrixGreen px-6 py-2 mb-4 rounded hover:bg-matrixGreen hover:text-black transition"
                    onClick={() => onNavigate('dashboard')}
                >
                    View Dashboard
                </button>
            </div>
        </div>
    );
}
