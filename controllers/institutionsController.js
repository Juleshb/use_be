const db = require('../config/db');

// Get all institutions
exports.getAllInstitutions = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM institutions');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch institutions' });
  }
};

// Get an institution by ID
exports.getInstitutionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM institutions WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Institution not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch institution' });
  }
};

// Create a new institution
exports.createInstitution = async (req, res) => {
  const { name, province_id } = req.body;
  try {
    const [result] = await db.query('INSERT INTO institutions (name, province_id) VALUES (?, ?)', [name, province_id]);
    res.json({ id: result.insertId, name, province_id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create institution' });
  }
};

// Update an existing institution
exports.updateInstitution = async (req, res) => {
  const { id } = req.params;
  const { name, province_id } = req.body;
  try {
    const [result] = await db.query('UPDATE institutions SET name = ?, province_id = ? WHERE id = ?', [name, province_id, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Institution not found' });
    }
    res.json({ id, name, province_id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update institution' });
  }
};

// Delete an institution
exports.deleteInstitution = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM institutions WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Institution not found' });
    }
    res.json({ message: 'Institution deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete institution' });
  }
};
