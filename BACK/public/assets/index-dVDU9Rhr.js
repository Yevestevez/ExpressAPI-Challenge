(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class e extends HTMLElement{static#e=`app-home-page`;static render(){let t=document.querySelector(`main`);if(t===null)throw Error(`Selector main no disponible`);t.innerHTML=`<${e.#e}></${e.#e}>`,customElements.get(e.#e)===void 0&&customElements.define(e.#e,e)}#t;constructor(){super(),this.#n(),this.#r()}#n(){this.#t=`
            <section>
                <h2>Hola desde componente HOME</h2>
            </section>
        `}#r(){this.innerHTML=this.#t}},t=()=>fetch(`http://localhost:3030/api/potatoes`,{method:`GET`,headers:{}}).then(e=>{if(e.ok)return e.json();throw Error(e.status+` `+e.statusText)}).then(e=>e),n=e=>{let t=`http://localhost:3030/api/potatoes/${e}`;return fetch(t,{method:`GET`,headers:{}}).then(e=>{if(e.ok)return e.json();throw Error(e.status+` `+e.statusText)}).then(e=>e)},r=e=>fetch(`http://localhost:3030/api/potatoes`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)}).then(e=>{if(e.status===201)return e.json();throw Error(e.status+` `+e.statusText)}).then(e=>e),i=e=>{let t=`http://localhost:3030/api/potatoes/${e}`;return fetch(t,{method:`DELETE`,headers:{}}).then(e=>{if(e.status!==204)throw Error(e.status+` `+e.statusText)})},a=(e,t)=>{let n=`http://localhost:3030/api/potatoes/${e}`;return fetch(n,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}).then(e=>{if(e.ok)return e.json();throw Error(e.status+` `+e.statusText)}).then(e=>e)},o=class e extends HTMLElement{static#e=`app-products-page`;static render(){let t=document.querySelector(`main`);if(t===null)throw Error(`Selector main no disponible`);t.innerHTML=`<${e.#e}></${e.#e}>`,customElements.get(e.#e)===void 0&&customElements.define(e.#e,e)}#t;#n=[];#r=null;#i=!1;#a=!1;#o=null;constructor(){super(),this.#s()}#s(){t().then(e=>{this.#n=e,this.#c(),this.#f(),this.#m(),this.#p(),this.#h(),this.#g()}).catch(e=>{console.error(e)})}#c(){this.#t=`
            <section>
                <h2>Products</h2>
                <button class="toggle-form">Plantar 🥔</button>
                
                ${this.#i?this.#l():``}
                
                <ul>
                    ${this.#n.map(e=>`<li>
                            <button class="potato" data-id="${e.id}">🥔${e.id}</button>
                            <button class="delete-potato-btn" data-id="${e.id}">❌</button>
                            <button class="toggle-update-form" data-id="${e.id}">Actualizar 🥔</button>
                        </li>`).join(``)}
                </ul>
                ${this.#a?this.#u():``}
                ${this.#r?this.#d():``}
            </section>
        `}#l(){return`
            <form class="create-potato-form">
                <fieldset>
                    <legend>Crear Nueva Patata</legend>
                    
                    <div class="form-group">
                        <label for="weight">Peso (g):</label>
                        <input 
                            type="number" 
                            id="weight" 
                            name="weight" 
                            step="0.5"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="price">Precio (€):</label>
                        <input 
                            type="number" 
                            id="price" 
                            name="price" 
                            step="0.5"
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
        `}#u(){return`
            <form class="update-potato-form">
                <fieldset>
                    <legend>Actualizar Patata</legend>
                    
                    <div class="form-group">
                        <label for="weight">Peso (g):</label>
                        <input 
                            type="number" 
                            id="weight" 
                            name="weight" 
                            step="0.5"
                        />
                    </div>

                    <div class="form-group">
                        <label for="price">Precio (€):</label>
                        <input 
                            type="number" 
                            id="price" 
                            name="price" 
                            step="0.5"
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

                    <button type="submit" class="btn-submit">Actualizar 🥔</button>
                    <button type="button" class="btn-cancel">Cancelar</button>
                </fieldset>
            </form>
        `}#d(){return this.#r?`
            <div class="potato-detail">
                <h3>Detalles: ${this.#r.id}</h3>
                <p>Peso: ${this.#r.weight}</p>
                <p>Precio: ${this.#r.price}</p>
                ${this.#r.color?`<p>Color: ${this.#r.color}</p>`:``}
                ${this.#r.owner?`<p>Propietario: ${this.#r.owner}</p>`:``}
                <button type="button" class="btn-close">Cerrar</button>
            </div>
        `:``}#f(){this.innerHTML=this.#t}#p(){let e=this.querySelector(`.toggle-form`);e&&e.addEventListener(`click`,()=>{this.#i=!this.#i,this.#s()});let t=this.querySelector(`.create-potato-form`);t&&t.addEventListener(`submit`,e=>this.#y(e));let n=this.querySelector(`.btn-cancel`);n&&n.addEventListener(`click`,()=>{this.#i=!1,this.#s()})}#m(){this.querySelectorAll(`.potato`).forEach(e=>{e.addEventListener(`click`,e=>this.#_(e))});let e=this.querySelector(`.btn-close`);e&&e.addEventListener(`click`,()=>{this.#r=null,this.#s()})}#h(){this.querySelectorAll(`.delete-potato-btn`).forEach(e=>{e.addEventListener(`click`,e=>this.#v(e))})}#g(){let e=this.querySelectorAll(`.toggle-update-form`);e&&e.forEach(e=>{e.addEventListener(`click`,e=>{if(this.#o=e.target.getAttribute(`data-id`),!this.#o)throw Error(`Patata no encontrada por Id`);this.#a=!this.#a,this.#s()})});let t=this.querySelector(`.update-potato-form`);t&&t.addEventListener(`submit`,e=>{this.#b(this.#o,e)});let n=this.querySelector(`.btn-cancel`);n&&n.addEventListener(`click`,()=>{this.#a=!1,this.#s()})}#_(e){let t=e.target.getAttribute(`data-id`);if(!t)throw Error(`Patata no encontrada por Id`);n(t).then(e=>{this.#r=this.#r?.id===e.id?null:e,this.#s()})}#v(e){let t=e.target.getAttribute(`data-id`);if(!t)throw Error(`Patata no encontrada por Id`);i(t).then(()=>{this.#s()})}#y(e){e.preventDefault();let t=e.target,n=new FormData(t);r({weight:Number(n.get(`weight`)),price:Number(n.get(`price`)),color:n.get(`color`)||void 0,owner:n.get(`owner`)||void 0}).then(()=>{this.#i=!1,this.#s()}).catch(e=>{console.error(`Error al crear patata:`,e)})}#b(e,t){t.preventDefault();let n=t.target,r=new FormData(n);a(e,{weight:Number(r.get(`weight`)),price:Number(r.get(`price`)),color:r.get(`color`)||void 0,owner:r.get(`owner`)||void 0}).then(()=>{this.#i=!1,this.#s()}).catch(e=>{console.error(`Error al crear patata:`,e)})}},s=async e=>{let t=`http://localhost:3030/${e}`;try{let e=await fetch(t,{method:`GET`,headers:{}});if(!e.ok)throw Error(`Error ${e.status}`);let n=await e.text(),r=document.querySelector(`main`);r&&(r.innerHTML=n)}catch(t){console.error(`Error cargando ${e}:`,t)}},c=[{path:`/`,label:`Inicio`,renderComponent:e.render},{path:`/products`,label:`Productos`,renderComponent:o.render},{path:`/about`,label:`Acerca de`,renderComponent:()=>s(`about`)}],l=(e=``,t=!0)=>{if(console.log(`URL for navigate`,e),console.log(history.state),history.state?.url===e)return;t&&history.pushState({url:e},``,e);let n=e.split(`/`).pop(),r=c.find(e=>e.path===`/`+n);r&&r.renderComponent()},u=class e extends HTMLElement{static#e=`app-menu`;static render(t){customElements.define(e.#e,e),document.querySelectorAll(e.#e).forEach(e=>{e.routes=t})}#t=[];#n;set routes(e){this.#t=e,this.#r(),this.#i()}constructor(){super()}#r(){this.#n=`
            <menu class="menu">
                ${this.#t.map(e=>`<li><a href="${e.path}">${e.label}</a></li>`).join(``)}
            </menu>
        `}#i(){this.innerHTML=this.#n,this.addEventListener(`click`,this.#a.bind(this)),document.body.addEventListener(`click`,this.#a.bind(this))}#a(e){let t=e.target.closest(`a`);t&&(e.preventDefault(),e.stopPropagation(),l(t.href))}},d=class e extends HTMLElement{static#e=`app-root`;static render(){customElements.define(e.#e,e),u.render(c)}#t;constructor(){super(),this.#n(),this.#r()}#n(){this.#t=`
            <app-header>
                <app-menu></app-menu>
            </app-header>
            <main></main>
            <app-footer></app-footer>
        `}#r(){this.innerHTML=this.#t}};console.log(`Load main`),d.render(),history.replaceState({url:`start`},``,location.pathname),l(location.pathname),window.addEventListener(`popstate`,e=>{console.log(`Popstate`,e),console.log(`Current location`,location.pathname),l(location.href,!1)});