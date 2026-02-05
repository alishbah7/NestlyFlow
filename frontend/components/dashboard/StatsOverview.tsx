"use client";

import React from 'react';
import { BookCheck, ClipboardList, Clock, ListTodo } from 'lucide-react';
import { TaskStats } from '@/services/api';
import './StatsOverview.css';

interface StatsOverviewProps {
    stats: TaskStats | null;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
    if (!stats) {
        return <div className="loading-message">Loading stats...</div>;
    }

    return (
        <div className="stats-overview">
            <div className="stats-boxes">
                <div className="stat-box">
                    <div className="stat-header">
                        <ListTodo size={24} className="stat-icon" />
                        <h4>Total Tasks</h4>
                    </div>
                    <p>{stats.total}</p>
                </div>
                <div className="stat-box">
                    <div className="stat-header">
                        <BookCheck size={24} className="stat-icon" />
                        <h4>Completed</h4>
                    </div>
                    <p>{stats.completed}</p>
                </div>
                <div className="stat-box">
                    <div className="stat-header">
                        <ClipboardList size={24} className="stat-icon" />
                        <h4>In Progress</h4>
                    </div>
                    <p>{stats.in_progress}</p>
                </div>
                <div className="stat-box">
                    <div className="stat-header">
                        <Clock size={24} className="stat-icon" />
                        <h4>Overdue</h4>
                    </div>
                    <p>{stats.overdue}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsOverview;
