// src/components/todo-app.ts

import { createComponent } from '../core/createComponent';
import './todo-input';
import './todo-list';
import './todo-footer';

createComponent('todo-app', {
  render() {
    return `
      <section class="todoapp">
        <todo-input></todo-input>
        <todo-list></todo-list>
        <todo-footer></todo-footer>
      </section>
    `;
  },
  styles: `
  .todoapp {
  background: #fff;
  margin: 30px 0;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
  `,
});
