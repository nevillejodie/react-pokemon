const express = require("express");
const {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  findPokemonByName,
  savePokemon
} = require("./pokemon.js");
const router = express.Router();

router.get("/pokemon", async (req, res) => {
  const { name, search } = req.query;

  if (name) {
    const namedPokemon = await getPokemonByName(name);
    res.json(namedPokemon);
    return;
  }
  if (search) {
    const namedPokemon = await findPokemonByName(search);
    res.json(namedPokemon);
    return;
  }
  const pokemon = await getPokemon();
  res.json(pokemon);
});

router.get("/pokemon/:pokemonId", async (req, res) => {
  const { pokemonId } = req.params;
  const pokemon = await getPokemonById(pokemonId);
  res.json(pokemon);
});

router.post("/pokemon", async (req, res) => {
  const { body } = req;
  await savePokemon(body);
  res.send("you have made a post request");
});

module.exports = router;
