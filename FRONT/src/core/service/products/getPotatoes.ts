export const getPotatoes = () => {
    const URL = `http://localhost:3030/api/potatoes`;

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
            console.log(data);
            return data;
        });
};
