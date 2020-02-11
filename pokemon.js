const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function getPokemon() {
  const data = await readFile("pokedex.json");
  const pokemon = JSON.parse(data);
  return pokemon;
}

async function getPokemonById(id) {
  const pokemon = await getPokemon();
  return pokemon.find(item => item.pkdx_id == id);
}

async function getPokemonByName(name) {
  const pokemon = await getPokemon();
  return pokemon.find(item => item.name.toLowerCase() == name.toLowerCase());
}

async function findPokemonByName(input) {
  const pokemon = await getPokemon();
  return pokemon.filter(item =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );
}

async function savePokemon(pokemon) {
  const pokemonArray = await getPokemon();
  const newArray = [...pokemonArray, pokemon];
  await writeFile("pokedex.json", JSON.stringify(newArray));
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  findPokemonByName,
  savePokemon
};
