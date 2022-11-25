let BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
let searchInput = document.querySelector("#searchInp");
let searchBtn = document.querySelector(".searchBtn");
let errorDiv = document.querySelector(".error-div");
let mainPokemon = document.querySelector(".main");
let logo = document.querySelector("#logo");
let pokemonName = document.querySelector(".pokemonName");
let viewAll = document.querySelector(".viewAll");
let container = document.querySelector(".container");
viewAll.addEventListener("click", async function () {
  container.style.display = "none";
  let response = await axios.get(BASE_URL);
  let data = response.data.results;
  displayAllPokemon(data);
});
async function displayAllPokemon(data) {
  data.forEach(async function (el) {
    let response = await axios.get(el.url);
    console.log(response);
  });
}
searchBtn.addEventListener("click", fetchFunction);

async function fetchFunction() {
  try {
    let response = await axios.get(BASE_URL + searchInput.value.toLowerCase());
    displayPokemon(response.data);
  } catch (error) {
    if (error.response.status === 404) {
      errorMessage();
    }
    console.log(error);
  }
}
function errorMessage() {
  errorDiv.innerHTML = "";
  mainPokemon.style.display = "none";
  errorDiv.style.display = "flex";
  let errorM = document.createElement("p");
  errorM.innerText = "We don't know that pokemon!";
  errorDiv.insertAdjacentElement("beforeend", errorM);
}
function displayPokemon(data) {
  console.log(data);
  errorDiv.style.display = "none";
  let name = data.forms[0].name;
  let typeName = data.types[0].type.name;
  mainPokemon.style.display = "flex";
  logo.src = data.sprites.other.dream_world.front_default;
  pokemonName.innerText = name.toUpperCase()[0] + name.slice(1, name.length);
  document.querySelector(".hpText").innerHTML = `HP ${data.stats[0].base_stat}`;
  document.querySelector(".xpText").innerHTML = `XP ${data.base_experience}`;
  document.querySelector(".weight").innerHTML = `${data.weight}kg`;
  document.querySelector(".height").innerHTML = `${data.height}m`;
  document.querySelector(".fire").innerHTML = `${
    typeName.toUpperCase()[0] + typeName.slice(1, typeName.length)
  }`;
  document.querySelector(".dust").innerHTML = `${Math.floor(
    Math.random() * 1000
  )}`;
  document.querySelector(".candy").innerHTML = `${Math.floor(
    Math.random() * 500
  )}`;
}
