// creating variables
// catching html variables
const sprite = document.getElementById('sprite')
const pokemonName = document.getElementById('name')
const pokedexNumber = document.getElementById('pokedexNumber')
const entry = document.getElementById('entry')
const genera = document.getElementById('genera')

// getting user interaction
const shinyRadios = document.querySelectorAll('input[name="shiny"]')
const btnPrevious = document.getElementById('prev')
const btnNext = document.getElementById('next')
let isShiny = document.querySelector('input[name="shiny"]:checked').value

// creating variables
const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/' // get sprite, name, pokedex number
const familyUrl = 'https://pokeapi.co/api/v2/pokemon-species/' // get pokedex entry
const maxPokedexNumber = 1025 // last number in the national pokédex (change in the future - gen10 launch)
let currentValue = 1 // first pokémon

// functions
// function to normalize input
function normalizeInputs(pokemonName){
    return pokemonName
        .toLowerCase()
        .replace(' ', '-')
}

// function to normalize pokémon names
function normalizeNames(pokemonName){
    return pokemonName
        .replace('-', ' ')
}

// function to put the input in variables
function handleSubmit(){
    const value = document.getElementById('pokemon').value
    getPokemon(normalizeInputs(value))
}

// function to get json from urls
// using async to wait for jsons (shout out to stackoverflow!)
async function getJson(url) {
    return await (await fetch(url)).json()
}

// function to change between normal and shiny sprites
function changeSprites(jsonObject){
    if (isShiny === 'true') sprite.src = jsonObject.sprites.other['official-artwork'].front_shiny
    else sprite.src = jsonObject.sprites.other['official-artwork'].front_default
}

// get pokémon information
let scopeJson // i had to do that :(
function getPokemon(nameOrId){
    (async () => {
        // inserting values to url
        let currentPokemonUrl = pokemonUrl + nameOrId
        let currentFamilyUrl = familyUrl + nameOrId

        // getting principal json
        let jsonPokemon = await getJson(currentPokemonUrl)
        scopeJson = jsonPokemon

        // filling pokémon information
        pokemonName.innerText = normalizeNames(jsonPokemon.name)
        currentValue = jsonPokemon.id // updates current value
        pokedexNumber.innerText = '#' + currentValue.toString().padStart(3, '0')  // zeros to the left
        changeSprites(jsonPokemon)

        // getting pokedex entry json
        let jsonFamily = await getJson(currentFamilyUrl)

        // filling entry information
        jsonFamily['flavor_text_entries'].forEach((entries) => {
            // search only for english entries
            if (entries.language.name === 'en'){
                entry.innerText = entries.flavor_text
                    .replace(/\n/g, ' ').replace('é', 'É')
            }
        })

        // filliing genera information
        jsonFamily['genera'].forEach((genus) => {
            // search only for the english genera
            if (genus.language.name === 'en'){
                genera.innerText = genus.genus
            }
        })
    })()
}

// event listeners
btnNext.addEventListener('click', () => {
    // if is bigger than the max, reset
    (currentValue < maxPokedexNumber) ? currentValue ++ : currentValue = 1
    getPokemon(currentValue)
})

btnPrevious.addEventListener('click', () => {
    // if is smaller than the min, go to the max
    (currentValue <= 1) ? currentValue = maxPokedexNumber : currentValue --
    getPokemon(currentValue)
})

// shiny radio event listener
// check all the options
shinyRadios.forEach(radio => {
    // if it changes
    radio.addEventListener('change', () =>{
        // get shiny sprites
        isShiny = radio.value // true or false
        changeSprites(scopeJson)
    })
})

// load pokémon
getPokemon(currentValue)
