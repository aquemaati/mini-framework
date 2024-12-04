"use strict";
// src/components/router-link.ts
Object.defineProperty(exports, "__esModule", { value: true });
const createComponent_1 = require("../core/createComponent");
const router_1 = require("../core/router");
(0, createComponent_1.createComponent)('router-link', {
    render() {
        const href = this.getAttribute('href') || '#';
        const text = this.innerHTML || '';
        return `<a href="${href}">${text}</a>`;
    },
    events: {
        'click@a': function (event) {
            event.preventDefault();
            const href = this.getAttribute('href');
            router_1.router.navigate(href);
        },
    },
});
