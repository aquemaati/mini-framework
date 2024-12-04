"use strict";
// src/components/todo-input.ts
Object.defineProperty(exports, "__esModule", { value: true });
const createComponent_1 = require("../core/createComponent");
const todo_app_1 = require("./todo-app");
(0, createComponent_1.createComponent)('todo-input', {
    render() {
        return `
      <input class="input-container" type="text" placeholder="What needs to be done?" />
    `;
    },
    styles: `
  input::input-placeholder {
    color: rgba(0,0,0,.4);
    font-style: italic;
    font-weight: 400
}
  `,
    events: {
        'keyup@input': function (event) {
            const input = event.target;
            if (event.key === 'Enter') {
                if (!input)
                    return; // Vérifie que l'élément est bien un input
                const text = input.value.trim();
                console.log(text);
                if (text) {
                    todo_app_1.todos.setState({
                        todos: [
                            ...todo_app_1.todos.getState().todos,
                            { todo: text, status: 'active' }
                        ]
                    });
                    input.value = '';
                    console.log(todo_app_1.todos.getState());
                }
            }
        },
    },
});
