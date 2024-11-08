// src/components/todo-footer.ts
import { createComponent } from "../core/createComponent";
import { todos } from "./todo-app";

createComponent("todo-footer", {
  render() {
    // Décomptez le nombre de tâches actives

    return `
      <footer class="footer">
        <ul class="filters">
          <li><router-link href="/" class="filter-btn-all selected" data-filter="all">All</router-link></li>
          <li><router-link href="/active" class="filter-btn-active" data-filter="active">Active</router-link></li>
          <li><router-link href="/completed" class="filter-btn-completed" data-filter="completed">Completed</router-link></li>
        </ul>
        <button class="clear-completed">Clear completed</button>
      </footer>
    `;
  },
  events: {
    'click@.filter-btn-all': function() {

      todos.setState({ todos: todos.getState().todos, filter: 'all' });
     
      // Gérer le filtrage des tâches ici
      console.log(`Filter clicked : all`);
      console.log(todos.getState());
      
    },

    'click@.filter-btn-active': function() {
      // Gérer le filtrage des tâches ici
      console.log(`Filter clicked : active`);
      todos.setState({ todos: todos.getState().todos, filter: 'active' });
      console.log(todos.getState());
    },

    'click@.filter-btn-completed': function() {
      // Gérer le filtrage des tâches ici
      console.log(`Filter clicked : completed`);
      todos.setState({ todos: todos.getState().todos, filter: 'completed' });
      console.log(todos.getState());
    },

    'click@.clear-completed': function() {
      // Supprimez toutes les tâches terminées

    },
  },
});
