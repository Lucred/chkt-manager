import React from 'react';

interface HeaderProps {
    title: string;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onLogout }) => {
    return (
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <button 
                onClick={onLogout} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
                Logout
            </button>
        </div>
    );
};

export default Header;
