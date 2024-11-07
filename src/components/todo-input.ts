// src/components/todo-input.ts

import { createComponent } from '../core/createComponent';
import { appStore } from '../app-store';
import { store } from '../core/store';

createComponent('todo-input', {
  render() {
    return `
      <header class="header">
        <h1>Tâches</h1>
        <input class="new-todo" placeholder="Que devez-vous faire ?" autofocus>
      </header>
    `;
  },
  events: {
    'keyup@.new-todo': function (event) {
      if (event.type === 'Enter') {
        const input = event.target as HTMLInputElement;
        const text = input.value.trim();
        if (text) {
          const todos = appStore.getState().todos;
          todos.push({ id: Date.now(), text, completed: false });
          store.setState({ todos });
          input.value = '';
        }
      }
    },
  },
});
