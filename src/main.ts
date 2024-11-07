// src/main.ts

import './core/createComponent';
import './core/router';
import './core/store'; // Import du core store (non modifié)

import './app-store'; // Import du store spécifique à l'application

import './components/router-link';
import './components/todo-app';
import './components/todo-input';
import './components/todo-list';
import './components/todo-item';
import './components/todo-footer';

// Importation du routeur
import { router } from './core/router';

// Définition des routes (si nécessaire)
router.addRoute('/', 'todo-app');

// Gestion de la route initiale
router.handleRoute();
