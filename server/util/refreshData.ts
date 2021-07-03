import axios from "axios";
import config from "../config";
import { IMovie, insertMovies, dropTable } from "../DB/movies";
import cliProgress from "cli-progress";

export const refreshData = async () => {
  const {
    data: { total_pages },
  } = await axios.get(`${config.api}`);

  // drop table
  await dropTable();

  const bar1 = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  bar1.start(total_pages, 0, {
    speed: "N/A",
  });

  for (let page = 1; page <= total_pages; page += 1) {
    const res = await axios.get(`${config.api}&page=${page}`);
    await insertMovies(res.data.results as IMovie[]);
    bar1.update(page);
  }

  bar1.stop();
};
