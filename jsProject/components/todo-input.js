// src/components/todo-input.ts
import { createComponent } from '../core/createComponent';
import { todos } from './todo-app';
createComponent('todo-input', {
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
                    todos.setState({
                        todos: [
                            ...todos.getState().todos,
                            { todo: text, status: 'active' }
                        ]
                    });
                    input.value = '';
                    console.log(todos.getState());
                }
            }
        },
    },
});
