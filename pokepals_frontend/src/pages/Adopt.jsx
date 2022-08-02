import axios from 'axios'
import {useState, useEffect} from 'react'

function Adopt({user}) {

  const [pokemon, setPokemon] = useState(null)

  let pokemon_list = []

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then((response) => {
      for(let i=0; i<response.data.results.length; i++) {
        let name = response.data.results[i].name
        pokemon_list.push(name)
      }
    })
  }, [])
  
  console.log(pokemon_list)

  return (
    <div>
      <p>Adopt a Pokemon</p>
      {/* Need to figure out how to list out all pokemon in the adoption page */}
      {/* {pokemon_list.map((name) => (<p>{name}</p>))} */}
    </div>
  )
}

export default Adopt