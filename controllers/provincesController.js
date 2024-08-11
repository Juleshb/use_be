const db = require('../config/db');

// Get all provinces
exports.getAllProvinces = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM provinces');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch provinces' });
  }
};

// Get a province by ID
exports.getProvinceById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM provinces WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Province not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch province' });
  }
};

// Create a new province
exports.createProvince = async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await db.query('INSERT INTO provinces (name) VALUES (?)', [name]);
    res.json({ id: result.insertId, name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create province' });
  }
};

// Update an existing province
exports.updateProvince = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const [result] = await db.query('UPDATE provinces SET name = ? WHERE id = ?', [name, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Province not found' });
    }
    res.json({ id, name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update province' });
  }
};

// Delete a province
exports.deleteProvince = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM provinces WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Province not found' });
    }
    res.json({ message: 'Province deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete province' });
  }
};
