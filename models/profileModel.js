const db = require("../config/db");

// Save or update profile
function saveProfile(data, callback) {

  const sql = `
    INSERT INTO profiles
    (username, name, followers, following, public_repos, public_gists, created_at, profile_url, avatar_url, score, languages)

    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

    ON DUPLICATE KEY UPDATE

    name = VALUES(name),
    followers = VALUES(followers),
    following = VALUES(following),
    public_repos = VALUES(public_repos),
    public_gists = VALUES(public_gists),
    score = VALUES(score),
    languages = VALUES(languages),
    avatar_url = VALUES(avatar_url)
  `;

  db.query(sql, [
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
    data.languages
  ], callback);
}

// Get all profiles
function getAll(callback) {
  db.query("SELECT * FROM profiles", callback);
}

// Get one profile
function getByUsername(username, callback) {
  db.query(
    "SELECT * FROM profiles WHERE username = ?",
    [username],
    callback
  );
}

module.exports = {
  saveProfile,
  getAll,
  getByUsername
};