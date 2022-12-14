import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router, Routes, Route} from 'react-router-dom'

// Components
import getCookie from './components/GetCookie'

// Pages
import HomePage from './pages/HomePage'
import Game from './pages/Game'
import Adopt from './pages/Adopt'
import Play from './pages/Play';

// Generate CSRF
const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common['X-CSRFToken'] = csrftoken

function App() {
  const [user, setUser] = useState(null)
  const [pokemon, setPokemon] = useState(null)
  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage user={user} setUser={setUser}/>} />
          <Route path='/game' element={<Game user={user} pokemon={pokemon} setPokemon={setPokemon}/>} />
          <Route path='/adopt' element={<Adopt user={user} />} />
          <Route path='/play' element={<Play user={user} pokemon={pokemon} setPokemon={setPokemon}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
