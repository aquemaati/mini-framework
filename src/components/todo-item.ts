// src/components/todo-item.ts

import { createComponent, ComponentInstance } from '../core/createComponent';
import { appStore } from '../app-store';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

createComponent('todo-item', {
  observedAttributes: ['todo-id'],
  render: function (this: ComponentInstance) {
    const todoId = parseInt(this.getAttribute('todo-id')!, 10);
    const todo = appStore.getState().todos.find((t: Todo) => t.id === todoId);
    if (!todo) return '';

    return `
      <li class="${todo.completed ? 'completed' : ''}">
        <div class="view">
          <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
          <label>${todo.text}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.text}">
      </li>
    `;
  },
  events: {
    'change@.toggle': function (this: ComponentInstance, event: Event) {
      const todoId = parseInt(this.getAttribute('todo-id')!, 10);
      const todos = appStore.getState().todos.map((todo: Todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: (event.target as HTMLInputElement).checked };
        }
        return todo;
      });
      appStore.setState({ todos });
    },
    'click@.destroy': function (this: ComponentInstance) {
      const todoId = parseInt(this.getAttribute('todo-id')!, 10);
      const todos = appStore.getState().todos.filter((todo: Todo) => todo.id !== todoId);
      appStore.setState({ todos });
    },
    'dblclick@label': function (this: ComponentInstance) {
      this.classList.add('editing');
      const editInput = this.shadowRoot!.querySelector('.edit') as HTMLInputElement;
      editInput.focus();
    },
    'keyup@.edit': function (this: ComponentInstance, event: Event) {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === 'Enter') {
        this.saveEdit();
      } else if (keyboardEvent.key === 'Escape') {
        this.classList.remove('editing');
      }
    },
    'blur@.edit': function (this: ComponentInstance) {
      this.saveEdit();
    },
  },
  saveEdit: function (this: ComponentInstance) {
    const editInput = this.shadowRoot!.querySelector('.edit') as HTMLInputElement;
    const text = editInput.value.trim();
    const todoId = parseInt(this.getAttribute('todo-id')!, 10);
    if (text) {
      const todos = appStore.getState().todos.map((todo: Todo) => {
        if (todo.id === todoId) {
          return { ...todo, text };
        }
        return todo;
      });
      appStore.setState({ todos });
      this.classList.remove('editing');
    } else {
      // Supprimer la tâche si le texte est vide
      const todos = appStore.getState().todos.filter((todo: Todo) => todo.id !== todoId);
      appStore.setState({ todos });
    }
  },
  connectedCallback: function (this: ComponentInstance) {
    this.unsubscribe = appStore.subscribe(() => this.update());
  },
  disconnectedCallback: function (this: ComponentInstance) {
    this.unsubscribe && this.unsubscribe();
  },
});
