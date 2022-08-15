import {useState, useEffect} from 'react'
import axios from 'axios'

function Game({user, pokemon, setPokemon}) {  
  // Query backend for pokemon info
  // If user HASN'T adopted a pokemon, allow them to select a pokemon to adopt
  // If user HAS adopted  a pokemon, load that pokemon's data from the database
  useEffect(() => {
    document.body.classList.remove('pokeball-wallpaper')
    document.body.classList.add('pokemon-field');
    axios.get('/pokemon', {'user': user}).then((response) => {
      if(response.data.success === false) {
        window.location.href = '/#/adopt'
      } else {
        // console.log(response)
        setPokemon(response.data)
        window.location.href = '/#/play'
      }
    })
  }, [])

  return (
    <div>
    </div>
  )
}

export default Game