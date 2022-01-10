const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const fetchPokemon = () => {
    const generatePokemonPromisses = () => Array(151).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then((response) => response.json()))
  const pokemonPromises = generatePokemonPromisses();

  const generateHTML = 

  Promise.all(pokemonPromises).then((pokemons) => {
    const listPokemon = pokemons.reduce((accumalator, pokemon) => {
      const types = pokemon.types.map((typeInfo) => typeInfo.type.name);

      accumalator += `
      <li class="card ${types[0]}">
        <img class="card-image" alt="${
          pokemon.name
        }" src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" />
     <h2 class="card-title">${pokemon.id}- ${pokemon.name} </h2>
     <p class="card-subtitle">${types.join(" | ")} </p>
    </li>`;

      return accumalator;
    }, "");

    const ul = document.querySelector('[data-js="pokedex"]');

    ul.innerHTML = listPokemon;
  });
};
fetchPokemon();
