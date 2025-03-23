# Task Manager API

A RESTful API for a task manager where users can create, update, delete, and retrieve tasks.

## Features

- User Authentication (Sign up & Login)
- Create Tasks (Add a new task with title, description, status)
- View Tasks (Get a list of all tasks or a single task)
- Update Tasks (Change task details)
- Delete Tasks (Remove a task)
- API Documentation with Swagger

## Tech Stack

- Backend: Node.js with Express.js
- Database: SQLite
- Authentication: JWT (JSON Web Tokens)
- API Documentation: Swagger UI

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm (v6 or above)

### Installation

1. Clone this repository
```bash
git clone <repository-url>
cd task-manager-api
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory and add:
```
PORT=3000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the development server
```bash
npm run dev
```

The server will start at `http://localhost:3000`

## API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/me` - Get current user details

### Task Routes
- `GET /api/tasks` - Get all tasks for current user
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Testing

You can use Postman or any API client to test the endpoints. Make sure to include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
``` 