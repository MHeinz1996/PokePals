import axios from "axios"

function Feed({pokemon, hungerState, happinessState, setPokemon, setHungerState}) {
  
  const feedPokemon = () => {
    let hunger = hungerState
    let happiness = happinessState
    if(+hunger >= 8) {
      alert(`${pokemon.species.charAt(0).toUpperCase() + pokemon.species.slice(1)} is not hungry!`)
    } else {
      axios.put(`/pokemon/${pokemon.id}/last_fed`, {current_hunger: hunger, current_happiness: happiness}).then((response) => {
        setHungerState(response.data.hunger)
        setPokemon(response.data)
        alert(`${pokemon.species.charAt(0).toUpperCase() + pokemon.species.slice(1)} was fed!`)
      })
    }
  }


  return (
    <div>
      <button onClick={() => {feedPokemon()}}>Feed</button>
    </div>
  )
}

export default Feed