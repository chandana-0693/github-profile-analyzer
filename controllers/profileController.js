const githubService = require("../services/githubService");
const Profile = require("../models/profileModel");

// Analyze + save profile
exports.analyzeProfile = async (req, res) => {
  try {
    const username = req.params.username;

    const data = await githubService.fetchGitHubUser(username);

    Profile.saveProfile(data, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: "Profile analyzed and saved successfully",
        data,
      });
    });

  } catch (error) {
    res.status(404).json({ error: "GitHub user not found" });
  }
};

// Get all profiles
exports.getAllProfiles = (req, res) => {
  Profile.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get single profile
exports.getProfile = (req, res) => {
  Profile.getByUsername(req.params.username, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || {});
  });
};