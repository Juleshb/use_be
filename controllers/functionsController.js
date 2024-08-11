const db = require('../config/db');

// Get all functions
exports.getAllFunctions = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM functions');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch functions' });
  }
};

// Get a function by ID
exports.getFunctionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM functions WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Function not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch function' });
  }
};

// Create a new function
exports.createFunction = async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await db.query('INSERT INTO functions (name) VALUES (?)', [name]);
    res.json({ id: result.insertId, name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create function' });
  }
};

// Update an existing function
exports.updateFunction = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const [result] = await db.query('UPDATE functions SET name = ? WHERE id = ?', [name, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Function not found' });
    }
    res.json({ id, name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update function' });
  }
};

// Delete a function
exports.deleteFunction = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM functions WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Function not found' });
    }
    res.json({ message: 'Function deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete function' });
  }
};
