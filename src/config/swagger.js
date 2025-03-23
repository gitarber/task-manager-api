const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'A simple RESTful API for managing tasks',
    contact: {
      name: 'API Support',
      email: 'support@taskmanagerapi.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'User ID',
          },
          username: {
            type: 'string',
            description: 'User name',
          },
          email: {
            type: 'string',
            description: 'User email',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
          },
        },
      },
      Task: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Task ID',
          },
          user_id: {
            type: 'integer',
            description: 'User ID',
          },
          title: {
            type: 'string',
            description: 'Task title',
          },
          description: {
            type: 'string',
            description: 'Task description',
          },
          status: {
            type: 'string',
            description: 'Task status',
            enum: ['pending', 'in-progress', 'completed'],
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Creation timestamp',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'Last update timestamp',
          },
        },
      },
    },
  },
  paths: {
    '/api/users/register': {
      post: {
        tags: ['Users'],
        summary: 'Register a new user',
        description: 'Create a new user account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['username', 'email', 'password'],
                properties: {
                  username: {
                    type: 'string',
                    description: 'User name',
                  },
                  email: {
                    type: 'string',
                    description: 'User email',
                  },
                  password: {
                    type: 'string',
                    description: 'User password',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                    user: {
                      $ref: '#/components/schemas/User',
                    },
                    token: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Invalid input or user already exists',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
    '/api/users/login': {
      post: {
        tags: ['Users'],
        summary: 'Login a user',
        description: 'Authenticate user and get token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                    description: 'User email',
                  },
                  password: {
                    type: 'string',
                    description: 'User password',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                    user: {
                      $ref: '#/components/schemas/User',
                    },
                    token: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Invalid credentials',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
    '/api/users/me': {
      get: {
        tags: ['Users'],
        summary: 'Get current user',
        description: 'Get currently authenticated user information',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Current user information',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Access denied. No token provided',
          },
          403: {
            description: 'Invalid token',
          },
          404: {
            description: 'User not found',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
    '/api/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'Get all tasks',
        description: 'Get all tasks for the current user',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'List of tasks',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    tasks: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Task',
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Access denied. No token provided',
          },
          403: {
            description: 'Invalid token',
          },
          500: {
            description: 'Server error',
          },
        },
      },
      post: {
        tags: ['Tasks'],
        summary: 'Create a new task',
        description: 'Create a new task for the current user',
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title'],
                properties: {
                  title: {
                    type: 'string',
                    description: 'Task title',
                  },
                  description: {
                    type: 'string',
                    description: 'Task description',
                  },
                  status: {
                    type: 'string',
                    description: 'Task status',
                    enum: ['pending', 'in-progress', 'completed'],
                    default: 'pending',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Task created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                    task: {
                      $ref: '#/components/schemas/Task',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Invalid input',
          },
          401: {
            description: 'Access denied. No token provided',
          },
          403: {
            description: 'Invalid token',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
    '/api/tasks/{id}': {
      get: {
        tags: ['Tasks'],
        summary: 'Get task by ID',
        description: 'Get a specific task by ID',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Task ID',
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          200: {
            description: 'Task details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    task: {
                      $ref: '#/components/schemas/Task',
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Access denied. No token provided',
          },
          403: {
            description: 'Invalid token',
          },
          404: {
            description: 'Task not found',
          },
          500: {
            description: 'Server error',
          },
        },
      },
      put: {
        tags: ['Tasks'],
        summary: 'Update task',
        description: 'Update a specific task',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Task ID',
            schema: {
              type: 'integer',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title'],
                properties: {
                  title: {
                    type: 'string',
                    description: 'Task title',
                  },
                  description: {
                    type: 'string',
                    description: 'Task description',
                  },
                  status: {
                    type: 'string',
                    description: 'Task status',
                    enum: ['pending', 'in-progress', 'completed'],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Task updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                    task: {
                      $ref: '#/components/schemas/Task',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Invalid input',
          },
          401: {
            description: 'Access denied. No token provided',
          },
          403: {
            description: 'Invalid token',
          },
          404: {
            description: 'Task not found or not authorized',
          },
          500: {
            description: 'Server error',
          },
        },
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Delete task',
        description: 'Delete a specific task',
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Task ID',
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          200: {
            description: 'Task deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Access denied. No token provided',
          },
          403: {
            description: 'Invalid token',
          },
          404: {
            description: 'Task not found or not authorized',
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
  },
};

module.exports = swaggerDefinition; 