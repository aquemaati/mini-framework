// src/components/home-page.ts

import { createComponent } from '../core/createComponent';

createComponent('home-page', {
  render() {
    return `
      <h1>Accueil</h1>
      <p>Bienvenue sur la page d'accueil.</p>
    `;
  },
});
