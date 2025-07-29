# Workout Template and Workout Management Backend

A backend application for managing workout templates and workouts built with **NestJS** and **TypeScript**, using PostgreSQL as database and popular libraries like TypeORM, Zod, and JWT for validation and authentication.

## Features

* 🏋️‍♂️ Create, update, and delete workout templates with exercises and sets
* 🏃‍♂️ Create, update, and delete workouts based on templates
* 🔐 JWT-based authentication and authorization
* 🗃️ Database management with PostgreSQL and TypeORM
* ✅ Input validation using Zod schemas
* 📄 API documentation with Swagger (OpenAPI)

## Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn
* PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jokswer/workout.git
cd workout
```

2. Install dependencies:

```bash
npm install
```

3. Configure your environment variables (e.g., `.env` file) with your database connection and JWT secret.

4. Start the server:

```bash
npm run start:dev
```

By default, the server runs on [http://localhost:3000](http://localhost:3000)

### Running with Docker (optional)

You can run the project using Docker by creating a Dockerfile and docker-compose configuration (not included in this repo).

## Technologies Used

* [NestJS](https://nestjs.com/) — Framework for building scalable Node.js server-side applications
* [TypeORM](https://typeorm.io/) — ORM for TypeScript and JavaScript (ES7+)
* [PostgreSQL](https://www.postgresql.org/) — Relational database
* [Zod](https://zod.dev/) — Schema validation
* [JWT](https://jwt.io/) — JSON Web Tokens for secure authentication
* [Swagger](https://swagger.io/) — API documentation

## API Documentation

Swagger UI is available at `/api` endpoint once the server is running, providing interactive documentation of all endpoints.
