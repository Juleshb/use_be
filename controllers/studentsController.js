const db = require('../config/db');

// Get all students with pagination
exports.getAllStudentswithpagnation = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 200; // Number of records to fetch, default is 200
    const offset = parseInt(req.query.offset, 10) || 0; // Starting point, default is 0

    // Query to get the total number of students
    const [totalResult] = await db.query('SELECT COUNT(*) as total FROM students');
    const total = totalResult[0].total;

    // Query to fetch the students with limit and offset
    const [rows] = await db.query('SELECT * FROM students LIMIT ? OFFSET ?', [limit, offset]);

    // Sending the response with students data and total count
    res.json({
      students: rows,
      total: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};


// Get all students with pagination and search
exports.getAllStudentsWithPaginationsearch = async (req, res) => {
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

    // Query to get the total number of students with the search condition
    let countQuery = 'SELECT COUNT(*) as total FROM students';
    if (searchQuery) {
      countQuery += ` WHERE ${searchQuery}`;
    }
    const [totalResult] = await db.query(countQuery, queryParams);
    const total = totalResult[0].total;

    // Query to fetch the students with limit, offset, and search condition
    let fetchQuery = 'SELECT * FROM students';
    if (searchQuery) {
      fetchQuery += ` WHERE ${searchQuery}`;
    }
    fetchQuery += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const [rows] = await db.query(fetchQuery, queryParams);

    // Sending the response with students data and total count
    res.json({
      students: rows,
      total: total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};


// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM students');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};


//Get total STUDENTS
exports.getTotalStudents = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) FROM students');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student' });
  }
};

// Get a student by matricule
exports.getStudentById = async (req, res) => {
  const { matricule } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM students WHERE matricule = ?', [matricule]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student' });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  const {
    matricule,
    lieu_de_naissance,
    post_nom,
    nom,
    telephone,
    date_de_naissance,
    nationalite,
    departement,
    prenom,
    sexe,
    adresse_physique,
    etat_civil,
    faculte,
    province_origine,
    promotion_year
  } = req.body;
  
  try {
    const [result] = await db.query(
      `INSERT INTO students (matricule, lieu_de_naissance, post_nom, nom, telephone, date_de_naissance, 
        nationalite, departement, prenom, sexe, adresse_physique, etat_civil, faculte, 
        province_origine, promotion_year) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        matricule,
        lieu_de_naissance,
        post_nom,
        nom,
        telephone,
        date_de_naissance,
        nationalite,
        departement,
        prenom,
        sexe,
        adresse_physique,
        etat_civil,
        faculte,
        province_origine,
        promotion_year
      ]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student' });
  }
};

// Update an existing student
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const {
    matricule,
    lieu_de_naissance,
    post_nom,
    nom,
    telephone,
    date_de_naissance,
    nationalite,
    departement,
    prenom,
    sexe,
    adresse_physique,
    etat_civil,
    faculte,
    province_origine,
    promotion_year
  } = req.body;
  
  try {
    const [result] = await db.query(
      `UPDATE students 
       SET matricule = ?, lieu_de_naissance = ?, post_nom = ?, nom = ?, telephone = ?, date_de_naissance = ?, 
           nationalite = ?, departement = ?, prenom = ?, sexe = ?, adresse_physique = ?, etat_civil = ?, 
           faculte = ?, province_origine = ?, promotion_year = ? 
       WHERE id = ?`,
      [
        matricule,
        lieu_de_naissance,
        post_nom,
        nom,
        telephone,
        date_de_naissance,
        nationalite,
        departement,
        prenom,
        sexe,
        adresse_physique,
        etat_civil,
        faculte,
        province_origine,
        promotion_year,
        id
      ]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student' });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM students WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
};
