# Classyfieds

## Prerequisites (used in dev)
- Node v14.17.6 (LTS should work also)
- MongoDB Community Edition 5.0

## Getting Started
- Create .env file at `server/` root based on `.env.example`. Enter the following environment variable values:
  - MONGO_URI: Connection string for MongoDB
  - TOKEN_SECRET: Secret for web token creation

### Running the server
1. Install and execute the API in `server/` directory. It will be available at `http://localhost:5000`.
```
$ npm install
$ npm run dev       # runs nodemon in development to watch changes
$ npm run start     # production run command
```
2. Use `/register` endpoint (POST) to register a new user with `email` and `password` in JSON request body.
3. The user record will have a `token` created within their user record that can be used in subsequent requests.
4. See `http://localhost:5000/api-docs` for Swagger UI based on configuration in server.js and JSDoc entries in `routes/listings.js`.

### Running the client
1. Install and execute the ReactJS-based app in `client/` directory. It will be available at `http://localhost:3000`.
```
$ npm install
$ npm start
```
1. Log in as an existing user, or (TODO: Register page) register a new user. This will generate a JWT token for use in requests from the UI.
2. Access `http://localhost:3000/listings`. (TODO: New listing functionality).

### Components Used

#### Server
- `express`, `express-session`: Express request server
  - `body-parser`, `cookie-parser`, `cors`: Express middleware
  - `bcryptjs`, `jsonwebtoken`: Password encryption & JWT functionality
- `mongoose`: Schema enforcement & validation for MongoDB
- `swagger-ui-express`, `swagger-jsdoc`: Swagger API UI, and JSDoc-based configuration of API paths for listings endpoints
  - `yamljs`: Potential conversion of Swagger YAML spec to JSON format
- `dotenv`: .env file for environment variable/secret storage
- `nodemon`: Watcher for file changes during development

#### Client
- `create-react-app`: Easy standup of boilerplate ReactJS application
- `react-router`: Page & request routing for ReactJS frontend
- `react-hook-form`: Powerful form state & handling
- `axios`: Request/response handler
- `@mui/material`, `@emotion`: Material UI & emotion styling system
