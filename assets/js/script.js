/*fazendo requisição via api
Fetch API, biblioteca integrada ao javascript, nos browser mais modernos*/

// o fetch nos retorna uma promisse,  importante para lidar com o sincronismo no http, por exemplo qdo start uma 
//requisição a resposta ela demora x tempo, tem todo o processamento assincrona, ele será executado mas 
//não tem a resposta de imediato, a PROMESSA ela nada mias é que uma promessa de resultado(response)


//para processsar o sucesso tem o metodo .then, quando der certo chama a função para interpretar a resposta
//catch é o tratamento de erro
//finaly independente do sucesso ou do erro eu vai ser chamado para finalizar o processso

/*o 1º fetch devolveu uma promisse de response, qdo a promisse for resolvida eu vou entra no 2º .then e vou pedir 
para converter o body para json, qdo for convertido eu vou entrar dentro do Json e pegar o results que é minha lista de pokemom,
assim que conseguir pegar eu entro no 3º .then e acesso a lista de pokemom */


const pokemomList = document.getElementById('pokemomList');
const btnCarregar = document.getElementById('btn-carregar');

const maximaQuantidade = 151;
const limit = 12;
let offSet =0;



function carregarMaisPokemom(offSet, limit){
    //requesição http
    pokeApi.getPokemons(offSet, limit).then((pokemons = []) => {
    //pega a lista de pokemom, mapeia e converte para uma lista de li e com o join faz a concatenção de todos os LIs sem separador nenhum, vai se tornar um novo html que vai para o html que estamos manipulando
        const novoHtml = pokemons.map((pokemom)=> `
            <li class="pokemom ${pokemom.type}">
                <span class="id">#${pokemom.number}</span>
                <span class="nome">${pokemom.name}</span>
        
                <div class="detalhes">   
                    <ol class="tipos">
                        ${pokemom.types.map((type)=>`<li class="tipo ${type}">${type}</li>`).join("")}
                    </ol>
                    <img src="${pokemom.photo}" 
                        alt="${pokemom.name}">
                </div>                
                        
            </li>
        `).join("")
        
        pokemomList.innerHTML += novoHtml
    })    
}

carregarMaisPokemom(offSet, limit)


btnCarregar.addEventListener('click', () => {
    offSet += limit

    const qtdRegistros = offSet + limit

    if(qtdRegistros >= maximaQuantidade){
        const novoLimite = maximaQuantidade - offSet
        carregarMaisPokemom(offSet, novoLimite)


        btnCarregar.parentElement.removeChild(btnCarregar)
    }else{
        carregarMaisPokemom(offSet, limit)
    }
})


