// src/components/todo-list.ts

import { createComponent } from '../core/createComponent';
import { todos } from './todo-app';
import './todo-item'; // Assurez-vous que le composant todo-item est importé

createComponent('todo-list', {
  render() {
    const { todos: todoList, filter } = todos.getState();

    // Filtrer les todos en fonction du filtre sélectionné
    const filteredTodos = todoList
      .map((todo: any, index: number) => ({ ...todo, originalIndex: index }))
      .filter((todo: any) => {
        if (filter === 'active') return todo.status === 'active';
        if (filter === 'completed') return todo.status === 'completed';
        return true; // 'all' ou aucun filtre
      });

    return `
      <ul>
        ${filteredTodos
          .map((todo: any) => `
            <todo-item idtodo="${todo.originalIndex}"></todo-item>
          `)
          .join('')}
      </ul>
    `;
  },
  // Écouter les changements de l'état des todos pour re-render
  connectedCallback() {
    todos.subscribe(() => this.update());
  },
});
