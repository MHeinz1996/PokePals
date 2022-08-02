import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import getCookie from './components/GetCookie'
import HomePage from './pages/HomePage'
import Game from './pages/Game'

const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common['X-CSRFToken'] = csrftoken

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <h1>PokéPals</h1>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage user={user} setUser={setUser}/>} />
          <Route path='/play' element={<Game user={user} />} />
        </Routes>
      </Router>
      {/* {!user && <SignUp setUser={setUser} />} */}
    </div>
  )
}

export default App
