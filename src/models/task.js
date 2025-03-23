const db = require('../config/database');

class Task {
  static getAll(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
        [userId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static getById(id, userId) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
        [id, userId],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  static create(taskData) {
    const { user_id, title, description, status = 'pending' } = taskData;
    
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)',
        [user_id, title, description, status],
        function(err) {
          if (err) {
            reject(err);
          } else {
            // Get the created task
            db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err, row) => {
              if (err) {
                reject(err);
              } else {
                resolve(row);
              }
            });
          }
        }
      );
    });
  }

  static update(id, userId, taskData) {
    const { title, description, status } = taskData;
    
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE tasks 
         SET title = ?, description = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE id = ? AND user_id = ?`,
        [title, description, status, id, userId],
        function(err) {
          if (err) {
            reject(err);
          } else {
            if (this.changes === 0) {
              resolve(null); // No task found or user doesn't own the task
            } else {
              // Get the updated task
              db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(row);
                }
              });
            }
          }
        }
      );
    });
  }

  static delete(id, userId) {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM tasks WHERE id = ? AND user_id = ?',
        [id, userId],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes > 0);
          }
        }
      );
    });
  }
}

module.exports = Task; 