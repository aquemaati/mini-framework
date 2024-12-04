"use strict";
// src/app-store.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.appStore = void 0;
const store_1 = require("./core/store");
// Chargement des todos depuis le Local Storage
const initialTodos = JSON.parse(localStorage.getItem('todos') || '[]');
// État initial de l'application
const initialState = {
    todos: initialTodos,
    filter: 'all', // 'all', 'active', 'completed'
};
// Création du store spécifique à l'application
exports.appStore = new store_1.Store();
exports.appStore.setState(initialState);
// Abonnement pour sauvegarder les todos dans le Local Storage à chaque mise à jour
exports.appStore.subscribe((state) => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
});
