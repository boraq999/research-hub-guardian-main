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

console.log('تشغيل نقطة فحص: استدعاء /api/universities');
app.get('/api/universities', (req, res) => {
  db.query('SELECT * FROM universities', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('نتائج قاعدة البيانات:', results);
      const data = results.map(row => {
        let colleges = [];
        try {
          // إذا كانت القيمة ليست JSON، حولها إلى مصفوفة نصوص
          if (row.colleges && row.colleges.trim().startsWith('[')) {
            colleges = JSON.parse(row.colleges);
          } else if (row.colleges) {
            colleges = row.colleges.split(',').map(c => c.trim());
          }
        } catch (e) {
          colleges = [];
        }
        return {
          ...row,
          colleges
        };
      });
      console.log('البيانات المرسلة للفرونت:', data);
      res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
