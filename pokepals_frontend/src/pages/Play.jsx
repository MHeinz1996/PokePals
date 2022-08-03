import {useState, useEffect} from 'react'
import axios from 'axios'
import getCookie from '../components/GetCookie'
import Wad from 'web-audio-daw'
import Status from '../components/Status'

function Play({user, pokemon, setPokemon}) {
  let path = ''
  useEffect(() => {
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken

    axios.get(`/pokemon/${pokemon.id}/${pokemon.trainer}`).then((response) => {
      path = response.data.path
      console.log(`${path}${pokemon.cry}`)
    })
  }, [])
  
  // GET http://localhost:8000/pokepals_proj/media/cries/pokemon7.wav 404 (Not Found)
  // is there any way to set the source as a file located in my project?
  const cryAudio = () => {
    let cry = new Wad({source: `../../../pokepals_proj${pokemon.cry}`})
    cry.play()
  }

  // same error as Wad
  // const cryAudio = () => {
  //   const cry = new Audio(`../../../pokepals_proj${pokemon.cry}`)
  //   cry.play()
  // }

  return (
    <div>
      <img id="sprite" src={pokemon.sprite} alt={pokemon.species} onClick={() => {cryAudio()}}/>
      <Status pokemon={pokemon} />
    </div>
  )
}

export default Play

/* Notes
Components needed:
- Quit button -> Saves game data to database, logout user, then redirect to login page
- Status button -> Displays Pokemon's Happiness and Hunger levels
- Game button -> Lets user play a game with their Pokemon
- Feed button -> Feeds pokemon and resets their `last_fed` database info

Game(play with pokemon) logic needed:
- Have game set and interval to check when the pokemon was fed last
  - For every hour not fed, reduce its hunger level by 1
  - if hunger level is at 0, instead, reduce happiness level by 2
- Game button logic
  - Display a number from 1-9 on the screen. User can guess if the next number will be higher or lower than the first number
  - if user gets the question correct, pokemon gains 1 point in happiness
  - if user gets the question wrong, pokemon loses 1 point in happiness
  - if time allows at all, maybe switch game to "Who's that pokemon?!"
 */