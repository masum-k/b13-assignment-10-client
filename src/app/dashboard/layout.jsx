import React from 'react';
import { ToastContainer } from 'react-toastify';

const DashboardLayout = ({ children }) => {
    return (
        <div >
            <div>{children}</div>
            <ToastContainer />
        </div>
    );
};

export default DashboardLayout;