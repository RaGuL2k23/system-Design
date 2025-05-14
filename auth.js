const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

const sessionMiddleware = session({
    secret: '<RANDOM GENERATED TOKEN>',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
});

const keycloakMiddleware = keycloak.middleware();

const protect = () => keycloak.protect();

module.exports = {
    sessionMiddleware,
    keycloakMiddleware,
    protect,
    keycloak,
};
