function getRandomPokemons() {
  let randomise = Math.floor(Math.random() * 152);
  fetch(`http://localhost:5000/pokemon/${randomise}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let li = document.querySelector("p");
      li.innerHTML = `<h2>${data.name}</h2>
      <p>Pokedex ID ${data.pkdx_id}</p>
      <img src="${data.img_url}" class="center"/>
      <h3>${data.description}</h3>`;
    });
}

const pokeButton = document.getElementById("pokeBtn");
pokeButton.addEventListener("click", getRandomPokemons);

function append(parent, el) {
  return parent.appendChild(el);
}

function createNode(li, img, span) {
  return document.createElement(li, img, span);
}

const ul = document.getElementById("pokemons");
const url = `http://localhost:5000/pokemon`;

fetch(url)
  .then(resp => resp.json())
  .then(function(data) {
    return data.map(function(data) {
      let li = createNode("li"),
        img = createNode("img"),
        span = createNode("span");
      img.src = `${data.img_url}`;
      span.innerHTML = `${data.description}`;
      append(li, img);
      append(li, span);
      append(ul, li);
    });
  })
  .catch(function(error) {
    console.log(error);
  });

const pokeButton1 = document.getElementById("allBtn");
pokeButton1.addEventListener("click", getAllPokemon());

/* function listAllPokemon() {
  fetch("http://localhost:5000/pokemon")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let pokemon = data.results;
      return pokemon.map(function() {
        let li = document.querySelector("li");
        li.innerHTML = `<h2>${pokemon.name}</h2>
      <p>Pokedex ID ${pokemon.pkdx_id}</p>
      <h3>${pokemon.description}</h3>`;
      });
    });
} */
