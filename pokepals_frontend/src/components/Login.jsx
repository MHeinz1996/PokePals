import axios from 'axios'

function Login({user, setUser, account, setAccount}) {
  
  const handleSubmit = (event) => {
    event.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    
    axios.post('/login', {email: email, password: password}).then((response) => {
      console.log(response.data)
      if(response.data.success === true) {
        setUser({id: response.data.trainer_id, email: email})
        window.location.href = '/#/game'
      }
    })
  }

  const handleClick = () => {
    setAccount(!account)
  }
  
  return(
    <div className="Login">
      <h3>Log In</h3>
      <br />
      <form onSubmit={handleSubmit}>
      <label>
          Email:
          <input type="email" id="email" />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input type="password" id="password" />
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
        <span> </span>
        <button onClick={handleClick}>Sign Up</button>
      </form>
    </div>
  )
}

export default Login