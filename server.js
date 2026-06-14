const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "cafd1dd89b09980ab77cf23458aeacd2";

// 🔍 SEARCH ROUTE (ADD THIS BELOW /movies)
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("SEARCH ERROR:", error.message);
    res.status(500).json({ error: "Search failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});