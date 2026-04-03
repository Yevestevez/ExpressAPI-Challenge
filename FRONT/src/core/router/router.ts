//import { AboutPage } from "../../about/about-page";
import { HomePage } from '../../pages/home/home-page';
import { ProductsPage } from '../../pages/products/products-page';

export interface Route {
    path: string;
    label: string;
    renderComponent: () => void | Promise<void>;
}

const renderStaticPage = async (pageName: string) => {
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

export const routes: Route[] = [
    {
        path: '/',
        label: 'Inicio',
        renderComponent: HomePage.render,
    },
    {
        path: '/products',
        label: 'Productos',
        renderComponent: ProductsPage.render,
    },
    // {
    //     path: "/todo",
    //     label: "Tareas",
    //     renderComponent: todoPage,
    // },
    {
        path: '/about',
        label: 'Acerca de',
        renderComponent: () => renderStaticPage('about'),
    },
];

export const navigate = (url = '', addHistory = true) => {
    console.log('URL for navigate', url);
    console.log(history.state);

    if (history.state?.url === url) {
        return;
    }

    if (addHistory) {
        history.pushState({ url }, '', url);
    }
    const path = url.split('/').pop() as string;
    const route = routes.find((o) => o.path === '/' + path);

    if (route) {
        route.renderComponent();
    }
};
