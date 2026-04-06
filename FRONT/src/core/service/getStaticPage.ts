export const renderStaticPage = async (pageName: string) => {
    const API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;
    const URL = `${API_URL}/${pageName}`;

    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {},
        });
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        const html = await response.text();

        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error cargando ${pageName}:`, error);
    }
};
