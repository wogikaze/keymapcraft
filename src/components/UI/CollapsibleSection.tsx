import React, { useState } from "react";
import type { ReactNode } from "react";

interface CollapsibleSectionProps {
    title: string;
    children: ReactNode;
    defaultExpanded?: boolean;
    icon?: ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
    title,
    children,
    defaultExpanded = true,
    icon,
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 bg-gray-800 hover:bg-gray-700 text-white 
                    transition-colors duration-200 flex items-center justify-between"
            >
                <div className="flex items-center gap-3">
                    {icon && <div className="text-gray-400">{icon}</div>}
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            <div
                className={`transition-all duration-300 overflow-hidden ${
                    isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="p-4 pt-0">{children}</div>
            </div>
        </div>
    );
};

export default CollapsibleSection;
