import knexInstance from "./knexInstance";

export interface IMovie {
  id: number;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  adult: boolean;
}

const createIfNotExists = async () => {
  const exists = await knexInstance.schema.hasTable("movies");

  if (!exists) {
    await knexInstance.schema.createTable("movies", (table) => {
      table.integer("id").primary();
      table.string("backdrop_path");
      table.specificType("genre_ids", "integer ARRAY");
      table.string("original_language");
      table.string("original_title");
      table.string("overview");
      table.float("popularity");
      table.string("poster_path");
      table.string("release_date");
      table.string("title");
      table.boolean("video");
      table.float("vote_average");
      table.integer("vote_count");
      table.boolean("adult");
    });

    return true;
  }

  return true;
};

export const insertMovies = async (data: IMovie | IMovie[]) => {
  await createIfNotExists();
  try {
    return knexInstance("movies").insert(data);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const ifDataExists = async () => {
  return await knexInstance.schema.hasTable("movies");
};

export const getMovies = async (
  sortBy: string,
  currentPage = 1,
  order = "desc"
) => {
  await createIfNotExists();
  return knexInstance("movies")
    .select("*")
    .whereNot("release_date", "=", "")
    .orderBy(sortBy === "popular" ? "popularity" : "release_date", order)
    .paginate({ perPage: 10, currentPage });
};

export const getMovieById = async (id: number) => {
  return knexInstance("movies").select("*").where("id", "=", id);
};

export const dropTable = async () => {
  if (await knexInstance.schema.hasTable("movies")) {
    return await knexInstance.schema.dropTable("movies");
  }
};

/*

"adult": false,
        "backdrop_path": "/uAQrHntCccFpvxp75XdQgqexlJd.jpg",
        "genre_ids": [16, 35, 10751, 14],
        "id": 508943,
        "original_language": "en",
        "original_title": "Luca",
        "overview": "Luca and his best friend Alberto experience an unforgettable summer on the Italian Riviera. But all the fun is threatened by a deeply-held secret: they are sea monsters from another world just below the water’s surface.",
        "popularity": 5454.689,
        "poster_path": "/jTswp6KyDYKtvC52GbHagrZbGvD.jpg",
        "release_date": "2021-06-17",
        "title": "Luca",
        "video": false,
        "vote_average": 8.2,
        "vote_count": 1735

        */
