// src/components/article-list.ts

import { createComponent } from '../core/createComponent';
import './router-link'; // Importer 'router-link' si nécessaire

createComponent('article-list', {
  render() {
    const articles = [
      { id: 1, title: 'Article 1', summary: 'Résumé de l\'article 1' },
      { id: 2, title: 'Article 2', summary: 'Résumé de l\'article 2' },
      { id: 3, title: 'Article 3', summary: 'Résumé de l\'article 3' },
    ];

    const articlesHtml = articles
      .map(
        (article) => `
          <li>
            <h2>${article.title}</h2>
            <p>${article.summary}</p>
            <router-link href="/article/${article.id}">Lire la suite</router-link>
          </li>
        `
      )
      .join('');

    return `
      <h1>Liste des articles</h1>
      <ul>
        ${articlesHtml}
      </ul>
    `;
  },
  styles: `
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin-bottom: 20px;
    }
    h2 {
      margin: 0;
    }
  `,
});
