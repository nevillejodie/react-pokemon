const express = require("express");

const {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  findPokemonByName,
  savePokemon,
  deletePokemonById,
  replacePokemon,
  patchPokemon
} = require("../models/pokemon.js");
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

router.delete("/pokemon/:pokemonId", async (req, res) => {
  const { pokemonId } = req.params;
  const name = await deletePokemonById(pokemonId);
  if (name) {
    res.status(200).send(`you have deleted a pokemon ${name}`);
  } else res.status(406).send(`There is no Pokemon`);
});

router.put("/pokemon/:id", async (req, res) => {
  const { body } = req;
  const id = req.params.id;
  const result = await replacePokemon(body, id);
  res.send("you have added a pokemon");
});

router.patch("/pokemon/:id", async (req, res) => {
  const { body } = req;
  const id = req.params.id;
  const result = await patchPokemon(body, id);
  res.send("you have patched a pokemon");
});

module.exports = router;
