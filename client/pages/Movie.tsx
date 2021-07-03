import moment from "moment";
import React, { useEffect, useState, version } from "react";
import { useParams } from "react-router-dom";
import { IMovie } from "../../server/DB/movies";
import { getMovie } from "../utils/api";
import { getPosterPath } from "../utils/imageHelper";

export const Movie = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<IMovie>(null);
  console.log(movie_id);

  useEffect(() => {
    const getMovieData = async () => {
      const movie = await getMovie(movie_id);
      if (movie) {
        setMovie(movie);
        setLoading(false);
      }
    };

    getMovieData();
  }, [movie_id]);

  return (
    <div>
      {loading && <div>Loading</div>}
      {movie && (
        <div className="bg-blue-400">
          <div className="container py-8 m-auto flex items-center">
            <div>
              <img
                src={getPosterPath(movie.poster_path, 300, 450, "bestv2")}
                className="rounded-xl shadow-xl"
              />
            </div>
            <div className="mx-8">
              <p className="text-gray-50 text-5xl font-bold">
                {movie.title}{" "}
                <span className="font-thin text-3xl">
                  ({moment(movie.release_date).format("YYYY")})
                </span>
              </p>
              <div className="rounded-full h-20 w-20 bg-gray-800 flex justify-center items-center text-gray-50 text-xl ring-blue-600 ring-4 mt-4">
                {Math.round(movie.vote_average * 10)}%
              </div>
              <p className="text-gray-50 mt-4 text-lg max-w-2xl">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
