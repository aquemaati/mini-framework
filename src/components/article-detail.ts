// src/components/article-detail.ts

import { createComponent } from '../core/createComponent';
import { router } from '../core/router';

createComponent('article-detail', {
  render() {
    const id = router.getParams().id;
    const article = getArticleById(id);

    if (article) {
      return `
        <h1>${article.title}</h1>
        <p>${article.content}</p>
        <router-link href="/articles">Retour à la liste des articles</router-link>
      `;
    } else {
      return `
        <h1>Article non trouvé</h1>
        <p>L'article que vous recherchez n'existe pas.</p>
        <router-link href="/articles">Retour à la liste des articles</router-link>
      `;
    }
  },
});

// Fonction simulée pour récupérer un article par son ID
function getArticleById(id: string | undefined) {
  const articles = [
    { id: '1', title: 'Article 1', content: 'Contenu complet de l\'article 1' },
    { id: '2', title: 'Article 2', content: 'Contenu complet de l\'article 2' },
    { id: '3', title: 'Article 3', content: 'Contenu complet de l\'article 3' },
  ];

  return articles.find((article) => article.id === id);
}
