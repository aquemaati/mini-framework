// src/components/todo-footer.ts

import { createComponent } from '../core/createComponent';
import { appStore } from '../app-store';
import { store } from '../core/store';

createComponent('todo-footer', {
  render() {
    const { todos, filter } = appStore.getState();
    const remaining = todos.filter((todo : any) => !todo.completed).length;
    const completed = todos.filter((todo : any) => todo.completed).length;

    return `
      <footer class="footer">
        <span class="todo-count"><strong>${remaining}</strong> tâche(s) restante(s)</span>
        <ul class="filters">
          <li><a href="#/" class="${filter === 'all' ? 'selected' : ''}">Toutes</a></li>
          <li><a href="#/active" class="${filter === 'active' ? 'selected' : ''}">Actives</a></li>
          <li><a href="#/completed" class="${filter === 'completed' ? 'selected' : ''}">Terminées</a></li>
        </ul>
        ${completed > 0 ? '<button class="clear-completed">Effacer terminées</button>' : ''}
      </footer>
    `;
  },
  events: {
    'click@.clear-completed': function () {
      const todos = appStore.getState().todos.filter((todo : any) => !todo.completed);
      appStore.setState({ todos });
    },
    'click@.filters a': function (event) {
      event.preventDefault();
      const hash = (event.target as HTMLAnchorElement).getAttribute('href')!;
      const filter = hash.replace('#/', '') || 'all';
      appStore.setState({ filter });
    },
  },
  connectedCallback() {
    store.subscribe(() => this.update());
  },
  disconnectedCallback() {
//     this.unsubscribe && this.unsubscribe();
  },
});
