import { HomePage } from '../../pages/home/home-page';
import { ProductsPage } from '../../pages/products/products-page';
import { renderStaticPage } from '../service/getStaticPage';

export interface Route {
    path: string;
    label: string;
    renderComponent: () => void | Promise<void>;
}

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
