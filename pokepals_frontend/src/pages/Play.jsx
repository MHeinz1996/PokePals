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
  const [firstRender, setFirstRender] = useState(true)
  const [mysteryNum, setMysteryNum] = useState(null)
  let species = pokemon.species
  let happiness = pokemon.happiness
  let hunger = pokemon.hunger
  
  useEffect(() => {
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken
    if(firstRender){
      checkLastFed()
    }
    setFirstRender(false)
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
        let count = 0
        for(let i=0; i<hours_since_fed; i++) {
          // count how many hours the pokemon has been extremely unhappy
          if(temp_happiness === 0) {
            count++
          }
          
          if(temp_hunger === 0) {
            if(temp_happiness -= 2 > 0) {
              temp_happiness -= 2
            } else {
              temp_happiness = 0
            }
          } else {
            temp_hunger--
          }
        }
        
        // if pokemon has had 0 happiness for over 72 hours, it will run away
        if(count > 72){
          ReleasePokemon(2)
        } else {
          // set the states so I can manipulate frontend components
          // without messing with the database
          setHappinessState(temp_happiness)
          setHungerState(temp_hunger)
        }
      }
    })
  }

  // Check to see when the pokemon was fed last
  // then set the hunger and happiness level of the pokemon accordingly
  setInterval(checkLastFed, 60000)

  const MysteryNum = (guess) => {
    let temp_happiness = happinessState
    let correct = null
  
    const num1 = document.getElementById('first-num').innerHTML
    if(guess == 'higher') {
      if(+mysteryNum > +num1) {
        alert('Correct!')
        correct = 'Correct'
      } else {
        alert('Wrong 😓')
        correct = 'Incorrect'
      }
    }

    if(guess == 'lower') {
      if(+mysteryNum < +num1) {
        alert('Correct!')
        correct = 'Correct'
      } else {
        alert('Wrong 😓')
        correct = 'Incorrect'
      }
    }
    document.getElementById('second-num').innerHTML = mysteryNum
    axios.put(`/pokemon/${pokemon.id}/play`, {current_happiness: temp_happiness, correct: correct}).then((response) => {
      setHappinessState(response.data.happiness)
      setPokemon(response.data)
    })
  }

  const ReleasePokemon = (option) => {
    axios.delete(`/pokemon/${pokemon.id}/release`).then((response) => {
      if(option === 1) {
        alert('Your Pokémon has been released!')
      } else {
        alert("Your Pokémon was unhappy with the way you've negleted it. It ran away to find a better life.")
      }
      window.location.href = '/#/game'
    })
  }
  
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
              <Button variant='danger' onClick={() => ReleasePokemon(1)}>Release Pokémon</Button>
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
            <br/>
            <button id="higherButton" onClick={() => MysteryNum('higher')} hidden>Higher</button>
            <br />
            <br />
            <button id="lowerButton" onClick={() => MysteryNum('lower')} hidden>Lower</button>
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
            <Feed pokemon={pokemon} hungerState={hungerState} happinessState={happinessState} setPokemon={setPokemon} setHungerState={setHungerState}/>
          </div>
          <div className="col-sm-2 game-button">
            <Play_w_Pokemon setMysteryNum={setMysteryNum} />
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