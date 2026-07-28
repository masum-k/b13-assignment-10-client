import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div >
            <div>{children}</div>
        </div>
    );
};

export default DashboardLayout;