import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

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
        </Routes>
      </Router>
      {/* {!user && <SignUp setUser={setUser} />} */}
    </div>
  )
}

export default App
