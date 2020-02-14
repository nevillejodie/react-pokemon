const { query } = require("../index.js");

const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const path = require("path");

async function uploadPoke() {
  const data = await readFile(path.join(__dirname, "..", "..", "pokedex.json"));
  const pokemon = JSON.parse(data);
  console.log(pokemon[0]);

  for (let i = 0; i < pokemon.length; i++) {
    const { pkdx_id, name, description, img_url, types, evolutions } = pokemon[
      i
    ];

    const res = await query(
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
    console.log(name);
  }
}
uploadPoke();
