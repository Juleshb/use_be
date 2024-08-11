const db = require('../config/db');

// Get all grades
exports.getAllGrades = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM grades');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grades' });
  }
};

// Get a grade by ID
exports.getGradeById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM grades WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grade' });
  }
};

// Create a new grade
exports.createGrade = async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await db.query('INSERT INTO grades (name) VALUES (?)', [name]);
    res.json({ id: result.insertId, name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create grade' });
  }
};

// Update an existing grade
exports.updateGrade = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const [result] = await db.query('UPDATE grades SET name = ? WHERE id = ?', [name, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json({ id, name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update grade' });
  }
};

// Delete a grade
exports.deleteGrade = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM grades WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Grade not found' });
    }
    res.json({ message: 'Grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete grade' });
  }
};
