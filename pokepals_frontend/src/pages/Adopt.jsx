import axios from 'axios'
import {useState, useEffect} from 'react'
import getCookie from '../components/GetCookie'

function Adopt({user}) {

  const [pokemon, setPokemon] = useState(null)
  const [pokemonList, setPokemonList] = useState([])
  
  useEffect(() => {
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken
    
    let pokemon_list = []
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then((response) => {
      for(let i=0; i<response.data.results.length; i++) {
        let name = response.data.results[i].name
        pokemon_list.push(<li key={i+1}><a className='dropdown-item' onClick={() => {handleClick(i+1)}}>{name}</a></li>)  
      }
      setPokemonList(pokemon_list)
    })
  }, [])
  
  const handleClick = (id) => {
    axios.post(`/pokemon/${id}/${user.id}`).then((response) => {
      console.log(response.data)
    })
  }

  return (
    <div>
      <h1>Adopt a Pokémon</h1>
      <p>Looks like you haven't adopted a pokémon yet</p>
      <div id="dropdown-btn" className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Pokémon
        </button>
        <ul className="dropdown-menu scrollable" aria-labelledby="dropdownMenuButton1">
          {pokemonList}
        </ul>
      </div>
      <div id="StateAbbr" className='row justify-content-center'>
        <div id="Abbr" className="col-sm-6 text-center"></div>
      </div>
    </div> 
  )
}

export default Adopt