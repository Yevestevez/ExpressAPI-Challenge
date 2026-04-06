export const renderStaticPage = async (pageName: string) => {
    try {
        const response = await fetch(`http://localhost:3030/${pageName}`, {
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
