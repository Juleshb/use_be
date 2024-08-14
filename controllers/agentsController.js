const db = require('../config/db');

// Get all agents
exports.getAllAgents = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM agents');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Agents' });
  }
};
//Get total Agent
exports.getTotalAgents = async (req, res) => {
    try {
      const [rows] = await db.query('SELECT COUNT(*) FROM agents');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch Agents' });
    }
  };
