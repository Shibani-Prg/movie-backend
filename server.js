const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const API_KEY = process.env.TMDB_API_KEY;

// 🎬 MOVIES ROUTE
app.get("/movies", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("MOVIES ERROR:", error.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// 🔍 SEARCH ROUTE
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("SEARCH ERROR:", error.message);
    res.status(500).json({ error: "Search failed" });
  }
});

// 🎥 MOVIE DETAILS ROUTE ✅ (moved up)
app.get("/movie/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("DETAILS ERROR:", error.message);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

// 🚀 START SERVER (always last)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});