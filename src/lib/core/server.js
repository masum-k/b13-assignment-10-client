const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (id, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}/api/books/${id}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // handle 401, 404, 403

    return res.json();
};