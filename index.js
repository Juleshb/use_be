const express = require('express');
const morgan = require('morgan'); // Import morgan
const app = express();
const db = require('./config/db');
require('dotenv').config();

app.use(express.json());
app.use(morgan('dev')); // Use morgan middleware to log requests

// Import and use routes
app.use('/api/departments', require('./routes/departments'));
app.use('/api/faculties', require('./routes/faculties'));
app.use('/api/functions', require('./routes/functions'));
app.use('/api/grades', require('./routes/grades'));
app.use('/api/institutions', require('./routes/institutions'));
app.use('/api/provinces', require('./routes/provinces'));
app.use('/api/students', require('./routes/students'));
app.use('/api/users', require('./routes/users'));

// Database connection check
db.getConnection()
  .then(connection => {
    console.log('Connected to the database successfully.');
    connection.release(); // Release the connection back to the pool

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🔥🔥🔥`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1); // Exit the process with failure
  });

module.exports = app;
