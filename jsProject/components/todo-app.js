"use strict";
// src/components/todo-app.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.todos = void 0;
const createComponent_1 = require("../core/createComponent");
const store_1 = require("../core/store");
// Creation d'un store pour toute l'application
exports.todos = new store_1.Store();
exports.todos.setState({ todos: [], filter: "all" }); // Initialisation du store
console.log(exports.todos.getState());
// Creation du composant todo-app
(0, createComponent_1.createComponent)("todo-app", {
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
