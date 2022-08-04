import axios from "axios"

function Feed({pokemon,  setPokemon}) {
  
  const feedPokemon = () => {
    let hunger = pokemon.hunger
    if(+hunger >= 8) {
      alert(`${pokemon.species.charAt(0).toUpperCase() + pokemon.species.slice(1)} is not hungry!`)
    } else {
      axios.put(`/pokemon/${pokemon.id}/last_fed`).then((response) => {
        console.log(response.data)
        setPokemon(response.data)
        alert(`${pokemon.species.charAt(0).toUpperCase() + pokemon.species.slice(1)} was fed!`)
      })
      window.location.href = '/#/play'
    }
  }


  return (
    <div>
      <button onClick={() => {feedPokemon()}}>Feed</button>
    </div>
  )
}

export default Feed