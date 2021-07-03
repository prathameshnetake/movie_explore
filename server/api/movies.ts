import express from "express";
import { getMovieById, getMovies } from "../DB/movies";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = (req.params as any).id;
  const movie = await getMovieById(id);
  if (movie.length) {
    res.send(movie[0]);
    return;
  }
  res.json({ err: "Invalid Id" });
});

router.get("/", async (req, res) => {
  const movies = await getMovies(
    (req.query as any).sortBy,
    (req.query as any).page,
    (req.query as any).sort
  );

  res.json(movies);
});

export default router;
