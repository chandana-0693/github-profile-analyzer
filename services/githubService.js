const axios = require("axios");

async function fetchGitHubUser(username) {

  console.log("Searching:", username);

  const userResponse = await axios.get(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        "User-Agent": "GitHub-Profile-Analyzer"
      }
    }
  );

  const reposResponse = await axios.get(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        "User-Agent": "GitHub-Profile-Analyzer"
      }
    }
  );

  const user = userResponse.data;
  const repos = reposResponse.data;

  let languages = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] =
        (languages[repo.language] || 0) + 1;
    }
  });

  const score =
    (user.followers || 0) * 2 +
    (user.public_repos || 0) * 5 +
    (user.public_gists || 0);

  console.log("GitHub Status:", userResponse.status);

  return {
    username: user.login || null,
    name: user.name || null,
    followers: user.followers || 0,
    following: user.following || 0,
    public_repos: user.public_repos || 0,
    public_gists: user.public_gists || 0,
    created_at: user.created_at
      ? user.created_at.split("T")[0]
      : null,
    profile_url: user.html_url || null,
    avatar_url: user.avatar_url || null,
    score: score,
    languages: languages
  };
}

module.exports = {
  fetchGitHubUser
};