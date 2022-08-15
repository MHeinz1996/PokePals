import {useState} from 'react'
import SignUp from '../components/SignUp';
import Login from '../components/Login.jsx';
import logo from '../../public/pokepals.png'

function HomePage({user, setUser}) {
  const [account, setAccount] = useState(true)

  return(
    <div>
      <img src={logo} />
      <br />
      <br />
      {
        account
        ? <Login user={user} setUser={setUser} account={account} setAccount={setAccount} />
        : <SignUp account={account} setAccount={setAccount} />
      }
    </div>
  )
}

export default HomePage