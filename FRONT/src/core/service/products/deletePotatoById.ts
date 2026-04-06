export const deletePotatoById = (id: string) => {
    const API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;
    const URL = `${API_URL}/api/potatoes/${id}`;

    return fetch(URL, {
        method: 'DELETE',
        headers: {},
    }).then((response) => {
        if (response.status === 204) {
            return;
        } else {
            throw new Error(response.status + ' ' + response.statusText);
        }
    });
};
