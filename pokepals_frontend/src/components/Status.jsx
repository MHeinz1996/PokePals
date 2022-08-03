import {useState} from 'react'
import MyVerticallyCenteredModal from './Modal'
// import Button from 'react-bootstrap/Button'

function Status({pokemon}) {
  const [modal, setModal] = useState(false)
  let happiness = pokemon.happiness
  let hunger = pokemon.hunger
  let last_fed = pokemon.last_fed

  return (
    <div>
      <button onClick={() => setModal(true)}>Status</button>
      <MyVerticallyCenteredModal pokemon={pokemon.species} happiness={happiness} hunger={hunger} show={modal} onHide={() => setModal(false)} /> 
    </div>
  )
}

export default Status