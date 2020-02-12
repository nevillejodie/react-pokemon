const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "35.246.46.106",
  database: "postgres",
  password: "lAmEy0NiOa4nbLlb"
});
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
