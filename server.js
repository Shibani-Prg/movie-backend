const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");
require("dotenv").config();

const app = express();
app.use(cors());

const API_KEY = process.env.TMDB_API_KEY;

console.log("API KEY:", API_KEY);

// 🔥 AXIOS CONFIG
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 15000,
  httpsAgent: new https.Agent({ family: 4 }),
  params: {
    api_key: API_KEY,
  },
});

// ====================== BASIC ROUTES ======================

// 🎬 POPULAR
app.get("/movies", async (req, res) => {
  try {
    const { data } = await api.get("/movie/popular");
    res.json(data);
  } catch (err) {
    console.error("MOVIES ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🔍 SEARCH
app.get("/search", async (req, res) => {
  try {
    const { data } = await api.get("/search/movie", {
      params: { query: req.query.q },
    });
    res.json(data);
  } catch (err) {
    console.error("SEARCH ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🎥 DETAILS
app.get("/movie/:id", async (req, res) => {
  try {
    const { data } = await api.get(`/movie/${req.params.id}`);
    res.json(data);
  } catch (err) {
    console.error("DETAILS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🎭 GENRE
app.get("/movies/genre/:id", async (req, res) => {
  try {
    const { data } = await api.get("/discover/movie", {
      params: {
        with_genres: req.params.id,
        region: "IN",
      },
    });
    res.json(data);
  } catch (err) {
    console.error("GENRE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ⭐ TOP RATED
app.get("/movies/top-rated", async (req, res) => {
  try {
    const { data } = await api.get("/movie/top_rated");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ====================== PAGINATION ======================

// 🇮🇳 Bollywood
app.get("/movies/bollywood/page/:page", async (req, res) => {
  try {
    const { data } = await api.get("/discover/movie", {
      params: {
        with_original_language: "hi",
        page: req.params.page,
      },
    });
    res.json(data);
  } catch (err) {
    console.error("BOLLYWOOD ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🎬 Hollywood
app.get("/movies/hollywood/page/:page", async (req, res) => {
  try {
    const { data } = await api.get("/discover/movie", {
      params: {
        with_original_language: "en",
        page: req.params.page,
      },
    });
    res.json(data);
  } catch (err) {
    console.error("HOLLYWOOD ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🇰🇷 Korean
app.get("/movies/korean/page/:page", async (req, res) => {
  try {
    const { data } = await api.get("/discover/movie", {
      params: {
        with_original_language: "ko",
        page: req.params.page,
      },
    });
    res.json(data);
  } catch (err) {
    console.error("KOREAN ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🇹🇭 Thai
app.get("/movies/thai/page/:page", async (req, res) => {
  try {
    const { data } = await api.get("/discover/movie", {
      params: {
        with_original_language: "th",
        page: req.params.page,
      },
    });
    res.json(data);
  } catch (err) {
    console.error("THAI ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🎬 South
app.get("/movies/south/page/:page", async (req, res) => {
  try {
    const langs = ["te", "ta", "ml", "kn"];

    const requests = langs.map((lang) =>
      api.get("/discover/movie", {
        params: {
          with_original_language: lang,
          page: req.params.page,
        },
      })
    );

    const responses = await Promise.all(requests);

    const movies = responses.flatMap((r) => r.data.results);

    const unique = Array.from(
      new Map(movies.map((m) => [m.id, m])).values()
    );

    res.json({ results: unique });

  } catch (err) {
    console.error("SOUTH ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ====================== TRENDING ======================

// 🔥 Hollywood
app.get("/movies/trending/hollywood", async (req, res) => {
  try {
    const { data } = await api.get("/discover/movie", {
      params: {
        with_original_language: "en",
        sort_by: "popularity.desc",
      },
    });
    res.json(data);
  } catch (err) {
    console.error("TREND HOLLYWOOD ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🔥 Bollywood
app.get("/movies/trending/bollywood", async (req, res) => {
  try {
    const { data } = await api.get("/discover/movie", {
      params: {
        with_original_language: "hi",
        region: "IN",
        sort_by: "popularity.desc",
      },
    });
    res.json(data);
  } catch (err) {
    console.error("TREND BOLLYWOOD ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🔥 South
app.get("/movies/trending/south", async (req, res) => {
  try {
    const langs = ["te", "ta", "ml", "kn"];

    const requests = langs.map((lang) =>
      api.get("/discover/movie", {
        params: {
          with_original_language: lang,
          sort_by: "popularity.desc",
        },
      })
    );

    const responses = await Promise.all(requests);

    const movies = responses.flatMap((r) => r.data.results);

    const unique = Array.from(
      new Map(movies.map((m) => [m.id, m])).values()
    );

    res.json({ results: unique });

  } catch (err) {
    console.error("TREND SOUTH ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 🔥 Animated
app.get("/movies/trending/animated", async (req, res) => {
  try {
    const { data } = await api.get("/discover/movie", {
      params: {
        with_genres: 16,
        sort_by: "popularity.desc",
      },
    });
    res.json(data);
  } catch (err) {
    console.error("TREND ANIMATED ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ====================== START SERVER ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});