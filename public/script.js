function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

async function analyzeProfile() {

  const loading = document.getElementById("loading");
  loading.style.display = "block";

  try {

    const username = document.getElementById("username").value.trim();

    if (!username) {
      throw new Error("Please enter a GitHub username");
    }

    const response = await fetch(
      `/api/profiles/analyze/${username}`
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Server Error");
    }

    loading.style.display = "none";

    if (!result.data) {

      document.getElementById("profileCard").innerHTML =
        `<h2>User not found</h2>`;

      return;
    }

    const data = result.data;
    const ai = result.aiAnalysis;

    let languagesHTML = "";

    const languages = data.languages || {};

    for (let lang in languages) {
      languagesHTML += `
        <span class="language-tag">${lang}</span>
      `;
    }

    document.getElementById("profileCard").innerHTML = `

      <div class="card">

        <img src="${data.avatar_url}" alt="Profile Picture" />

        <h2>${data.name || "No Name Available"}</h2>

        <p class="username">@${data.username}</p>

        <div class="stats">

          <div class="stat-box followers">
            <h3>${data.followers}</h3>
            <p>
              Followers
              <span class="info-container">
                <span class="info-icon">i</span>
                <span class="tooltip">
                  Number of GitHub users following this profile.
                </span>
              </span>
            </p>
          </div>

          <div class="stat-box following">
            <h3>${data.following}</h3>
            <p>Following</p>
          </div>

          <div class="stat-box repos">
            <h3>${data.public_repos}</h3>
            <p>Repositories</p>
          </div>

          <div class="stat-box score">
            <h3>${data.score}</h3>
            <p>
              Profile Score
              <span class="info-container">
                <span class="info-icon">i</span>
                <span class="tooltip">
                  Score is calculated using followers,
                  repositories, and coding activity.
                </span>
              </span>
            </p>
          </div>

        </div>

        <div class="languages">
          <h3>Languages Used</h3>
          ${languagesHTML || "<p>No languages detected</p>"}
        </div>

        <div class="ai-analysis">
          <h3>AI Analysis</h3>

          <p>
            <strong>Career Suggestion:</strong>
            ${ai?.careerSuggestion || "N/A"}
          </p>

          <p>
            <strong>Strengths:</strong>
            ${(ai?.strengths || []).join(", ")}
          </p>

          <p>
            <strong>Skills:</strong>
            ${(ai?.skills || []).join(", ")}
          </p>

          <p>
            <strong>Improvements:</strong>
            ${(ai?.improvements || []).join(", ")}
          </p>
        </div>

        <a
          href="${data.profile_url}"
          target="_blank"
          class="github-btn"
        >
          View GitHub Profile
        </a>

      </div>
    `;

  } catch (error) {

    loading.style.display = "none";

    document.getElementById("profileCard").innerHTML =
      `<h2>${error.message}</h2>`;

    console.error(error);

    alert(error.message);
  }
}