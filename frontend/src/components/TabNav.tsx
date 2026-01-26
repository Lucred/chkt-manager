import React from 'react';

interface TabNavProps {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabChange: (id: any) => void;
}

const TabNav: React.FC<TabNavProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex gap-4 mb-6 border-b pb-2">
            {tabs.map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-6 py-2 rounded-t-lg transition-colors duration-200 font-medium ${
                        activeTab === tab.id 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabNav;
