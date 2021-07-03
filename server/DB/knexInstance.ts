import knex from "knex";
import config from "../config";
import { join } from "path";

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: join(config.root, "db.sqlite"),
  },
  useNullAsDefault: true,
});

import { attachPaginate } from "knex-paginate";
attachPaginate();

export default knexInstance;
