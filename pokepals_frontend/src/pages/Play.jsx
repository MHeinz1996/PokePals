import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import getCookie from '../components/GetCookie'
import Wad from 'web-audio-daw'
import Status from '../components/Status'
import Feed from '../components/Feed'
import Play_w_Pokemon from '../components/Play_w_Pokemon'

function Play({user, pokemon, setPokemon}) {
  const [happinessState, setHappinessState] = useState(pokemon.happiness)
  const [hungerState, setHungerState] = useState(pokemon.hunger)
  const [info, setInfo] = useState(false)
  let species = pokemon.species
  let happiness = pokemon.happiness
  let hunger = pokemon.hunger
  
  useEffect(() => {
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken
    console.log('Play Page', pokemon)
    checkLastFed()
  }, [])
  
  const cryAudio = () => {
    // Uses Raphael's NPM module to play the pokemon's cry when clicked
    let cry = new Wad({source: `${pokemon.cry}`})
    cry.play()
  }

  const quit = (event) => {
    event.preventDefault()
    axios.post('/logout').then((response) => {
      window.location.href = '/'
    })
  }
  
  const checkLastFed = () => {
    axios.get(`/pokemon/${pokemon.id}/last_fed`).then((response) => {
      // response is time difference (in hours) since the last time pokemon was fed
      let hours_since_fed = +response.data.time_diff
      console.log(`Hours since fed last: ${hours_since_fed}`)
      if(hours_since_fed > 0) {
        // set temp vars to database's values
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

        // set the states so I can manipulate frontend components
        // without messing with the database
        setHappinessState(temp_happiness)
        setHungerState(temp_hunger)
      }
    })
  }

  // Check to see when the pokemon was fed last
  // then set the hunger and happiness level of the pokemon accordingly
  setInterval(checkLastFed, 60000)

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-1"> </div>
          <div className="col-sm-10">
            <h2>{pokemon.species.charAt(0).toUpperCase() + pokemon.species.slice(1)}</h2>
          </div>
          <div className="col-sm-1">
            <Button variant='light info-button' onClick={() => setInfo(!info)}>info</Button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          { info &&
            <div id='info1' className="col-sm-2">
              <h6>PokéPals!</h6>
              <p>Take care of your Pokémon! If they are hungry, they will get upset. If they are very upset, they might even runaway! If you choose to, you can release your Pokémon. THIS CANNOT BE UNDONE</p>
              <Button variant='danger'>Release Pokémon</Button>
            </div>
          }
          <div className="col-sm-1">
            <h1 id='first-num'></h1>
          </div>
          <div className="col-sm-5">
            <img id="sprite" src={pokemon.sprite} alt={pokemon.species} onClick={() => {cryAudio()}}/>
          </div>
          <div id="mystery-num" className="col-sm-1">
            <h1 id='second-num'></h1>
          </div>
          { info &&
            <div id='info2' className="col-sm-2">
              <p>Instructions for 'Play': A number will appear on the left of your Pokémon. You have to guess if the next number that appears on the right of your Pokémon will be higher or lower than the first number. Winning makes your Pokémon happy, losing makes them sad!</p>
            </div>
          }
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-2 game-button">
            <Status species={species} hunger={hungerState} happiness={happinessState}/>
          </div>
          <div className="col-sm-2 game-button">
            <Feed pokemon={pokemon} hungerState={hungerState} setPokemon={setPokemon} setHungerState={setHungerState}/>
          </div>
          <div className="col-sm-2 game-button">
            <Play_w_Pokemon pokemon={pokemon} setPokemon={setPokemon} />
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
- Game button logic
  - Display a number from 1-9 on the screen. User can guess if the next number will be higher or lower than the first number
  - if user gets the question correct, pokemon gains 1 point in happiness
  - if user gets the question wrong, pokemon loses 1 point in happiness
  - if time allows at all, maybe switch game to "Who's that pokemon?!"
 */