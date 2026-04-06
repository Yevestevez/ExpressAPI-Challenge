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
        const target = event.target as HTMLElement;
        const anchor = target.closest('a');

        if (!anchor) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        navigate(anchor.href);
    }
}
