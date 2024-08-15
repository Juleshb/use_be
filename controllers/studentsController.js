const db = require('../config/db');

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
