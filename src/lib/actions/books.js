const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getLibrarianBook = async (librarianBook) => {
    const res = await fetch(`${baseUrl}/api/books?librarianId=${librarianBook}`);
    return res.json();
};

export const addBook = async (bookData) => {
    const res = await fetch(`${baseUrl}/api/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
    });

    return res.json();
};

export const updateBook = async (bookId, bookData) => {
    const res = await fetch(`${baseUrl}/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
    });

    return res.json();
};

export const deleteBook = async (bookId) => {
    const res = await fetch(`${baseUrl}/api/books/${bookId}`, {
        method: 'DELETE',
    });

    return res.json();
};

export const togglePublish = async (bookId, isPublished) => {
    const res = await fetch(`${baseUrl}/api/books/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPublished }),
    });

    return res.json();
};