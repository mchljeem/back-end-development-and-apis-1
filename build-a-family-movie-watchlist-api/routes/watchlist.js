
import express from "express";
import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../utils/db.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";

const router = express.Router();

// All watchlist routes require authentication
router.use(authenticate);

// GET a user's watchlist
router.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const watchlist = getWatchlist(userId);

  if (watchlist === null) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json(watchlist);
});

// ADD a movie
router.post(
  "/:userId/movies",
  authorizeModification,
  (req, res) => {
    const userId = Number(req.params.userId);
    const { title, genre } = req.body;

    if (!title || !genre) {
      return res.status(400).json({
        error: "Title and genre are required",
      });
    }

    const movie = addMovie(userId, { title, genre });

    if (movie === null) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(201).json(movie);
  }
);

// UPDATE a movie
router.put(
  "/:userId/movies/:movieId",
  authorizeModification,
  (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);
    const { title, genre, watched } = req.body;
    const updates = {};

    if (title !== undefined) updates.title = title;
    if (genre !== undefined) updates.genre = genre;
    if (watched !== undefined) updates.watched = watched;

    const movie = updateMovie(userId, movieId, updates);

    if (movie === null) {
      return res.status(404).json({ error: "Movie or user not found" });
    }

    return res.status(200).json(movie);
  }
);

// DELETE a movie
router.delete(
  "/:userId/movies/:movieId",
  authorizeModification,
  (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);
    const deleted = deleteMovie(userId, movieId);

    if (!deleted) {
      return res.status(404).json({ error: "Movie or user not found" });
    }

    return res.status(200).json({
      message: "Movie deleted successfully",
    });
  }
);

export default router;
