'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const addBook = async (bookData) => {
    const res = await fetch(`${baseUrl}/api/librarians`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
    })

    return res.json();
}