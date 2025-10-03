# Assignment 1 - Simple Authentication & Item Management API

## Problem Statement
You are required to build a simple REST API service that supports user authentication and basic item management. This assignment will test your ability to implement authentication, authorization, and CRUD operations using Express.js.

### Requirements

1. Authentication
- Signup (POST /auth/signup)  
Accepts email and password.  
Prevent duplicate email registration.  

- Signin (POST /auth/signin)  
Accepts email and password.  
Returns a signed JWT token if credentials are valid.

2. Item Management
- Create Item (POST /items)  
Requires a valid JWT token.
Items must be linked to the authenticated user.

- Get All Items (GET /items)  
Publicly accessible, returns all items.

- Update Item (PUT /items/:id)  
Requires authentication.  
Only the owner of the item can update it.

- Delete Item (DELETE /items/:id)  
Requires authentication.  
Only the owner of the item can delete it.

### Details
- Use JWT for authentication.
- Use an in-memory database (e.g., simple JavaScript object/array) for storing users and items.
(No need for a real database in this assignment.)
- Implement middleware for verifying JWT tokens.
- Ensure ownership validation for updating and deleting items.