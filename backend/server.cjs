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
      console.log('نتائج قاعدة البيانات:', results.map(r => ({id: r.id, name: r.name, colleges: r.colleges})));
      const data = results.map(row => {
        let colleges = [];
        let rawColleges = row.colleges;
        // طباعة القيمة الأصلية للحقل colleges
        console.log(`university: ${row.name} | rawColleges:`, rawColleges);
        try {
          if (rawColleges && typeof rawColleges === 'string' && rawColleges.trim().startsWith('[')) {
            colleges = JSON.parse(rawColleges);
          } else if (rawColleges && typeof rawColleges === 'string') {
            colleges = rawColleges.split(',').map(c => c.trim());
          } else if (Array.isArray(rawColleges)) {
            colleges = rawColleges;
          }
        } catch (e) {
          console.log('خطأ في تحويل الكليات:', e, 'القيمة:', rawColleges);
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

// API: جلب جميع الرسائل البحثية من قاعدة البيانات
app.get('/api/theses', (req, res) => {
  db.query('SELECT * FROM theses', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

// API: جلب جميع الأقسام الأكاديمية من قاعدة البيانات
app.get('/api/departments', (req, res) => {
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
