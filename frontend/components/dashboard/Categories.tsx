"use client";

import React from 'react';
import { CategoryStat } from '@/services/api';
import './Categories.css';

interface CategoriesProps {
    categories: CategoryStat[];
}

const categoryColors: { [key: string]: string } = {
    work: '#3b82f6',
    personal: '#ef4444',
    shopping: '#f97316',
    health: '#22c55e',
    education: '#8b5cf6',
    others: '#64748b',
};

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
    const totalTasks = categories.reduce((acc, cat) => acc + cat.count, 0);

    return (
        <div className="categories-card card-box">
            <h3>Categories</h3>
            <div className="categories-list scrollable-content">
                {categories.map(cat => {
                    const percentage = totalTasks === 0 ? 0 : Math.round((cat.count / totalTasks) * 100);
                    return (
                        <div key={cat.category} className="category-item">
                            <div className="category-info">
                                <span className="category-name">{cat.category}</span>
                                <span className="category-percentage">{percentage}%</span>
                            </div>
                            <div className="category-progress-bar-container">
                                <div
                                    className="category-progress-bar"
                                    style={{ 
                                        width: `${percentage}%`,
                                        backgroundColor: categoryColors[cat.category] || '#ccc' 
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Categories;
