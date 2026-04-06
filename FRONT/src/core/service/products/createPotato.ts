import type { Potato, PotatoDTO } from '../../../schemas/potato';

export const createPotato = (data: PotatoDTO): Promise<Potato> => {
    const API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;
    const URL = `${API_URL}/api/potatoes`;

    return fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error(response.status + ' ' + response.statusText);
            }
        })
        .then((data) => {
            console.log(data);
            return data;
        });
};
