// src/main.ts

import { router } from './core/router';
import './core/createComponent';
import './components/router-link';
import './components/nav-bar';
import './components/home-page';
import './components/about-page';
import './components/contact-page';
import './components/article-list';
import './components/article-detail';
import './components/not-found';

// Définition des routes
router.addRoute('/', 'home-page');
router.addRoute('/about', 'about-page');
router.addRoute('/contact', 'contact-page');
router.addRoute('/articles', 'article-list');
router.addRoute('/article/:id', 'article-detail');

// Gestion de la route initiale
router.handleRoute();
