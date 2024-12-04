"use strict";
// src/core/store.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
class Store {
    constructor() {
        this.state = {};
        this.listeners = [];
    }
    getState() {
        return this.state;
    }
    setState(newState) {
        this.state = Object.assign(Object.assign({}, this.state), newState);
        this.notify();
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
    notify() {
        this.listeners.forEach((listener) => listener(this.state));
    }
}
exports.Store = Store;
// Instance unique du store pour toute l'application
// export const store = new Store();
