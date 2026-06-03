# Ecommerce Fullstack Automation Portfolio

A portfolio project showcasing a **B2B ecommerce platform** with a full-stack implementation and a multi-layer test automation suite. The application provides product catalog management through a REST API, a React admin UI, and PostgreSQL persistence, all runnable locally or via Docker Compose.

## Features

- **Product CRUD API** — Spring Boot REST endpoints with validation, JPA persistence, and structured error handling
- **Admin UI** — React SPA to list, create, edit, and delete products
- **PostgreSQL** — Relational storage with seed data for local development
- **Docker Compose** — One-command stack: database, backend, and nginx-served frontend
- **Test automation** — API tests (Vitest), E2E tests (Playwright), and contract checks (Newman/Postman)

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Backend | Java 17, Spring Boot 3.5, Spring Data JPA, Spring Security |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, Axios |
| Database | PostgreSQL 15 |
| Infrastructure | Docker, Docker Compose, nginx |
| Testing | Vitest, Playwright, Newman (Postman) |

## Project Structure

```
.
├── LICENSE
├── README.md
└── b2b-ecommerce-platform/
    ├── backend/          # Spring Boot API
    ├── frontend/         # React + Vite UI
    ├── docker/           # DB init scripts
    ├── tests/
    │   ├── api/          # Vitest API integration tests
    │   ├── playwright/   # E2E browser tests
    │   └── postman/      # Newman collection runner
    ├── docker-compose.yml
    ├── Makefile
    └── .env.example
```

## Prerequisites

- **Docker & Docker Compose** (recommended for full stack)
- **Java 17** and **Maven** (local backend development)
- **Node.js 20+** and **npm** (frontend and test suites)

## Quick Start (Docker)

1. Clone the repository and enter the platform directory:

   ```bash
   git clone git@github.com:MarcoDeJesus/ecommerce-fullstack-automation-portfolio.git
   cd ecommerce-fullstack-automation-portfolio/b2b-ecommerce-platform
   ```

2. Configure environment variables:

   ```bash
   cp .env.example .env
   # Edit .env and set DB_PASSWORD
   ```

3. Start all services:

   ```bash
   make up
   # or: docker compose up -d --build
   ```

4. Open the application:

   | Service | URL |
   |---------|-----|
   | Frontend | http://localhost:3000 |
   | Backend API | http://localhost:8080 |
   | Health check | http://localhost:8080/api/health |

5. Stop the stack:

   ```bash
   make down
   ```

## Local Development

Install dependencies for backend, frontend, and test packages:

```bash
cd b2b-ecommerce-platform
make install
```

Start PostgreSQL in Docker, then run the backend and frontend in parallel:

```bash
make dev
```

- Frontend dev server: http://localhost:5173 (proxies `/api` to the backend)
- Backend API: http://localhost:8080

Ensure `DB_PASSWORD` (and other DB variables if needed) are set in `.env` or your shell when running the backend outside Docker.

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Application health (`status: UP`) |
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products/{id}` | Get product by ID |
| `POST` | `/api/products` | Create a product |
| `PUT` | `/api/products/{id}` | Update a product |
| `DELETE` | `/api/products/{id}` | Delete a product |

Example product payload:

```json
{
  "name": "Industrial Widget",
  "price": 49.99,
  "description": "Heavy-duty widget for B2B orders",
  "stock": 500
}
```

Spring Actuator endpoints (`/actuator/health`, `/actuator/info`) are also exposed for observability.

## Running Tests

From `b2b-ecommerce-platform`, with the backend running on port 8080:

```bash
make test          # Run all test suites
make test-api      # Vitest API tests
make test-e2e      # Playwright E2E tests
make test-postman  # Newman Postman collection
```

## Makefile Commands

| Command | Description |
|---------|-------------|
| `make install` | Install Maven and npm dependencies |
| `make dev` | Start Postgres + backend + frontend locally |
| `make up` | Build and start full Docker stack |
| `make down` | Stop Docker stack |
| `make logs` | Follow container logs |
| `make test` | Run API, Postman, and E2E tests |

## Roadmap

Planned enhancements (see inline TODOs in the codebase):

- B2B authentication (JWT, roles, multi-tenant)
- Company and order management APIs
- Expanded Postman collection and E2E coverage

## License

This project is licensed under the [MIT License](LICENSE).

Copyright (c) 2026 MarcoDeJesus
