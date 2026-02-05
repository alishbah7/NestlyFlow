"use client";

import React from 'react';
import { DashboardStats } from '@/services/api';

import Priority from './Priority';
import Categories from './Categories';
import Deadlines from './Deadlines';

import './SecondaryOverview.css';
import './Priority.css';
import './Categories.css';
import './Deadlines.css';

interface SecondaryOverviewProps {
    dashboardData: DashboardStats;
}

const SecondaryOverview: React.FC<SecondaryOverviewProps> = ({ dashboardData }) => {
    return (
        <div className="secondary-overview">
            <Priority priorities={dashboardData.priorities} stats={dashboardData.stats} />
            <Categories categories={dashboardData.categories} />
            <Deadlines deadlines={dashboardData.deadlines} />
        </div>
    );
};

export default SecondaryOverview;
