import type { PotatoUpdateDTO } from '../../../schemas/potato';

export const updatePotatoById = (id: string, data: PotatoUpdateDTO) => {
    const API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;
    const URL = `${API_URL}/api/potatoes/${id}`;

    return fetch(URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
