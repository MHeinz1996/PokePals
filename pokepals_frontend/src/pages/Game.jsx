import {useEffect} from 'react'
import axios from 'axios'

function Game({user}) {
  
  // Query backend for pokemon info
  // If user has not adopted a pokemon, allow them to select a pokemon to adopt
  // If they DO have an adopted pokemon, load that pokemon's data from the database
  useEffect(() => {}, [])
  
  const test = () => {
    axios.get('/pokemon', {'user': user}).then((response) => {
      console.log(response)
      if(response.data.success === false) {
        window.location.href = '/#/adopt'
      }
    })
  }

  return (
    <div>
      <h1>Welcome, {user}</h1>
      <button onClick={test}>Play</button>
    </div>
  )
}

export default Game