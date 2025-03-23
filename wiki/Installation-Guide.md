# Installation Guide

This guide will help you set up and run the Task Manager API on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
* Node.js (v14 or higher)
* npm (v6 or higher)
* Git

## Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/gitarber/task-manager-api.git
   cd task-manager-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   * Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   * Edit `.env` and set your values:
     ```
     PORT=3000
     JWT_SECRET=your_secure_secret_key_here
     NODE_ENV=development
     ```

4. **Start the server**
   * For development (with auto-reload):
     ```bash
     npm run dev
     ```
   * For production:
     ```bash
     npm start
     ```

5. **Verify installation**
   * Open your browser and navigate to:
     * API Documentation: http://localhost:3000/api-docs
     * Base API: http://localhost:3000

## Database

The API uses SQLite as its database, which will be automatically created when you first run the application. The database file will be created as `task_manager.db` in the root directory.

## Common Issues

1. **Port already in use**
   * Error: `EADDRINUSE: address already in use :::3000`
   * Solution: Change the PORT in your `.env` file

2. **Database permissions**
   * Error: `SQLITE_CANTOPEN: unable to open database file`
   * Solution: Ensure the application has write permissions in the directory

## Next Steps

* Read the [API Documentation](API-Documentation) to learn about available endpoints
* Check out the [Authentication](Authentication) guide to understand how to secure your requests
* Visit the [Contributing Guidelines](Contributing-Guidelines) if you want to contribute to the project 