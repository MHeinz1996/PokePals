import axios from 'axios'

function SignUp({setUser, account, setAccount}) {
  
  const handleSubmit = (event) => {
    event.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    
    axios.post('/signup', {email: email, password: password}).then((response) => {
      console.log(response.data.success)
      if(response.data.success === true) {
        handleClick()
      }
    })
  }
  
  const handleClick = () => {
    setAccount(!account)
  }

  return(
    <div className="SignUp">
      <h3>Sign Up</h3>
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
      <a onClick={handleClick}>Log In</a>
    </div>
  )
}

export default SignUp