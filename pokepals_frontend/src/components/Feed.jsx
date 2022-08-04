import axios from "axios"

function Feed({pokemon,  setHunger, setLast_Fed}) {
  
  const feedPokemon = () => {
    let hunger = pokemon.hunger
    if(+hunger >= 8) {
      alert(`${pokemon.species.charAt(0).toUpperCase() + pokemon.species.slice(1)} is not hungry!`)
    } else {
      axios.put(`/pokemon/${pokemon.id}/last_fed`).then((response) => {
        console.log(response.data.last_fed)
        setHunger(response.data.hunger)
        setLast_Fed(response.data.last_fed)
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