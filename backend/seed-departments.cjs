const mysql = require('mysql2');
const fs = require('fs');

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
  const createTable = `CREATE TABLE IF NOT EXISTS departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    thesesCount INT,
    researchersCount INT,
    college VARCHAR(255),
    established INT
  )`;

  db.query(createTable, (err) => {
    if (err) {
      console.error('Error creating table:', err);
      process.exit(1);
    } else {
      const check = 'SELECT COUNT(*) as count FROM departments';
      db.query(check, (err, results) => {
        if (err) {
          console.error('Error checking table:', err);
          process.exit(1);
        } else if (results[0].count === 0) {
          // تعبئة البيانات من ملف JSON
          const departmentsData = JSON.parse(fs.readFileSync(
            __dirname + '/../public/mock-data/departments.json',
            'utf8'
          ));
          const insert = `INSERT INTO departments (id, name, description, thesesCount, researchersCount, college, established) VALUES ?`;
          const values = departmentsData.map(d => [d.id, d.name, d.description, d.thesesCount, d.researchersCount, d.college, d.established]);
          db.query(insert, [values], (err) => {
            if (err) {
              console.error('Error inserting data:', err);
            } else {
              console.log('Seed departments inserted successfully.');
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
