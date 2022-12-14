import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import getCookie from '../components/GetCookie'
import Wad from 'web-audio-daw'
import Status from '../components/Status'
import Feed from '../components/Feed'
import Play_w_Pokemon from '../components/Play_w_Pokemon'

function Play({user, pokemon, setPokemon}) {
  let species = pokemon.species
  let happiness = pokemon.happiness
  let hunger = pokemon.hunger
  let pokemon_id = pokemon.id
  const [happinessState, setHappinessState] = useState(happiness)
  const [hungerState, setHungerState] = useState(hunger)
  const [info, setInfo] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const [mysteryNum, setMysteryNum] = useState(null)

  useEffect(() => {
    if(!firstRender) {
      setHappinessState(pokemon.happiness)
      setHungerState(pokemon.hunger)
      checkLastFed(pokemon_id)
      setInterval(() => {checkLastFed(pokemon_id)}, 60000)
      setFirstRender(1)
    }
  }, [pokemon])
  
  let success = false
  useEffect(() => {
    document.body.classList.add('pokemon-field');
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken
    if(firstRender){
      checkLastFed(pokemon_id)
      if(success = true) {
        setInterval(() => {checkLastFed(pokemon_id)}, 60000)
      }
    }
    setFirstRender(!firstRender)
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
  
  const checkLastFed = (id) => {
    axios.get(`/pokemon/${id}/last_fed`).then((response) => {
      if(response.data.success === false) {
        return
      } else {
        success = true
      }
      // response is time difference (in hours) since the last time pokemon was fed
      let hours_since_fed = +response.data.time_diff
      console.log(`Hours since fed last: ${hours_since_fed}`)
      if(hours_since_fed > 0) {
        // set temp vars to database's values
        let temp_hunger = hunger
        let temp_happiness = happiness
        let count = 0
        // subtract from stats based on how many hours pokemon wasn't fed
        for(let i=0; i<hours_since_fed; i++) {
          if(temp_hunger === 0) {
            if(temp_happiness - 2 >= 0) {
              temp_happiness -= 2
            } else if(temp_happiness === 0) {
              count++ 
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

  const MysteryNum = (guess) => {
    let temp_happiness = happinessState
    let correct = null
  
    const num1 = document.getElementById('first-num').innerHTML
    if(guess == 'higher') {
      if(+mysteryNum > +num1) {
        alert('Correct!')
        correct = 'Correct'
      } else {
        alert('Wrong ????')
        correct = 'Incorrect'
      }
    }

    if(guess == 'lower') {
      if(+mysteryNum < +num1) {
        alert('Correct!')
        correct = 'Correct'
      } else {
        alert('Wrong ????')
        correct = 'Incorrect'
      }
    }
    document.getElementById('second-num').innerHTML = mysteryNum
    document.getElementById('higherButton').disabled = true
    document.getElementById('lowerButton').disabled = true
    axios.put(`/pokemon/${pokemon.id}/play`, {current_happiness: temp_happiness, correct: correct}).then((response) => {
      setHappinessState(response.data.happiness)
      setPokemon(response.data)
    })
  }

  const ReleasePokemon = (option) => {
    axios.delete(`/pokemon/${pokemon.id}/release`).then((response) => {
      if(option === 1) {
        alert('Your Pok??mon has been released!')
      } else {
        alert("Your Pok??mon was unhappy with the way you've negleted it. It ran away to find a better life.")
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
            <h1 className='pokemon-species'><strong>{pokemon.species.charAt(0).toUpperCase() + pokemon.species.slice(1)}</strong></h1>
          </div>
          <div className="col-sm-1">
            <button onClick={() => setInfo(!info)}>info</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          { info &&
            <div id='info1' className="col-sm-3">
              <h6 className='pokemon-font'>Pok??Pals!</h6>
              <p className='pokemon-font'>Take care of your Pok??mon! If they are hungry, they will get upset. If they are very upset, they might even runaway! If you choose to, you can release your Pok??mon. THIS CANNOT BE UNDONE</p>
              <Button variant='danger' onClick={() => ReleasePokemon(1)}>Release Pok??mon</Button>
            </div>
          }
          <div className="col-sm-1">
            <h1 id='first-num' className='pokemon-species'></h1>
          </div>
          <div className="col-sm-4">
            <img id="sprite" src={pokemon.sprite} alt={pokemon.species} onClick={() => {cryAudio()}}/>
          </div>
          <div id="mystery-num" className="col-sm-1">
            <h1 id='second-num' className='pokemon-species'></h1>
            <br/>
            <button id="higherButton" onClick={() => MysteryNum('higher')} hidden>Higher</button>
            <br />
            <br />
            <button id="lowerButton" onClick={() => MysteryNum('lower')} hidden>Lower</button>
          </div>
          { info &&
            <div id='info2' className="col-sm-3 pokemon-font">
              <p>Instructions for 'Play': A number will appear next to your Pok??mon. You have to guess if the next number that appears is higher or lower than the first number. Winning makes your Pok??mon happy, losing makes them sad!</p>
            </div>
          }
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center button-padding">
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