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
  },
  connectedCallback() {
    const index = Number(this.getAttribute('idtodo') || 0);
    this.setState({ index });
  },
  render(state) {
    const { index } = state;
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
        <span>${currentTodo.todo}</span>
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
    
    'click@.delete-btn': function () { // Ajout du paramètre 'event'
      const index =this.state.index;    
      const updatedTodos = todos.getState().todos.filter((_: Todo, idx: number) => idx !== index);
      console.log(updatedTodos);    
      todos.setState({ todos: updatedTodos });
    },
  },
});
