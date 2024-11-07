// src/core/createComponent.ts

import { router } from './router';

export type ComponentInstance = HTMLElement & {
  state: any;
  setState(newState: any): void;
  update(): void;
};

export type ComponentOptions = {
  state?: any; // Ajout de la propriété 'state' dans les options
  render(this: ComponentInstance, state: any): string;
  styles?: string;
  connectedCallback?(this: ComponentInstance): void;
  disconnectedCallback?(this: ComponentInstance): void;
  observedAttributes?: string[];
  attributeChangedCallback?(this: ComponentInstance, name: string, oldValue: string, newValue: string): void;
  events?: { [key: string]: (this: ComponentInstance, event: Event) => void };
  route?: string;
};

export function createComponent(name: string, options: ComponentOptions) {
  class CustomElement extends HTMLElement {
    public state: any = options.state || {};
    private eventHandlers: { [key: string]: EventListener } = {};

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.update();
      options.connectedCallback?.call(this as ComponentInstance);
      // Si une route est définie, ajouter la route au routeur
      if (options.route) {
        router.addRoute(options.route, name);
      }
    }

    disconnectedCallback() {
      options.disconnectedCallback?.call(this as ComponentInstance);
    }

    static get observedAttributes() {
      return options.observedAttributes || [];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      options.attributeChangedCallback?.call(this as ComponentInstance, name, oldValue, newValue);
      this.update();
    }

    setState(newState: any) {
      this.state = { ...this.state, ...newState };
      this.update();
    }

    update() {
      const shadow = this.shadowRoot!;
      shadow.innerHTML = '';
      if (options.styles) {
        const style = document.createElement('style');
        style.textContent = options.styles;
        shadow.appendChild(style);
      }
      const template = document.createElement('template');
      template.innerHTML = options.render.call(this as ComponentInstance, this.state);
      this.bindEvents(template.content);
      shadow.appendChild(template.content);
    }

    bindEvents(fragment: DocumentFragment) {
      if (options.events) {
        Object.keys(options.events).forEach((eventDescriptor) => {
          const [eventName, selector] = eventDescriptor.split('@');
          const elements = fragment.querySelectorAll(selector);
          elements.forEach((element) => {
            const handler = options.events![eventDescriptor].bind(this as ComponentInstance);
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
