import {useState} from 'react'
import SignUp from '../components/SignUp';
import Login from '../components/Login.jsx';
import axios from 'axios';

function HomePage({user, setUser}) {
  const [account, setAccount] = useState(true)

  return(
    <div>
      <h1>PokéPals</h1>
      {
        account
        ? <Login user={user} setUser={setUser} account={account} setAccount={setAccount} />
        : <SignUp account={account} setAccount={setAccount} />
      }
    </div>
  )
}

export default HomePage