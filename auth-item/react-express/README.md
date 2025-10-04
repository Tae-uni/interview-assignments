# Assignment 2 - Simple Frontend + API Integration

## Problem Statement
You are required to build a simple frontend that connects to the authentication & item management API from **Assignment 1**.  
This assignment will test your ability to implement basic UI forms, API requests, and client-side authentication handling.

### Requirements
- Build with **React**.
- Implement the following pages:
  - **Signup Page**: form to register new users.
  - **Signin Page**: form to login, receive and store JWT token.
  - **Item List Page**: display all items (public).
  - **Create Item Page**: form to create an item (JWT required).
  - **Update/Delete**: only allow operations on items owned by the logged-in user.
- Use **fetch/axios** to call backend API.
- Store JWT securely (e.g., in memory or localStorage for simplicity).
- Show proper error messages (invalid login, unauthorized actions, etc.).

### Details
- Minimal styling is fine, focus on functionality.
- Reuse the API server from **Assignment 1**.
- No need for production-ready design, just a functional UI.