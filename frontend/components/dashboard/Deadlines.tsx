"use client";

import React from 'react';
import { DeadlineStat } from '@/services/api';
import { Calendar } from 'lucide-react';
import './Deadlines.css';
import { format } from 'date-fns';


interface DeadlinesProps {
    deadlines: DeadlineStat[];
}

const Deadlines: React.FC<DeadlinesProps> = ({ deadlines }) => {
    return (
        <div className="deadlines-card card-box">
            <h3>Upcoming Deadlines</h3>
            <div className="deadlines-list scrollable-content">
                {deadlines.length > 0 ? (
                    deadlines.map(deadline => (
                        <div key={deadline.id} className="deadline-item">
                            <div className="deadline-icon">
                                <Calendar size={20} />
                            </div>
                            <div className="deadline-info">
                                <span className="deadline-title">{deadline.title}</span>
                                <span className="deadline-date">
                                    {format(new Date(deadline.due_at), 'MMM dd, yyyy')}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-tasks-message">No upcoming deadlines</div>
                )}
            </div>
        </div>
    );
};

export default Deadlines;
