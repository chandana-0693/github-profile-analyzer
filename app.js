const express = require("express");
const cors = require("cors");
const path = require("path");

const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Frontend
app.use(express.static(path.join(__dirname, "public")));

// API
app.use("/api/profiles", profileRoutes);

module.exports = app;