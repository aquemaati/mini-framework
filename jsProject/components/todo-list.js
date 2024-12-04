"use strict";
// src/components/todo-list.ts
Object.defineProperty(exports, "__esModule", { value: true });
const createComponent_1 = require("../core/createComponent");
const todo_app_1 = require("./todo-app");
require("./todo-item"); // Assurez-vous que le composant todo-item est importé
(0, createComponent_1.createComponent)('todo-list', {
    render() {
        const { todos: todoList, filter } = todo_app_1.todos.getState();
        // Filtrer les todos en fonction du filtre sélectionné
        const filteredTodos = todoList
            .map((todo, index) => (Object.assign(Object.assign({}, todo), { originalIndex: index })))
            .filter((todo) => {
            if (filter === 'active')
                return todo.status === 'active';
            if (filter === 'completed')
                return todo.status === 'completed';
            return true; // 'all' ou aucun filtre
        });
        return `
      <ul>
        ${filteredTodos
            .map((todo) => `
            <todo-item idtodo="${todo.originalIndex}"></todo-item>
          `)
            .join('')}
      </ul>
    `;
    },
    // Écouter les changements de l'état des todos pour re-render
    connectedCallback() {
        todo_app_1.todos.subscribe(() => this.update());
    },
});
