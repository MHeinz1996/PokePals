import { useState, useEffect } from 'react'
import axios from 'axios'
import getCookie from '../components/GetCookie'
import Wad from 'web-audio-daw'
import Status from '../components/Status'
import Feed from '../components/Feed'

function Play({user, pokemon, setPokemon}) {
  let species = pokemon.species
  let happiness = pokemon.happiness
  let hunger = pokemon.hunger
  
  useEffect(() => {
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken
    console.log('Play Page', pokemon)
  }, [])
  
  const cryAudio = () => {
    let cry = new Wad({source: `${pokemon.cry}`})
    cry.play()
  }

  const quit = (event) => {
    event.preventDefault()
    // add params to send game info to back end for saving
    axios.post('/logout').then((response) => {
      window.location.href = '/'
    })
  }
  
  const checkLastFed = () => {
    axios.get(`/pokemon/${pokemon.id}/last_fed`).then((response) => {
      // response is difference in hours since the last time pokemon was fed
      let hours_since_fed = +response.data.time_diff
      console.log('Hours since fed:', hours_since_fed)
      if(hours_since_fed > 0) {
        let temp_hunger = hunger
        let temp_happiness = happiness
        for(let i=0; i<hours_since_fed; i++) {
          if(temp_happiness === 0) {
            break
          } else if(temp_hunger === 0) {
            temp_happiness-=2
          } else {
            temp_hunger--
          }
        }

        axios.put(`/pokemon/${pokemon.id}/save_game`, {'hunger': temp_hunger, 'happiness': temp_happiness}).then((response) => {
          setPokemon(response.data)
        })
      }
    })
  }

  setInterval(checkLastFed, 10000) // change interval to 60000 when I get everything working

  return (
    <div>
      <h3>{pokemon.species.charAt(0).toUpperCase() + pokemon.species.slice(1)}</h3>
      <img id="sprite" src={pokemon.sprite} alt={pokemon.species} onClick={() => {cryAudio()}}/>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-2 game-button">
            <Status species={species} hunger={hunger} happiness={happiness}/>
          </div>
          <div className="col-sm-2 game-button">
            <Feed pokemon={pokemon} setPokemon={setPokemon} />
          </div>
          <div className="col-sm-2 game-button">
            <button onClick={quit}>Quit</button>
          </div>    
        </div>
      </div>
    </div>
  )
}

export default Play

/* Notes
Components needed:
- Quit button -> Saves game data to database, logout user, then redirect to login page
- Status button -> Displays Pokemon's Happiness and Hunger levels
- Game button -> Lets user play a game with their Pokemon
- Feed button -> Feeds pokemon and resets their `last_fed` database info, if pokemon has more than 3 stars in hunger, don't let user feed pokemon

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