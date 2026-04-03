import { navigate, type Route } from '../../router/router';

export class Menu extends HTMLElement {
    static #selector = 'app-menu';
    static render(routes: Route[]) {
        customElements.define(Menu.#selector, Menu);
        const elements = document.querySelectorAll(Menu.#selector);
        elements.forEach((element) => {
            (element as Menu).routes = routes;
        });
    }
    #menuOptions: Route[] = [];
    #template!: string;

    set routes(menuOptions: Route[]) {
        this.#menuOptions = menuOptions;
        this.#setTemplate();
        this.#setElement();
    }

    constructor() {
        super();
    }

    #setTemplate() {
        this.#template = /* HTML */ `
            <menu class="menu">
                ${this.#menuOptions
                    .map(
                        (option) =>
                            `<li><a href="${option.path}">${option.label}</a></li>`,
                    )
                    .join('')}
            </menu>
        `;
    }

    #setElement() {
        this.innerHTML = this.#template;
        this.addEventListener('click', this.#handleDialogMenu.bind(this));

        document.body.addEventListener(
            'click',
            this.#handleDialogMenu.bind(this),
        );
    }

    #handleDialogMenu(event: Event) {
        console.log('Click', event);
        const target = event.target as HTMLAnchorElement;
        event.stopPropagation();

        //const menuDialogElement = document.querySelector(
        //'#menu-dialog',
        // as HTMLDialogElement;

        event.preventDefault();
        //menuDialogElement.close();
        navigate(target.href);
        // const linkHref = event.target.getAttribute("href");
        // navigate(linkHref);
    }
}
