![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
[![Create with npx](https://img.shields.io/badge/create%20with-npx-brightgreen)](https://www.npmjs.com/package/create-nestjs-pg-app)


<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">
Production Ready Starter
</h1>

Painless production-ready starter for your next NestJS + PostgreSQL Application. 

# What can you find here

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
  * GitHub Actions 
  * Docker & Docker-Compose file for production builds
  * Husky, commitlint & lint-staged
  * ESLint
  * Auto-Versioning

* Testing :
  * Unit Tests 
  * Integration Tests

## Database

<a href="https://knexjs.org/">KnexJS</a> is used in this repository to be able to connect and interact with the database.
Although the application is set up with PostgreSQL, you can easily change this by updating the client that has been set to 'pg'.

This project has been set up with working migrations, to help you keep your database in control.
In order to generate a new migration :
```bash
pnpm run migrate:make the-name-of-your-migration
```

It will create a timestamped migration to transform your database.
When deploying, be sure to play these migrations in your CI to keep your database sync with the state of the project.


## Starting the project

In order to start the project, you'll need to first install dependencies.

```bash
pnpm i
```

Once this is done, you'll want to start your local Docker hosting the database, and you'll want to play migrations in the database :
```bash
# Starting the dockerfile with PostgreSQL, but also Prometheus and Grafana
pnpm run docker:local:install
```

```bash
# Playing migrations in the database
pnpm run migrate
```

You can now start the project as expected :
```bash
pnpm run start:dev
```

If you want to start the production build for debug purpose for example :
```bash
pnpm run build && pnpm run start:prod
```


## Running the tests

This project features two types of tests. 

### Unit tests 

Smaller granularity, test function individually, with some mocks along the way. They are identifiable by their filename : `*.unit.spec.ts`

In order to run them : 
```bash
pnpm run test:unit
```
You can also trigger coverage mode with
```bash
pnpm run test:unit:cov
```
And watch mode with :
```bash
pnpm run test:unit:watch
```

### Integration tests

These tests are a bit more advanced, as they are global. They ensure your API is always ensuring an HTTP Status Code
with a certain body, that it is always throwing exceptions when needed.
They actually run on a dedicated database because you want to ensure that everything works with almost no mocking. (You probably want to mock external API call if you need to make some)

In order to start the dedicated integration dockerfile (with only a PostgresSQL DB on it) :

To do so :
```bash
pnpm run docker:integration:start
```

You'll also need to play migration inside your container, so you'll need to run :
```bash
pnpm run migrate:integration
```

Please keep in mind that the integration DB is running on port 5498 to allow your local to run at the same time. 
If you're updating the port in the dockerfile to run on another one, please update the migrate:integration script with the proper port as well. 

Once your docker container is working, you can start the tests :
```bash
pnpm run test:integration
```

They also feature coverage and watch mode. 
