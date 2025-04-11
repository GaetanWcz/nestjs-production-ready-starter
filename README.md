![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">
Production Ready Starter
</h1>

Painless production-ready starter for your next NestJS + Postgre Application. 

### What can you find here

* PostgreSQL Plug & Play :
  * Knex integration
  * Dockerfile for local PG DB
  * Dockerfile for integration tests with dedicated PG DB
  * Migration support

* API Documentation & Data Quality :
  * Swagger support
  * Data validation

* Logging & Monitoring :
  * Logger support (pino) with request-id tracing
  * Prometheus support
  * Health endpoints

* CI/CD :
  * Docker & Docker-Compose file for production builds
  * Husky, commitlint & lint-staged
  * ESLint
  * Auto-Versionning with Sementic releases

* Testing :
  * Unit Tests 
  * Integration Tests


## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

