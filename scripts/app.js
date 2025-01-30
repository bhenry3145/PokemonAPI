import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "./localStorage.js";

// const pokemonSprite = document.getElementById('pokemonSprite');
// const pokemonShinySprite = document.getElementById('pokemonShinySprite');
const fetchPokemon = document.getElementById('fetchPokemon');
const pokeName = document.getElementById('pokeName');
const pokemonFirstEvoName = document.getElementById('pokemonFirstEvoName');
const pokemonSecondEvoName = document.getElementById('pokemonSecondEvoName');
const pokemonThirdEvoName = document.getElementById('pokemonThirdEvoName');
const randomBtn = document.getElementById('randomBtn');

// pokemonSecondEvoName = data.chain.evolves_to[0].species.name;
// pokemonThirdEvoName = data.chain.evolves_to[0].evolves_to[0].species.name;
// console.log(pokemonFirstEvoName);
// console.log(pokemonSecondEvoName);
// console.log(pokemonThirdEvoName);

async function FetchData() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await promise.json();
    pokeName.innerText = data.species.name.toUpperCase();
    return data;
}

async function GenerateRandom() {
    let randomPokemon = Math.floor(Math.random() * 649) + 1;
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
    const data = await promise.json();
    pokeName.innerText = data.species.name.toUpperCase();
    pokemonSprite.src = data.sprites.front_default;
    pokemonShinySprite.src = data.sprites.front_shiny;
    // pokemonFirstEvo.src = pokeData.sprites.front_default;
    // pokemonSecondEvo.src = pokeData2.sprites.front_default;
    // pokemonThirdEvo.src = pokeData3.sprites.front_default;
    return data;
}

async function GetEvolution(data) {
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

async function GetLocation(data) {
    let locationData = await fetch(data.location_area_encounters.url);
    let location = await locationData.json();
}

async function Pokemon() {
    let data = await FetchData();
    let evoData = await GetEvolution(data);
    console.log(evoData.chain);
    // let locationData = await GetLocation(data);
    // let pokeLocation = document.getElementById('pokeLocation');
    // pokeLocation.innerText = location[0].location_area.name;
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoData.chain.species.name}`);
    const pokeData = await promise.json();
    console.log(pokeData);
    const promise2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeData.species.name}`);
    const pokeData2 = await promise2.json();
    console.log(pokeData2);
    const promise3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeData2.species.name}`);
    const pokeData3 = await promise3.json();
    console.log(pokeData3);
    let pokemonSprite = document.getElementById('pokemonSprite');
    let pokemonShinySprite = document.getElementById('pokemonShinySprite');
    let pokemonFirstEvo = document.getElementById('pokemonFirstEvo');
    let pokemonSecondEvo = document.getElementById('pokemonSecondEvo');
    let pokemonThirdEvo = document.getElementById('pokemonThirdEvo');
    pokemonSprite.src = data.sprites.front_default;
    pokemonShinySprite.src = data.sprites.front_shiny;
    pokemonFirstEvo.src = pokeData.sprites.front_default;
    pokemonSecondEvo.src = pokeData2.sprites.front_default;
    pokemonThirdEvo.src = pokeData3.sprites.front_default;
    const imgElement = document.getElementById("pokemonSprite");
    const imgElement2 = document.getElementById('pokemonShinySprite');
    const imgElement3 = document.getElementById('pokemonFirstEvoSprite');
    const imgElement4 = document.getElementById('pokemonSecondEvoSprite');
    const imgElement5 = document.getElementById('pokemonThirdEvoSprite');
}

fetchPokemon.addEventListener('click', () => {
    FetchData();
    Pokemon();
})

randomBtn.addEventListener('click', () => {
    GenerateRandom();
})