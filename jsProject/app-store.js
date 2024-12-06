// src/app-store.ts
import { Store } from './core/store';
// Chargement des todos depuis le Local Storage
const initialTodos = JSON.parse(localStorage.getItem('todos') || '[]');
// État initial de l'application
const initialState = {
    todos: initialTodos,
    filter: 'all', // 'all', 'active', 'completed'
};
// Création du store spécifique à l'application
export const appStore = new Store();
appStore.setState(initialState);
// Abonnement pour sauvegarder les todos dans le Local Storage à chaque mise à jour
appStore.subscribe((state) => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
});
