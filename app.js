const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    accumulator += `
        <li class="card ${elementTypes[0]}">
            <img class="card-image " alt ="${name}" src="https://cdn.traction.one/pokedex/pokemon/${id}.png"/>   
                <h2 class="card-title">${id}. ${name}</h2>
                <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>`
    return accumulator
}, "")

const insertPokemonIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokemonzinho"]')
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonIntoPage);
