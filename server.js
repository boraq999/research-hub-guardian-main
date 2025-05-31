const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'research',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get('/api/universities', (req, res) => {
  db.query('SELECT * FROM universities', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      // colleges column is assumed to be a JSON string, parse if exists
      const data = results.map(row => ({
        ...row,
        colleges: row.colleges ? JSON.parse(row.colleges) : []
      }));
      res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
