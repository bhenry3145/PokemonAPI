import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "./localStorage.js";

// const pokemonSprite = document.getElementById('pokemonSprite');
// const pokemonShinySprite = document.getElementById('pokemonShinySprite');
const fetchPokemon = document.getElementById('fetchPokemon');
const pokeName = document.getElementById('pokeName');
const pokemonFirstEvoName = document.getElementById('pokemonFirstEvoName');
const pokemonSecondEvoName = document.getElementById('pokemonSecondEvoName');
const pokemonThirdEvoName = document.getElementById('pokemonThirdEvoName');
const randomBtn = document.getElementById('randomBtn');
const addToFavorites = document.getElementById('addToFavorites');
const pokemonName = document.getElementById('pokemonName');
const favoritesList = document.getElementById('favoritesList');
const pokemonSprite = document.getElementById('pokemonSprite');
const pokemonShinySprite = document.getElementById('pokemonShinySprite');
const pokemonFirstEvo = document.getElementById('pokemonFirstEvo');
const pokemonSecondEvo = document.getElementById('pokemonSecondEvo');
const pokemonThirdEvo = document.getElementById('pokemonThirdEvo');

const FetchData = async() => {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await promise.json();
    // console.log(data);
    pokeName.innerText = data.species.name.toUpperCase();
    Pokemon(data);
}

const GenerateRandom = async () => {
    let randomPokemon = Math.floor(Math.random() * 649) + 1;
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
    const data = await promise.json();
    pokeName.innerText = data.species.name.toUpperCase();
    pokemonSprite.src = data.sprites.front_default;
    pokemonShinySprite.src = data.sprites.front_shiny;
    Pokemon(data);
}

const GetEvolution = async (data) => {
    // console.log(data);
    let speciesData = await fetch(data.species.url);
    let species = await speciesData.json();
    let evoData = await fetch(species.evolution_chain.url);
    if (!evoData.ok)
    {
        // console.log() make pictures say n/a
    }
    else
    {
        let evoJSON = await evoData.json();
        return evoJSON;
    }
}

const GetLocation = async (data) => {
    let locationData = await fetch(data.location_area_encounters);
    let location = await locationData.json();
    let pokeLocation = document.getElementById('pokeLocation');
    if (locationData == "")
    {
        pokeLocation.innerText = "N/A";
    }
    else
    {
        pokeLocation.innerText = location[0].location_area.name;
    }
}

const Pokemon = async (pokemonData) => {
    pokemonFirstEvo.src = "";
    pokemonSecondEvo.src = "";
    pokemonThirdEvo.src = "";
    GetLocation(pokemonData);
    let evoData = await GetEvolution(pokemonData);
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoData.chain.species.name}`);
    const pokeData = await promise.json();
    if (evoData.chain.evolves_to[0]) {
        const promise2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoData.chain.evolves_to[0].species.name}`);
        const pokeData2 = await promise2.json();
        pokemonSecondEvo.src = pokeData2.sprites.front_default;
    }
    if (evoData.chain.evolves_to[0].evolves_to[0])
    {
        const promise3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoData.chain.evolves_to[0].evolves_to[0].species.name}`);
        const pokeData3 = await promise3.json();
        pokemonThirdEvo.src = pokeData3.sprites.front_default;
    }
    pokemonSprite.src = pokemonData.sprites.front_default;
    pokemonShinySprite.src = pokemonData.sprites.front_shiny;
    pokemonFirstEvo.src = pokeData.sprites.front_default;
    const imgElement = document.getElementById("pokemonSprite");
    const imgElement2 = document.getElementById('pokemonShinySprite');
    const imgElement3 = document.getElementById('pokemonFirstEvoSprite');
    const imgElement4 = document.getElementById('pokemonSecondEvoSprite');
    const imgElement5 = document.getElementById('pokemonThirdEvoSprite');
}

fetchPokemon.addEventListener('click', () => {
    FetchData();
})

randomBtn.addEventListener('click', () => {
    GenerateRandom();
})

addToFavorites.addEventListener('click', () => {
    let userInput = pokemonName.value;
    saveToLocalStorage(userInput);
    LoadFavorites();
})

// LoadFavorites();

// const LoadFavorites = async () => {

//     let localStorage = getFromLocalStorage();
//     favoritesList.innerText = "";
//     localStorage.map(favorites => {
//         let h1tag = document.createElement('h1');
//         let removeButton = document.createElement('button');
//         removeButton.innerText = "x";
//         removeButton.addEventListener('click', () => {
//             removeFromLocalStorage(favorites);
//             h1tag.remove();
//     })
    
//         h1tag.innerText = favorites;
//         h1tag.addEventListener('click', function() {
//             favoritesLoading(favorites);
//         })
//         h1tag.appendChild(removeButton);
//         favoritesList.appendChild(h1tag);
//     })

// }