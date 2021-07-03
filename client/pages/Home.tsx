import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  resetMovies,
  updateCurrentTab,
  updateMovies,
  updateSort,
} from "../reducer/app";
import { getPosterPath } from "../utils/imageHelper";
import moment from "moment";
import classnames from "classnames";
import { Link } from "react-router-dom";

export const Home = () => {
  const app = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { movies } = app;

  const updateCurrentMovies = async () => {
    dispatch(updateMovies());
  };

  useEffect(() => {
    if (!app.movies.length) {
      dispatch(updateMovies());
    }
  }, []);

  const filters = [
    {
      name: "Latest",
      tag: "latest",
    },
    { name: "Popular", tag: "popular" },
  ];

  const onTabChange = (newTag) => {
    dispatch(updateCurrentTab(newTag));
    dispatch(resetMovies());
  };

  const getReadableDate = (date: string) => {
    return moment(date).format("MMM DD YYYY");
  };

  const loadMore = async () => {
    dispatch(updateMovies());
  };

  const onSortChange = (e: any) => {
    console.log(e);

    dispatch(updateSort(e.target.value));
    dispatch(resetMovies());
  };

  return (
    <div className="container m-auto">
      <div className="h-80 flex flex-col justify-center bg-blue-600 text-gray-50 w-full p-10">
        <p className="font-bold text-5xl my-2">Welcome.</p>
        <p className="font-semibold text-2xl">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
      </div>
      <div className="mt-4">
        <div className="flex items-center">
          <span className="text-xl font-medium mr-2">What's Popular</span>
          <ul className="flex flex-1">
            {filters.map((filter) => (
              <li
                key={filter.name}
                className={classnames([
                  "mx-2 cursor-pointer px-4 py-2",
                  {
                    "bg-blue-500 px-2 rounded-xl text-gray-50":
                      app.currentTab === filter.tag,
                  },
                ])}
                onClick={() => onTabChange(filter.tag)}
              >
                {filter.name}
              </li>
            ))}
          </ul>
          <select
            className="outline-none border-2 rounded px-4 py-1"
            onChange={onSortChange}
            value={app.sort}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="flex flex-wrap mt-4">
          {movies.map((movie) => (
            <div key={movie.id} className="w-40 m-4 cursor-pointer">
              <Link title={movie.title} to={`/${movie.id}`}>
                <div className="w-full rounded-lg overflow-hidden">
                  <img
                    src={getPosterPath(movie.poster_path)}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 relative">
                  <div className="rounded-full ring-2 ring-blue-500 bg-gray-700 w-10 h-10 text-gray-50 flex justify-center items-center font-thin text-xs absolute -top-10 left-3">
                    {Math.round(movie.vote_average * 10)}%
                  </div>
                  <p className="font-semibold text-lg">{movie.title}</p>
                  <p className="font-thin text-xs text-gray-400">
                    {getReadableDate(movie.release_date)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
          <button
            onClick={loadMore}
            className="bg-blue-500 text-gray-50 h-10 px-6 rounded-3xl self-center m-4 hover:bg-blue-400"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};
