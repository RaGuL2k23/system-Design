const express = require('express');
const { ROUTES } = require('./routes');
const { sessionMiddleware, keycloakMiddleware, protect } = require('./auth');
const { getRateLimiter } = require('./rateLimiter');
const { createProxy } = require('./proxy');
const { setupCreditCheck } = require('./creditcheck');

const app = express();

app.use(sessionMiddleware);
app.use(keycloakMiddleware);
// setupCreditCheck(app, ROUTES)

// Apply middlewares based on route config
ROUTES.forEach(route => {
    const middlewares = [];

    if (route.auth) {
        middlewares.push(protect());
    }

    if (route.rateLimit) {
        middlewares.push(getRateLimiter(route.rateLimit));
    }

    if (route.proxy) {
        middlewares.push(createProxy(route.proxy));
    }

    app.use(route.url, ...middlewares);
});

app.listen(3000, () => {
    console.log('API Gateway running at http://localhost:3000');
});
