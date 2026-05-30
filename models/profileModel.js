const db = require("../config/db");

// Save profile
async function saveProfile(data, callback) {

  const sql = `
  INSERT INTO profiles 
  (username, name, followers, following, public_repos, public_gists, created_at, profile_url, avatar_url, score, languages)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

  ON DUPLICATE KEY UPDATE
  name=VALUES(name),
  followers=VALUES(followers),
  following=VALUES(following),
  public_repos=VALUES(public_repos),
  public_gists=VALUES(public_gists),
  created_at=VALUES(created_at),
  profile_url=VALUES(profile_url),
  avatar_url=VALUES(avatar_url),
  score=VALUES(score),
  languages=VALUES(languages)
`;

  try {

    await db.execute(sql, [
      data.username,
      data.name,
      data.followers,
      data.following,
      data.public_repos,
      data.public_gists,
      data.created_at,
      data.profile_url,
      data.avatar_url,
      data.score,
      JSON.stringify(data.languages),
    ]);

    callback(null);

  } catch (err) {

    callback(err);
  }
}

// Get all profiles
async function getAll(callback) {

  try {

    const [rows] = await db.execute(
      "SELECT * FROM profiles"
    );

    callback(null, rows);

  } catch (err) {

    callback(err);
  }
}

// Get one profile
async function getByUsername(username, callback) {

  try {

    const [rows] = await db.execute(
      "SELECT * FROM profiles WHERE username = ?",
      [username]
    );

    callback(null, rows);

  } catch (err) {

    callback(err);
  }
}

module.exports = {
  saveProfile,
  getAll,
  getByUsername,
};