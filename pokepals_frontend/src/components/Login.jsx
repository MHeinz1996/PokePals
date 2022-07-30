import axios from 'axios'

function Login({user, account, setAccount}) {
  
  const handleSubmit = (event) => {
    event.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    
    axios.post('/login', {email: email, password: password}).then((response) => {
      console.log(response.data)
    })
  }

  const handleClick = () => {
    setAccount(!account)
  }
  
  return(
    <div className="Login">
      <h3>Log In</h3>
      <form onSubmit={handleSubmit}>
      <label>
          Email:
          <input type="email" id="email" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" id="password" />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <br />
      <a onClick={handleClick}>Sign Up</a>
    </div>
  )
}

export default Login