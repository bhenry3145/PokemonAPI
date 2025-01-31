import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "./localStorage.js";

// const pokemonSprite = document.getElementById('pokemonSprite');
// const pokemonShinySprite = document.getElementById('pokemonShinySprite');
const fetchPokemon = document.getElementById('fetchPokemon');
const pokeName = document.getElementById('pokeName');
const pokeTypes = document.getElementById('pokeTypes');

const randomBtn = document.getElementById('randomBtn');
const addToFavorites = document.getElementById('addToFavorites');
const pokemonName = document.getElementById('pokemonName');
const favoritesList = document.getElementById('favoritesList');
const pokemonSprite = document.getElementById('pokemonSprite');
const pokemonShinySprite = document.getElementById('pokemonShinySprite');
const pokemonFirstEvo = document.getElementById('pokemonFirstEvo');
const pokemonSecondEvo = document.getElementById('pokemonSecondEvo');
const pokemonThirdEvo = document.getElementById('pokemonThirdEvo');
const pokemonFourthEvo = document.getElementById('pokemonFourthEvo');
const pokemonFifthEvo = document.getElementById('pokemonFifthEvo');
const pokemonSixthEvo = document.getElementById('pokemonSixthEvo');
const pokemonSeventhEvo = document.getElementById('pokemonSeventhEvo');
const pokemonEighthEvo = document.getElementById('pokemonEighthEvo');
const displayFavorites = document.getElementById('displayFavorites');
const closeFavorites = document.getElementById('closeFavorites');
const displayAbilities = document.getElementById('displayAbilities');
const closeAbilities = document.getElementById('closeAbilities');
const abilitiesList = document.getElementById('abilitiesList');
const displayMoves = document.getElementById('displayMoves');
const closeMoves = document.getElementById('closeMoves');
const movesList = document.getElementById('movesList');
const evolutionContainer = document.getElementById('evolutionContainer');

const FetchData = async() => {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await promise.json();
    if (data.id > 649)
    {
        pokeName.innerText = "GENS 1 - 5 ONLY";
        return;
    }
    pokeName.innerText = data.species.name.toUpperCase();
    let typeArray = [];
    for (let i = 0; i < data.types.length; i++)
    {
        typeArray.push(data.types[i].type.name);
    }
    pokeTypes.innerText = typeArray.join(" ").toUpperCase();

    let movesArray = [];
    for (let i = 0; i < data.moves.length; i++)
    {
        movesArray.push(data.moves[i].move.name);
    }
    movesList.innerText = movesArray.join(", ").toUpperCase();

    let abilitiesArray = [];
    for (let i = 0; i < data.abilities.length; i++)
    {
        abilitiesArray.push(data.abilities[i].ability.name);
    }
    abilitiesList.innerText = abilitiesArray.join(",").toUpperCase();

    Pokemon(data);
}

const getEevee = async (data) => {

    let eeveeArray = [];
    for (let i = 0; i < data.chain.evolves_to.length; i++)
    {
        eeveeArray.push(data.chain.evolves_to[i].species.name);
    }
    console.log(eeveeArray);
}

const GenerateRandom = async () => {
    let randomPokemon = Math.floor(Math.random() * 649) + 1;
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
    const data = await promise.json();
    pokeName.innerText = data.species.name.toUpperCase();
    pokemonSprite.src = data.sprites.other["official-artwork"].front_default;
    pokemonShinySprite.src = data.sprites.other["official-artwork"].front_shiny;
    let typeArray = [];
    for (let i = 0; i < data.types.length; i++)
    {
        typeArray.push(data.types[i].type.name);
    }
    pokeTypes.innerText = typeArray.join(" ").toUpperCase();

    let movesArray = [];
    for (let i = 0; i < data.moves.length; i++)
    {
        movesArray.push(data.moves[i].move.name);
    }
    movesList.innerText = movesArray.join(", ").toUpperCase();

    let abilitiesArray = [];
    for (let i = 0; i < data.abilities.length; i++)
    {
        abilitiesArray.push(data.abilities[i].ability.name);
    }
    abilitiesList.innerText = abilitiesArray.join(", ").toUpperCase();

    pokemonName.value = "";
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
    evolutionContainer.innerHTML = "";
    GetLocation(pokemonData);
    let evoData = await GetEvolution(pokemonData);
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoData.chain.species.name}`);
    const pokeData = await promise.json();
    let eevee = document.createElement('img');
    eevee.src = pokeData.sprites.front_default;
    eevee.classList.add('bg-[#FAD69F]', 'w-[75px]', 'h-[75px]', 'md:w-[125px]', 'md:h-[125px]', 'lg:w-[150px]', 'lg:h-[150px]', 'self-center', 'rounded-[15px]')
    evolutionContainer.appendChild(eevee);
    for (let i = 0; i < evoData.chain.evolves_to.length; i++)
    {
        const eeveePromise = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoData.chain.evolves_to[i].species.name}`);
        const eeveeData = await eeveePromise.json();
        let eevee2 = document.createElement('img');
        eevee2.src = eeveeData.sprites.other["official-artwork"].front_default;
        eevee2.classList.add('bg-[#FAD69F]', 'w-[75px]', 'h-[75px]', 'md:w-[125px]', 'md:h-[125px]', 'lg:w-[150px]', 'lg:h-[150px]', 'self-center', 'rounded-[15px]', 'm-2')
        evolutionContainer.appendChild(eevee2);
        for (let j = 0; j < evoData.chain.evolves_to[i].evolves_to.length; j++)
            {
                const eeveePromise2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoData.chain.evolves_to[i].evolves_to[j].species.name}`);
                const eeveeData2 = await eeveePromise2.json();
                let eevee3 = document.createElement('img');
                eevee3.src = eeveeData2.sprites.other["official-artwork"].front_default;
                eevee3.classList.add('bg-[#FAD69F]', 'w-[75px]', 'h-[75px]', 'md:w-[125px]', 'md:h-[125px]', 'lg:w-[150px]', 'lg:h-[150px]', 'self-center', 'rounded-[15px]')
                evolutionContainer.appendChild(eevee3);
            }
    }
    
    pokemonSprite.src = pokemonData.sprites.other["official-artwork"].front_default;
    pokemonShinySprite.src = pokemonData.sprites.other["official-artwork"].front_shiny;
    
}

fetchPokemon.addEventListener('click', () => {
    FetchData();
})

randomBtn.addEventListener('click', () => {
    GenerateRandom();
})

displayFavorites.addEventListener('click', () => {
    favorites.classList.toggle('hidden');
})

closeFavorites.addEventListener('click', () => {
    favorites.classList.toggle('hidden');
})

displayAbilities.addEventListener('click', () => {
    abilities.classList.toggle('hidden');
})

closeAbilities.addEventListener('click', () => {
    abilities.classList.toggle('hidden');
})

displayMoves.addEventListener('click', () => {
    moves.classList.toggle('hidden');
})

closeMoves.addEventListener('click', () => {
    moves.classList.toggle('hidden');
})

addToFavorites.addEventListener('click', function(event) {
    let userInput = pokeName.innerText;
    if (pokeName.innerText == "NAME")
    {
        return;
    }
    saveToLocalStorage(userInput);
    LoadFavorites();
})



const LoadFavorites = async () => {

    let localStorage = getFromLocalStorage();
    favoritesList.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++)
    {
        
        let liTag = document.createElement('li');
        let removeButton = document.createElement('button');
        removeButton.innerText = "X";
        removeButton.classList.add('m-2');
        removeButton.addEventListener('click', () => {
            removeFromLocalStorage(localStorage[i]);
            LoadFavorites();
    })
        liTag.innerText = localStorage[i];
        liTag.addEventListener('click', function() {
        })
        liTag.appendChild(removeButton);
        favoritesList.appendChild(liTag);
    }
}

LoadFavorites();