const db = require('../config/db');

// Get all faculties
exports.getAllFaculties = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM faculties');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch faculties' });
  }
};

// Get a faculty by ID
exports.getFacultyById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM faculties WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch faculty' });
  }
};

// Create a new faculty
exports.createFaculty = async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await db.query('INSERT INTO faculties (name) VALUES (?)', [name]);
    res.json({ id: result.insertId, name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create faculty' });
  }
};

// Update an existing faculty
exports.updateFaculty = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const [result] = await db.query('UPDATE faculties SET name = ? WHERE id = ?', [name, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json({ id, name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update faculty' });
  }
};

// Delete a faculty
exports.deleteFaculty = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM faculties WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete faculty' });
  }
};
