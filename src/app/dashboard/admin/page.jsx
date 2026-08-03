import React from 'react';
import { getBooks } from '@/lib/api/books';
import AdminDashboard from './AdminDashboard';

const AdminCompaniesPage = async () => {
    const books = await getBooks();
    return (
        <div>
            <AdminDashboard books={books}/>
        </div>
    );
};

export default AdminCompaniesPage;