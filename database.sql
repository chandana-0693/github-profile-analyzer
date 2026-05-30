CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  followers INT,
  following INT,
  public_repos INT,
  public_gists INT,
  created_at DATE,
  profile_url TEXT,
  avatar_url TEXT,
  score REAL,
  languages TEXT,
  analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);