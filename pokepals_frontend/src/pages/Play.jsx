import {useState, useEffect} from 'react'
import axios from 'axios'
import getCookie from '../components/GetCookie'
import Wad from 'web-audio-daw'

function Play({user, pokemon, setPokemon}) {
  let path = ''
  useEffect(() => {
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken

    axios.get(`/pokemon/${pokemon.id}/${pokemon.trainer}`).then((response) => {
      path = response.data.path
      console.log(`${path}${pokemon.cry}`)
    })
  }, [])
  
  // wad.js:19974 GET http://localhost:8000/home/michael/VSCode/Code_Platoon/Personal_Project/PokePals/pokepals_proj/media/cries/pokemon7.wav 404 (Not Found)
  // I understand wad is a web player, but is there any way to set the source as a local file in my project?
  const cryAudio = () => {
    let cry = new Wad({source: `${path}${pokemon.cry}`})
    cry.play()
  }

  // same error as Wad
  // const cryAudio = () => {
  //   const cry = new Audio(`${path}${pokemon.cry}`)
  //   cry.play()
  // }

  return (
    <div>
      <img id="sprite" src={pokemon.sprite} alt={pokemon.species} onClick={() => {cryAudio()}}/>
    </div>
  )
}

export default Play