Bowen Henry
1/31/2025

Description:

Create a single page pokemon application using the Pokemonapi


Requirements:

using the Pokemon API https://pokeapi.co/
Ability to search by name and Pokedex Number
only Gen 1 - 5 pokemon
Ability to search by name and Pokedex Number
Ability to get a random pokemon
image of pokemon and shiny form
Pokemon Name
show 1 location from any game. If pokemon doesn't have a location, have it return "N/A"
Element Typing
All possible abilities
All possible moves
Show Evolutionary Paths, if pokemon doesn't have an evolutionary path, have it return "N/A"
And a Favorites list utilizing local storage
Fully Responsive using Tailwind CSS https://tailwindcss.com
Have a Prototype in Figma (Desktop, Tablet, Mobile)

Peer Review: robert g
- i wasnt able to run ``npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch`` from my pov it looks good
- the enter button does not work for input box you can try this

``
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        submit.click();
    }
});
``