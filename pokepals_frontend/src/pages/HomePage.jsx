import {useState} from 'react'
import SignUp from '../components/SignUp';
import Login from '../components/Login.jsx';
import axios from 'axios';

function HomePage({user, setUser}) {
  const [account, setAccount] = useState(true)

  const logOut = (event) => {
    event.preventDefault()
    axios.post('/logout').then((response) => {
      console.log(response.data)
    })
  }

  return(
    <div>
      {/* {!user && <Login user={user} setUser={setUser} />} */}
      {
        account
        ? <Login user={user} setUser={setUser} account={account} setAccount={setAccount} />
        : <SignUp account={account} setAccount={setAccount} />
      }
      <br />
      <input type="button" onClick={logOut} value="Log Out" />
    </div>
  )
}

export default HomePage