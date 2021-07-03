import express from "express";
import { refreshData } from "./util/refreshData";
import cors from "cors";
import api from "./api/movies";
import { ifDataExists } from "./DB/movies";
import { resolve } from "path";
import chalk from "chalk";
import { CronJob } from "cron";

// every midnight
const registerCron = () => {
  var job = new CronJob("0 0 0 * * *", function () {
    refreshData();
  });

  job.start();
};

const run = async () => {
  const app = express();
  const port = 3000;

  app.use(cors());
  app.use("/movies", api);
  app.use(express.static(resolve(__dirname, "../", "dist")));

  app.get("/", (req, res) => {
    res.sendFile("../dist/index.html");
  });

  if (!(await ifDataExists())) {
    console.log(chalk.blue.bgRed.bold("Data not present. Downloading!"));
    console.log("\n");
    await refreshData();
  }

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

registerCron();
run();
