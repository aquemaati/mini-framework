// src/components/about-page.ts

import { createComponent, ComponentInstance } from '../core/createComponent';



createComponent('about-page', {
  state: { count: 0 }, // État initial

  // Fonction de rendu
  render(state) {
    return `
      <div>
        <p>Compteur : ${state.count}</p>
        <button class="increment">Incrémenter</button>
      </div>
    `;
  },

  // Gestionnaires d'événements
  events: {
    // Gestionnaire de clic sur le bouton "Incrémenter"
    'click@.increment': function () {
      const currentCount = this.state.count;
      this.setState({ count: currentCount + 1 });
    },
    // Suppression du gestionnaire 'keyup@.increment' car nous allons gérer le keyup globalement
  },

  // Option connectedCallback pour ajouter l'écouteur global
  connectedCallback: function (this: ComponentInstance) {
    // Définir le gestionnaire de keyup
    const handleKeyup = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        console.log('Enter key pressed');
        
        const currentCount = this.state.count;
        this.setState({ count: currentCount + 1 });
      }
    };

    // Ajouter l'écouteur sur le body
    document.body.addEventListener('keyup', handleKeyup);

    // Stocker la référence du gestionnaire pour le supprimer plus tard
    (this as any)._handleKeyup = handleKeyup;
  },

  // Option disconnectedCallback pour nettoyer l'écouteur global
  disconnectedCallback: function (this: ComponentInstance) {
    // Récupérer la référence du gestionnaire stockée précédemment
    const handleKeyup = (this as any)._handleKeyup;
    if (handleKeyup) {
      document.body.removeEventListener('keyup', handleKeyup);
      delete (this as any)._handleKeyup;
    }
  },
});
