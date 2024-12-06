// src/components/router-link.ts
import { createComponent } from '../core/createComponent';
import { router } from '../core/router';
createComponent('router-link', {
    render() {
        const href = this.getAttribute('href') || '#';
        const text = this.innerHTML || '';
        return `<a href="${href}">${text}</a>`;
    },
    events: {
        'click@a': function (event) {
            event.preventDefault();
            const href = this.getAttribute('href');
            router.navigate(href);
        },
    },
});
