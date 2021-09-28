# Classyfieds

## Prerequisites (used in dev)
- Node v14.17.6 (LTS should work also)
- MongoDB Community Edition 5.0

## Getting Started
- Create .env file at root based on `.env.example`. Enter the following environment variable values:
  - MONGO_URI: Connection string for MongoDB
  - TOKEN_SECRET: Secret for web token creation

### Running the server
1. Install and execute the API in `server/` directory. It will be available at `http://localhost:5000`.
```
$ npm install
$ npm run dev       # runs nodemon in development to watch changes
$ npm run start     # production run command
```
2. Use `/register` endpoint to register a new user with `email` and `password` in JSON request body.
3. The user record will have a `token` created within their user record that can be used in subsequent requests.
4. See `http://localhost:5000/api-docs` for Swagger UI based on configuration in server.js and JSDoc entries in `routes/listings.js`.

### Running the client