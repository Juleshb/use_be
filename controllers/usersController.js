const db = require('../config/db');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, password, role, province_id, institution_id, faculty_id, department_id } = req.body;
  
  try {
    const [result] = await db.query(
      `INSERT INTO users (name, email, password, role, province_id, institution_id, faculty_id, department_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, password, role, province_id, institution_id, faculty_id, department_id]
    );
    res.json({ id: result.insertId, name, email, role, province_id, institution_id, faculty_id, department_id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, province_id, institution_id, faculty_id, department_id } = req.body;
  
  try {
    const [result] = await db.query(
      `UPDATE users 
       SET name = ?, email = ?, password = ?, role = ?, province_id = ?, institution_id = ?, faculty_id = ?, department_id = ? 
       WHERE id = ?`,
      [name, email, password, role, province_id, institution_id, faculty_id, department_id, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ id, name, email, role, province_id, institution_id, faculty_id, department_id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
