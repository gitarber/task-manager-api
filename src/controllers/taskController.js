const Task = require('../models/task');

// Get all tasks for current user
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll(req.user.id);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error while fetching tasks' });
  }
};

// Get single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.getById(req.params.id, req.user.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Server error while fetching task' });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Task title is required' });
    }
    
    // Create task
    const task = await Task.create({
      user_id: req.user.id,
      title,
      description,
      status: status || 'pending'
    });
    
    res.status(201).json({ 
      message: 'Task created successfully',
      task 
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error while creating task' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Task title is required' });
    }
    
    // Update task
    const updatedTask = await Task.update(req.params.id, req.user.id, {
      title,
      description,
      status: status || 'pending'
    });
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found or not authorized' });
    }
    
    res.status(200).json({ 
      message: 'Task updated successfully',
      task: updatedTask 
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Server error while updating task' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.delete(req.params.id, req.user.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found or not authorized' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error while deleting task' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
}; 