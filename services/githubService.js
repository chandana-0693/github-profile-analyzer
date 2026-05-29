const axios = require("axios");

async function fetchGitHubUser(username) {
  const userRes = await axios.get(`https://api.github.com/users/${username}`);
  const repoRes = await axios.get(`https://api.github.com/users/${username}/repos`);

  const user = userRes.data;
  const repos = repoRes.data;

  // Language analysis
  const langMap = {};
  repos.forEach((repo) => {
    if (repo.language) {
      langMap[repo.language] = (langMap[repo.language] || 0) + 1;
    }
  });

  const languages = JSON.stringify(langMap);

  // Simple score formula
  const score =
    user.followers * 2 +
    user.public_repos * 1.5 +
    Object.keys(langMap).length * 5;

  return {
    username: user.login,
    name: user.name,
    followers: user.followers,
    following: user.following,
    public_repos: user.public_repos,
    public_gists: user.public_gists,
    created_at: user.created_at.split("T")[0],
    profile_url: user.html_url,
    avatar_url: user.avatar_url,
    score,
    languages,
  };
}

module.exports = { fetchGitHubUser };