import type { Potato, PotatoDTO } from '../../schemas/potato';
import { getPotatoes } from '../../core/service/products/getPotatoes';
import { getPotatoById } from '../../core/service/products/getPotatoById';
import { createPotato } from '../../core/service/products/createPotato';

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
    #showCreateForm = false;

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
                this.#potatoButtonListener();
                this.#createPotatoButtonListener();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    #setTemplate() {
        this.#template = /*html*/ `
            <section>
                <h2>Products</h2>
                <button class="toggle-form">Plantar 🥔</button>
                ${this.#showCreateForm ? this.#getCreateFormTemplate() : ''}
                <ul>
                    ${this.#potatoes
                        .map(
                            (p: Potato) => `<li>
                            <button class="potato" data-id="${p.id}">🥔${p.id}</button>
                        </li>`,
                        )
                        .join('')}
                </ul>
                ${this.#selectedPotato ? this.#getPotatoDetailTemplate() : ''}
            </section>
        `;
    }

    #getCreateFormTemplate() {
        return /*html*/ `
            <form class="create-potato-form">
                <fieldset>
                    <legend>Crear Nueva Patata</legend>
                    
                    <div class="form-group">
                        <label for="weight">Peso (g):</label>
                        <input 
                            type="number" 
                            id="weight" 
                            name="weight" 
                            step="0.01"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="price">Precio (€):</label>
                        <input 
                            type="number" 
                            id="price" 
                            name="price" 
                            step="0.01"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="color">Color:</label>
                        <input 
                            type="text" 
                            id="color" 
                            name="color"
                        />
                    </div>

                    <div class="form-group">
                        <label for="owner">Propietario:</label>
                        <input 
                            type="text" 
                            id="owner" 
                            name="owner"
                        />
                    </div>

                    <button type="submit" class="btn-submit">Plantar 🥔</button>
                    <button type="button" class="btn-cancel">Cancelar</button>
                </fieldset>
            </form>
        `;
    }

    #getPotatoDetailTemplate() {
        if (!this.#selectedPotato) return '';

        return /*html*/ `
            <div class="potato-detail">
                <h3>Detalles: ${this.#selectedPotato.id}</h3>
                <p>Precio: ${this.#selectedPotato.price}</p>
                <p>Stock: ${this.#selectedPotato.weight}</p>
                <button type="button" class="btn-close">Cerrar</button>
            </div>
        `;
    }

    #setElement() {
        this.innerHTML = this.#template;
    }

    #potatoButtonListener() {
        const buttons = this.querySelectorAll('.potato');
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => this.#handlePotatoClick(e));
        });

        const closeBtn = this.querySelector('.btn-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.#selectedPotato = null;
                this.#loadData();
            });
        }
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
            this.#loadData();
        });
    }

    #createPotatoButtonListener() {
        const toggleBtn = this.querySelector('.toggle-form');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.#showCreateForm = !this.#showCreateForm;
                this.#loadData();
            });
        }

        const form = this.querySelector(
            '.create-potato-form',
        ) as HTMLFormElement;
        if (form) {
            form.addEventListener('submit', (e) => this.#handleFormSubmit(e));
        }

        const cancelBtn = this.querySelector('.btn-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.#showCreateForm = false;
                this.#loadData();
            });
        }
    }

    #handleFormSubmit(e: Event) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const potatoData: PotatoDTO = {
            weight: Number(formData.get('weight')),
            price: Number(formData.get('price')),
            color: (formData.get('color') as string) || undefined,
            owner: (formData.get('owner') as string) || undefined,
        };

        createPotato(potatoData)
            .then(() => {
                this.#showCreateForm = false;
                this.#loadData();
            })
            .catch((error) => {
                console.error('Error al crear patata:', error);
            });
    }
}
