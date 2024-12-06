// src/core/router.ts
class Router {
    constructor(outletSelector) {
        this.routes = [];
        this.params = {};
        this.initialized = false;
        this.outletSelector = outletSelector;
        window.addEventListener('popstate', () => this.handleRoute());
    }
    addRoute(path, componentName) {
        const paramNames = [];
        const regexPath = path.replace(/:([^/]+)/g, (_, key) => {
            paramNames.push(key);
            return '([^/]+)';
        });
        const route = {
            path: regexPath,
            componentName,
            paramNames,
        };
        // Vérifier si la route existe déjà
        const existingRoute = this.routes.find((r) => r.path === route.path);
        if (!existingRoute) {
            this.routes.push(route);
        }
        // Gérer la route initiale si ce n'est pas déjà fait
        if (!this.initialized) {
            this.handleRoute();
            this.initialized = true;
        }
    }
    navigate(path) {
        history.pushState(null, '', path);
        this.handleRoute();
    }
    handleRoute() {
        const currentPath = window.location.pathname;
        const outlet = document.querySelector(this.outletSelector);
        for (const route of this.routes) {
            const regex = new RegExp(`^${route.path}$`);
            const match = currentPath.match(regex);
            if (match) {
                this.params = {};
                if (route.paramNames) {
                    route.paramNames.forEach((name, index) => {
                        this.params[name] = match[index + 1];
                    });
                }
                if (outlet) {
                    outlet.innerHTML = `<${route.componentName}></${route.componentName}>`;
                }
                return;
            }
        }
        // Si aucune route ne correspond
        if (outlet) {
            outlet.innerHTML = `<not-found></not-found>`;
        }
    }
    getParams() {
        return this.params;
    }
}
// Instance unique du routeur pour toute l'application
export const router = new Router('main');
