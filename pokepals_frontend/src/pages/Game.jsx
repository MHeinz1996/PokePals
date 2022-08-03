import {useState, useEffect} from 'react'
import axios from 'axios'
import Play from './Play'

function Game({user, pokemon, setPokemon}) {  

  // Query backend for pokemon info
  // If user has not adopted a pokemon, allow them to select a pokemon to adopt
  // If they DO have an adopted pokemon, load that pokemon's data from the database
  useEffect(() => {
    axios.get('/pokemon', {'user': user}).then((response) => {
      console.log(response)
      if(response.data.success === false) {
        window.location.href = '/#/adopt'
      } else {
        // console.log(response)
        setPokemon(response.data)
      }
    })
  }, [])

  const play = () => {
    window.location.href = '/#/play'
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={play}>Play</button>
    </div>
  )
}

export default Game