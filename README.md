# API Gateway for Microservice Architecture

This API Gateway serves as a single entry point for a microservice architecture, routing incoming requests to the appropriate backend services. It handles cross-cutting concerns such as authentication, rate limiting, and logging, allowing individual microservices to focus on their core business logic.

## Architecture

The gateway is built using Node.js and Express.js, leveraging middleware for various functionalities. It interacts with different microservices based on defined routes.
