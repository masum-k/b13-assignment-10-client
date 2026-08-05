const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getBooks = async () => {
    const res = await fetch(`${baseUrl}/api/books`, {
        cache: "no-store",
    });

    return res.json();
};

export const getBooksbyId = async (bookId) => {
    const res = await fetch(`${baseUrl}/api/books/${bookId}`, {
        cache: "no-store",
    });

    return res.json();
};