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
// 🎭 MOOD / GENRE ROUTE
app.get("/movies/genre/:id", async (req, res) => {
  try {
    const genreId = req.params.id;

    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&region=IN&sort_by=popularity.desc`
    );

    res.json(response.data);
  } catch (error) {
    console.error("GENRE ERROR:", error.message);
    res.status(500).json({ error: "Failed to fetch genre movies" });
  }
});
// ⭐ TOP RATED
app.get("/movies/top-rated", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Top rated fetch failed" });
  }
});

// 🎬 HOLLYWOOD
app.get("/movies/hollywood", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=en&sort_by=vote_average.desc&vote_count.gte=1000`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Hollywood fetch failed" });
  }
});

// 🎥 BOLLYWOOD
app.get("/movies/bollywood", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=hi&region=IN&sort_by=vote_average.desc&vote_count.gte=200`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Bollywood fetch failed" });
  }
});
// 🔥 TRENDING HOLLYWOOD
app.get("/movies/trending/hollywood", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=en&sort_by=popularity.desc`
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Hollywood trending failed" });
  }
});

// 🇮🇳 TRENDING BOLLYWOOD
app.get("/movies/trending/bollywood", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=hi&region=IN&sort_by=popularity.desc`
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Bollywood trending failed" });
  }
});

// 🎬 TRENDING SOUTH
app.get("/movies/trending/south", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=te&region=IN&sort_by=popularity.desc`
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "South trending failed" });
  }
});

// 🐭 TRENDING ANIMATED
app.get("/movies/trending/animated", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc`
    );
    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Animated trending failed" });
  }
});

// 🇮🇳 BOLLYWOOD PAGINATION
app.get("/movies/bollywood/page/:page", async (req, res) => {
  try {
    const page = req.params.page;

    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc&page=${page}`
    );

    res.json(response.data);
  } catch {
    res.status(500).json({ error: "Bollywood page fetch failed" });
  }
});

// 🚀 START SERVER (always last)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});