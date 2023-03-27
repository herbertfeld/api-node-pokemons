const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')

app.listen('3001')

//middleware
app.use(express.json(), cors())


var PokemonJson = { "results": [{ "name": "pikachu", "url": "https://pokeapi.co/api/v2/pokemon-species/25/" }] }
var pokebolaArrays = Object.keys(PokemonJson).map(i => PokemonJson[Number(i)]);

//get routes
app.route('/api').get((req, res) => res.send('Índice<br> - Rota "/pokelista" Traz lista de personagens<br> - Rota "/pokemon/id" (verbo POST) retorna detalhes do personagem. <br> - Rota "/favorito" (verbo POST) adiciona um novo Pokemon aos seus favoritos BODY/Raw <br> - Rota "/pokemon/id" busca (verbo GET), edita (verbo PUT) e deleta personagem dos seus favoritos(verbo DELETE)<br>'))
app.route('/api/pokelista').get((req, res) => {
  if (req.query.name) {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + req.query.name)
      .then(result => res.send({ "results": [{ "name": req.query.name, "url": "" }] }))
      .catch(err => res.send({ "results": [{ "name": "Nenhum resultado", "url": "" }] }))
  } else {

    axios.get('https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=30')
      .then(result => res.send(result.data))
      .catch(err => res.send('Não foi possível atender sua solicitação.'))

  }
})

app.route('/api/pokemon/img/:name').get((req, res) => {

  axios.get('https://pokeapi.co/api/v2/pokemon/' + req.params.name)
    .then(result => res.send(result.data.sprites.other.home))
    .catch(err => res.send('Não foi possível atender sua solicitação.'))
})

app.route('/api/pokemon/ability/:name').get((req, res) => {

  axios.get('https://pokeapi.co/api/v2/pokemon/' + req.params.name)
    .then(result => res.send(result.data.abilities[0].ability))

    .catch(err => res.send('Não foi possível atender sua solicitação.'))
})

app.route('/api/sobre').get((req, res) => {
  axios.get('https://api.github.com/users/herbertfeld')
    .then(result => res.send(result.data))
    .catch(err => res.send('Não foi possível atender sua solicitação.'))
})


//post routes
app.route('/api/pokemon/:id').post((req, res) => {
  const { nome, personalidade, poder, imagem } = req.body
  res.send(`O ${nome} possui uma personalidade ${personalidade}. Seus poderes são ${poder} <br> ${imagem} `)
})

app.route('/api/novo').post((req, res) => {
  i = pokebolaArrays.length
  pokebolaArrays.push({
    id: i + 1,
    name: req.body.name,

  })
  res.send(pokebolaArrays)
})

//put routes
app.route('/api/pokemon/:id').put((req, res) => {

  for (let i = 0; i < pokebolaArrays.length; i++) {
    if (pokemonArrays[i].id == req.params.id) {
      var retPokemon = pokebolaArrays[i]
      pokebolaArrays[i].name = req.body.name

      res.send(req.body)
    }
  }
  if (typeof retPokemon == 'undefined') {
    res.send('Seu livro não foi encontrado!')
  }
})


//delete routes
app.route('/api/pokemon/:id').delete((req, res) => {

  const pokemonId = req.params.id
  pokebolaArrays = pokebolaArrays.filter(pokebolaArrays => Number(pokebolaArrays.id) !== (Number(pokemonId)))
  res.send(pokebolaArrays)

})






