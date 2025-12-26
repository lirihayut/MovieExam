import axios from "axios";
import cache from "../cache.js";

const API_KEY = "81da891a2460ba1886f5c3b83d5cf722";
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(req, res) {
  const { text, year } = req.query;
  if (!text) return res.status(400).json({ error: "text is required" });

  const key = `search:${text}:${year || "all"}`;
  const cached = cache.get(key);
  if (cached) return res.json(cached);

  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query: text, year }
  });

  const results = response.data.results.slice(0, 50);
  cache.set(key, results);
  res.json(results);
}

export async function getMovie(req, res) {
  const { movie_id } = req.params;

  const key = `movie:${movie_id}`;
  const cached = cache.get(key);
  if (cached) return res.json(cached);

  const response = await axios.get(`${BASE_URL}/movie/${movie_id}`, {
    params: { api_key: API_KEY }
  });

  const movie = {
    name: response.data.title,
    year: response.data.release_date?.split("-")[0],
    genre: response.data.genres.map(g => g.name),
    image: response.data.poster_path
  };

  cache.set(key, movie);
  res.json(movie);
}
