const pokeCard = document.querySelector("[data-poke-card]");
const pokeName = document.querySelector("[data-poke-name]");
const pokeImg = document.querySelector("[data-poke-img]");
const pokeImgContainer = document.querySelector("[data-poke-img-container]");
const pokeId = document.querySelector("[data-poke-id]");
const pokeTypes = document.querySelector("[data-poke-types]");
const pokeStats = document.querySelector("[data-poke-stats]");

const typeColors = {
    electric: "#FFEA70",
    normal: "#B09398",
    fire: "#FF675C",
    water: "#0596C7",
    ice: "#AFEAFD",
    rock: "#999799",
    flying: "#7AE7C7",
    grass: "#4A9681",
    psychic: "#FFC6D9",
    ghost: "#561D25",
    bug: "#A2FAA3",
    poison: "#795663",
    ground: "#D2B074",
    dragon: "#DA627D",
    steel: "#1D8A99",
    fighting: "#2F2F2F",
    default: "#2A1A1F",
}; //Colors of each type

const searchPokemon = (event) => {
    event.preventDefault(); //Prevent the form from submitting
    const { value } = event.target.pokemon; //Get the value of the input
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then((data) => data.json()) //Convert the data to json
        .then((response) => renderPokemonData(response)) //Render the data
        .catch((err) => renderNotFound()); //Render the error
};

const renderPokemonData = (data) => {
    const sprite = data.sprites.front_default; //Get the sprite of the pokemon
    const { stats, types } = data; //Get the stats and types of the pokemon

    pokeName.textContent = data.name; //Set the name of the pokemon
    pokeImg.setAttribute("src", sprite); //Set the sprite of the pokemon
    pokeId.textContent = `Nº ${data.id}`; //Set the id of the pokemon
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
};

const setCardColor = (types) => {
    const colorOne = typeColors[types[0].type.name]; //Get the color of the first type
    const colorTwo = types[1] ?
        typeColors[types[1].type.name] :
        typeColors.default; //Get the color of the second type if it exists
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = " 5px 5px";
};

const renderPokemonTypes = (types) => {
    pokeTypes.innerHTML = "";
    types.forEach((type) => {
        const typeTextElement = document.createElement("div"); //Create a div for each type
        typeTextElement.style.color = typeColors[type.type.name]; //Set the color of the type
        typeTextElement.textContent = type.type.name; //Set the name of the type
        pokeTypes.appendChild(typeTextElement); //Append the type to the container
    });
};

const renderPokemonStats = (stats) => {
    pokeStats.innerHTML = "";
    stats.forEach((stat) => {
        const statElement = document.createElement("div"); //Create a div for each stat
        const statElementName = document.createElement("div"); //Create a div for the name of the stat
        const statElementAmount = document.createElement("div"); //Create a div for the amount of the stat
        statElementName.textContent = stat.stat.name; //Set the name of the stat
        statElementAmount.textContent = stat.base_stat; //Set the amount of the stat
        statElement.appendChild(statElementName); //Append the name to the stat
        statElement.appendChild(statElementAmount); //Append the amount to the stat
        pokeStats.appendChild(statElement); //Append the stat to the container
    });
};

const renderNotFound = () => {
    pokeName.textContent = "No encontrado";
    pokeImg.setAttribute("src", "poke-shadow.png");
    pokeImg.style.background = "#fff";
    pokeTypes.innerHTML = "";
    pokeStats.innerHTML = "";
    pokeId.textContent = "";
};