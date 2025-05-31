const mysql = require('mysql2');
const fs = require('fs');

// قراءة بيانات الرسائل البحثية من ملف JSON
const thesesData = JSON.parse(fs.readFileSync(
  __dirname + '/../public/mock-data/theses.json',
  'utf8'
));

const theses = thesesData;

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
    process.exit(1);
  } else {
    console.log('Connected to MySQL database');
    seed();
  }
});

function seed() {
  const createTable = `CREATE TABLE IF NOT EXISTS theses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    degree VARCHAR(50),
    department VARCHAR(100),
    university VARCHAR(100),
    college VARCHAR(100),
    year INT,
    date DATE,
    status VARCHAR(50)
  )`;

  db.query(createTable, (err) => {
    if (err) {
      console.error('Error creating table:', err);
      process.exit(1);
    } else {
      const check = 'SELECT COUNT(*) as count FROM theses';
      db.query(check, (err, results) => {
        if (err) {
          console.error('Error checking table:', err);
          process.exit(1);
        } else if (results[0].count === 0) {
          // تعبئة البيانات
          const insert = `INSERT INTO theses (title, author, degree, department, university, college, year, date, status) VALUES ?`;
          const values = theses.map(t => [t.title, t.author, t.degree, t.department, t.university, t.college, t.year, t.date, t.status]);
          db.query(insert, [values], (err) => {
            if (err) {
              console.error('Error inserting data:', err);
            } else {
              console.log('Seed theses inserted successfully.');
            }
            db.end();
          });
        } else {
          console.log('Table already has data.');
          db.end();
        }
      });
    }
  });
}
