-- ...existing code...
CREATE TABLE IF NOT EXISTS universities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  established INT,
  collegesCount INT,
  thesesCount INT,
  website VARCHAR(255),
  colleges JSON
);

INSERT INTO universities (name, location, established, collegesCount, thesesCount, website, colleges) VALUES
('جامعة الملك سعود', 'الرياض', 1957, 20, 3000, 'https://ksu.edu.sa', '["كلية الهندسة","كلية الطب","كلية العلوم"]'),
('جامعة الملك عبدالعزيز', 'جدة', 1967, 24, 2500, 'https://kau.edu.sa', '["كلية الاقتصاد","كلية الحاسبات","كلية الآداب"]'),
('جامعة الإمام محمد بن سعود الإسلامية', 'الرياض', 1974, 15, 1800, 'https://imamu.edu.sa', '["كلية الشريعة","كلية اللغة العربية","كلية الإعلام"]');
-- ...existing code...
