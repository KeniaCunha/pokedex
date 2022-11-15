const pokeApi ={}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemom = new Pokemom()
    pokemom.number = pokeDetail.id
    pokemom.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot)=>typeSlot.type.name)
    const [type] = types

    pokemom.types = types
    pokemom.type = type

    pokemom.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemom
}

//nessa função estamos mapeando uma lista de requisições dos detalhes dos pokemom, da lista estamos transformando ela em json
pokeApi.getPokemomDetail = (pokemom) => {
    return fetch(pokemom.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offSet = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json()) //converte o http response para Json
        .then((jsonBody) => jsonBody.results) //do Json abstraimos os resultados que é a lista
        .then((pokemons) => pokemons.map(pokeApi.getPokemomDetail)) //estamos com a lista de requisiçoes
        .then((detailRequests)=> Promise.all(detailRequests)) //estamos esperando que todas as requisições terminem
        .then((pokemonsDetails)=> pokemonsDetails)//após terminar irá me devolver uma lista com os detalhes dos pokemons

}
