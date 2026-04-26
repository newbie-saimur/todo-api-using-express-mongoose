# Todo API

A simple and efficient RESTful API for managing todo tasks, built with Express.js and MongoDB using Mongoose.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Data Model](#data-model)
- [Project Structure](#project-structure)
- [API Testing](#api-testing)
- [Development](#development)
- [Error Handling](#error-handling)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Features

- ✅ Create, read, update, and delete todos
- ✅ Bulk insert multiple todos at once
- ✅ Todo status tracking (Pending, In Progress, Complete)
- ✅ MongoDB integration with Mongoose ODM
- ✅ Proper error handling
- ✅ JSON request/response format
- ✅ Code linting with ESLint
- ✅ Code formatting with Prettier

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** (v5.2.1) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v9.5.0) - MongoDB Object modeling
- **Nodemon** - Development server auto-reload
- **ESLint** - Code linting
- **Prettier** - Code formatter

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or remote connection)
- npm (comes with Node.js)

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/newbie-saimur/todo-api-using-express-mongoose.git
cd todo-api-using-express-mongoose
```

2. **Install dependencies:**

```bash
npm install
```

This will install all required packages:

- Express.js
- Mongoose
- Nodemon (dev dependency)
- ESLint and Prettier (dev dependencies)

## Getting Started

### 1. Ensure MongoDB is Running

Make sure your MongoDB server is running on `localhost:27017` (default port).

### 2. Start the Development Server

```bash
npm start
```

The server will start on **http://localhost:3000**

You should see:

```
Listening on port 3000
MongoDB Connection Successful!
```

## API Endpoints

All endpoints are prefixed with `/todo`

### Get All Todos

```
GET /todo
```

Returns all todos (limited to 5).

**Response:**

```json
{
    "message": "Success",
    "todos": [
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

### Get Todo by ID

```
GET /todo/:id
```

Returns a specific todo by ID.

**Parameters:**

- `id` (string) - Todo MongoDB ID

**Response:**

```json
{
    "message": "Success",
    "todo": [
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

### Create a Single Todo

```
POST /todo
```

Creates a new todo.

**Request Body:**

```json
{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "Pending"
}
```

**Response:**

```json
{
    "message": "Todo was inserted successfully!",
    "todo": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "status": "Pending",
        "date": "2024-01-15T10:30:00.000Z"
    }
}
```

### Create Multiple Todos (Bulk Insert)

```
POST /todo/bulk
```

Creates multiple todos in one request.

**Request Body:**

```json
[
    {
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "status": "Pending"
    },
    {
        "title": "Complete project",
        "description": "Finish API endpoints",
        "status": "In Progress"
    }
]
```

**Response:**

```json
{
    "message": "Todos were inserted successfully!",
    "todos": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "title": "Buy groceries",
            "description": "Milk, eggs, bread",
            "status": "Pending",
            "date": "2024-01-15T10:30:00.000Z"
        },
        {
            "_id": "507f1f77bcf86cd799439012",
            "title": "Complete project",
            "description": "Finish API endpoints",
            "status": "In Progress",
            "date": "2024-01-15T10:31:00.000Z"
        }
    ]
}
```

### Update a Todo

```
PUT /todo/:id
```

Updates an existing todo by ID.

**Parameters:**

- `id` (string) - Todo MongoDB ID

**Request Body:**

```json
{
    "title": "Buy groceries",
    "status": "In Progress"
}
```

**Response:**

```json
{
    "message": "Todo was updated successfully!",
    "todo": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "status": "In Progress",
        "date": "2024-01-15T10:30:00.000Z"
    }
}
```

### Delete a Todo

```
DELETE /todo/:id
```

Deletes a todo by ID.

**Parameters:**

- `id` (string) - Todo MongoDB ID

**Response:**

```json
{
    "message": "Todo was deleted successfully!",
    "todo": {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "status": "Pending",
        "date": "2024-01-15T10:30:00.000Z"
    }
}
```

## Data Model

### Todo Schema

The Todo model has the following fields:

| Field         | Type   | Required | Default      | Description                               |
| ------------- | ------ | -------- | ------------ | ----------------------------------------- |
| `title`       | String | ✅ Yes   | -            | Title of the todo                         |
| `description` | String | ❌ No    | -            | Detailed description                      |
| `status`      | String | ❌ No    | "Pending"    | Status: Pending, In Progress, or Complete |
| `date`        | Date   | ❌ No    | Current date | Creation timestamp                        |

**Example:**

```javascript
{
  "title": "Learn MongoDB",
  "description": "Complete MongoDB basics and advanced queries",
  "status": "In Progress",
  "date": "2024-01-15T10:30:00.000Z"
}
```

## Project Structure

```
todo-api-using-express-mongoose/
├── index.js                 # Main application entry point
├── package.json             # Project dependencies and scripts
├── README.md                # Project documentation
├── routeHandler/
│   └── todoHandler.js       # Todo API route handlers
└── schemas/
    └── todoSchema.js        # Mongoose schema definition
```

### File Descriptions

- **index.js** - Express app setup, MongoDB connection, and server startup
- **routeHandler/todoHandler.js** - All CRUD operation route handlers
- **schemas/todoSchema.js** - MongoDB schema definition with validation

## Development

### Code Quality

This project uses ESLint and Prettier for code quality and formatting:

- **ESLint** - Identifies and reports code quality issues
- **Prettier** - Auto-formats code for consistency

### Running ESLint

```bash
npm run lint
```

### Formatting Code with Prettier

```bash
npm run format
```

## API Testing

You can test the API using popular tools:

### Using Postman

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Create a new collection for this API
3. Add requests for each endpoint:
    - **GET** `http://localhost:3000/todo` - Get all todos
    - **GET** `http://localhost:3000/todo/:id` - Get todo by ID
    - **POST** `http://localhost:3000/todo` - Create todo
    - **POST** `http://localhost:3000/todo/bulk` - Bulk insert
    - **PUT** `http://localhost:3000/todo/:id` - Update todo
    - **DELETE** `http://localhost:3000/todo/:id` - Delete todo

### Using cURL

```bash
# Get all todos
curl http://localhost:3000/todo

# Create a todo
curl -X POST http://localhost:3000/todo \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Node.js","description":"Master Node.js basics","status":"Pending"}'

# Update a todo
curl -X PUT http://localhost:3000/todo/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"status":"In Progress"}'

# Delete a todo
curl -X DELETE http://localhost:3000/todo/507f1f77bcf86cd799439011
```

### Using Thunder Client (VS Code Extension)

1. Install [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) extension
2. Open Thunder Client in VS Code
3. Create requests following the same endpoint structure as above

## Environment Variables

The application currently uses hardcoded MongoDB connection. To configure custom settings, you can modify `index.js`:

- **Database URL**: `mongodb://localhost/todos`
- **Server Port**: `3000`

## Error Handling

The API includes error handling for:

- Database connection failures
- Validation errors
- Server errors (500)
- Invalid requests

All errors return appropriate HTTP status codes and error messages in JSON format.

## Future Improvements

- [ ] Add user authentication and authorization
- [ ] Implement input validation middleware
- [ ] Add pagination to GET all todos endpoint
- [ ] Add filtering and sorting options
- [ ] Add API documentation with Swagger/OpenAPI
- [ ] Add unit tests with Jest
- [ ] Environment variable configuration (.env)
- [ ] Add request logging with Morgan
- [ ] Add CORS support
- [ ] Deploy to cloud platform (Heroku, AWS, etc.)

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongooseError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:** Ensure MongoDB is running. Start MongoDB with:

```bash
mongod
```

### Port Already in Use

**Error:** `listen EADDRINUSE: address already in use :::3000`

**Solution:** Change the port in `index.js` or kill the process using port 3000.

### Missing Dependencies

**Error:** `Cannot find module 'express'`

**Solution:** Run `npm install` to install all dependencies.

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository** on GitHub
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes** and test them thoroughly
4. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
5. **Push to the branch** (`git push origin feature/AmazingFeature`)
6. **Open a Pull Request** with a clear description of your changes

### Code Style

- Follow the ESLint configuration in this project
- Format code with Prettier before committing
- Write clear commit messages
- Add comments for complex logic

## License

This project is open source and available under the MIT License.

## Author

**Saimur Rahman Robin** ([@newbie-saimur](https://github.com/newbie-saimur))

---

**Happy coding! 🚀**
