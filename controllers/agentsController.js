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

// Get all agents with pagination
exports.getAllagentswithpagnation = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 200; // Number of records to fetch, default is 200
    const offset = parseInt(req.query.offset, 10) || 0; // Starting point, default is 0

    // Query to get the total number of agents
    const [totalResult] = await db.query('SELECT COUNT(*) as total FROM agents');
    const total = totalResult[0].total;

    // Query to fetch the agents with limit and offset
    const [rows] = await db.query('SELECT * FROM agents LIMIT ? OFFSET ?', [limit, offset]);

    // Sending the response with agents data and total count
    res.json({
      agents: rows,
      total: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
};


// Get all agents with pagination and search
exports.getAllagentsWithPaginationsearch = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 200; // Number of records to fetch, default is 200
    const offset = parseInt(req.query.offset, 10) || 0; // Starting point, default is 0
    const search = req.query.search || '';

    // Construct the search query
    let searchQuery = '';
    const queryParams = [];

    if (search) {
      searchQuery = '(nom LIKE ? OR postNom LIKE ? OR prenom LIKE ?)';
      const likeSearch = `%${search}%`;
      queryParams.push(likeSearch, likeSearch, likeSearch);
    }


    // Get a agent by matricule
exports.getStudentBymatricule = async (req, res) => {
  const { matricule } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM agents WHERE matricule = ?', [matricule]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student' });
  }
};

    // Query to get the total number of agents with the search condition
    let countQuery = 'SELECT COUNT(*) as total FROM agents';
    if (searchQuery) {
      countQuery += ` WHERE ${searchQuery}`;
    }
    const [totalResult] = await db.query(countQuery, queryParams);
    const total = totalResult[0].total;

    // Query to fetch the agents with limit, offset, and search condition
    let fetchQuery = 'SELECT * FROM agents';
    if (searchQuery) {
      fetchQuery += ` WHERE ${searchQuery}`;
    }
    fetchQuery += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const [rows] = await db.query(fetchQuery, queryParams);

    // Sending the response with agents data and total count
    res.json({
      agents: rows,
      total: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
};