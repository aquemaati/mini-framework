// src/components/todo-app.ts

import { createComponent } from "../core/createComponent";
import { Store } from "../core/store";

// Creation d'un store pour toute l'application
export const todos = new Store();
todos.setState({ todos: [], filter: "all" }); // Initialisation du store
console.log(todos.getState());

// Creation du composant todo-app
createComponent("todo-app", {
     render() {
          return `
      <section class="todoapp">
      <h1>todos</h1>
        <todo-input></todo-input>
        <todo-list></todo-list>
        <todo-footer></todo-footer>
      </section>
    `;
     },
     styles: `
      .todoapp h1 {
    color: #b83f45;
    font-size: 80px;
    font-weight: 200;
    text-align: center;
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
    top: -140px;
    width: 100%
}
  `,
});
