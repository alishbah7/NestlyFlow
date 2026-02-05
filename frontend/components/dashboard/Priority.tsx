"use client";

import React from 'react';
import { PriorityStat, TaskStats } from '@/services/api';
import './Priority.css';

interface PriorityProps {
    priorities: PriorityStat[];
    stats: TaskStats; // Add TaskStats to props
}

const Priority: React.FC<PriorityProps> = ({ priorities, stats }) => {
    const totalTasks = priorities.reduce((acc, p) => acc + p.count, 0);

    const getPriorityCount = (priority: string) => {
        const priorityData = priorities.find(p => p.priority === priority);
        return priorityData ? priorityData.count : 0;
    };

    const highCount = getPriorityCount('high');
    const mediumCount = getPriorityCount('medium');
    const lowCount = getPriorityCount('low');

    const highPercentageOfTotal = totalTasks === 0 ? 0 : (highCount / totalTasks) * 100;
    const mediumPercentageOfTotal = totalTasks === 0 ? 0 : (mediumCount / totalTasks) * 100;
    const lowPercentageOfTotal = totalTasks === 0 ? 0 : (lowCount / totalTasks) * 100;

    const radius = 70; // Radius for the main circular bar
    const circumference = 2 * Math.PI * radius;

    // Calculate stroke-dasharray for each segment
    const highDashArray = (highPercentageOfTotal / 100) * circumference;
    const mediumDashArray = (mediumPercentageOfTotal / 100) * circumference;
    const lowDashArray = (lowPercentageOfTotal / 100) * circumference;

    // Calculate stroke-dashoffset to position segments correctly
    // High starts at 0 offset (top)
    // Medium starts after High
    // Low starts after Medium
    const highOffset = 0;
    const mediumOffset = circumference - highDashArray;
    const lowOffset = circumference - highDashArray - mediumDashArray;


    if (totalTasks === 0) {
        return (
            <div className="priority-card card-box">
                <h3>Priority</h3>
                <div className="no-tasks-message">No tasks</div>
                 {/* <div className="priority-footer-overall">
                    <span>0 tasks</span>
                </div> */}
            </div>
        );
    }

    return (
        <div className="priority-card card-box">
            <h3>Priority</h3>
            <div className="stacked-circular-progress-container">
                <svg className="stacked-circular-progress-svg" viewBox="0 0 150 150">
                    <circle
                        className="stacked-progress-background"
                        cx="75"
                        cy="75"
                        r={radius}
                        strokeWidth="10"
                    />
                    {highPercentageOfTotal > 0 && (
                        <circle
                            className="stacked-progress-bar high"
                            cx="75"
                            cy="75"
                            r={radius}
                            strokeWidth="10"
                            strokeDasharray={`${highDashArray} ${circumference - highDashArray}`}
                            strokeDashoffset={highOffset}
                        />
                    )}
                    {mediumPercentageOfTotal > 0 && (
                        <circle
                            className="stacked-progress-bar medium"
                            cx="75"
                            cy="75"
                            r={radius}
                            strokeWidth="10"
                            strokeDasharray={`${mediumDashArray} ${circumference - mediumDashArray}`}
                            strokeDashoffset={mediumOffset}
                        />
                    )}
                    {lowPercentageOfTotal > 0 && (
                        <circle
                            className="stacked-progress-bar low"
                            cx="75"
                            cy="75"
                            r={radius}
                            strokeWidth="10"
                            strokeDasharray={`${lowDashArray} ${circumference - lowDashArray}`}
                            strokeDashoffset={lowOffset}
                        />
                    )}
                    {/* Apply counter-rotation to the text element */}
                    <text x="65" y="85" className="stacked-progress-text" transform="rotate(90 75 75)">
                        {stats.total}
                    </text>
                </svg>
            </div>
            <div className="priority-segments-info">
                <div className="segment-item">
                    <span className="segment-color high"></span>
                    <div className="segment-text-group">
                        <span className="segment-label">High</span>
                        <span className="segment-tasks">{highCount}</span>
                    </div>
                </div>
                <div className="segment-item">
                    <span className="segment-color medium"></span>
                    <div className="segment-text-group">
                        <span className="segment-label">Medium</span>
                        <span className="segment-tasks">{mediumCount}</span>
                    </div>
                </div>
                <div className="segment-item">
                    <span className="segment-color low"></span>
                    <div className="segment-text-group">
                        <span className="segment-label">Low</span>
                        <span className="segment-tasks">{lowCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Priority;