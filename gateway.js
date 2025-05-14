// gateway.js
const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { ROUTES } = require('./routes');

const app = express();

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

app.use(session({
secret: '<RANDOM GENERATED TOKEN>',
resave: false,
saveUninitialized: true,
store: memoryStore
}));

app.use(keycloak.middleware());

// Dynamically apply middlewares
ROUTES.forEach(route => {
const middlewares = [];
 
// Auth check
if (route.auth) {
    middlewares.push(keycloak.protect());
}

// Rate limiting
if (route.rateLimit) {
    const limiter = rateLimit({
        windowMs: route.rateLimit.windowMs,
        max: route.rateLimit.max,
        message: 'Too many requests. Please try again later.'
    });
    middlewares.push(limiter);
}

// Proxy
if (route.proxy) {
    const proxy = createProxyMiddleware(route.proxy);
    middlewares.push(proxy);
}

// Register route with all applied middlewares
app.use(route.url, ...middlewares);
 
});

app.listen(3000, () => {
console.log('API Gateway running at [http://localhost:3000](http://localhost:3000)');
});  
// this works cool     but would be nice if we kept them in sep file
