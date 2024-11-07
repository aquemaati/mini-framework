// src/components/about-page.ts

import { createComponent } from '../core/createComponent';

createComponent('about-page', {
  state: { count: 0 }, // État initial
  render(state) {
    return `
     <div>
        <p>Compteur : ${state.count }</p>
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
