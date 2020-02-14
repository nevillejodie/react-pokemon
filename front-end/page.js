function getPokemons() {
  let randomise = Math.floor(Math.random() * 152);
  fetch(`http://localhost:5000/pokemon/${randomise}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let li = document.querySelector("li");
      li.innerHTML = `<h2>${data.name}</h2>
      <p>Pokedex ID ${data.pkdx_id}</p>
      <img src="${data.img_url}" class="center"/>
      <h3>${data.description}</h3>`;
    });
}

const pokeButton = document.getElementById("pokeBtn");
pokeButton.addEventListener("click", getPokemons);
