let BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
let searchInput = document.querySelector("#searchInp");
let searchBtn = document.querySelector(".searchBtn");
let errorDiv = document.querySelector(".error-div");
let mainPokemon = document.querySelector(".main");
let logo = document.querySelector("#logo");
let pokemonName = document.querySelector(".pokemonName");

searchBtn.addEventListener("click", async function () {
  try {
    let response = await axios.get(BASE_URL + searchInput.value.toLowerCase());
    displayPokemon(response.data);
  } catch (error) {
    errorMessage();
  }
});
function errorMessage() {
  errorDiv.innerHTML = "";
  errorDiv.style.display = "flex";
  let errorM = document.createElement("p");
  errorM.innerText = "We don't know that pokemon!";
  errorDiv.insertAdjacentElement("beforeend", errorM);
}
function displayPokemon(data) {
  let name = data.forms[0].name;
  mainPokemon.style.display = "flex";
  logo.src = data.sprites.other.dream_world.front_default;
  pokemonName.innerText = name.toUpperCase()[0] + name.slice(1, name.length);
}
