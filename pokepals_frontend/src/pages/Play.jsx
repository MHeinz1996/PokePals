import {useState, useEffect} from 'react'
import axios from 'axios'
import getCookie from '../components/GetCookie'
import Wad from 'web-audio-daw'
import Status from '../components/Status'
import Feed from '../components/Feed'

function Play({user, pokemon, setPokemon}) {
  const [happiness, setHappiness] = useState(pokemon.happiness)
  const [hunger, setHunger] = useState(pokemon.hunger)
  const [last_fed, setLast_Fed] = useState(pokemon.last_fed)
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    if(!firstRender) {
      console.log("hunger updated")
      setTimeout(1500)
      window.location.href = '/#/game'
    }
  }, [hunger])
  
  useEffect(() => {
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken
    setFirstRender(false)
    console.log(pokemon)
  }, [])
  
  const cryAudio = () => {
    let cry = new Wad({source: `${pokemon.cry}`})
    cry.play()
  }

  const quit = (event) => {
    event.preventDefault()
    // add params to send game info to back end for saving
    axios.post('/logout').then((response) => {
      console.log(response.data)
      window.location.href = '/'
    })
  }

  return (
    <div>
      <img id="sprite" src={pokemon.sprite} alt={pokemon.species} onClick={() => {cryAudio()}}/>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-2">
            <Status pokemon={pokemon} />
          </div>
          <div className="col-sm-2">
            <Feed pokemon={pokemon} setHunger={setHunger} setLast_Fed={setLast_Fed} />
          </div>
          <div className="col-sm-2">
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