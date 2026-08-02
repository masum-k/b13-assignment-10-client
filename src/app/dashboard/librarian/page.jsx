import React from 'react';
import { getLibrarianBook } from '@/lib/actions/books';
import LibrarianDashboardPage from './LibrarianDashboardPage';
import { getUserSession } from '@/lib/core/session';

const LibrarianDashboard = async () => {
    const user = await getUserSession();
    const librarianBook = await getLibrarianBook(user?.id);

    return (
        <div>
            <LibrarianDashboardPage 
                key={user?.id || 'unauthenticated'} 
                librarian={user} 
                librarianBook={librarianBook} 
            />
        </div>
    );
};

export default LibrarianDashboard;