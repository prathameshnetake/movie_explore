import axios from "axios";
import { resolveApiName } from "./resolveApiName";
import qs from "query-string";
import { IMovie } from "../../server/DB/movies";
import { IWithPagination } from "knex-paginate";
import { useAppSelector } from "../store";
import React from "react";

export const getNewMovies = async (
  newTag: string,
  page: number,
  sort: string
): Promise<IWithPagination<IMovie[]>> => {
  const api = resolveApiName();
  return (await axios.get(api, { params: { sortBy: newTag, page, sort } }))
    .data;
};

export const getMovie = async (id: string) => {
  const api = resolveApiName();
  return (await axios.get(`${api}/${id}`)).data;
};
