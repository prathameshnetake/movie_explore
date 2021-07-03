import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IPagination } from "knex-paginate";
import { IMovie } from "../../server/DB/movies";

import type { RootState } from "../store";
import { getNewMovies } from "../utils/api";

// Define a type for the slice state
export interface IApp {
  movies: IMovie[];
  currentTab: string;
  pagination: IPagination<any> | null;
  sort: string;
}

// Define the initial state using that type
const initialState: IApp = {
  movies: [],
  currentTab: "popular",
  pagination: null,
  sort: "desc",
};

export const updateMovies = createAsyncThunk(
  "movies/fetch",
  async (_, thunkAPI) => {
    const { getState } = thunkAPI;
    const { app } = getState() as RootState;
    console.log(app);

    const page = app.pagination ? Number(app.pagination.currentPage) + 1 : 1;

    const response = await getNewMovies(app.currentTab, page, app.sort);
    return response;
  }
);

export const resetMovies = createAsyncThunk(
  "movies/reset",
  async (_, thunkAPI) => {
    const { getState } = thunkAPI;
    const { app } = getState() as RootState;

    const response = await getNewMovies(app.currentTab, 1, app.sort);
    return response;
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },
    updateSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMovies.fulfilled, (state, action) => {
      state.movies = [...state.movies, ...action.payload.data];
      state.pagination = action.payload.pagination;
    });
    builder.addCase(resetMovies.fulfilled, (state, action) => {
      state.movies = action.payload.data;
      state.pagination = action.payload.pagination;
    });
  },
});

export const { updateCurrentTab, updateSort } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.app;

export default appSlice.reducer;
