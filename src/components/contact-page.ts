// src/components/contact-page.ts

import { createComponent } from '../core/createComponent';

createComponent('contact-page', {
  render() {
    return `
      <h1>Contact</h1>
      <p>Contactez-nous à l'adresse email@example.com.</p>
    `;
  },
});
