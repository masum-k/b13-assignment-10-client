import React from 'react';
import { getBooks } from '@/lib/api/books';

const AdminCompaniesPage = async () => {
    const books = await getBooks();
    return (
        <div>
            <h2>Books le lo {books.length}</h2>
        </div>
    );
};

export default AdminCompaniesPage;