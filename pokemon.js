const { query } = require("./db/index.js");

async function getPokemon() {
  const data = await query(`SELECT * FROM pokemon`);
  return data.rows;
}

async function getPokemonById(id) {
  const data = await query(`SELECT * FROM pokemon WHERE id = $1`, [id]);
  return data.rows[0];
}

async function getPokemonByName(name) {
  const data = await query(
    `SELECT * FROM pokemon WHERE name ILIKE '%' || $1 || '%'`,
    [name]
  );
  return data.rows[0];
}

async function findPokemonByName(input) {
  const data = await query(
    `SELECT * FROM pokemon WHERE name ILIKE '%' || $1 || '%'`,
    [input]
  );
  return data.rows[0];
}

async function savePokemon({
  pkdx_id,
  name,
  description,
  img_url,
  types,
  evolutions
}) {
  const newP = await query(
    `INSERT INTO pokemon (
  pkdx_id,
  name,
  description, 
  img_url,
  types,
  evolutions
)
VALUES (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6)`,

    [pkdx_id, name, description, img_url, types, evolutions]
  );
  return newP.pokemon;
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  findPokemonByName,
  savePokemon
};
