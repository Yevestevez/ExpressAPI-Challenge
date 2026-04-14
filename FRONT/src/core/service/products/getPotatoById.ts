export const getPotatoById = (id: string) => {
    const API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;
    const URL = `${API_URL}/api/potatoes/${id}`;

    return fetch(URL, {
        method: 'GET',
        headers: {},
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status + ' ' + response.statusText);
            }
        })
        .then((data) => {
            return data;
        });
};
