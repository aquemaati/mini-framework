# **Mini-Framework Typescript**

Ce framework est conçu pour simplifier le développement d'applications web modernes en utilisant les **Web Components**, le **Shadow DOM**, et des fonctionnalités intégrées pour la gestion de l'état et le routage.

---

## **Table des Matières**

- [**Mini-Framework Typescript**](#mini-framework-typescript)
  - [**Table des Matières**](#table-des-matières)
  - [**Introduction**](#introduction)
  - [**Fonctionnalités Clés**](#fonctionnalités-clés)
  - [**Installation et Configuration**](#installation-et-configuration)
    - [**Prérequis**](#prérequis)
  - [**Guide de Démarrage Rapide**](#guide-de-démarrage-rapide)
    - [**Structure du Projet**](#structure-du-projet)
    - [**Configuration de Base**](#configuration-de-base)
  - [**Création de Composants**](#création-de-composants)
    - [**Structure de Base**](#structure-de-base)
    - [**Fonction de Rendu (`render`)**](#fonction-de-rendu-render)
    - [**Gestion de l'État Interne**](#gestion-de-létat-interne)
    - [**Gestion des Événements**](#gestion-des-événements)
    - [**Observation des Attributs**](#observation-des-attributs)
    - [**Cycle de Vie des Composants**](#cycle-de-vie-des-composants)
  - [**Gestion Globale de l'État avec le Store**](#gestion-globale-de-létat-avec-le-store)
    - [**Accès à l'État Global**](#accès-à-létat-global)
    - [**Mise à Jour de l'État Global**](#mise-à-jour-de-létat-global)
    - [**Abonnement aux Changements d'État**](#abonnement-aux-changements-détat)
    - [**Exemple Complet : Compteur Global**](#exemple-complet--compteur-global)
  - [**Système de Routage Intégré**](#système-de-routage-intégré)
    - [**Introduction au Routage**](#introduction-au-routage)
    - [**Définition des Routes**](#définition-des-routes)
    - [**Navigation entre les Vues**](#navigation-entre-les-vues)
    - [**Composant `router-link`**](#composant-router-link)
    - [**Gestion des Paramètres de Route**](#gestion-des-paramètres-de-route)
    - [**Gestion des Routes Non Trouvées**](#gestion-des-routes-non-trouvées)
    - [**Exemple Complet avec le Routage**](#exemple-complet-avec-le-routage)
  - [**Meilleures Pratiques**](#meilleures-pratiques)
  - [**Questions Fréquemment Posées (FAQ)**](#questions-fréquemment-posées-faq)
  - [**Conclusion**](#conclusion)
  - [**Annexe**](#annexe)
    - [**Gestion Avancée des Événements**](#gestion-avancée-des-événements)
    - [**Utilisation des Slots pour le Contenu**](#utilisation-des-slots-pour-le-contenu)

---

## **Introduction**

Ce mini-framework a été créé pour offrir une alternative légère aux frameworks JavaScript traditionnels. Il permet aux développeurs de construire des applications web modernes en utilisant les technologies web standard, sans la complexité supplémentaire souvent associée aux frameworks plus lourds.

L'objectif est de vous fournir les outils nécessaires pour créer des **composants réutilisables**, gérer efficacement l'**état de l'application**, et naviguer entre différentes **vues** de manière fluide.

---

## **Fonctionnalités Clés**

- **Création Simplifiée de Composants** : Utilisez la fonction `createComponent` pour définir des composants personnalisés avec une syntaxe claire.
- **Gestion Intuitive des Événements** : Attachez des événements de manière déclarative, sans avoir à manipuler directement le DOM.
- **Gestion de l'État** : Gérez l'état local des composants avec `setState` et l'état global de l'application avec le `store`.
- **Système de Routage Intégré** : Naviguez entre différentes vues sans rechargement de la page grâce à un routeur simple et efficace.
- **Composant `router-link`** : Simplifiez la création de liens de navigation au sein de votre application.
- **Observation des Attributs** : Créez des composants réactifs qui réagissent aux changements d'attributs.
- **Cycle de Vie des Composants** : Utilisez les méthodes du cycle de vie pour contrôler le comportement de vos composants.

---

## **Installation et Configuration**

### **Prérequis**

- **Node.js** (version 12 ou supérieure)
- **npm** (version 6 ou supérieure)
- **TypeScript** (recommandé pour bénéficier du typage statique)


## **Guide de Démarrage Rapide**

### **Structure du Projet**

Votre projet devrait ressembler à ceci :

```
mon-projet/
├── src/
│   ├── core/
│   │   ├── createComponent.ts
│   │   ├── router.ts
│   │   └── store.ts
│   ├── components/
│   │   ├── router-link.ts
│   │   ├── nav-bar.ts
│   │   ├── home-page.ts
│   │   └── about-page.ts
│   └── main.ts
├── index.html
├── tsconfig.json
└── package.json
```

### **Configuration de Base**

1. **Créez le fichier `index.html` :**

   ```html
   <!DOCTYPE html>
   <html lang="fr">
   <head>
     <meta charset="UTF-8">
     <title>Mon Application</title>
   </head>
   <body>
     <!-- Barre de navigation -->
     <nav-bar></nav-bar>

     <!-- Conteneur principal pour le routage -->
     <main></main>

     <!-- Script principal -->
     <script type="module" src="dist/main.js"></script>
   </body>
   </html>
   ```

2. **Compilez le TypeScript :**

   Assurez-vous que votre `tsconfig.json` est correctement configuré pour compiler les fichiers TypeScript en JavaScript. Vous pouvez lancer la compilation avec :

   ```bash
   npx tsc
   ```

3. **Servez votre application :**

   Utilisez un serveur HTTP pour servir votre application. Si vous avez installé `live-server`, lancez-le avec :

   ```bash
   live-server
   ```

---

## **Création de Composants**

### **Structure de Base**

La fonction `createComponent` est le cœur de votre framework pour créer des composants personnalisés.

**Syntaxe Générale :**

```typescript
createComponent('nom-du-composant', {
  render(this: ComponentInstance, state: any): string {
    return `
      <!-- Votre template HTML -->
    `;
  },
  // Options supplémentaires...
});
```

### **Fonction de Rendu (`render`)**

La méthode `render` doit retourner une chaîne de caractères contenant le HTML du composant. Elle est appelée chaque fois que le composant doit être mis à jour.

**Exemple :**

```typescript
// src/components/hello-world.ts

import { createComponent } from '../core/createComponent';

createComponent('hello-world', {
  render() {
    return `
      <div>
        <h1>Hello, World!</h1>
      </div>
    `;
  },
});
```

**Utilisation dans le HTML :**

```html
<hello-world></hello-world>
```

### **Gestion de l'État Interne**

Vous pouvez gérer l'état interne d'un composant en utilisant `this.state` et `this.setState(newState)`. Lorsque vous appelez `setState`, le composant se re-rend automatiquement avec le nouvel état.

**Exemple : Compteur Interne**

```typescript
// src/components/my-counter.ts

import { createComponent } from '../core/createComponent';

createComponent('my-counter', {
  state: { count: 0 }, // État initial

  render(state) {
    return `
      <div>
        <p>Compteur : ${state.count}</p>
        <button class="increment">Incrémenter</button>
      </div>
    `;
  },

  events: {
    'click@.increment': function () {
      const currentCount = this.state.count;
      this.setState({ count: currentCount + 1 });
    },
  },
});
```

**Explications :**

- **État Initial** : Le compteur démarre à 0 grâce à `state: { count: 0 }`.
- **Mise à Jour de l'État** : Lorsqu'on clique sur le bouton, `setState` est appelé avec le nouveau compteur.
- **Rendu Automatique** : Le composant se met à jour automatiquement pour refléter le nouvel état.

**Utilisation dans le HTML :**

```html
<my-counter></my-counter>
```

### **Gestion des Événements**

La propriété `events` vous permet de définir des gestionnaires d'événements de manière déclarative.

**Syntaxe :**

```typescript
events: {
  'événement@sélecteur': function (event) {
    // Gestionnaire d'événement
  },
}
```

**Exemple : Bouton Cliquable**

```typescript
// src/components/click-button.ts

import { createComponent } from '../core/createComponent';

createComponent('click-button', {
  render() {
    return `<button class="btn">Cliquez-moi</button>`;
  },

  events: {
    'click@.btn': function () {
      alert('Bouton cliqué !');
    },
  },
});
```

**Utilisation dans le HTML :**

```html
<click-button></click-button>
```

### **Observation des Attributs**

Vous pouvez rendre votre composant réactif aux changements d'attributs en utilisant `observedAttributes` et `attributeChangedCallback`.

**Exemple : Composant Réactif aux Attributs**

```typescript
// src/components/user-greeting.ts

import { createComponent } from '../core/createComponent';

createComponent('user-greeting', {
  render() {
    const name = this.getAttribute('name') || 'Utilisateur';
    return `<p>Bonjour, ${name} !</p>`;
  },

  observedAttributes: ['name'],

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') {
      this.update();
    }
  },
});
```

**Utilisation dans le HTML :**

```html
<user-greeting name="Alice"></user-greeting>
```

**Modification Dynamique :**

```html
<script>
  const greeting = document.querySelector('user-greeting');
  greeting.setAttribute('name', 'Bob');
</script>
```

### **Cycle de Vie des Composants**

Les méthodes `connectedCallback` et `disconnectedCallback` vous permettent d'exécuter du code lorsque le composant est ajouté ou retiré du DOM.

**Exemple :**

```typescript
// src/components/lifecycle-example.ts

import { createComponent } from '../core/createComponent';

createComponent('lifecycle-example', {
  render() {
    return `<p>Composant avec cycle de vie</p>`;
  },

  connectedCallback() {
    console.log('Composant ajouté au DOM');
  },

  disconnectedCallback() {
    console.log('Composant retiré du DOM');
  },
});
```

---

## **Gestion Globale de l'État avec le Store**

Le **Store** est un objet global qui vous permet de gérer l'état partagé entre plusieurs composants.

### **Accès à l'État Global**

Pour accéder à l'état global, importez le `store` et utilisez `store.getState()`.

**Exemple :**

```typescript
import { store } from '../core/store';

const currentState = store.getState();
```

### **Mise à Jour de l'État Global**

Pour mettre à jour l'état global, utilisez `store.setState(newState)`. Cela fusionnera `newState` avec l'état existant et notifie tous les abonnés.

**Exemple :**

```typescript
store.setState({ user: { name: 'Alice' } });
```

### **Abonnement aux Changements d'État**

Vous pouvez vous abonner aux changements d'état en utilisant `store.subscribe(listener)`. Le listener sera appelé à chaque fois que l'état est mis à jour.

**Exemple :**

```typescript
store.subscribe((newState) => {
  console.log('Nouvel état:', newState);
});
```

### **Exemple Complet : Compteur Global**

**Création du Composant :**

```typescript
// src/components/global-counter.ts

import { createComponent } from '../core/createComponent';
import { store } from '../core/store';

createComponent('global-counter', {
  render() {
    const count = store.getState().count || 0;
    return `
      <div>
        <p>Compteur Global : ${count}</p>
        <button class="increment">Incrémenter</button>
      </div>
    `;
  },

  events: {
    'click@.increment': function () {
      const currentCount = store.getState().count || 0;
      store.setState({ count: currentCount + 1 });
    },
  },

  connectedCallback() {
    this.unsubscribe = store.subscribe(() => {
      this.update();
    });
  },

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
});
```

**Explications :**

- **Accès à l'État Global** : Le compteur lit la valeur actuelle de `count` depuis le store.
- **Mise à Jour de l'État** : En cliquant sur le bouton, le compteur incrémente la valeur de `count` dans le store.
- **Abonnement** : Le composant s'abonne aux changements du store pour se mettre à jour lorsque l'état change.

**Utilisation dans le HTML :**

```html
<global-counter></global-counter>
```

---

## **Système de Routage Intégré**

### **Introduction au Routage**

Le système de routage vous permet de synchroniser l'URL avec l'état de votre application, permettant une navigation fluide entre différentes vues sans rechargement de la page.

### **Définition des Routes**

Les routes sont définies en associant un chemin à un composant.

**Exemple : Définition des Routes dans `main.ts`**

```typescript
// src/main.ts

import { router } from './core/router';

// Définition des routes
router.addRoute('/', 'home-page');
router.addRoute('/about', 'about-page');
router.addRoute('/contact', 'contact-page');
router.addRoute('/articles', 'article-list');
router.addRoute('/article/:id', 'article-detail');

// Gestion de la route initiale
router.handleRoute();
```

### **Navigation entre les Vues**

Utilisez le composant `<router-link>` pour créer des liens qui naviguent entre les vues en modifiant l'URL sans recharger la page.

**Exemple :**

```html
<nav>
  <router-link href="/">Accueil</router-link>
  <router-link href="/about">À Propos</router-link>
  <router-link href="/contact">Contact</router-link>
</nav>
```

### **Composant `router-link`**

Le composant `<router-link>` encapsule une balise `<a>` et intercepte les clics pour utiliser le routeur au lieu du comportement par défaut du navigateur.

**Définition du Composant :**

```typescript
// src/components/router-link.ts

import { createComponent } from '../core/createComponent';
import { router } from '../core/router';

createComponent('router-link', {
  render() {
    const href = this.getAttribute('href') || '#';
    return `<a href="${href}"><slot></slot></a>`;
  },

  events: {
    'click@a': function (event: Event) {
      event.preventDefault();
      const href = this.getAttribute('href')!;
      router.navigate(href);
    },
  },
});
```

### **Gestion des Paramètres de Route**

Le routeur supporte les paramètres dynamiques dans les chemins de route en utilisant la syntaxe `:param`.

**Exemple : Route avec Paramètre**

```typescript
// Dans main.ts
router.addRoute('/article/:id', 'article-detail');
```

**Dans le Composant :**

```typescript
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
      `;
    } else {
      return `<p>Article non trouvé</p>`;
    }
  },
});

// Fonction simulée pour récupérer un article
function getArticleById(id: string | undefined) {
  const articles = [
    { id: '1', title: 'Article 1', content: 'Contenu de l\'article 1' },
    // ... autres articles
  ];
  return articles.find((article) => article.id === id);
}
```

### **Gestion des Routes Non Trouvées**

Si aucune route ne correspond à l'URL actuelle, le routeur affiche le composant `not-found`.

**Exemple :**

```typescript
// src/components/not-found.ts

import { createComponent } from '../core/createComponent';

createComponent('not-found', {
  render() {
    return `
      <h1>Page Non Trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <router-link href="/">Retour à l'accueil</router-link>
    `;
  },
});
```

### **Exemple Complet avec le Routage**

**1. Composant `home-page`**

```typescript
// src/components/home-page.ts

import { createComponent } from '../core/createComponent';

createComponent('home-page', {
  render() {
    return `
      <h1>Accueil</h1>
      <p>Bienvenue sur la page d'accueil.</p>
      <router-link href="/articles">Voir les articles</router-link>
    `;
  },
});
```

**2. Composant `article-list`**

```typescript
// src/components/article-list.ts

import { createComponent } from '../core/createComponent';
import './router-link';

createComponent('article-list', {
  render() {
    const articles = [
      { id: 1, title: 'Article 1', summary: 'Résumé de l\'article 1' },
      // ... autres articles
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
      <ul>${articlesHtml}</ul>
      <router-link href="/">Retour à l'accueil</router-link>
    `;
  },
});
```

---

## **Meilleures Pratiques**

- **Modularité** : Créez des composants réutilisables et indépendants.
- **Gestion de l'État** : Utilisez le `store` pour l'état global et `setState` pour l'état local.
- **Clarté du Code** : Commentez votre code et utilisez des noms de variables explicites.
- **Performance** : Évitez les opérations coûteuses dans la méthode `render`.
- **Accessibilité** : Assurez-vous que vos composants sont accessibles (par exemple, en utilisant les balises sémantiques appropriées).

---

## **Questions Fréquemment Posées (FAQ)**

**Q : Puis-je utiliser ce framework avec TypeScript ?**

R : Oui, le framework est conçu pour être utilisé avec TypeScript, offrant les avantages du typage statique et de l'auto-complétion.

**Q : Comment puis-je gérer des événements personnalisés ?**

R : Vous pouvez émettre et écouter des événements personnalisés en utilisant les méthodes standard du DOM, comme `dispatchEvent` et `addEventListener`.

**Q : Le framework supporte-t-il le routage ?**

R : Oui, il intègre un routeur simple pour gérer la navigation entre les vues sans rechargement de la page.

**Q : Comment partager l'état entre les composants ?**

R : Utilisez le `store` global pour partager l'état entre les composants. Vous pouvez vous abonner aux changements d'état avec `store.subscribe`.

**Q : Puis-je utiliser des bibliothèques tierces avec ce framework ?**

R : Oui, vous pouvez intégrer des bibliothèques tierces selon vos besoins. Le framework est conçu pour être flexible et interopérable.

---

## **Conclusion**

Ce mini-framework offre une approche simple et efficace pour construire des applications web modernes. En tirant parti des standards du web comme les Web Components et le Shadow DOM, il vous permet de créer des composants réutilisables et maintenables.

Nous espérons que cette documentation vous aidera à démarrer rapidement et à tirer le meilleur parti de ce framework.

**Bon développement !**

---

## **Annexe**

### **Gestion Avancée des Événements**

Vous pouvez utiliser des modificateurs ou des fonctions pour gérer des cas spécifiques.

**Exemple : Événement Unique**

```typescript
createComponent('single-use-button', {
  render() {
    return `<button class="btn">Cliquez-moi une seule fois</button>`;
  },

  events: {
    'click@.btn': function () {
      alert('Ce bouton ne peut être cliqué qu\'une seule fois.');
      const button = this.shadowRoot!.querySelector('.btn');
      button!.disabled = true;
    },
  },
});
```

### **Utilisation des Slots pour le Contenu**

Les slots vous permettent d'insérer du contenu dans vos composants.

**Exemple : Composant avec Slots**

```typescript
createComponent('custom-card', {
  render() {
    return `
      <div class="card">
        <slot name="header"></slot>
        <div class="content">
          <slot></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    `;
  },

  styles: `
    .card { border: 1px solid #ccc; padding: 10px; }
    .content { margin: 10px 0; }
  `,
});
```

**Utilisation dans le HTML :**

```html
<custom-card>
  <h2 slot="header">Titre de la Carte</h2>
  <p>Contenu principal de la carte.</p>
  <p slot="footer">Pied de page de la carte.</p>
</custom-card>
```

---

**N'hésitez pas** à explorer davantage les possibilités offertes par ce mini-framework et à l'adapter à vos besoins spécifiques. Votre créativité est la seule limite !