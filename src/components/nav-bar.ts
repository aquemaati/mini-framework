// src/components/nav-bar.ts

import { createComponent } from '../core/createComponent';
import './router-link';

createComponent('nav-bar', {
  render() {
    return `
      <nav>
        <ul>
          <li><router-link href="/">Accueil</router-link></li>
          <li><router-link href="/about">À propos</router-link></li>
          <li><router-link href="/contact">Contact</router-link></li>
          <li><router-link href="/articles">Articles</router-link></li>
        </ul>
      </nav>
    `;
  },
  styles: `
    nav ul {
      list-style: none;
      display: flex;
      gap: 10px;
      padding: 0;
    }
    nav ul li {
      display: inline;
    }
    router-link a {
      text-decoration: none;
      color: blue;
    }
  `,
});
