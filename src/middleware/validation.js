const validateUserRegistration = (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  // Validate username
  if (!username || username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters long' });
  }

  // Validate password
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  next();
};

const validateTask = (req, res, next) => {
  const { title, status } = req.body;

  // Validate title
  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  // Validate status if provided
  if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({ 
      error: 'Status must be one of: pending, in-progress, completed' 
    });
  }

  next();
};

module.exports = {
  validateUserRegistration,
  validateTask
}; 