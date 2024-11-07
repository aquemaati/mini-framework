// src/components/not-found.ts

import { createComponent } from '../core/createComponent';
import './router-link';

createComponent('not-found', {
  render() {
    return `
      <h1>Page Non Trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <router-link href="/">Retour à l'accueil</router-link>
    `;
  },
});
