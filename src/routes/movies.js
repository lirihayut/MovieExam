import express from "express";
import { searchMovies, getMovie } from "../controllers/moviesController.js";

const router = express.Router();

router.get("/search", searchMovies);
router.get("/:movie_id", getMovie);

export default router;
