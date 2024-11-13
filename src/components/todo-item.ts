// src/components/todo-item.ts

import { createComponent } from '../core/createComponent';
import { todos } from './todo-app';

interface Todo {
  todo: string;
  status: 'active' | 'completed';
}

createComponent('todo-item', {
  state: {
    index: 0, // Initialiser l'index par défaut
    isEditing: false, // Ajouter un état pour le mode édition
  },
  connectedCallback() {
    const index = Number(this.getAttribute('idtodo') || 0);
    this.setState({ index });
  },
  render(state) {
    const { index, isEditing } = state;
    const currentTodo = todos.getState().todos[index];

    if (!currentTodo) {
      return `
        <li>
          <span>Tâche non trouvée</span>
        </li>
      `;
    }

    return `
      <li data-index="${index}">
        <input type="checkbox" ${currentTodo.status === 'completed' ? 'checked' : ''} />
        ${isEditing 
          ? `<input type="text" class="edit-input" value="${currentTodo.todo}" />` 
          : `<span class="todo-text">${currentTodo.todo}</span>`}
        <button class="delete-btn">Delete</button>
      </li>
    `;
  },
  
  events: {
    'change@input[type="checkbox"]': function (event: Event) {
      const checkbox = event.target as HTMLInputElement;
      const index = this.state.index;    
      const updatedTodos = todos.getState().todos.map((t: Todo, idx: number) =>
        idx === index ? { ...t, status: checkbox.checked ? 'completed' : 'active' } : t
      );
      todos.setState({ todos: updatedTodos });
      console.log(updatedTodos);
    },
    
    'click@.delete-btn': function () {
      const index = this.state.index;
      const updatedTodos = todos.getState().todos.filter((_: Todo, idx: number) => idx !== index);
      todos.setState({ todos: updatedTodos });
    },
    
    'dblclick@.todo-text': function () {
      // Activer le mode édition
      this.setState({ isEditing: true });
    },
    
    'keydown@.edit-input': function (event: KeyboardEvent) {
      if (event.key === 'Enter') {
        const input = event.target as HTMLInputElement;
        const index = this.state.index;
        const updatedTodos = todos.getState().todos.map((t: Todo, idx: number) =>
          idx === index ? { ...t, todo: input.value } : t
        );
        todos.setState({ todos: updatedTodos });
        // Désactiver le mode édition
        this.setState({ isEditing: false });
      }
    },

    'blur@.edit-input': function () {
      // Désactiver le mode édition si on clique en dehors de l'input
      this.setState({ isEditing: false });
    },
  },
});
