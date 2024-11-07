// src/components/about-page.ts

import { createComponent } from '../core/createComponent';

createComponent('about-page', {
  render() {
    return `
      <h1>À propos</h1>
      <p>Informations sur notre application.</p>
    `;
  },
});
