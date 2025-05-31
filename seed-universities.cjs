// استخدم الامتداد .cjs ليعمل مع require في بيئة type: module
const mysql = require('mysql2');

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
  const createTable = `CREATE TABLE IF NOT EXISTS universities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    established INT,
    collegesCount INT,
    thesesCount INT,
    website VARCHAR(255),
    colleges JSON
  )`;

  db.query(createTable, (err) => {
    if (err) {
      console.error('Error creating table:', err);
      process.exit(1);
    } else {
      const check = 'SELECT COUNT(*) as count FROM universities';
      db.query(check, (err, results) => {
        if (err) {
          console.error('Error checking table:', err);
          process.exit(1);
        } else if (results[0].count === 0) {
          const insert = `INSERT INTO universities (name, location, established, collegesCount, thesesCount, website, colleges) VALUES ?`;
          const values = [
            [
              'جامعة الملك سعود', 'الرياض', 1957, 20, 3000, 'https://ksu.edu.sa', JSON.stringify(['كلية الهندسة','كلية الطب','كلية العلوم'])
            ],
            [
              'جامعة الملك عبدالعزيز', 'جدة', 1967, 24, 2500, 'https://kau.edu.sa', JSON.stringify(['كلية الاقتصاد','كلية الحاسبات','كلية الآداب'])
            ],
            [
              'جامعة الإمام محمد بن سعود الإسلامية', 'الرياض', 1974, 15, 1800, 'https://imamu.edu.sa', JSON.stringify(['كلية الشريعة','كلية اللغة العربية','كلية الإعلام'])
            ]
          ];
          db.query(insert, [values], (err) => {
            if (err) {
              console.error('Error inserting data:', err);
            } else {
              console.log('Seed data inserted successfully.');
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
