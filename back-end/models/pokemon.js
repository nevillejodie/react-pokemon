const { query } = require("../db/index.js");

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

async function savePokemon() {
  const { pkdx_id, name, description, img_url, types, evolutions } = pokemon;
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

async function deletePokemonById(id) {
  const res = await query(`DELETE FROM pokemon WHERE id = $1 RETURNING name`, [
    id
  ]);
  if (res.rows > 0) {
    const { name } = res.rows[0];
    return name;
  } else return console.log("No pokemon to delete");
}

async function replacePokemon(body, id) {
  const { pkdx_id, name, description, img_url, types, evolutions } = body;
  const res = await query(
    `UPDATE pokemon SET 
  pkdx_id = $1,
  name = $2,
  description = $3, 
  img_url = $4,
  types = $5,
  evolutions = $6
  WHERE id = $7 
  RETURNING 
  name `,
    [pkdx_id, name, description, img_url, types, evolutions, id]
  );
  return res.rows[0];
}

async function patchPokemon(body, id) {
  const { pkdx_id, name, description, img_url, types, evolutions } = body;
  const res = await query(
    `UPDATE pokemon SET 
  pkdx_id = $1,
  name = $2,
  description = $3, 
  img_url = $4,
  types = $5,
  evolutions = $6
  WHERE id = $7 
  RETURNING 
  name `,
    [pkdx_id, name, description, img_url, types, evolutions, id]
  );
  return res.rows[0];
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  findPokemonByName,
  savePokemon,
  deletePokemonById,
  replacePokemon,
  patchPokemon
};
