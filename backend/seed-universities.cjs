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
          const insert = `INSERT INTO universities (id, name, location, established, website, collegesCount, thesesCount, colleges) VALUES ?`;
          const values = [
            [1,"جامعة الملك سعود","الرياض",1957,"https://ksu.edu.sa",21,156,JSON.stringify(["كلية علوم الحاسوب والمعلومات","كلية الطب","كلية الهندسة","كلية التربية","كلية الآداب"])],
            [2,"جامعة الملك عبدالعزيز","جدة",1967,"https://kau.edu.sa",24,134,JSON.stringify(["كلية الطب","كلية الهندسة","كلية الاقتصاد والإدارة","كلية العلوم","كلية الآداب والعلوم الإنسانية"])],
            [3,"جامعة الإمام محمد بن سعود الإسلامية","الرياض",1953,"https://imamu.edu.sa",13,89,JSON.stringify(["كلية الشريعة","كلية اللغة العربية","كلية أصول الدين","كلية العلوم الاجتماعية","كلية الاقتصاد والعلوم الإدارية"])],
            [4,"جامعة الملك خالد","أبها",1998,"https://kku.edu.sa",18,76,JSON.stringify(["كلية التربية","كلية الطب","كلية الهندسة","كلية العلوم","كلية الشريعة وأصول الدين"])],
            [5,"جامعة الملك فهد للبترول والمعادن","الظهران",1963,"https://kfupm.edu.sa",7,92,JSON.stringify(["كلية الهندسة","كلية العلوم","كلية علوم الحاسب والمعلومات","كلية إدارة الأعمال","كلية التصاميم البيئية"])],
            [6,"جامعة أم القرى","مكة المكرمة",1949,"https://uqu.edu.sa",15,80,JSON.stringify(["كلية الشريعة والدراسات الإسلامية","كلية الطب","كلية الهندسة والعمارة الإسلامية","كلية التربية","كلية العلوم التطبيقية"])],
            [7,"جامعة القصيم","القصيم",2004,"https://qu.edu.sa",14,70,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم","كلية الاقتصاد والإدارة","كلية التربية"])],
            [8,"جامعة الطائف","الطائف",2003,"https://tu.edu.sa",12,65,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم","كلية التربية","كلية الشريعة والأنظمة"])],
            [9,"جامعة الملك فيصل","الأحساء",1975,"https://kfu.edu.sa",16,78,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم الزراعية والأغذية","كلية التربية","كلية العلوم"])],
            [10,"جامعة الملك سعود بن عبدالعزيز للعلوم الصحية","الرياض",2005,"https://ksau-hs.edu.sa",8,55,JSON.stringify(["كلية الطب","كلية العلوم الطبية التطبيقية","كلية التمريض","كلية الصحة العامة والمعلوماتية الصحية"])],
            [11,"جامعة الأمير سطام بن عبدالعزيز","الخرج",2009,"https://psau.edu.sa",10,40,JSON.stringify(["كلية الهندسة","كلية العلوم الطبية التطبيقية","كلية التربية","كلية إدارة الأعمال"])],
            [12,"جامعة الأمير محمد بن فهد","الخبر",2006,"https://pmu.edu.sa",6,30,JSON.stringify(["كلية الهندسة","كلية إدارة الأعمال","كلية العلوم والدراسات العامة"])],
            [13,"جامعة جدة","جدة",2014,"https://uj.edu.sa",9,28,JSON.stringify(["كلية الهندسة","كلية الطب","كلية العلوم","كلية التربية"])],
            [14,"جامعة حائل","حائل",2005,"https://uoh.edu.sa",11,35,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم","كلية التربية"])],
            [15,"جامعة الجوف","سكاكا",2005,"https://ju.edu.sa",10,32,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم","كلية التربية"])],
            [16,"جامعة الحدود الشمالية","عرعر",2007,"https://nbu.edu.sa",8,25,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم"])],
            [17,"جامعة بيشة","بيشة",2014,"https://ub.edu.sa",7,20,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم"])],
            [18,"جامعة نجران","نجران",2006,"https://nu.edu.sa",9,22,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم"])],
            [19,"جامعة تبوك","تبوك",2006,"https://ut.edu.sa",10,27,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم"])],
            [20,"جامعة جازان","جازان",2006,"https://jazanu.edu.sa",12,33,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم"])],
            [21,"جامعة الباحة","الباحة",2006,"https://bu.edu.sa",8,19,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم"])],
            [22,"جامعة المجمعة","المجمعة",2009,"https://mu.edu.sa",7,18,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم"])],
            [23,"جامعة شقراء","شقراء",2009,"https://su.edu.sa",7,17,JSON.stringify(["كلية الطب","كلية الهندسة","كلية العلوم"])],
            [24,"جامعة الطائف التقنية","الطائف",2018,"https://tct.edu.sa",5,10,JSON.stringify(["كلية التقنية","كلية الهندسة","كلية علوم الحاسوب"])],
            [25,"جامعة المعرفة","الرياض",2009,"https://seu.edu.sa",6,12,JSON.stringify(["كلية الطب","كلية الهندسة","كلية علوم الحاسوب"])],
            [26,"جامعة دار العلوم","الرياض",2008,"https://dau.edu.sa",5,11,JSON.stringify(["كلية الطب","كلية الهندسة","كلية الحقوق"])],
            [27,"جامعة الأمير مقرن بن عبدالعزيز","المدينة المنورة",2017,"https://upm.edu.sa",4,8,JSON.stringify(["كلية الهندسة","كلية علوم الحاسوب"])],
            [28,"جامعة رياض العلم","الرياض",2004,"https://riyadh.edu.sa",3,7,JSON.stringify(["كلية طب الأسنان","كلية الصيدلة"])],
            [29,"جامعة سليمان الراجحي","القصيم",2009,"https://sr.edu.sa",3,6,JSON.stringify(["كلية الطب","كلية الهندسة"])],
            [30,"جامعة الأعمال والتكنولوجيا","جدة",2000,"https://ubt.edu.sa",4,9,JSON.stringify(["كلية إدارة الأعمال","كلية الهندسة"])],
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
