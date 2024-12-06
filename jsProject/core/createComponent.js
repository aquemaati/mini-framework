// src/core/createComponent.ts
import { router } from './router';
export function createComponent(name, options) {
    class CustomElement extends HTMLElement {
        constructor() {
            super();
            this.state = options.state || {};
            this.eventHandlers = {};
            this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            var _a;
            this.update();
            (_a = options.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            // Si une route est définie, ajouter la route au routeur
            if (options.route) {
                router.addRoute(options.route, name);
            }
        }
        disconnectedCallback() {
            var _a;
            (_a = options.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        }
        static get observedAttributes() {
            return options.observedAttributes || [];
        }
        attributeChangedCallback(name, oldValue, newValue) {
            var _a;
            (_a = options.attributeChangedCallback) === null || _a === void 0 ? void 0 : _a.call(this, name, oldValue, newValue);
            this.update();
        }
        setState(newState) {
            this.state = Object.assign(Object.assign({}, this.state), newState);
            this.update();
        }
        update() {
            const shadow = this.shadowRoot;
            shadow.innerHTML = '';
            if (options.styles) {
                const style = document.createElement('style');
                style.textContent = options.styles;
                shadow.appendChild(style);
            }
            const template = document.createElement('template');
            template.innerHTML = options.render.call(this, this.state);
            this.bindEvents(template.content);
            shadow.appendChild(template.content);
        }
        bindEvents(fragment) {
            if (options.events) {
                Object.keys(options.events).forEach((eventDescriptor) => {
                    const [eventName, selector] = eventDescriptor.split('@');
                    const elements = fragment.querySelectorAll(selector);
                    elements.forEach((element) => {
                        const handler = options.events[eventDescriptor].bind(this);
                        element.addEventListener(eventName, handler);
                        // Stocker le gestionnaire pour un éventuel nettoyage
                        const key = `${eventName}@${selector}`;
                        this.eventHandlers[key] = handler;
                    });
                });
            }
        }
    }
    customElements.define(name, CustomElement);
}
