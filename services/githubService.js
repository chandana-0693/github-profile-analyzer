const axios = require("axios");

async function fetchGitHubUser(username) {

  const userResponse = await axios.get(
    `https://api.github.com/users/${username}`
  );

  const reposResponse = await axios.get(
    `https://api.github.com/users/${username}/repos`
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
    user.followers * 2 +
    user.public_repos * 5 +
    user.public_gists;

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
    languages
  };
}

module.exports = {
  fetchGitHubUser
};