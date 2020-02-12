const express = require("express");
const app = express();
const PORT = 5000;
const pokemonRouter = require("./pokemonRoute");

app.use((req, res, next) => {
  console.log("request received");
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use(pokemonRouter);

app.get("/pokemon", async (req, res) => {
  const pokemon = await getPokemon();
  res.json(pokemon);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get("/pokemon/:pokemonId", async (req, res) => {
  const { pokemonId } = req.params;
  const pokemon = await getPokemonById(pokemonId);
  res.json(pokemon);
});
