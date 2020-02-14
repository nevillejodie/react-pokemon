const express = require("express");
const cors = require("cors");
const pokemonRouter = require("./routes/pokemon");

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  console.log(`${req.method} to ${req.url}`);
  next();
});

/* app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */

app.use(cors());
app.use(express.json());

app.use(pokemonRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
