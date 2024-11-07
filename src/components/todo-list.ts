// src/components/todo-list.ts

import { createComponent } from '../core/createComponent';
import { appStore } from '../app-store';
import './todo-item';
import { store } from '../core/store';

createComponent('todo-list', {
  render() {
    const { todos, filter } = appStore.getState();
    const filteredTodos = todos.filter((todo : any) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });

    const todoItems = filteredTodos
      .map((todo : any) => `<todo-item todo-id="${todo.id}"></todo-item>`)
      .join('');

    return `
      <section class="main">
        ${todos.length > 0 ? '<input id="toggle-all" class="toggle-all" type="checkbox">' : ''}
        <label for="toggle-all">Marquer tout comme terminé</label>
        <ul class="todo-list">
          ${todoItems}
        </ul>
      </section>
    `;
  },
  events: {
    'change@#toggle-all': function (event) {
      const completed = (event.target as HTMLInputElement).checked;
      const todos = appStore.getState().todos.map((todo: any) => ({ ...todo, completed }));
      appStore.setState({ todos });
    },
  },
  connectedCallback() {
      store.subscribe(() => this.update());
  },
  disconnectedCallback() {
//     this.unsubscribe && this.unsubscribe();
  },
});
