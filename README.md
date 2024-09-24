
# Node.js API with SQLite, Sequelize, Cypress, and Docker

This is a Node.js-based API service using SQLite and Sequelize for database management, Cypress for testing, and Docker for easy deployment. The application includes user and book models, with JWT authentication for securing routes.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Docker Setup](#docker-setup)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

## Features

- Node.js Express API.
- SQLite as the relational database, using Sequelize ORM for database interactions.
- Cypress for integration and end-to-end testing.
- JWT-based authentication for securing routes.
- Docker for containerized deployment.
- Support for both users and books, with associations between them.

## Installation

To get the application up and running locally, follow these steps:

### Prerequisites

- **Node.js** (version 12.x or later)
- **npm** or **yarn**
- **Docker** (optional but recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### Step 2: Install Dependencies

Install the necessary packages for the Node.js API:

```bash
npm install
```

or

```bash
yarn install
```

## Database Setup

The app uses SQLite as the database, and Sequelize for interacting with it.

### Step 1: Run Migrations

You need to set up your database schema by running the following migration commands:

```bash
npm run db:migrate
```

### Step 2: Seed the Database (Optional)

To seed the database with initial data, run the following command:

```bash
npm run db:seed
```

## Running the Application

Once the dependencies are installed and the database is set up, you can start the development server.

```bash
npm start
```

By default, the application will be running on [http://localhost:3000](http://localhost:3000).

## Running Tests

The project uses Cypress for end-to-end testing. Make sure the application is running before you start the tests.

### Run Cypress Tests

To run the Cypress tests in the browser:

```bash
npx cypress open
```

To run the tests headlessly:

```bash
npx cypress run
```

Test reports are saved in the `cypress/reports/` folder.

## Docker Setup

To run the application in a Docker container:

### Step 1: Build the Docker Image

```bash
docker build -t node-api-service .
```

### Step 2: Run the Docker Container

```bash
docker run -p 3000:3000 node-api-service
```

This will start the application on [http://localhost:3000](http://localhost:3000) inside a Docker container.

## API Endpoints

The following API endpoints are available in the application:

### Users

- **POST** `/api/users` - Create a new user.
- **POST** `/api/login` - Authenticate a user and return a JWT.
  
### Books

- **GET** `/api/books` - Retrieve a list of books (secured, requires JWT).
- **POST** `/api/books` - Add a new book (secured, requires JWT).

### JWT Authentication

Secure routes (like `/api/books`) require a valid JWT token. You can obtain a token by logging in via `/api/login`. The token should be passed in the `Authorization` header as a Bearer token.

Example request:

```bash
curl -X GET http://localhost:3000/api/books -H "Authorization: Bearer <your-jwt-token>"
```

## Environment Variables

To configure the app, create a `.env` file in the root directory and define the following variables:

```bash
# Server
PORT=3000

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# SQLite Database
DATABASE_URL=./database.sqlite
```

Make sure to replace `your_jwt_secret_key` with your actual secret key for signing JWT tokens.
