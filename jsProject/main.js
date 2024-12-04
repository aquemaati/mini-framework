"use strict";
// src/main.ts
Object.defineProperty(exports, "__esModule", { value: true });
require("./core/createComponent");
require("./core/router");
require("./core/store"); // Import du core store (non modifié)
require("./app-store"); // Import du store spécifique à l'application
require("./components/router-link");
require("./components/todo-app");
require("./components/todo-input");
require("./components/todo-list");
require("./components/todo-item");
require("./components/todo-footer");
// Importation du routeur
const router_1 = require("./core/router");
// Définition des routes (si nécessaire)
router_1.router.addRoute('/', 'todo-app');
router_1.router.addRoute('/active', 'todo-app');
router_1.router.addRoute('/completed', 'todo-app');
// Gestion de la route initiale
router_1.router.handleRoute();
