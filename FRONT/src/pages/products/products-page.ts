import type { Potato } from '../../schemas/potato';
import { getPotatoes } from '../../core/service/products/getPotatoes';
import { getPotatoById } from '../../core/service/products/getPotatoById';

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
    #selectedPotato: Potato | null = null;

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
                this.#buttonListener();
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
                    ${this.#potatoes.map((p: Potato) => `<li><button class="potato" data-id="${p.id}">🥔${p.id}</button></li>`).join('')}
                </ul>
                ${this.#selectedPotato ? this.#getPotatoDetailTemplate() : ''}
            </section>
        `;
    }

    #getPotatoDetailTemplate() {
        if (!this.#selectedPotato) return '';

        return /*html*/ `
            <div class="potato-detail">
                <h3>Detalles: ${this.#selectedPotato.id}</h3>
                <p>Precio: ${this.#selectedPotato.price}</p>
                <p>Stock: ${this.#selectedPotato.weight}</p>
            </div>
        `;
    }

    #setElement() {
        this.innerHTML = this.#template;
    }

    #buttonListener() {
        const buttons = this.querySelectorAll('.potato');
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => this.#handlePotatoClick(e));
        });
    }

    #handlePotatoClick(e: Event) {
        const button = e.target as HTMLButtonElement;
        const potatoId = button.getAttribute('data-id');
        console.log('Patata click', potatoId);
        if (!potatoId) {
            throw new Error('Patata no encontrada por Id');
        }
        getPotatoById(potatoId).then((potatoClicked) => {
            this.#selectedPotato = potatoClicked;
            this.#setTemplate();
            this.#setElement();
            this.#buttonListener();
        });
    }
}
