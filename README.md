# Product Inventory API
## Live API Link
- [Product Inventory API](http://api.aslah.online/api/products)

## YouTube Video Link
- [YouTube Walkthrough](https://youtu.be/JVRwSUECjbg)

## Objective

Develop a robust backend using Node.js and MongoDB, providing APIs for a Flutter app integration. Ensure secure and efficient data handling, cloud deployment, and CI/CD automation.

## Features

- Simple CRUD API for product inventory
- User authentication and authorization using JWT
- Data fetching and caching from an external API
- MongoDB integration for data storage
- Real-time notifications using WebSockets
- Comprehensive error handling and logging

## Technologies

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- Socket.IO for real-time features
- Redis for caching
- TypeScript 
- Winston for logging
  -ci/cd automation

## Setup

1. Clone the repository:
   ```bash
      git clone https://github.com/aslahc/Node-BACKEND.git
      npm install
      npm start
****

  # API Endpoints
- Products
- GET /api/products - Fetch all products
- GET /api/products/:id - Fetch a single product
- POST /api/products - Create a new product
- PUT /api/products/:id - Update a product
- DELETE /api/products/:id - Delete a product
- Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login an existing user
- Real-Time Notifications
- To use WebSockets for real-time notifications, ensure Socket.IO is set up on the client side.

# Caching
- This API utilizes Redis for caching responses from external APIs for improved performance.

# Logging
- Winston is used for comprehensive logging of errors and application activities.

# CI/CD Automation
- This project includes scripts for CI/CD automation. Ensure your deployment environment is properly configured.
