function generateAIAnalysis(profile) {
  const strengths = [];
  const improvements = [];
  const skills = [];

  if (profile.followers > 100) {
    strengths.push("Strong GitHub presence");
  } else {
    improvements.push("Increase GitHub activity to gain followers");
  }

  if (profile.public_repos > 20) {
    strengths.push("Good repository count");
  } else {
    improvements.push("Build more public projects");
  }

  if (profile.languages) {
    Object.keys(profile.languages).forEach(lang => {
      skills.push(lang);
    });
  }

  let careerSuggestion = "Software Developer";

  if (skills.includes("Python")) {
    careerSuggestion = "AI / Machine Learning Engineer";
  }

  if (skills.includes("JavaScript")) {
    careerSuggestion = "Full Stack Developer";
  }

  if (
    skills.includes("Python") &&
    skills.includes("JavaScript")
  ) {
    careerSuggestion = "AI Full Stack Developer";
  }

  return {
    strengths,
    skills,
    improvements,
    careerSuggestion
  };
}

module.exports = generateAIAnalysis;