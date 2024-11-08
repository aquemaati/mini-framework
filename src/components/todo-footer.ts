// src/components/todo-footer.ts
import { createComponent } from "../core/createComponent";
import { todos } from "./todo-app";

createComponent("todo-footer", {
     render() {
          // Récupérez l'état actuel des todos
          const { todos: todoList } = todos.getState();
          const activeCount = todoList.filter(
               (todo: any) => todo.status === "active"
          ).length;

          if (todoList.length === 0) return "";
          
          return `
      <footer class="footer">
        <p>${activeCount} item${activeCount !== 1 ? "s" : ""} left</p>
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
          "click@.filter-btn-all": function () {
               todos.setState({ ...todos.getState(), filter: "all" });
               console.log(`Filter clicked: all`);
          },

          "click@.filter-btn-active": function () {
               todos.setState({ ...todos.getState(), filter: "active" });
               console.log(`Filter clicked: active`);
          },

          "click@.filter-btn-completed": function () {
               todos.setState({ ...todos.getState(), filter: "completed" });
               console.log(`Filter clicked: completed`);
          },

          "click@.clear-completed": function () {
               // Supprimez toutes les tâches terminées
               const updatedTodos = todos
                    .getState()
                    .todos.filter((todo: any) => todo.status !== "completed");
               todos.setState({ ...todos.getState(), todos: updatedTodos });
          },
     },
     connectedCallback() {
          todos.subscribe(() => this.update());
     },
});
