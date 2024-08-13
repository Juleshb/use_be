const db = require('../config/db');

// Get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM departments');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
};

// Get a department by faculityID
exports.getDepartmentByfacultyID = async (req, res) => {
  const { faculty_id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM departments WHERE faculty_id = ?', [faculty_id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch department' });
  }
};

// Get a department by ID
exports.getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM departments WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch department' });
  }
};

// Create a new department
exports.createDepartment = async (req, res) => {
  const { name, faculty_id } = req.body;
  try {
    const [result] = await db.query('INSERT INTO departments (name, faculty_id) VALUES (?, ?)', [name, faculty_id]);
    res.json({ id: result.insertId, name, faculty_id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create department' });
  }
};

// Update an existing department
exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, faculty_id } = req.body;
  try {
    const [result] = await db.query('UPDATE departments SET name = ?, faculty_id = ? WHERE id = ?', [name, faculty_id, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json({ id, name, faculty_id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update department' });
  }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM departments WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete department' });
  }
};
