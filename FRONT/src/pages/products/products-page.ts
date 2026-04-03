import type { Potato } from '../../schemas/potato';

const getPotatoes = () => {
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

export class ProductsPage extends HTMLElement {
    static #selector = 'app-products-page';
    static render() {
        const el: HTMLElement | null = document.querySelector('main');

        if (el === null) {
            throw new Error('Selector main no disponible');
        }

        el.innerHTML = `<${ProductsPage.#selector}></${ProductsPage.#selector}>`;

        if (customElements.get(ProductsPage.#selector) === undefined) {
            customElements.define(ProductsPage.#selector, ProductsPage);
        }
    }

    #template!: string;
    #potatoes: Potato[] = [];

    constructor() {
        super();
        this.#loadData();
    }

    #loadData() {
        getPotatoes()
            .then((potatoes) => {
                this.#potatoes = potatoes;
                console.log(this.#potatoes);
                this.#setTemplate();
                this.#setElement();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    #setTemplate() {
        this.#template = /*html*/ `
            <section>
                <h2>Products</h2>
                <ul>
                    ${this.#potatoes.map((p: Potato) => `<li>${p.id}</li>`).join('')}
                </ul>
            </section>
        `;
    }

    #setElement() {
        this.innerHTML = this.#template;
    }
}
