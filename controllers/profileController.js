const githubService = require("../services/githubService");
const Profile = require("../models/profileModel");
const generateAIAnalysis = require("../services/aiService");

exports.analyzeProfile = async (req, res) => {
  try {
    const username = req.params.username;

    const data = await githubService.fetchGitHubUser(username);

    const aiAnalysis = generateAIAnalysis(data);
    console.log("PROFILE DATA:");
console.log(JSON.stringify(data, null, 2));
    Profile.saveProfile(data, (err) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      return res.json({
        message: "Profile analyzed successfully",
        data,
        aiAnalysis,
      });
    });
  } catch (error) {

  console.log("Status:", error.response?.status);
  console.log("GitHub Error:", error.response?.data);
  console.log("Full Error:", error);

  return res.status(500).json({
    error: error.message,
    details: error.response?.data
  });
}
};

exports.getAllProfiles = (req, res) => {
  Profile.getAll((err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(results);
  });
};

exports.getProfile = (req, res) => {
  Profile.getByUsername(req.params.username, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
      });
    }

    res.json(results[0] || {});
  });
};