# Exercise 1 #

For this exercise you will create a REST API that provides data to support a classifieds application.

As you progress through the steps, feel free to add comments to the code about *why* you choose to do things a certain way. Add comments if you felt like there's a better, but more time intensive way to implement specific functionality. It's OK to be more verbose in your comments than typical, to give us a better idea of your thoughts when writing the code.

### What you need ###

* IDE of your choice
* Git
* Some chosen backend language / framework
* Some chosen local data store

## Instructions ##

### Phase 1 - Setup ###

 1. Clone this repository to your local machine
 1. Create the basic structure needed for your API with your chosen framework
 1. Add a README.md in this exercise folder with the basic requirements and steps to run the project locally

### Phase 2 - Main Implementation ###

Implement a RESTful API to support a classifieds application that satisfies the following requirements:

 * Ability to create (essentially 'register') a User object using POST call. User must have email/password.
 * Ability to 'login' using email/password combo in POST call. Should return some kind of authorization token to be re-used on subsequent calls.
 * Ability to perform all CRUD operations for a Listing object. The Listing object represents a 'for sale' classified ad. Include minimum of Title, Description, Price fields.
 	* A valid authorization token must be provided for all Listing operations
 	* A User can create many Listings
 	* Only the User who created a Listing can update or delete a Listing
 	* An authenticated User can retrieve all Listings

### Phase 3 - Stretch Goals ###

Please implement any of the following stretch goals. They are in no particular order.

 * Allow paging and/or filtering of Listings
 * Add some type of self-documenting UI such as Swagger
 * Create Unit Tests (note and include in the commit with your tests any bugs/improvements you make due to Unit Test development)

### Phase 4 - SUPER STRETCH GOAL - Add Region based listings ###

We want to alter our very general classifieds API to limit Listings to Users based on an associated Region. Please make changes to satisfy the following requirements:

 * Each User is associated with a single Region. A Region has many Users.
 * When a User requests all Listings, they only receive Listings created by Users in the same Region as themselves.

## Final State Report ##
- Backend based on NodeJS, Express, MongoDB
- Frontend based on ReactJS, create-react-app, MaterialUI. Ability to log in via localhost:3000/login URI
- User can be registered with email & password with POST/JSON request body (returns JWT token with 2 hour expiry)
- User can be logged in with same email and password with POST/JSON request body (returns same token as above)
- Swagger JSON spec + JSDoc-based definition of paths in routes/listings.js
- User can view list of listings and listing detail when client is running at localhost:3000.
- TODO: I did not get to verify and authorize the incoming web token on the update and delete endpoints as asked for in the challenge as I decided on authentication type a bit late in the game. I would accomplish this via JWT by: 
  1. Ingestion of the token via express endpoint
	1. Usage of the jwt package to unpack the user id (MongoDB _id and email are encased in JWT payload)
	1. Verify a new `createdBy` user ID field per classified listing against the currently authorized user
	1. If matched, 200 OK else 401 Unauthorized.

## Questions ##

 1. How can your implementation be optimized?

  * Caching either results in Node (behind a load balancer/caching system such as ELB/CloudFront)
	* Better understanding of MongoDB clustering in their Atlas implementation
	* Using a graph query system such as DynamoDB with GraphQL instead of MongoDB would help with large amounts of classified data entries. MongoDB is historically less performant than other NoSQL DB solutions.
	* Security for authorization
 
 1. How much time did you spend on your implementation?
  * 3 days total
		* Day 1: Addition of Swagger and login/register endpoints, creation of auth middleware for express calls.

		* Day 2: Creation of frontend UI with MaterialUI, axios/fetch calls, proper injection of authentication header

		* Day 3: Documentation of client/server, exercise in general
 1. What was most challenging for you?
  * Utilizing JWT on both frontend and backend was a new challenge, where previously I have depended on a framework like NestJS. Given time, I'd have chosen a proper framework that handles major components of a system such as classyfieds.
	* OpenAPI 3.0 changed _just_ enough from 2.x to make per route authorization difficult to understand utilizing apiKey or bearer token behavior. Given time, I would have utilized OAuth2 with a third-party security provider such as Google or GitHub.

## Next Steps ##

* Confirm you've addressed the functional goals
* Answer the questions above by adding them to this file
* Make sure your README.md is up to date with setup and run instructions
* Ensure you've followed the sharing instructions in the main [README](../README.md)
