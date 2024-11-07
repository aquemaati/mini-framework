// src/core/store.ts

type Listener = (state: any) => void;

export class Store {
  private state: any = {};
  private listeners: Listener[] = [];

  getState() {
    return this.state;
  }

  setState(newState: any) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

// Instance unique du store pour toute l'application
export const store = new Store();
