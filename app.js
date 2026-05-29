const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

const profileRoutes = require("./routes/profileRoutes");

app.use("/api/profiles", profileRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;