# Todo API with User Authentication

A robust RESTful API for managing todo tasks with JWT-based authentication, built with Express.js and MongoDB using Mongoose.

## Quick Start

```bash
npm install
# Create .env file with: JWT_SECRET=your_secret_key
npm start
# Server runs on http://localhost:3000
```

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Authentication Flow](#authentication-flow)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Features

- ✅ **User Authentication** - Signup and login with JWT tokens
- ✅ **Secure Passwords** - Bcrypt hashing (10 salt rounds)
- ✅ **Protected Routes** - JWT middleware for all todo endpoints
- ✅ **Full CRUD** - Create, read, update, delete todos
- ✅ **Bulk Insert** - Add multiple todos with automatic userId assignment
- ✅ **Status Filtering** - Get todos by status (Pending, In Progress, Complete)
- ✅ **User-Isolated Data** - Each user sees only their own todos
- ✅ **Clean Responses** - Auto-filtered responses (excludes \_\_v, userId)
- ✅ **Token Expiration** - JWT tokens expire in 10 hours
- ✅ **Error Handling** - Proper HTTP status codes and error messages
- ✅ **Code Quality** - ESLint and Prettier configured

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** (v5.2.1) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v9.5.0) - MongoDB ODM
- **JWT** (jsonwebtoken v9.0.3) - Token-based authentication
- **Bcrypt** (v6.0.0) - Password hashing
- **Dotenv** (v17.4.2) - Environment variables
- **Nodemon** - Development auto-reload
- **ESLint & Prettier** - Code quality tools

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or remote connection)
- npm (comes with Node.js)

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create `.env` File

```env
JWT_SECRET=your_super_secret_key_change_in_production
```

⚠️ Use a strong random key in production!

### 3. Start MongoDB

```bash
mongod
```

Ensure MongoDB is running on `localhost:27017` with database `todos`.

### 4. Run the Server

```bash
npm start
```

Expected output:

```
Listening on port 3000
MongoDB Connection Successful!
```

## Project Structure

```
todo-api-using-express-mongoose/
├── index.js                  # Express server & MongoDB setup
├── package.json              # Dependencies
├── .env                      # Environment variables
├── README.md                 # Documentation
├── middlewares/
│   └── checkLogin.js         # JWT verification middleware
├── routeHandler/
│   ├── todoHandler.js        # Todo CRUD routes (GET, POST, PUT, DELETE)
│   └── userHandler.js        # Auth routes (signup, login)
└── schemas/
    ├── todoSchema.js         # Todo model with status filter methods
    └── userSchema.js         # User model
```

### Key Files

- **index.js** - Entry point, Express setup, MongoDB connection on port 3000
- **checkLogin.js** - Extracts JWT token, verifies signature, attaches user data to `req`
- **todoHandler.js** - All todo endpoints (6 GET routes, 3 POST routes, 1 PUT, 1 DELETE)
- **userHandler.js** - Signup/login with password hashing and JWT generation
- **todoSchema.js** - Status filtering methods (findCompleted, findPending, findInProgress)
- **userSchema.js** - Bcrypt integration for passwords

## Authentication Flow

1. **Signup** → Password hashed with bcrypt → User saved to MongoDB
2. **Login** → Credentials verified → JWT token generated and returned
3. **Protected Routes** → Token sent in `Authorization: Bearer <token>` header
4. **Middleware** → Token verified → User data extracted and attached to `req`
5. **Operations** → Todos filtered/created with userId from JWT

### JWT Token Details

- **Expires**: 10 hours
- **Payload**: `{ id, name, username }`
- **Secret**: From `.env` file
- **Usage**: `Authorization: Bearer <token>`

## API Endpoints

### User Authentication

#### POST `/user/signup`

Create a new user account.

**Request:**

```json
{
    "name": "John Doe",
    "username": "johndoe",
    "password": "secure123",
    "status": "active"
}
```

**Response:** `201 Created`

```json
{
    "message": "User was created successfully!"
}
```

#### POST `/user/login`

Authenticate and get JWT token.

**Request:**

```json
{
    "username": "johndoe",
    "password": "secure123"
}
```

**Response:** `200 OK`

```json
{
    "message": "Login Successful!",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Todo Endpoints

All require: `Authorization: Bearer <token>` header

#### GET `/todo`

Get all todos (max 5, filtered by userId).

**Response:**

```json
{
    "message": "Success",
    "data": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "title": "Buy groceries",
            "description": "Milk, eggs, bread",
            "status": "Pending",
            "date": "2024-01-15T10:30:00.000Z"
        }
    ]
}
```

#### GET `/todo/:id`

Get a specific todo by ID.

**Response:**

```json
{
    "message": "Success",
    "data": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "title": "Buy groceries",
            "status": "Pending",
            "date": "2024-01-15T10:30:00.000Z"
        }
    ]
}
```

#### POST `/todo`

Create a single todo (userId auto-set from JWT).

**Request:**

```json
{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "Pending"
}
```

**Response:** `201 Created`

```json
{
    "message": "Todo was inserted successfully!",
    "data": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "status": "Pending",
        "date": "2024-01-15T10:30:00.000Z"
    }
}
```

**Note:** Response excludes `__v` and `userId` for cleanliness.

#### POST `/todo/bulk`

Create multiple todos in one request (userId auto-set for each).

**Request:**

```json
[
    {
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "status": "Pending"
    },
    {
        "title": "Complete project",
        "status": "In Progress"
    }
]
```

**Response:** `201 Created`

```json
{
    "message": "Todos were inserted successfully!",
    "data": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "title": "Buy groceries",
            "status": "Pending",
            "date": "2024-01-15T10:30:00.000Z"
        },
        {
            "_id": "507f1f77bcf86cd799439012",
            "title": "Complete project",
            "status": "In Progress",
            "date": "2024-01-15T10:31:00.000Z"
        }
    ]
}
```

**Note:** Original `req.body` stays unchanged. Each todo gets userId from JWT.

#### PUT `/todo/:id`

Update a todo.

**Request:**

```json
{
    "status": "In Progress",
    "description": "Updated description"
}
```

**Response:**

```json
{
    "message": "Todo was updated successfully!",
    "data": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Buy groceries",
        "status": "In Progress",
        "date": "2024-01-15T10:30:00.000Z"
    }
}
```

#### DELETE `/todo/:id`

Delete a todo.

**Response:**

```json
{
    "message": "Todo was deleted successfully!",
    "data": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Buy groceries",
        "status": "Pending",
        "date": "2024-01-15T10:30:00.000Z"
    }
}
```

### Status Filtering Endpoints

#### GET `/todo/completed`

Get todos with status "Complete".

**Response:**

```json
{
    "message": "Success",
    "data": [
        /* filtered todos */
    ]
}
```

#### GET `/todo/pending`

Get todos with status "Pending".

#### GET `/todo/in-progress`

Get todos with status "In Progress".

## Data Models

### Todo Schema

```javascript
{
  title: String (required),
  description: String (optional),
  status: String (enum: ["Pending", "In Progress", "Complete"], default: "Pending"),
  date: Date (default: current timestamp),
  userId: String (required - auto-set from JWT)
}
```

**Instance Methods:**

- `findCompleted()` - Find todos with status "Complete"
- `findPending()` - Find todos with status "Pending"
- `findInProgress()` - Find todos with status "In Progress"

### User Schema

```javascript
{
  name: String (required),
  username: String (required),
  password: String (required, hashed with bcrypt),
  status: String (enum: ["active", "inactive"], optional)
}
```

**Security:**

- Passwords automatically hashed before saving using bcrypt (10 salt rounds)
- Original password never stored in database

## Testing

### Using Postman

1. Create a new request collection
2. **Login First**: POST to `/user/login` and copy the `access_token`
3. **Set Authorization Header**: For todo endpoints, add header:
    ```
    Authorization: Bearer <paste_token_here>
    ```

### Using cURL

```bash
# 1. Signup
curl -X POST http://localhost:3000/user/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","username":"john123","password":"pass123","status":"active"}'

# 2. Login
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john123","password":"pass123"}'
# Copy the access_token from response

# 3. Get todos
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:3000/todo

# 4. Create todo
curl -X POST http://localhost:3000/todo \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Mongoose","status":"Pending"}'
```

### Using REST Client (VS Code)

Install [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension and create `test.rest`:

```rest
@host = http://localhost:3000
@token =

### Signup
POST {{host}}/user/signup
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "password": "password123"
}

### Login
POST {{host}}/user/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}

### Get All Todos
GET {{host}}/todo
Authorization: Bearer {{token}}

### Create Todo
POST {{host}}/todo
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "title": "Learn MongoDB",
  "status": "Pending"
}

### Get Completed Todos
GET {{host}}/todo/completed
Authorization: Bearer {{token}}
```

## Troubleshooting

### MongoDB Connection Failed

```
Error: MongooseError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Ensure MongoDB is running with `mongod`

### Port 3000 Already in Use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:** Kill the process using port 3000 or change port in `index.js`

### Missing Dependencies

```
Error: Cannot find module 'express'
```

**Solution:** Run `npm install`

### JWT Token Errors

- **"token undefined"** - Missing Authorization header
- **"invalid token"** - Token tampered or expired
- **Solution:** Login again to get fresh token

### .env File Not Loading

**Error:** `process.env.JWT_SECRET is undefined`
**Solution:**

- Ensure `.env` file exists in root directory
- Format: `KEY=VALUE` (no quotes needed)
- Check `require('dotenv').config()` in index.js

---

## Implementation Notes

### Key Features Implemented

1. **JWT Middleware** (`checkLogin.js`)
    - Extracts token from Authorization header
    - Verifies token signature
    - Attaches decoded user data to `req`

2. **Password Security**
    - Bcrypt hashing with 10 salt rounds
    - Never stores plain text passwords

3. **Response Filtering**
    - Destructuring to exclude `__v` and `userId`
    - Keeps API responses clean

4. **Bulk Operations**
    - Maps userId to each todo
    - Preserves original `req.body` unchanged

5. **User Isolation**
    - Todos filtered by userId in queries
    - Each user sees only their own todos

### Future Enhancements

- [ ] Input validation (Joi/Yup)
- [ ] Request logging (Morgan)
- [ ] API documentation (Swagger)
- [ ] Unit tests (Jest)
- [ ] CORS support
- [ ] Rate limiting
- [ ] Refresh token rotation
- [ ] Role-based access control

---

**Happy Coding! 🚀**
