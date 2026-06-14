const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "cafd1dd89b09980ab77cf23458aeacd2";

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// movie route
app.get("/movies", async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

    const response = await axios.get(
  `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
);
    res.json(response.data);
  }catch (error) {
  console.error("REAL ERROR:", error.message);
  res.status(500).json({ error: "Failed to fetch movies" });
}
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});