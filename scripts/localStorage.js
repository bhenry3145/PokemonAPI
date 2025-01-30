function saveToLocalStorage(pokemonName){

    let nameArr = getFromLocalStorage();

    if (!nameArr.includes(pokemonName)){
        nameArr.push(pokemonName);
    }

    localStorage.setItem('Pokemon Names', JSON.stringify(nameArr));

}

function getFromLocalStorage(){
    let localStorageData = localStorage.getItem('Pokemon Names');

    if (localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);

}

function removeFromLocalStorage(pokemonName){
    let localStorageData = getFromLocalStorage();

    let nameIndex = localStorageData.indexOf(pokemonName);

    localStorageData.splice(nameIndex, 1);

    localStorage.setItem('Pokemon Names', JSON.stringify(localStorageData));

}

export { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage }